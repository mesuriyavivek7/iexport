import React from 'react'
import { Mail } from 'lucide-react';

type Props = {}

const Contact = (props: Props) => {
  return (
    <div className='py-20 relative'>
        <div className='w-4/5 flex relative h-52 '>
            <div className='w-2/5 bg-linear-to-r from-[#5e1e26] to-[#7e181a]'></div>
            <div className='w-3/5  rounded-r-2xl bg-linear-to-r from-[#0d2d47] to-[#0b4a6f]'></div>

             <div className='absolute -translate-y-1/2 top-1/2 flex flex-col gap-4 left-12 px-8'>
                <h1 className='text-4xl text-white font-bold'>Ready to Expand Your Global Reach?</h1>
                <p className='text-white text-[17px] leading-7'>Partner with Impex for seamless import-export solutions. <br />
                Contact us today to streamline your global trade operations!</p>
             </div>

             <div className='absolute top-1/2 shadow-lg -translate-y-1/2 -right-16 p-4 px-6 bg-white border rounded-2xl flex items-center gap-4'>
                <Mail className='text-[#B91C1C]' size={26}></Mail>
                <div className='flex flex-col'>
                    <h2 className='text-lg font-bold'>Get Started Now</h2>
                    <span className='text-[#9b9b9b]'>Discover our services!</span>
                </div>
             </div>

        </div>
    </div>
  )
}

export default Contact