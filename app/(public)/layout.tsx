import React from 'react'

import Header from '@/components/website/header'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <main className='h-full pt-20'>
        <Header></Header>
        {children}
    </main>
  )
}

export default Layout