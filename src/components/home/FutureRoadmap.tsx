'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { GraduationCap, Briefcase, UserCircle, BookOpen, Award, Rocket } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FutureRoadmapSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const futureFeatures = [
    {
      icon: GraduationCap,
      title: 'Learning Platform',
      description: 'Access courses, workshops, and skill-building resources curated by clubs and industry experts',
      status: 'Coming Soon',
      color: 'blue'
    },
    {
      icon: Briefcase,
      title: 'Job Opportunities',
      description: 'Discover full-time and part-time positions tailored for students, with direct connections to employers',
      status: 'In Development',
      color: 'green'
    },
    {
      icon: UserCircle,
      title: 'Professional Profiles',
      description: 'Showcase your club activities, achievements, and projects in a portfolio ready for job interviews',
      status: 'Coming Soon',
      color: 'purple'
    },
    {
      icon: BookOpen,
      title: 'Resource Library',
      description: 'Share and access club materials, research papers, and collaborative documents in one place',
      status: 'Planned',
      color: 'orange'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Earn badges and certificates for your contributions, leadership, and participation in club activities',
      status: 'In Development',
      color: 'yellow'
    },
    {
      icon: Rocket,
      title: 'Startup Incubator',
      description: 'Connect with mentors, investors, and resources to turn your club projects into real ventures',
      status: 'Planned',
      color: 'red'
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

      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          delay: (index % 3) * 0.1,
          ease: 'power3.out'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/30 my-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-4">
            What's Next
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            The Future of Student Success
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building an ecosystem that goes beyond club management—a comprehensive platform 
            for your entire student journey and career growth
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {futureFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                ref={el => { if (el) cardsRef.current[index] = el }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-700/30 p-3`}>
                          <Icon className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        {feature.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className=" rounded-2xl p-8 sm:p-10 ">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Your Journey, Our Mission
            </h3>
            <p className="text-lg leading-relaxed opacity-95">
              From your first day on campus to landing your dream job, we're committed to being 
              your companion every step of the way. Together, we're building the future of student 
              success in Bangladesh.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}