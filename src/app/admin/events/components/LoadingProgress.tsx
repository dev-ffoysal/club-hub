'use client'

import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '../../../../components/ui/card'

import { CheckCircle, Upload, Database, Send } from 'lucide-react'

interface LoadingProgressProps {
  progress: number
}

const getProgressStage = (progress: number) => {
  if (progress < 30) return { stage: 'Preparing', icon: Upload, message: 'Preparing event data...' }
  if (progress < 60) return { stage: 'Uploading', icon: Upload, message: 'Uploading images and media...' }
  if (progress < 90) return { stage: 'Saving', icon: Database, message: 'Saving event to database...' }
  if (progress < 100) return { stage: 'Finalizing', icon: Send, message: 'Finalizing event creation...' }
  return { stage: 'Complete', icon: CheckCircle, message: 'Event created successfully!' }
}

export function LoadingProgress({ progress }: LoadingProgressProps) {
  const { stage, icon: Icon, message } = getProgressStage(progress)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                progress === 100 ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <Icon className={`w-8 h-8 ${
                  progress === 100 ? 'text-green-600' : 'text-blue-600'
                } ${progress < 100 ? 'animate-pulse' : ''}`} />
              </div>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {progress === 100 ? 'Event Created!' : 'Creating Event...'}
              </h3>
              <p className="text-gray-600">{message}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{stage}</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className={`text-center p-2 rounded ${progress >= 30 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                <Upload className="w-4 h-4 mx-auto mb-1" />
                <span>Prepare</span>
              </div>
              <div className={`text-center p-2 rounded ${progress >= 60 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                <Upload className="w-4 h-4 mx-auto mb-1" />
                <span>Upload</span>
              </div>
              <div className={`text-center p-2 rounded ${progress >= 90 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                <Database className="w-4 h-4 mx-auto mb-1" />
                <span>Save</span>
              </div>
              <div className={`text-center p-2 rounded ${progress >= 100 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                <CheckCircle className="w-4 h-4 mx-auto mb-1" />
                <span>Complete</span>
              </div>
            </div>

            {/* Additional Info */}
            {progress < 100 && (
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <p>Please don't close this window while your event is being created.</p>
              </div>
            )}

            {progress === 100 && (
              <div className="text-xs text-green-600 bg-green-50 p-3 rounded">
                <p>Your event has been created successfully! Redirecting...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}