import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Users, Calendar, Palette, MessageCircle, DollarSign, BarChart3 } from 'lucide-react'
import { Navbar } from '../components/layout/navbar'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeatureSection'
import VisionSection from '@/components/home/VisionSection'
import UniversitiesSection from '@/components/home/Universities'
import FutureRoadmapSection from '@/components/home/FutureRoadmap'
import CTASection from '@/components/home/CTA'
import PlatformOverview from '@/components/home/PlatformOverview'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
       <HeroSection />
      <PlatformOverview />
      <FeaturesSection />
      <VisionSection />
      <UniversitiesSection />
      <FutureRoadmapSection />
      <CTASection />


    </div>
  )
}