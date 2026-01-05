import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='px-8 border bg-white flex justify-between items-center relative'>
       <aside>
          <Image 
           alt='Logo'
           height={80}
           width={180}
           src={'/assets/logo.png'}>
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