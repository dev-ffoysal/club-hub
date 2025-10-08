'use client'

import { useState } from 'react'
import { Input } from '../../../../../components/ui/input'
import { Button } from '../../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Badge } from '../../../../../components/ui/badge'
import { Upload, X, Image as ImageIcon, Star } from 'lucide-react'
import { getImageUrl } from '../../../../../lib/utils/imageDisplay'

interface MediaStepProps {
  formData: any
  errors?: Record<string, string>
  updateFormData: (updates: any) => void
}

interface ImageFile {
  key: string
  file: File
  preview: string
  isCover?: boolean
}

export function MediaStep({ formData, errors, updateFormData }: MediaStepProps) {
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newFiles: File[] = []
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        newFiles.push(file)
      }
    })

    const updatedFiles = [...formData.imageFiles, ...newFiles]
    updateFormData({ 
      imageFiles: updatedFiles,
      coverImage: formData.coverImage ?? (updatedFiles.length > 0 ? 0 : undefined)
    })
  }

  const removeImage = (indexToRemove: number) => {
    const updatedFiles = formData.imageFiles.filter((_: File, index: number) => index !== indexToRemove)
    
    // If we removed the cover image, set the first remaining image as cover
    let newCoverImage = formData.coverImage
    if (formData.coverImage === indexToRemove) {
      newCoverImage = updatedFiles.length > 0 ? 0 : undefined
    } else if (formData.coverImage !== undefined && formData.coverImage > indexToRemove) {
      newCoverImage = formData.coverImage - 1
    }
    
    updateFormData({ 
      imageFiles: updatedFiles,
      coverImage: newCoverImage
    })
  }

  const removeExistingImage = (indexToRemove: number) => {
    const updatedImages = formData.images.filter((_: string, index: number) => index !== indexToRemove)
    updateFormData({ 
      images: updatedImages
    })
  }

  const setCoverImage = (index: number) => {
    updateFormData({ 
      coverImage: index
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Achievement Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Achievement Images
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop images here, or click to select files
            </p>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              id="image-upload"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                const input = document.getElementById('image-upload') as HTMLInputElement;
                if (input) {
                  input.click();
                }
              }}
              className="cursor-pointer"
            >
              Select Images
            </Button>
            <p className="text-sm text-gray-400 mt-2">
              Supported formats: JPG, PNG, GIF, WebP (Max 10MB each)
            </p>
          </div>
          {errors?.images && <p className="text-sm text-red-600 mt-2">{errors.images}</p>}
        </CardContent>
      </Card>

      {/* Existing Images */}
      {formData.images?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Existing Images ({formData.images?.length || 0})</CardTitle>
            <p className="text-sm text-gray-500">
              These are the current images for this achievement
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.images.map((imageUrl: string, index: number) => (
                <div
                  key={`existing-${index}`}
                  className="relative group rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-all"
                >
                  <div className="aspect-square">
                    <img
                      src={getImageUrl(imageUrl)}
                      alt={`Existing image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Remove Button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeExistingImage(index)
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs truncate">
                      Existing Image {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Preview Grid */}
      {formData.imageFiles?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Images ({formData.imageFiles?.length || 0})</CardTitle>
            <p className="text-sm text-gray-500">
              Click on an image to set it as the cover photo
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.imageFiles.map((file: File, index: number) => (
                <div
                  key={`${file.name}-${index}`}
                  className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    formData.coverImage === index 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCoverImage(index)}
                >
                  <div className="aspect-square">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${file.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Cover Badge */}
                  {formData.coverImage === index && (
                    <Badge className="absolute top-2 left-2 bg-blue-500">
                      <Star className="w-3 h-3 mr-1" />
                      Cover
                    </Badge>
                  )}
                  
                  {/* Remove Button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage(index)
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-300">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Guidelines */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-medium text-yellow-900 mb-2">Image Guidelines:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• <strong>Cover Image:</strong> The first uploaded image will be set as cover by default</li>
          <li>• <strong>Recommended Size:</strong> 1200x630px for best display quality</li>
          <li>• <strong>File Size:</strong> Keep images under 10MB for faster loading</li>
          <li>• <strong>Format:</strong> JPG, PNG, GIF, or WebP formats are supported</li>
          <li>• <strong>Content:</strong> Include certificates, photos, or relevant achievement documentation</li>
          <li>• <strong>Quality:</strong> Use high-resolution images to showcase the achievement properly</li>
        </ul>
      </div>

      {/* Achievement Image Tips */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">Achievement Photo Tips:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Include photos of certificates, trophies, or awards</li>
          <li>• Add team photos or event moments</li>
          <li>• Show the achievement in context (competition venue, ceremony, etc.)</li>
          <li>• Include before/after comparisons if applicable</li>
          <li>• Ensure all images are relevant to the achievement</li>
        </ul>
      </div>

      {/* Technical Info */}
      {formData.imageFiles?.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Technical Details:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Images are stored with unique keys for server-side processing</p>
            <p>• Key format: image_timestamp_index (e.g., image_1703123456789_0)</p>
            <p>• Cover image is marked separately for quick access</p>
            <div className="mt-2 p-2 bg-white rounded border">
              <p className="font-medium">Current Image Keys:</p>
              <ul className="mt-1 space-y-1">
                {formData.imageFiles.map((file: File, index: number) => (
                  <li key={`${file.name}-${index}`} className="text-xs font-mono">
                    {file.name} {formData.coverImage === index && '(cover)'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}