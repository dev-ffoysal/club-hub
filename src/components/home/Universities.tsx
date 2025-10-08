'use client'

import { useEffect, useRef } from 'react'
import { Badge } from '../ui/badge'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function UniversitiesSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const badgesRef = useRef<HTMLDivElement[]>([])

  const universities = [
    'University of Dhaka',
    'BUET',
    'CUET',
    'RUET',
    'KUET',
    'SUST',
    'Jahangirnagar University',
    'North South University',
    'BRAC University',
    'IUB',
    'AIUB',
    'East West University',
    'Rajshahi University',
    'Chittagong University',
    'Daffodil International University',
    'United International University'
  ]

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

      badgesRef.current.forEach((badge, index) => {
        gsap.from(badge, {
          scrollTrigger: {
            trigger: badge,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          delay: index * 0.05,
          ease: 'back.out(1.7)'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-muted/20 dark:bg-muted/10 container my-10">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Supporting Universities Across Bangladesh
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by clubs from leading universities nationwide, growing every day
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {universities.map((university, index) => (
            <div
              key={university}
              ref={el => { if (el) badgesRef.current[index] = el }}
            >
              <Badge 
                variant="outline" 
                className="justify-center p-4 text-sm w-full hover:bg-primary/5 hover:border-primary/50 transition-all cursor-default"
              >
                {university}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            And many more joining every week...
          </p>
        </div>
      </div>
    </section>
  )
}