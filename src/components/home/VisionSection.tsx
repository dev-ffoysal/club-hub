'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent } from '../ui/card'
import { Target, Heart, Lightbulb, Globe, TrendingUp, Users2 } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function VisionSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const pillarsRef = useRef<HTMLDivElement[]>([])

  const visionPillars = [
    {
      icon: Globe,
      title: 'Bridging the Gap',
      description: 'Connecting students from urban and rural areas, making club culture accessible to everyone across Bangladesh'
    },
    {
      icon: TrendingUp,
      title: 'Raising Standards',
      description: 'Creating healthy competition that motivates clubs to innovate, improve, and set new benchmarks of excellence'
    },
    {
      icon: Lightbulb,
      title: 'Digital Footprints',
      description: 'Helping students document their journey, achievements, and contributions for future career opportunities'
    },
    {
      icon: Users2,
      title: 'Building Communities',
      description: 'Fostering meaningful connections and collaborative spaces where students learn, grow, and inspire together'
    },
    {
      icon: Heart,
      title: 'Inspiring Others',
      description: 'Enabling students to share their stories and work, motivating peers and future generations to dream bigger'
    },
    {
      icon: Target,
      title: 'Beyond Clubbing',
      description: 'Creating an ecosystem for holistic student development through learning, networking, and opportunity discovery'
    }
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

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })

      pillarsRef.current.forEach((pillar, index) => {
        gsap.from(pillar, {
          scrollTrigger: {
            trigger: pillar,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">
            Our Mission
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Vision for Bangladesh
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming student life across the nation through innovation and inclusivity
          </p>
        </div>

        <div ref={contentRef} className="mt-12 w-full mx-auto">
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 sm:p-12  border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
                  Streamlining Club Culture, Empowering Every Student
                </h3>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    We envision a Bangladesh where every student, regardless of their location or background, 
                    has equal access to vibrant club experiences.
                  </p>
                  <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    Our platform is more than just a management tool—it's a movement to democratize 
                    opportunities, inspire innovation, and create a generation of leaders who leave 
                    lasting impacts on their communities.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    <div className="w-1 h-1 bg-blue-200 rounded-full"></div>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 font-medium italic">
                    "From rural villages to bustling cities, we're building bridges that connect 
                    dreams to reality, passion to purpose, and students to unlimited possibilities."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visionPillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                ref={el => { if (el) pillarsRef.current[index] = el }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800/50">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-4 mb-4 border border-blue-200 dark:border-blue-800/30">
                        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">{pillar.title}</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}