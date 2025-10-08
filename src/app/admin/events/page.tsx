'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { useGetClubEventsQuery } from '../../../store/api/eventAPI'
import {  isEventUpcoming } from '../../../lib/utils'
import { Calendar, Rocket, Users, Trophy, Globe, Star, Plus, Edit, Trash2, Eye, MessageSquare } from 'lucide-react'


import { EventsList } from './components/EventsList'
import { DraftEvents } from './components/DraftEvents'
import { EventCreationForm } from './components/EventCreationForm'
import { EventDetailsModal } from './components/EventDetailsModal'

export default function EventsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [currentDraftId, setCurrentDraftId] = useState<string | undefined>()
  const [currentEventId, setCurrentEventId] = useState<string | undefined>()
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  
  // Fetch events from API
  const { data: eventsResponse, isLoading, error } = useGetClubEventsQuery({})
  const events = eventsResponse?.data || []

  // Filter events based on status
  const upcomingEvents = events.filter(event => isEventUpcoming(event.startDate))
  const pastEvents = events.filter(event => !isEventUpcoming(event.startDate))

  const handleDeleteEvent = (eventId: string) => {
    console.log('Deleting event:', eventId)
    // TODO: Implement delete functionality
  }

  const handleViewDetails = (eventId: string) => {
    console.log('Viewing details for event:', eventId)
    setCurrentEventId(eventId)
    setShowDetailsModal(true)
  }

  const handleEditEvent = (eventId: string) => {
    console.log('Editing event:', eventId)
    setCurrentEventId(eventId)
    setShowCreateForm(true)
  }

  const handleEditDraft = (draftId: string) => {
    setCurrentDraftId(draftId)
    setShowCreateForm(true)
  }

  const handleCreateNew = () => {
    setCurrentDraftId(undefined)
    setCurrentEventId(undefined)
    setShowCreateForm(true)
  }

  const handleCloseForm = () => {
    setShowCreateForm(false)
    setCurrentDraftId(undefined)
    setCurrentEventId(undefined)
  }

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setCurrentEventId(undefined)
  }

  if (showCreateForm) {
    return (
      <ClubAdminLayout>
        <EventCreationForm 
          onClose={handleCloseForm} 
          draftId={currentDraftId}
          eventId={currentEventId}
        />
      </ClubAdminLayout>
    )
  }

  return (
    <ClubAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
            <p className="text-gray-600 mt-2">Create and manage club events, competitions, and seminars</p>
          </div>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Event
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-3xl font-bold text-blue-600">{events.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                  <p className="text-3xl font-bold text-green-600">{upcomingEvents.length}</p>
                </div>
                <Rocket className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {events.reduce((sum, event) => sum + (event.currentParticipants || 0), 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Past Events</p>
                  <p className="text-3xl font-bold text-orange-600">{pastEvents.length}</p>
                </div>
                <Trophy className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="drafts">Draft Events</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <EventsList 
              events={events}
              isLoading={isLoading}
              error={error}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <EventsList 
              events={upcomingEvents}
              isLoading={isLoading}
              error={error}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <EventsList 
              events={pastEvents}
              isLoading={isLoading}
              error={error}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>

          <TabsContent value="drafts" className="mt-6">
            <DraftEvents onEditDraft={handleEditDraft} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        eventId={currentEventId || null}
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
      />
    </ClubAdminLayout>
  )
}