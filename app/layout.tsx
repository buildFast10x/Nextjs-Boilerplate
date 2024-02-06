import { Inter } from 'next/font/google'
import './globals.css'

import ThemeProviders from "@/lib/ThemeProviders";
import ReduxProvider from '@/redux/ReduxProvider';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"> 
      <body className={inter.className}>
        <ThemeProviders>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
