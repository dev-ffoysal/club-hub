'use client'

import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'

import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Calendar, Clock, MapPin, Users, DollarSign, Globe } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

interface DetailsStepProps {
  formData: any
  errors: Record<string, string>
  updateFormData: (updates: any) => void
}

export function DetailsStep({ formData, errors, updateFormData }: DetailsStepProps) {
  return (
    <div className="space-y-6">
      {/* Date & Time Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <Label htmlFor="startDate">Start Date & Time *</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => updateFormData({ startDate: e.target.value })}
                className={errors.startDate ? 'border-red-500' : ''}
              />
              {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
            </div>

            {/* End Date */}
            <div>
              <Label htmlFor="endDate">End Date & Time *</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => updateFormData({ endDate: e.target.value })}
                className={errors.endDate ? 'border-red-500' : ''}
              />
              {errors.endDate && <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>}
            </div>
          </div>

          {/* Custom Time */}
          <div>
            <Label htmlFor="time">Custom Time Display</Label>
            <Input
              id="time"
              value={formData.time}
              onChange={(e) => updateFormData({ time: e.target.value })}
              placeholder="e.g., 9:00 AM - 5:00 PM"
            />
            <p className="text-sm text-gray-500 mt-1">
              Optional: Override the automatic time display with custom text
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Location Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Online Event Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isOnline"
              checked={formData.isOnline}
              onCheckedChange={(checked) => updateFormData({ isOnline: checked })}
            />
            <Label htmlFor="isOnline" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              This is an online event
            </Label>
          </div>

          {/* Location Input */}
          <div>
            <Label htmlFor="location">
              {formData.isOnline ? 'Platform/Description *' : 'Venue/Address *'}
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              placeholder={formData.isOnline ? 'e.g., Zoom, Google Meet, etc.' : 'Enter venue name or address'}
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
          </div>

          {/* Meeting Link for Online Events */}
          {formData.isOnline && (
            <div>
              <Label htmlFor="meetingLink">Meeting Link *</Label>
              <Input
                id="meetingLink"
                type="url"
                value={formData.meetingLink}
                onChange={(e) => updateFormData({ meetingLink: e.target.value })}
                placeholder="https://zoom.us/j/..."
                className={errors.meetingLink ? 'border-red-500' : ''}
              />
              {errors.meetingLink && <p className="text-sm text-red-600 mt-1">{errors.meetingLink}</p>}
              <p className="text-sm text-gray-500 mt-1">
                This link will be shared with registered participants
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Registration Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Registration Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Fixed Seat Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isFixedSeat"
              checked={formData.isFixedSeat}
              onCheckedChange={(checked) => updateFormData({ isFixedSeat: checked })}
            />
            <Label htmlFor="isFixedSeat">
              Limited seats available
            </Label>
          </div>

          {/* Max Participants */}
          {formData.isFixedSeat && (
            <div>
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="1"
                value={formData.maxParticipants || ''}
                onChange={(e) => updateFormData({ maxParticipants: parseInt(e.target.value) || 0 })}
                placeholder="Enter maximum number of participants"
              />
            </div>
          )}

          {/* Registration Fee */}
          <div>
            <Label htmlFor="registrationFee" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Registration Fee
            </Label>
            <Input
              id="registrationFee"
              type="number"
              min="0"
              step="0.01"
              value={formData.registrationFee || ''}
              onChange={(e) => updateFormData({ registrationFee: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave as 0 for free events
            </p>
          </div>

          {/* Registration Deadline */}
          <div>
            <Label htmlFor="registrationDeadline">Registration Deadline</Label>
            <Input
              id="registrationDeadline"
              type="datetime-local"
              value={formData.registrationDeadline}
              onChange={(e) => updateFormData({ registrationDeadline: e.target.value })}
            />
            <p className="text-sm text-gray-500 mt-1">
              Optional: Set a deadline for registrations
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Event Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Event Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {/* Public Event */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => updateFormData({ isPublic: checked })}
              />
              <Label htmlFor="isPublic">
                Make this event public
              </Label>
            </div>
            <p className="text-sm text-gray-500 ml-6">
              Public events can be discovered and joined by anyone
            </p>

            {/* Comments Enabled */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="commentsEnabled"
                checked={formData.commentsEnabled}
                onCheckedChange={(checked) => updateFormData({ commentsEnabled: checked })}
              />
              <Label htmlFor="commentsEnabled">
                Allow comments and discussions
              </Label>
            </div>
            <p className="text-sm text-gray-500 ml-6">
              Let participants comment and ask questions about the event
            </p>

            {/* Active Event */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => updateFormData({ isActive: checked })}
              />
              <Label htmlFor="isActive">
                Activate event immediately
              </Label>
            </div>
            <p className="text-sm text-gray-500 ml-6">
              Uncheck to create the event as inactive (can be activated later)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Help Text */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">Registration Tips:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Set realistic participant limits based on your venue capacity</li>
          <li>• Consider setting a registration deadline to help with planning</li>
          <li>• For online events, test your meeting link before the event</li>
          <li>• Free events typically get higher registration rates</li>
        </ul>
      </div>
    </div>
  )
}