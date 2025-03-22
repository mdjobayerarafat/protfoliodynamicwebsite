import type { Metadata } from 'next'
import './globals.css'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

const title = 'Jobayer Arafat | Full-Stack Web Developer in Bangladesh'

const description =
  "At Backbenchers IT House, my focus is on bridging the gap between development and operations, ensuring smooth, scalable software delivery. Leveraging my Bachelor's in Computer Science, I specialize in Django REST Framework, application development, and system administration, contributing to robust and efficient systems.\n" +
  "\n" +
  "My journey through the National Institute of Textile Engineering and Research instilled a deep knowledge of computer science, which, combined with certifications in YouTube marketing, SEO, and mobile app development, empowers our team to develop innovative solutions that resonate with our users and uphold rigorous cybersecurity standards."

const url = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  title,
  description,
  category: 'technology',
  metadataBase: new URL('https://mdjobayerarafat.live/'),
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Jobayer Arafat Portfolio',
    type: 'website',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@Basit_Miyanji',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.className}`}>
        <header>
          <Navbar />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  )
}
