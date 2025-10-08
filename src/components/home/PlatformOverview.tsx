'use client'

import h from '../../../public/assets/ss.png'

import { useEffect, useRef, useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, Maximize2, X, MonitorSmartphone, Calendar, Users, BarChart, Video } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Screenshot {
  id: string
  title: string
  description: string
  category: 'dashboard' | 'events' | 'mobile' | 'analytics' | 'webrtc'
  imageUrl: string | any
  testimonial?: {
    text: string
    author: string
    role: string
    university: string
  }
}

export default function PlatformPreviewSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<Screenshot | null>(null)

  const screenshots: Screenshot[] = [
    // Dashboard category - 3 reviews
    {
      id: '1',
      title: 'Intuitive Dashboard',
      description: 'Manage everything from a clean, organized dashboard designed for simplicity',
      category: 'dashboard',
      imageUrl: h,
      testimonial: {
        text: 'The dashboard makes managing our 200+ members so much easier!',
        author: 'Nafisa Rahman',
        role: 'President',
        university: 'BUET Robotics Club'
      }
    },
    {
      id: '2',
      title: 'Real-time Analytics Dashboard',
      description: 'Monitor club performance with live data and comprehensive insights',
      category: 'dashboard',
      imageUrl: h,
      testimonial: {
        text: 'Real-time insights helped us boost member engagement by 40%!',
        author: 'Karim Hassan',
        role: 'Vice President',
        university: 'DU Computer Club'
      }
    },
    {
      id: '3',
      title: 'Member Management Hub',
      description: 'Streamlined member onboarding and activity tracking in one place',
      category: 'dashboard',
      imageUrl: h,
      testimonial: {
        text: 'Onboarding new members has never been this smooth and organized!',
        author: 'Fatima Ahmed',
        role: 'Secretary',
        university: 'BUET Programming Society'
      }
    },
    // Events category - 3 reviews
    {
      id: '4',
      title: 'Event Management',
      description: 'Create and manage events with registration, attendance tracking, and feedback',
      category: 'events',
      imageUrl: h,
      testimonial: {
        text: 'We organized 15 events last semester without any hassle!',
        author: 'Rahim Ahmed',
        role: 'Event Coordinator',
        university: 'DU Debate Club'
      }
    },
    {
      id: '5',
      title: 'Smart Event Planning',
      description: 'AI-powered scheduling and resource allocation for seamless event execution',
      category: 'events',
      imageUrl: h,
      testimonial: {
        text: 'Smart scheduling eliminated all our venue conflicts and doubled our event capacity!',
        author: 'Rashida Khan',
        role: 'Event Manager',
        university: 'NSU Cultural Society'
      }
    },
    {
      id: '6',
      title: 'Event Analytics & Feedback',
      description: 'Comprehensive post-event analysis and automated feedback collection',
      category: 'events',
      imageUrl: h,
      testimonial: {
        text: 'Detailed analytics help us improve every event and increase satisfaction rates!',
        author: 'Mahmud Rahman',
        role: 'Program Director',
        university: 'BRACU Business Club'
      }
    },
    // Mobile category - 2 reviews
    {
      id: '7',
      title: 'Mobile Experience',
      description: 'Full-featured mobile app for members on the go',
      category: 'mobile',
      imageUrl: h,
      testimonial: {
        text: 'Students love how easy it is to join events from their phones!',
        author: 'Tahsin Haque',
        role: 'VP Operations',
        university: 'NSU Tech Society'
      }
    },
    {
      id: '8',
      title: 'Mobile-First Design',
      description: 'Optimized mobile interface with offline capabilities and push notifications',
      category: 'mobile',
      imageUrl: h,
      testimonial: {
        text: 'The mobile app keeps our members connected even during internet outages!',
        author: 'Samira Begum',
        role: 'Communications Lead',
        university: 'IUT Innovation Hub'
      }
    },
    // Analytics category - 2 reviews
    {
      id: '9',
      title: 'Analytics & Insights',
      description: 'Track engagement, growth, and performance with comprehensive analytics',
      category: 'analytics',
      imageUrl: h,
      testimonial: {
        text: 'Data-driven decisions helped us increase participation by 60%!',
        author: 'Sadia Islam',
        role: 'General Secretary',
        university: 'BRACU Photography Club'
      }
    },
    {
      id: '10',
      title: 'Advanced Reporting',
      description: 'Generate detailed reports for university administration and stakeholders',
      category: 'analytics',
      imageUrl: h,
      testimonial: {
        text: 'Professional reports impressed our university board and secured additional funding!',
        author: 'Tanvir Hasan',
        role: 'Treasurer',
        university: 'CUET Engineering Society'
      }
    },
    // WebRTC category - 2 reviews
    {
      id: '11',
      title: 'Built-in Video Calling',
      description: 'Host virtual meetings and online events with integrated WebRTC technology',
      category: 'webrtc',
      imageUrl: h,
      testimonial: {
        text: 'Virtual workshops reached students from 12 different universities simultaneously!',
        author: 'Nusrat Jahan',
        role: 'Digital Coordinator',
        university: 'JU Science Club'
      }
    },
    {
      id: '12',
      title: 'Interactive Online Events',
      description: 'Screen sharing, breakout rooms, and real-time collaboration tools',
      category: 'webrtc',
      imageUrl: h,
      testimonial: {
        text: 'Breakout rooms made our online hackathon feel just like an in-person event!',
        author: 'Arif Rahman',
        role: 'Tech Lead',
        university: 'SUST Developers Community'
      }
    }
  ]

  const categories = [
    { id: 'all', label: 'All Features', icon: MonitorSmartphone },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'mobile', label: 'Mobile', icon: MonitorSmartphone },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'webrtc', label: 'Video Calling', icon: Video }
  ]

  const filteredScreenshots = selectedCategory === 'all' 
    ? screenshots 
    : screenshots.filter(s => s.category === selectedCategory)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredScreenshots.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredScreenshots.length) % filteredScreenshots.length)
  }

  const openLightbox = (screenshot: Screenshot) => {
    setLightboxImage(screenshot)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setTimeout(() => setLightboxImage(null), 300)
  }

  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedCategory])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex, filteredScreenshots.length])

  const currentScreenshot = filteredScreenshots[currentIndex]

  return (
    <>
      <section ref={sectionRef} className="py-20 sm:py-28 bg-blue-50 dark:bg-blue-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={titleRef} className="text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">
              See It In Action
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Platform Preview
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our intuitive interface makes club management effortless
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="transition-all duration-300"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              )
            })}
          </div>

          {/* Carousel */}
          <div ref={carouselRef} className="mt-12 relative">
            <Card className="overflow-hidden border-2 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
                {/* Image Side */}
                <div className="relative bg-slate-100 dark:bg-slate-900 p-8 flex items-center justify-center min-h-[500px]">
                  {/* Placeholder for screenshot - Replace with actual images */}
                  <div className="relative w-full h-full bg-white dark:bg-slate-950 rounded-lg shadow-xl border border-border overflow-hidden group min-h-[400px] flex items-center justify-center">
                    <Image src={currentScreenshot?.imageUrl} alt={currentScreenshot?.title} className='object-cover w-full h-full' width={4000} height={3000} />
                    
                    {/* Lightbox trigger */}
                    <button
                      onClick={() => openLightbox(currentScreenshot)}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg transition-all hover:scale-110"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg transition-all hover:scale-110"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center min-h-[500px]">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {currentScreenshot?.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {currentScreenshot?.description}
                  </p>

                  {/* Testimonial */}
                  {currentScreenshot?.testimonial && (
                    <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
                      <p className="text-foreground italic mb-4">
                        "{currentScreenshot.testimonial.text}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          {currentScreenshot.testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            {currentScreenshot.testimonial.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {currentScreenshot.testimonial.role}, {currentScreenshot.testimonial.university}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dots Indicator */}
                  <div className="flex gap-2 mt-8">
                    {filteredScreenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? 'w-8 bg-primary' 
                            : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white dark:bg-slate-950 rounded-lg shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-xl font-bold">{lightboxImage?.title}</h3>
                <p className="text-sm text-muted-foreground">{lightboxImage?.description}</p>
              </div>
              <div className="p-8 bg-slate-100 dark:bg-slate-900 min-h-[500px] flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-slate-950 rounded-lg shadow-xl border border-border flex items-center justify-center">
                  <Image
                    src={lightboxImage?.imageUrl}
                    alt={lightboxImage?.title||'Full-size screenshot'}
                    height={5000}
                    width={8000}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}