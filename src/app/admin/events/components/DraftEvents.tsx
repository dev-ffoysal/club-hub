'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Badge } from '../../../../components/ui/badge'
import { formatDate } from '../../../../lib/utils'
import { Calendar, Edit, Trash2, FileText, Clock } from 'lucide-react'

interface DraftEvent {
  id: string
  title: string
  type: string
  description?: string
  startDate?: string
  location?: string
  lastModified: string
  step: number
  totalSteps: number
  completionPercentage: number
}

interface DraftEventsProps {
  onEditDraft?: (draftId: string) => void
}

export function DraftEvents({ onEditDraft }: DraftEventsProps) {
  const [drafts, setDrafts] = useState<DraftEvent[]>([])

  useEffect(() => {
    loadDrafts()
  }, [])

  const loadDrafts = () => {
    try {
      const savedDrafts = localStorage.getItem('eventDrafts')
      if (savedDrafts) {
        const parsedDrafts = JSON.parse(savedDrafts)
        setDrafts(parsedDrafts)
      }
    } catch (error) {
      console.error('Error loading drafts:', error)
    }
  }

  const deleteDraft = (draftId: string) => {
    try {
      const updatedDrafts = drafts.filter(draft => draft.id !== draftId)
      setDrafts(updatedDrafts)
      localStorage.setItem('eventDrafts', JSON.stringify(updatedDrafts))
    } catch (error) {
      console.error('Error deleting draft:', error)
    }
  }

  const editDraft = (draftId: string) => {
    if (onEditDraft) {
      onEditDraft(draftId)
    } else {
      console.log('Editing draft:', draftId)
    }
  }

  const clearAllDrafts = () => {
    setDrafts([])
    localStorage.removeItem('eventDrafts')
  }

  if (drafts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No draft events</h3>
          <p className="text-gray-600">Start creating an event and save it as draft to see it here</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Draft Events</h2>
          <p className="text-gray-600">Continue working on your saved drafts</p>
        </div>
        {drafts.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearAllDrafts}
            className="text-red-600 hover:text-red-700"
          >
            Clear All Drafts
          </Button>
        )}
      </div>

      {/* Drafts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drafts.map((draft) => (
          <Card key={draft.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <FileText className="w-3 h-3 mr-1" />
                  Draft
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Step {draft.step}/{draft.totalSteps}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Title and Type */}
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {draft.title || 'Untitled Event'}
                  </h3>
                  <p className="text-sm text-gray-600 capitalize">{draft.type}</p>
                </div>

                {/* Description */}
                {draft.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {draft.description}
                  </p>
                )}

                {/* Event Details */}
                <div className="space-y-1 text-xs text-gray-500">
                  {draft.startDate && (
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(new Date(draft.startDate))}
                    </div>
                  )}
                  {draft.location && (
                    <div className="flex items-center">
                      <span className="w-3 h-3 mr-1">📍</span>
                      {draft.location}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Last modified: {formatDate(new Date(draft.lastModified))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Completion</span>
                    <span>{draft.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${draft.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    onClick={() => editDraft(draft.id)}
                    className="flex-1 flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Continue
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => deleteDraft(draft.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{drafts.length}</p>
              <p className="text-sm text-gray-600">Total Drafts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {drafts.filter(d => d.completionPercentage >= 50).length}
              </p>
              <p className="text-sm text-gray-600">50%+ Complete</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(drafts.reduce((sum, d) => sum + d.completionPercentage, 0) / drafts.length) || 0}%
              </p>
              <p className="text-sm text-gray-600">Avg. Completion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}