import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '../lib/utils'
import { ReduxProvider } from '../store/provider'
import { ThemeProvider } from '../components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Club Management Hub - Universities in Bangladesh',
  description: 'A comprehensive platform for managing university clubs, events, and student activities in Bangladesh',
  keywords: ['university', 'clubs', 'events', 'students', 'Bangladesh', 'management'],
  authors: [{ name: 'Club Management Hub Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">
                {children}
              </div>
            </div>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}