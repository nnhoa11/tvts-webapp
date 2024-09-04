import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import './globals.css'
import recources from '@/recources'
import Header from '@/components/header'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TVTS 2024',
  description: 'Ngày hội tư vấn tuyển sinh 2024',
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
