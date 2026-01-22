import React from 'react'

import Header from '@/components/website/header'
import Footer from '@/components/website/footer'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <main className='h-full'>
        <Header></Header>
        {children}
        <Footer></Footer>
    </main>
  )
}

export default Layout