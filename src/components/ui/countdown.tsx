'use client'

import { useState, useEffect } from 'react'
import { getDetailedCountdown } from '@/lib/utils'

interface CountdownProps {
  targetDate: Date | string
  className?: string
}

export function Countdown({ targetDate, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(getDetailedCountdown(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getDetailedCountdown(targetDate)
      setTimeLeft(newTimeLeft)
      
      if (newTimeLeft.isExpired) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (timeLeft.isExpired) {
    return (
      <div className={`text-red-600 font-semibold ${className}`}>
        Event has started
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
        ⏰ COUNTDOWN
      </div> */}
      <div className="flex space-x-1 text-sm font-mono">
        {timeLeft.days > 0 && (
          <span className="bg-gray-800 text-white px-2 py-1 rounded">
            {timeLeft.days}d
          </span>
        )}
        <span className="bg-gray-800 text-white px-2 py-1 rounded">
          {timeLeft.hours.toString().padStart(2, '0')}h
        </span>
        <span className="bg-gray-800 text-white px-2 py-1 rounded">
          {timeLeft.minutes.toString().padStart(2, '0')}m
        </span>
        <span className="bg-gray-800 text-white px-2 py-1 rounded">
          {timeLeft.seconds.toString().padStart(2, '0')}s
        </span>
      </div>
    </div>
  )
}