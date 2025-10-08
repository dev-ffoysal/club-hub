'use client'

import { useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { gsap } from 'gsap'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const sparkleRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      })

      gsap.from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      })

      gsap.from(buttonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: 'power3.out'
      })

      // Floating sparkles animation
      sparkleRefs.current.forEach((sparkle, index) => {
        gsap.to(sparkle, {
          y: -20,
          rotation: 360,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.5
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating sparkles */}
      <div 
        ref={el => { if (el) sparkleRefs.current[0] = el }}
        className="absolute top-20 left-10 text-blue-400 opacity-30"
      >
        <Sparkles className="w-8 h-8" />
      </div>
      <div 
        ref={el => { if (el) sparkleRefs.current[1] = el }}
        className="absolute top-40 right-20 text-emerald-400 opacity-30"
      >
        <Sparkles className="w-6 h-6" />
      </div>
      <div 
        ref={el => { if (el) sparkleRefs.current[2] = el }}
        className="absolute bottom-32 left-1/4 text-blue-400 opacity-30"
      >
        <Sparkles className="w-10 h-10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 sm:py-32">
        <div className="text-center">
          <div ref={titleRef}>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Club Management Hub
            </h1>
          </div>
          
          <div ref={subtitleRef}>
            <span className="block mt-4 text-3xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
              for Universities in Bangladesh
            </span>
          </div>

          <div ref={descriptionRef}>
            <p className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-muted-foreground">
              Empower your university clubs with our comprehensive management platform. 
              Connect students, organize events, and build vibrant campus communities. 
              Create lasting digital footprints that showcase your journey.
            </p>
          </div>

          <div ref={buttonsRef} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group w-full sm:w-auto">
              <Link href="/apply" className="flex items-center gap-2">
                Apply for Your Club
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20">
              <Link href="/clubs">Explore Clubs</Link>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Active Clubs' },
              { number: '50K+', label: 'Students' },
              { number: '1000+', label: 'Events' },
              { number: '40+', label: 'Universities' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-border/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}