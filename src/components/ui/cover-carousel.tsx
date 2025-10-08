'use client'

import { useState, useEffect } from 'react'
import { Button } from './button'
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CoverCarouselProps {
  images: (string | File)[]
  onEdit?: () => void
  isEditing?: boolean
  className?: string
  height?: string
}

export function CoverCarousel({
  images,
  onEdit,
  isEditing = false,
  className,
  height = "h-48 md:h-64"
}: CoverCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const getImageUrl = (image: string | File): string => {
    if (typeof image === 'string') {
      return image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`
    } else if (image instanceof File) {
      return URL.createObjectURL(image)
    }
    return ''
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      nextImage()
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length, currentIndex])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  if (!images || images.length === 0) {
    return (
      <div className={cn(
        "relative w-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center",
        height,
        className
      )}>
        <div className="text-center text-white">
          <h3 className="text-xl font-semibold mb-2">No Cover Images</h3>
          <p className="text-sm opacity-90">Add cover images to showcase your club</p>
          {isEditing && onEdit && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onEdit}
              className="mt-4"
            >
              <Edit className="h-4 w-4 mr-2" />
              Add Cover Images
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden rounded-lg group",
        height,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Image Display */}
      <div className="relative w-full h-full">
        <img
          src={getImageUrl(images[currentIndex])}
          alt={`Cover ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Edit Button Overlay */}
        {isEditing && onEdit && (
          <div className="absolute top-4 right-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={onEdit}
              className="bg-white/90 hover:bg-white text-black"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Covers
            </Button>
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={prevImage}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={nextImage}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              )}
              onClick={() => goToImage(index)}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

// Simplified version for smaller displays
export function CoverCarouselCompact({
  images,
  onEdit,
  isEditing = false,
  className
}: Omit<CoverCarouselProps, 'height'>) {
  return (
    <CoverCarousel
      images={images}
      onEdit={onEdit}
      isEditing={isEditing}
      className={className}
      height="h-32 md:h-40"
    />
  )
}