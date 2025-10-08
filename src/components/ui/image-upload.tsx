'use client'

import { useState, useRef } from 'react'
import { Button } from './button'
import { Input } from './input'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value?: (string | File) | (string | File)[]
  onChange: (value: (string | File) | (string | File)[]) => void
  multiple?: boolean
  accept?: string
  maxSize?: number // in MB
  className?: string
  placeholder?: string
  disabled?: boolean
}

export function ImageUpload({
  value,
  onChange,
  multiple = false,
  accept = 'image/*',
  maxSize = 5,
  className,
  placeholder = 'Upload image',
  disabled = false
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not a valid image file`)
        return false
      }
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is ${maxSize}MB`)
        return false
      }
      
      return true
    })

    if (validFiles.length === 0) return

    if (multiple) {
      const currentValue = Array.isArray(value) ? value : []
      onChange([...currentValue, ...validFiles])
    } else {
      onChange(validFiles[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleRemove = (index?: number) => {
    if (multiple && Array.isArray(value) && typeof index === 'number') {
      const newValue = value.filter((_, i) => i !== index)
      onChange(newValue)
    } else {
      onChange(multiple ? [] : '')
    }
  }

  const getPreviewUrl = (item: string | File): string => {
    if (typeof item === 'string') {
      return item
    }
    return URL.createObjectURL(item)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const currentValue = multiple ? (Array.isArray(value) ? value : []) : value
  const hasValue = multiple ? (currentValue as (string | File)[]).length > 0 : !!currentValue

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
          disabled && 'opacity-50 cursor-not-allowed',
          hasValue && 'border-primary/50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!disabled ? triggerFileInput : undefined}
      >
        <div className="flex flex-col items-center space-y-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{placeholder}</span>
            <p className="text-xs mt-1">
              Drag and drop or click to browse
              <br />
              Max size: {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled}
      />

      {/* Preview Area */}
      {hasValue && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Preview:</h4>
          <div className={cn(
            'grid gap-4',
            multiple ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'
          )}>
            {multiple ? (
              (currentValue as (string | File)[]).map((item, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={getPreviewUrl(item)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove(index)
                    }}
                    disabled={disabled}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="relative group max-w-xs">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={getPreviewUrl(currentValue as string | File)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove()
                  }}
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Specialized components for specific use cases
export function ProfileImageUpload({
  value,
  onChange,
  disabled = false,
  className
}: {
  value?: string | File
  onChange: (value: string | File) => void
  disabled?: boolean
  className?: string
}) {
  return (
    <ImageUpload
      value={value}
      onChange={onChange as (value: (string | File) | (string | File)[]) => void}
      multiple={false}
      placeholder="Upload profile picture"
      maxSize={2}
      disabled={disabled}
      className={className}
    />
  )
}

export function CoverImageUpload({
  value,
  onChange,
  disabled = false,
  className
}: {
  value?: (string | File)[]
  onChange: (value: (string | File)[]) => void
  disabled?: boolean
  className?: string
}) {
  return (
    <ImageUpload
      value={value}
      onChange={onChange as (value: (string | File) | (string | File)[]) => void}
      multiple={true}
      placeholder="Upload cover photos"
      maxSize={5}
      disabled={disabled}
      className={className}
    />
  )
}