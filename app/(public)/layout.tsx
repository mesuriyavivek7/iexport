import React from 'react'
import { Roboto_Condensed } from "next/font/google";

import Header from '@/components/website/header'
import Footer from '@/components/website/footer'

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto-condensed", // optional (recommended)
});


type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <main className={`h-full ${robotoCondensed.className}`}>
        <Header></Header>
        {children}
        <Footer></Footer>
    </main>
  )
}

export default Layout