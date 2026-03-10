import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <main className={inter.className}>
      {children}
    </main>
  )
}

export default Layout

