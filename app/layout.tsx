import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WelcomePopup } from '@/components/welcome-popup'
import { FallingParticles } from '@/components/falling-particles'
import './globals.css'

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit"
})

export const metadata: Metadata = {
  title: 'MineBit Store',
  description: 'แอดออนคุณภาพสมราคา ไม่ใช่เพียงสินค้าราคาตลาดนัดทั่วไป',
  metadataBase: new URL('https://madamcare.vercel.app'),
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'MineBit Store',
    description: 'แอดออนคุณภาพสมราคา ไม่ใช่เพียงสินค้าราคาตลาดนัดทั่วไป',
    images: [
      {
        url: '/og-image.png',
        width: 500,
        height: 500,
        alt: 'MineBit Store - แอดออนคุณภาพสมราคา',
      },
    ],
    type: 'website',
    siteName: 'MineBit Store',
  },
  twitter: {
    card: 'summary',
    title: 'MineBit Store',
    description: 'แอดออนคุณภาพสมราคา ไม่ใช่เพียงสินค้าราคาตลาดนัดทั่วไป',
    images: [
      {
        url: '/og-image.png',
        width: 500,
        height: 500,
        alt: 'MineBit Store - แอดออนคุณภาพสมราคา',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className="dark">
      <body className={`${kanit.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
              });
              document.addEventListener('copy', function(e) {
                e.preventDefault();
              });
              document.addEventListener('cut', function(e) {
                e.preventDefault();
              });
              document.addEventListener('dragstart', function(e) {
                e.preventDefault();
              });
            `,
          }}
        />
        <FallingParticles />
        {children}
        <WelcomePopup />
        <Analytics />
      </body>
    </html>
  )
}
