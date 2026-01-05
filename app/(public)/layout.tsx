import React from 'react'

import Header from '@/components/website/header'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <main className='h-full'>
        <Header></Header>
        {children}
    </main>
  )
}

export default Layout