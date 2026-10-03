import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JAL — Water Conservation & Water Bodies Revival | UCET Hazaribag',
  description:
    'JAL (जल) — A 4-Week Environmental Leadership Program by Team JAL at University College of Engineering and Technology (UCET), Hazaribag. Water conservation, water-body revival, and engineering for a sustainable future.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#041B2D',
  userScalable: false,
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark font-sans">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
