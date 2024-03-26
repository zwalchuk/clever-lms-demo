import type { Metadata } from 'next'
import { inter } from '@/app/ui/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vega',
  description: 'Clever LMS Connect Demo App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
