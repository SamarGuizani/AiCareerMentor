import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'AI Career Mentor - Your Personal Career Guide',
  description: 'Discover your ideal career path with AI-powered guidance. Take our personalized quiz and get tailored career recommendations.',
  generator: 'app.careermentor.ai',
  icons: {
    icon: [
      {
        url: '/icon-dark-32x32.png',
        type: 'image/png',
      },
    ],
    apple: '/icon-dark-32x32.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
