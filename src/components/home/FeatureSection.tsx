'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Users, Calendar, Palette, MessageCircle, DollarSign, BarChart3 } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const features = [
    {
      icon: Users,
      color: 'blue',
      title: 'Member Management',
      description: 'Generate unique joining codes, manage member activities, and track engagement with comprehensive analytics. Build a strong community foundation.'
    },
    {
      icon: Calendar,
      color: 'green',
      title: 'Event Organization',
      description: 'Create seminars, workshops, and competitions with countdown timers, registration management, and review collection. Make every event memorable.'
    },
    {
      icon: Palette,
      color: 'purple',
      title: 'Custom Club Profiles',
      description: 'Choose from beautiful templates, customize colors, and create shareable club pages that showcase your achievements and identity.'
    },
    {
      icon: MessageCircle,
      color: 'yellow',
      title: 'Communication Tools',
      description: 'Private group chats, push notifications, and email campaigns to keep your members engaged, informed, and connected.'
    },
    {
      icon: DollarSign,
      color: 'red',
      title: 'Financial Management',
      description: 'Track club finances, manage budgets, and maintain transparent financial records for your organization with ease.'
    },
    {
      icon: BarChart3,
      color: 'indigo',
      title: 'Analytics & Insights',
      description: 'Comprehensive analytics on member engagement, event participation, and club performance metrics to drive growth.'
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
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything Your Club Needs
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools to manage, grow, and engage your university club with ease and efficiency
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                ref={el => { if (el) cardsRef.current[index] = el }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-700/30 p-3`}>
                        <Icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
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