'use client'

import { useState } from 'react'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Button } from '../../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Badge } from '../../../../../components/ui/badge'
import { Upload, X, Image as ImageIcon, Star } from 'lucide-react'

interface MediaStepProps {
  formData: any
  errors: Record<string, string>
  updateFormData: (updates: any) => void
}

interface ImageFile {
  key: string
  file: File
  preview: string
  isCover?: boolean
}

export function MediaStep({ formData, errors, updateFormData }: MediaStepProps) {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>(formData.imageFiles || [])
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newImages: ImageFile[] = []
    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const key = `image_${Date.now()}_${index}`
        const preview = URL.createObjectURL(file)
        newImages.push({
          key,
          file,
          preview,
          isCover: imageFiles.length === 0 && index === 0 // First image as cover if no images exist
        })
      }
    })

    const updatedImages = [...imageFiles, ...newImages]
    setImageFiles(updatedImages)
    updateFormData({ 
      imageFiles: updatedImages,
      images: updatedImages.map(img => img.key),
      cover: updatedImages.find(img => img.isCover)?.key || updatedImages[0]?.key
    })
  }

  const removeImage = (keyToRemove: string) => {
    const updatedImages = imageFiles.filter(img => img.key !== keyToRemove)
    
    // If we removed the cover image, set the first remaining image as cover
    if (imageFiles.find(img => img.key === keyToRemove)?.isCover && updatedImages.length > 0) {
      updatedImages[0].isCover = true
    }
    
    setImageFiles(updatedImages)
    updateFormData({ 
      imageFiles: updatedImages,
      images: updatedImages.map(img => img.key),
      cover: updatedImages.find(img => img.isCover)?.key || updatedImages[0]?.key
    })
  }

  const setCoverImage = (key: string) => {
    const updatedImages = imageFiles.map(img => ({
      ...img,
      isCover: img.key === key
    }))
    
    setImageFiles(updatedImages)
    updateFormData({ 
      imageFiles: updatedImages,
      cover: key
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
            Event Images
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
              Upload Event Images
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
              ref={(input) => {
                if (input) {
                  (window as any).imageUploadInput = input;
                }
              }}
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
          {errors.images && <p className="text-sm text-red-600 mt-2">{errors.images}</p>}
        </CardContent>
      </Card>

      {/* Image Preview Grid */}
      {imageFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Images ({imageFiles.length})</CardTitle>
            <p className="text-sm text-gray-500">
              Click on an image to set it as the cover photo
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageFiles.map((image) => (
                <div
                  key={image.key}
                  className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    image.isCover 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCoverImage(image.key)}
                >
                  <div className="aspect-square">
                    <img
                      src={image.preview}
                      alt={`Preview ${image.key}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Cover Badge */}
                  {image.isCover && (
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
                      removeImage(image.key)
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs truncate">
                      {image.file.name}
                    </p>
                    <p className="text-xs text-gray-300">
                      {(image.file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Guidelines */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Image Guidelines:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Cover Image:</strong> The first uploaded image will be set as cover by default</li>
          <li>• <strong>Recommended Size:</strong> 1200x630px for best display quality</li>
          <li>• <strong>File Size:</strong> Keep images under 10MB for faster loading</li>
          <li>• <strong>Format:</strong> JPG, PNG, GIF, or WebP formats are supported</li>
          <li>• <strong>Multiple Images:</strong> Upload multiple images to create a gallery</li>
        </ul>
      </div>

      {/* Technical Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Technical Details:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Images are stored with unique keys for server-side processing</p>
          <p>• Key format: image_timestamp_index (e.g., image_1703123456789_0)</p>
          <p>• Cover image key is stored separately for quick access</p>
          {imageFiles.length > 0 && (
            <div className="mt-2 p-2 bg-white rounded border">
              <p className="font-medium">Current Image Keys:</p>
              <ul className="mt-1 space-y-1">
                {imageFiles.map((img) => (
                  <li key={img.key} className="text-xs font-mono">
                    {img.key} {img.isCover && '(cover)'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}