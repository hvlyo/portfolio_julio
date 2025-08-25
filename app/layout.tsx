import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Julio Velasquez - Portfolio',
  description: 'Personal portfolio showcasing case studies, creative projects, and professional experience.',
  keywords: ['portfolio', 'design', 'development', 'creative', 'case studies'],
  authors: [{ name: 'Julio Velasquez' }],
  creator: 'Julio Velasquez',
  icons: {
    icon: '/favi.png',
    shortcut: '/favi.png',
    apple: '/favi.png',
  },
  openGraph: {
    title: 'Julio Velasquez - Portfolio',
    description: 'Personal portfolio showcasing case studies, creative projects, and professional experience.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julio Velasquez - Portfolio',
    description: 'Personal portfolio showcasing case studies, creative projects, and professional experience.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
