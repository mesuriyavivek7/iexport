import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='md:px-8 px-4 h-20 overflow-hidden z-50 border bg-white flex justify-between items-center fixed top-0 left-0 right-0'>
       <aside>
          <Image 
           alt='Logo'
           height={80}
           width={180}
           src={'/assets/logo.jpg'}>
          </Image>
       </aside>
       <nav className='hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
         <ul className='flex items-center justify-center gap-8'>
            <Link className='font-medium transition-all duration-300 text-foreground hover:text-[#921314]' href='/'>Home</Link>
            <Link className='font-medium transition-all duration-300 text-foreground hover:text-[#921314]' href='#'>Products</Link>
            <Link className='font-medium transition-all duration-300 text-foreground hover:text-[#921314]' href='#'>About</Link>
            <Link className='font-medium transition-all duration-300 text-foreground hover:text-[#921314]' href='#'>Contact Us</Link>
         </ul>
       </nav>
       <Button className='bg-[#921314] hover:bg-[#B91C1C] font-bold cursor-pointer' size={"lg"}>
         Get In Touch
       </Button>
    </div>
  )
}

export default Header