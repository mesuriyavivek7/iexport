import React from 'react'
import Header from '@/components/website/header'
import Footer from '@/components/website/footer'
import { getContactUsForHome } from '@/lib/home-data'

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const contactData = await getContactUsForHome()

  return (
    <main className="h-full font-roboto-condensed">
      <Header />
      {children}
      <Footer data={contactData} />
    </main>
  )
}

export default Layout
