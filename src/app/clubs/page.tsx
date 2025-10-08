'use client'

import { Card, CardContent, CardDescription } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Navbar } from '../../components/layout/navbar'
import Link from 'next/link'
import { Users, Search, X } from 'lucide-react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useGetClubsQuery } from '@/store/api/clubAPI'
import { IClubUser } from '@/types/interfaces'
import { useGetUniversitiesQuery } from '@/store/api/universityAPI'
import { useGetCategoriesQuery } from '@/store/api/categoriesAPI'
import { UniversityDropdown } from '@/components/ui/university-dropdown'
import { CategoryDropdown } from '@/components/ui/category-dropdown'
import { useToggleClubFollowMutation } from '@/store/api/engagementAPI'
import { useAppSelector } from '@/store/hooks'
import { USER_ROLES } from '@/types/interfaces'


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



export default function ClubsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Read from URL parameters with useMemo to prevent infinite re-renders
  const searchTerm = useMemo(() => searchParams.get('searchTerm') || '', [searchParams])
  const selectedUniversities = useMemo(() => searchParams.get('universities')?.split(',').filter(Boolean) || [], [searchParams])
  const selectedCategories = useMemo(() => searchParams.get('categories')?.split(',').filter(Boolean) || [], [searchParams])
  const selectedTags = useMemo(() => searchParams.get('tags')?.split(',').filter(Boolean) || [], [searchParams])

  // State for pagination and infinite scroll
  const [page, setPage] = useState(1)
  const [allClubs, setAllClubs] = useState<IClubUser[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  // Authentication state
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  
  // Follow functionality
  const [toggleClubFollow] = useToggleClubFollowMutation()
  
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
  
  // Fetch clubs with current filters and pagination
  const queryParams = useMemo(() => {
    const params: any = {
      page,
      limit: 12,
    }
    if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm
    if (selectedUniversityIds.length > 0) params.universities = selectedUniversityIds
    if (selectedCategoryIds.length > 0) params.categories = selectedCategoryIds
    if (selectedTags.length > 0) params.tags = selectedTags
    return params
  }, [page, debouncedSearchTerm, selectedUniversityIds, selectedCategoryIds, selectedTags])
  
  const { data: clubsResponse, isLoading, isFetching, error } = useGetClubsQuery(queryParams)
  // Update clubs list when new data arrives
  useEffect(() => {
    if (clubsResponse?.data) {
      const newClubs = clubsResponse.data
      
      if (page === 1) {
        // Reset clubs for new search/filter
        setAllClubs(newClubs)
      } else {
        // Append new clubs for pagination, avoiding duplicates
        setAllClubs(prev => {
          const existingIds = new Set(prev.map(club => club._id))
          const uniqueNewClubs = newClubs.filter(club => !existingIds.has(club._id))
          return [...prev, ...uniqueNewClubs]
        })
      }
      
      // Determine if there are more clubs to load
      // If we got less than the limit (12), we've reached the end
      const hasMoreClubs = newClubs.length === 12
      setHasMore(hasMoreClubs)
      setIsLoadingMore(false)
    } else if (error) {
      // Stop loading more on error
      setHasMore(false)
      setIsLoadingMore(false)
    }
  }, [clubsResponse, page, error])
  
  // Reset pagination when filters change
  useEffect(() => {
    setPage(1)
    setAllClubs([])
    setHasMore(true)
  }, [debouncedSearchTerm, selectedUniversities, selectedCategories, selectedTags])
  
  // Update URL parameters
  const updateUrlParams = useCallback((updates: {
    searchTerm?: string
    universities?: string[]
    categories?: string[]
    tags?: string[]
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (updates.searchTerm !== undefined) {
      if (updates.searchTerm) {
        params.set('searchTerm', updates.searchTerm)
      } else {
        params.delete('searchTerm')
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
    
    if (updates.tags !== undefined) {
      if (updates.tags.length > 0) {
        params.set('tags', updates.tags.join(','))
      } else {
        params.delete('tags')
      }
    }
    
    router.push(`?${params.toString()}`, { scroll: false })
  }, [searchParams, router])

  // Infinite scroll handler
  const loadMoreClubs = useCallback(() => {
    // Prevent multiple simultaneous requests
    if (hasMore && !isLoadingMore && !isFetching && !isLoading) {
      setIsLoadingMore(true)
      setPage(prev => prev + 1)
    }
  }, [hasMore, isLoadingMore, isFetching, isLoading])

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      // Only trigger if we're near the bottom and conditions are met
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop
      const documentHeight = document.documentElement.offsetHeight
      
      if (scrollPosition >= documentHeight - 1000 && hasMore && !isLoadingMore && !isFetching) {
        loadMoreClubs()
      }
    }

    // Throttle scroll events
    let timeoutId: NodeJS.Timeout
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 100)
    }

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [hasMore, isLoadingMore, isFetching, loadMoreClubs])

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

  const toggleTagFilter = (value: string) => {
    const newTags = selectedTags.includes(value)
      ? selectedTags.filter(t => t !== value)
      : [...selectedTags, value]
    updateUrlParams({ tags: newTags })
  }

  const clearAllFilters = () => {
    updateUrlParams({ searchTerm: '', universities: [], categories: [], tags: [] })
  }

  const hasActiveFilters = searchTerm || selectedUniversities.length > 0 || selectedCategories.length > 0 || selectedTags.length > 0

  // Follow handler
  const handleFollow = async (clubId: string) => {
    if (!isAuthenticated) return
    
    try {
      const result = await toggleClubFollow(clubId).unwrap()
      // Update the club's isFollowing field in the allClubs state
      setAllClubs(prev => prev.map(club => 
        club._id === clubId 
          ? { ...club, isFollowing: result.data?.isFollowing || false }
          : club
      ))
    } catch (error) {
      console.error('Error toggling club follow:', error)
    }
  }

  // Role-based authorization checks
  const canInteract = (clubId: string) => {
    if (!isAuthenticated) return false
    // Only members can follow clubs - clubs cannot follow other clubs
    if (user?.role === USER_ROLES.CLUB) return false
    return true
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            University Clubs
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover and join amazing clubs from universities across Bangladesh
          </p>
        </div>

        {/* Search Bar and Filters Row */}
         <div className="mb-6">
           <div className="flex flex-col lg:flex-row gap-4">
             {/* Search Bar */}
             <div className="flex-1">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                 <Input
                   placeholder="Search clubs by name, university, or tags..."
                   className="w-full pl-10 pr-10"
                   value={searchTerm}
                   onChange={(e) => updateUrlParams({ searchTerm: e.target.value })}
                 />
                 {searchTerm && (
                   <button
                     onClick={() => updateUrlParams({ searchTerm: '' })}
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
           {/* Clear Filters Button */}
           {hasActiveFilters && (
             <div className="flex justify-between items-center">
               <span className="text-sm text-muted-foreground">
                 {allClubs.length} clubs found
               </span>
               <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                 <X className="w-4 h-4 mr-2" />
                 Clear all filters
               </Button>
             </div>
           )}

           {/* Selected Universities */}
           {selectedUniversities.length > 0 && (
             <div>
               <h3 className="text-sm font-medium mb-2">Selected Universities</h3>
               <div className="flex flex-wrap gap-2">
                 {selectedUniversities.map(university => (
                   <Badge key={university} variant="default" className="text-xs">
                     {university}
                     <button
                       onClick={() => toggleUniversityFilter(university)}
                       className="ml-1 hover:bg-background/20 rounded-full"
                     >
                       <X className="w-3 h-3" />
                     </button>
                   </Badge>
                 ))}
               </div>
             </div>
           )}

           {/* Selected Categories */}
           {selectedCategories.length > 0 && (
             <div>
               <h3 className="text-sm font-medium mb-2">Selected Categories</h3>
               <div className="flex flex-wrap gap-2">
                 {selectedCategories.map(category => (
                   <Badge key={category} variant="default" className="text-xs">
                     {category}
                     <button
                       onClick={() => toggleCategoryFilter(category)}
                       className="ml-1 hover:bg-background/20 rounded-full"
                     >
                       <X className="w-3 h-3" />
                     </button>
                   </Badge>
                 ))}
               </div>
             </div>
           )}

        </div>


        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allClubs.map((club) => (
  <Card
    key={club._id}
    className="relative flex h-full flex-col overflow-hidden border bg-card text-card-foreground hover:shadow-lg transition-shadow"
  >
    {/* Cover Image */}
    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-lg font-bold text-foreground">
              {club.clubName?.charAt(0) || club.name?.charAt(0) || 'C'}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{club.clubName || club.name}</h3>
            <p className="text-blue-100 dark:text-blue-200 text-sm">{club.university}</p>
          </div>
        </div>
      </div>
    </div>

    <CardContent className="p-6 pb-20">
      <CardDescription className="mb-4 line-clamp-2 text-muted-foreground">
        {(club.clubDescription || club.description || '').replace(/<[^>]*>/g, '')}
      </CardDescription>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {club?.interestedIn?.slice(0, 3).map((tag: string) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {club?.membersCount || 0} members
          </span>
        </div>
        <Badge variant="success" className="text-xs">Active</Badge>
      </div>

      {/* Recent Achievement */}
      {/* {club.achievements?.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Latest Achievement
            </span>
          </div>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            {club.achievements?.[0].title || 'No achievement'}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            {new Date(club.?.[0].date || 0).toLocaleDateString()}
          </p>
        </div>
      )} */}
    </CardContent>

    {/* Actions pinned to bottom */}
    <div className="absolute bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur p-4">
      <div className="flex space-x-2">
        <Button asChild className="flex-1">
          <Link href={`/clubs/${club.slug || club._id}`}>View Club</Link>
        </Button>
        <Button variant="outline" className="flex-1">
          Join Club
        </Button>
        {isAuthenticated ? (
          canInteract(club._id) ? (
            <Button 
              variant="outline" 
              onClick={() => handleFollow(club._id)}
            >
              {club.isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          ) : (
             <Button variant="outline" disabled title="Only members can follow clubs">
               Follow
             </Button>
           )
        ) : (
          <Button variant="outline" disabled title="Please login to follow clubs">
            Follow
          </Button>
        )}
      </div>
    </div>
  </Card>
))}

        </div>

        {/* Initial loading state */}
        {isLoading && page === 1 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-muted-foreground bg-background border">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading clubs...
            </div>
          </div>
        )}

        {/* No results */}
        {!isLoading && allClubs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No clubs found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
              Clear filters
            </Button>
          </div>
        )}

        {/* Loading indicator for infinite scroll */}
        {(isLoadingMore || isFetching) && allClubs.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-muted-foreground bg-background border">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading more clubs...
            </div>
          </div>
        )}

        {/* End of results indicator */}
        {!hasMore && allClubs.length > 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You've reached the end of the results.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Don't see your club?</h2>
          <p className="text-blue-100 dark:text-blue-200 mb-6">
            Apply to get your university club featured on our platform and start managing your community effectively.
          </p>
          <Button size="lg" variant="secondary">
            <Link href="/apply">Apply for Your Club</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}