import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'michmos',
  description: 'Personal website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-12">{children}</main>
      </body>
    </html>
  )
}
