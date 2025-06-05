import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/app/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Tracker',
  description: 'Track your job applications',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
