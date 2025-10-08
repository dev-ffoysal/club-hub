'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Navbar } from '../../components/layout/navbar'
import { Countdown } from '../../components/ui/countdown'
import { SocialInteractions } from '../../components/ui/social-interactions'
import { EVENT_CATEGORIES } from '../../lib/constants'
import { formatDate, formatTime, getTimeUntil, isEventUpcoming, isEventWithinWeek } from '../../lib/utils'
import Link from 'next/link'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { User as UserIcon, Lock, Trophy, Globe, Building2, Users, Calendar, MapPin, Clock, Search, X } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useGetEventsQuery } from '@/store/api/eventAPI'
import { useGetUniversitiesQuery } from '@/store/api/universityAPI'
import { useGetCategoriesQuery } from '@/store/api/categoriesAPI'
import { IEvent } from '@/types/interfaces'
import { UniversityDropdown } from '@/components/ui/university-dropdown'
import { CategoryDropdown } from '@/components/ui/category-dropdown'
import { useAppSelector } from '@/store/hooks'
import { getImageUrl } from '@/lib/utils/imageDisplay'

// Custom hook for debounced search
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function EventsPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Read filter values from URL parameters with useMemo to prevent infinite re-renders
  const searchTerm = useMemo(() => searchParams.get('search') || '', [searchParams])
  const selectedUniversities = useMemo(() => searchParams.get('universities')?.split(',').filter(Boolean) || [], [searchParams])
  const selectedCategories = useMemo(() => searchParams.get('categories')?.split(',').filter(Boolean) || [], [searchParams])

  // State for pagination and infinite scroll
  const [page, setPage] = useState(1)
  const [allEvents, setAllEvents] = useState<IEvent[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  // Fetch universities and categories from API
  const { data: universitiesResponse } = useGetUniversitiesQuery()
  const { data: categoriesResponse } = useGetCategoriesQuery()
  
  // Extract names for display in dropdowns
  const universities = universitiesResponse?.data?.map((uni: any) => uni.name) || []
  const categories = categoriesResponse?.data?.map((cat: any) => cat.title) || []
  
  // Convert selected names back to IDs for API filtering
  const selectedUniversityIds = useMemo(() => {
    if (!universitiesResponse?.data || selectedUniversities.length === 0) return []
    return universitiesResponse.data
      .filter((uni: any) => selectedUniversities.includes(uni.name))
      .map((uni: any) => uni._id)
  }, [universitiesResponse, selectedUniversities])
  
  const selectedCategoryIds = useMemo(() => {
    if (!categoriesResponse?.data || selectedCategories.length === 0) return []
    return categoriesResponse.data
      .filter((cat: any) => selectedCategories.includes(cat.title))
      .map((cat: any) => cat._id)
  }, [categoriesResponse, selectedCategories])
  
  // Fetch events with current filters and pagination
  const queryParams = useMemo(() => {
    const params: any = {
      page,
      limit: 12,
    }
    if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm
    if (selectedUniversityIds.length > 0) params.universities = selectedUniversityIds
    if (selectedCategoryIds.length > 0) params.categories = selectedCategoryIds
    return params
  }, [page, debouncedSearchTerm, selectedUniversityIds, selectedCategoryIds])
  
  const { data: eventsResponse, isLoading, isFetching } = useGetEventsQuery(queryParams)

  // Safely extract events from response
  const eventsData = useMemo(() => {
    // console.log('eventsResponse', eventsResponse)
    if (!eventsResponse?.data) return [];
    // Handle both array and object response structures
    return Array.isArray(eventsResponse.data) 
      ? eventsResponse.data 
      : (eventsResponse.data || eventsResponse.data || []);
  }, [eventsResponse]);

  // Update events list when new data arrives
  useEffect(() => {
    if (eventsData.length > 0) {
      if (page === 1) {
        // Reset events for new search/filter
        setAllEvents(eventsData);
        setHasMore(eventsData.length >= 12); // Assume more if we got a full page
      } else {
        // Append new events for pagination
        setAllEvents(prev => [...prev, ...eventsData]);
        setHasMore(eventsData.length >= 12);
      }
      setIsLoadingMore(false);
    } else if (page === 1) {
      // No events found
      setAllEvents([]);
      setHasMore(false);
    }
  }, [eventsData, page]);
  
  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
    setAllEvents([]);
    setHasMore(true);
  }, [debouncedSearchTerm, selectedUniversities, selectedCategories])

  // Update URL parameters
  const updateUrlParams = useCallback((updates: {
    search?: string
    universities?: string[]
    categories?: string[]
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (updates.search !== undefined) {
      if (updates.search) {
        params.set('search', updates.search)
      } else {
        params.delete('search')
      }
    }
    
    if (updates.universities !== undefined) {
      if (updates.universities.length > 0) {
        params.set('universities', updates.universities.join(','))
      } else {
        params.delete('universities')
      }
    }
    
    if (updates.categories !== undefined) {
      if (updates.categories.length > 0) {
        params.set('categories', updates.categories.join(','))
      } else {
        params.delete('categories')
      }
    }
    
    router.push(`?${params.toString()}`, { scroll: false })
  }, [searchParams, router])



  // Infinite scroll logic
  const loadMoreEvents = useCallback(() => {
    if (hasMore && !isFetching && !isLoadingMore) {
      setIsLoadingMore(true)
      setPage(prev => prev + 1)
    }
  }, [hasMore, isFetching, isLoadingMore])

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100 || isFetching || isLoadingMore) {
        return
      }
      loadMoreEvents()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreEvents, isFetching, isLoadingMore])

  const toggleUniversityFilter = (value: string) => {
    const newUniversities = selectedUniversities.includes(value)
      ? selectedUniversities.filter(u => u !== value)
      : [...selectedUniversities, value]
    updateUrlParams({ universities: newUniversities })
  }

  const toggleCategoryFilter = (value: string) => {
    const newCategories = selectedCategories.includes(value)
      ? selectedCategories.filter(c => c !== value)
      : [...selectedCategories, value]
    updateUrlParams({ categories: newCategories })
  }

  const clearAllFilters = () => {
    updateUrlParams({ search: '', universities: [], categories: [] })
  }

  const hasActiveFilters = searchTerm !== '' || selectedUniversities.length > 0 || selectedCategories.length > 0

  // Calculate stats efficiently
  const stats = useMemo(() => {
    return {
      total: allEvents.length,
      upcoming: allEvents.filter(event => isEventUpcoming(event.startDate)).length,
      online: allEvents.filter(event => event.isOnline).length,
      competitions: allEvents.filter(event => event.type === 'competition').length
    }
  }, [allEvents])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* <div className="flex justify-between items-center mb-6">
            <div />
            <Button
              onClick={() =>
                isAuthenticated
                  ? router.push('/dashboard')
                  : router.push('/login')
              }
              variant={isAuthenticated ? 'default' : 'outline'}
              className="ml-auto"
            >
              {isAuthenticated ? (
                <>
                  <UserIcon className="w-4 h-4 mr-1" />
                  {user?.name || 'User'}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-1" />
                  Login
                </>
              )}
            </Button>
          </div> */}

          {/* Gradient uses theme primary */}
          <div className="mx-auto mb-6">
            <div className="rounded-xl bg-background px-6 py-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">University Events</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover exciting events, workshops, and competitions happening across universities
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar and Filters Row */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events by title, club, university..."
                  className="w-full pl-10 pr-10"
                  value={searchTerm}
                  onChange={(e) => updateUrlParams({ search: e.target.value })}
                />
                {searchTerm && (
                  <button
                    onClick={() => updateUrlParams({ search: '' })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Universities Filter */}
            <div className="lg:w-64">
              <UniversityDropdown 
                selectedUniversities={selectedUniversities}
                onSelectionChange={(universities) => updateUrlParams({ universities })}
                universities={universities}
              />
            </div>

            {/* Categories Filter */}
            <div className="lg:w-64">
              <CategoryDropdown 
                selectedCategories={selectedCategories}
                onSelectionChange={(categories) => updateUrlParams({ categories })}
                categories={categories}
              />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Selected Universities */}
          {selectedUniversities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mr-2">Universities:</span>
              {selectedUniversities.map((university) => (
                <Badge key={university} variant="secondary" className="flex items-center gap-1">
                  {university}
                  <button
                    onClick={() => toggleUniversityFilter(university)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Selected Categories */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mr-2">Categories:</span>
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <button
                    onClick={() => toggleCategoryFilter(category)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {allEvents.length} events found
              </span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="w-4 h-4 mr-2" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">{stats.upcoming}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">{stats.online}</div>
              <div className="text-sm text-muted-foreground">Online Events</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">{stats.competitions}</div>
              <div className="text-sm text-muted-foreground">Competitions</div>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        {/* Initial loading state */}
        {isLoading && page === 1 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-muted-foreground bg-background border">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading events...
            </div>
          </div>
         )}

        {/* No results */}
         {!isLoading && allEvents.length === 0 && (
           <div className="text-center py-12">
             <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
             <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
               Clear filters
             </Button>
           </div>
         )}

         {/* Events List */}
         {!isLoading && allEvents.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {allEvents.map((event) => {
              const categoryInfo = EVENT_CATEGORIES[event.type as keyof typeof EVENT_CATEGORIES] || EVENT_CATEGORIES.seminar
              const isUpcoming = isEventUpcoming(event.startDate)
              const isWithinWeek = isEventWithinWeek(event.startDate)
              const spotsLeft = event.maxParticipants
                ? event.maxParticipants - (event.currentParticipants || 0)
                : null

              const registrationProgress = event.maxParticipants && event.currentParticipants
                ? Math.round((event.currentParticipants / event.maxParticipants) * 100)
                : 0

              return (
                <Card
                  key={event._id}
                  className="relative flex h-full flex-col overflow-hidden border bg-card text-card-foreground hover:shadow-lg transition-shadow"
                >
                  {/* Event Header */}
                  <div className="h-48 relative overflow-hidden">
                    {/* Background Image or Gradient */}
                    {event.cover ? (
                      <>
                        <img 
                          src={getImageUrl(event.cover)} 
                          alt={event.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80"></div>
                        <div className="absolute inset-0 bg-black/20"></div>
                      </>
                    )}

                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <div className="flex space-x-2">
                        <Badge className={categoryInfo.color}>
                          <categoryInfo.icon className="w-3 h-3 mr-1" />
                          {categoryInfo.name}
                        </Badge>
                        {event.type === 'competition' && (
                          <Badge variant="warning">
                            <Trophy className="w-3 h-3 mr-1" />
                            Competition
                          </Badge>
                        )}
                        {event.isOnline && (
                          <Badge variant="info">
                            <Globe className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        )}
                      </div>

                      {isUpcoming && !isWithinWeek && (
                        <Badge variant="success">
                          {getTimeUntil(event.startDate)}
                        </Badge>
                      )}
                    </div>

                    {isUpcoming && isWithinWeek && (
                      <div className="absolute top-4 right-4">
                        <Countdown targetDate={event.startDate} />
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="backdrop-blur-sm bg-black/30 rounded-lg p-3">
                        <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-white/90 text-sm">
                          <span className="mr-4 flex items-center">
                            <Building2 className="w-4 h-4 mr-1" />
                            {typeof event.organizedBy === 'object' && event.organizedBy?.university || 'University'}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {typeof event.organizedBy === 'object' && event.organizedBy?.clubName || 'Club'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 pb-24">
                    <div 
                      className="mb-4 line-clamp-3 text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.description || '<p class="text-gray-500">Nothing to preview...</p>' }}
                    />

                    {/* Event Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {formatDate(event.startDate)} at {formatTime(event.startDate)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      {event.maxParticipants && (
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-2" />
                          <span>
                            {event.currentParticipants || 0}/{event.maxParticipants} participants
                            {spotsLeft !== null && spotsLeft > 0 && (
                              <span className="ml-1 dark:text-green-400 text-green-600">
                                ({spotsLeft || 0} spots left)
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Trophy className="w-4 h-4 mr-2" />
                        <span>
                          {event.registrationFee && event.registrationFee > 0 
                            ? `Registration Fee: BDT ${event.registrationFee}`
                            : 'Free Event'
                          }
                        </span>
                      </div>
                      {event.registrationDeadline &&
                        isEventUpcoming(event.registrationDeadline) && (
                          <div className="flex items-center text-sm dark:text-orange-400 text-orange-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className=''>
                              Registration closes: {formatDate(event.registrationDeadline)}
                            </span>
                          </div>
                        )}
                    </div>

                    {/* Progress Bar */}
                    {event.maxParticipants && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Registration Progress</span>
                          <span>{registrationProgress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${registrationProgress}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Social Interactions */}
                    <div className="mb-2">
                      <SocialInteractions
                      eventId={event._id}
                      clubId={typeof event.organizedBy === 'object' ? event.organizedBy?._id : event.organizedBy}
                      followers={event.followersCount || 0}
                      upvotes={event.upVotesCount || 0}
                      downvotes={event.downVotesCount || 0}
                      isLoggedIn={isAuthenticated}
                      isFollowing={false} // Events don't have following functionality
                      userVote={event.voteType}
                      showFollowers={false} // Hide followers for events
                    />
                    </div>
                  </CardContent>

                  {/* Actions pinned to bottom */}
                  <div className="absolute bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur p-4">
                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={`/events/${event._id}`}>View Details</Link>
                      </Button>

                      {isUpcoming ? (
                        <Button
                          variant={spotsLeft !== null && spotsLeft > 0 ? 'outline' : 'outline'}
                          disabled={spotsLeft === 0}
                          className='flex-1'
                        >
                          {spotsLeft === 0 ? 'Full' : 'Register'}
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Past
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Infinite Scroll Indicators */}
        {allEvents.length > 0 && (
          <div className="mt-12 text-center">
            {isLoadingMore ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-muted-foreground">Loading more events...</span>
              </div>
            ) : !hasMore ? (
              <p className="text-muted-foreground">You've reached the end of the results.</p>
            ) : null}
          </div>
        )}

        {/* CTA Section (token-based gradient) */}
        <div className="mt-16 rounded-2xl p-8 text-center text-primary-foreground bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80">
          <h2 className="text-2xl font-bold mb-4">Want to organize an event?</h2>
          <p className="text-sm md:text-base opacity-90 mb-6">
            Join our platform as a club admin and start creating amazing events for your university community.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/apply">Apply for Your Club</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}