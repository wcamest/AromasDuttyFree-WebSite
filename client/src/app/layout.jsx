import NavBar from '@/components/NavBar/NavBar';
import './globals.css'
import { Inter } from 'next/font/google'

import React from 'react'
import Footer from '@/components/Footer/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

