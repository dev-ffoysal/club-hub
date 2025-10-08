'use client'

import { useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CTASection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="container rounded-md bg-slate-50 dark:bg-slate-900/50 my-10">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 sm:py-24">
        <div ref={contentRef} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-5xl">
            Ready to Transform Your Club?
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of clubs already using our platform to engage students, organize 
            amazing events, and create lasting impacts. Start your journey today and be part 
            of the revolution in student life.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="group w-full sm:w-auto shadow-md hover:shadow-lg transition-all bg-blue-600 text-white hover:bg-blue-600 border-0"
            >
              <Link href="/apply" className="flex items-center gap-2">
                Start Your Application
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto text-slate-600 dark:text-slate-300 border-blue-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent"
            >
              <Link href="/demo" className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Free to Start</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Instant Setup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}