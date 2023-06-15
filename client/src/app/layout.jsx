'use client'

import NavBar from '@/components/NavBar/NavBar';
import './globals.css'
import { Inter } from 'next/font/google'

import React from 'react'
import Footer from '@/components/Footer/Footer';
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {

  const pathname = usePathname();

  const renderNavBar = () => {

    if(pathname.startsWith("/admin-dashboard"))
      return null;

    return <NavBar />;
  }

  const renderFooter = () => {
    if(pathname.startsWith("/admin-dashboard"))
      return null;

    return <Footer />;
  }

  return (
    <html lang="en">
      <body>
        {renderNavBar()}
        <main>
          {children}
        </main>
        {renderFooter()}
      </body>
    </html>
  )
}

