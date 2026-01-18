import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Mail, Phone, MapPin } from 'lucide-react';

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='bg-[#041d2d] px-8 py-16'>
        <section className='mx-auto max-w-6xl grid grid-cols-4 items-start gap-16'>
            <div className='flex flex-col gap-4'>
               <Image
               alt='logo'
               height={90}
               width={200}
               src={'/assets/whlogo.png'}
               ></Image>
               <p className='text-[#adb6c0] leading-8 text-[17px] tracking-wide'>
               We are a trusted supplier and trader, delivering premium-
               quality products globally with a commitment to freshness,
               reliability, and customer satisfaction
               </p>
            </div>

            <div>
                <h1 className='text-lg relative inline-block text-white tracking-widest'>
                    OUR EXPERTISE
                    <hr className='h-1 border-none mt-4 w-full bg-[#2c3d4f]'/>
                </h1>
                <div className='flex mt-4 flex-col gap-2'>
                    <span className='text-[#adb6c0]'>Fruits & Vegetables</span>
                    <span className='text-[#adb6c0]'>Spices</span>
                    <span className='text-[#adb6c0]'>Coffee</span>
                    <span className='text-[#adb6c0]'>Rice</span>
                    <span className='text-[#adb6c0]'>Multi Products</span>
                </div>                
            </div>

            <div>
                 <h1 className='text-lg relative inline-block text-white tracking-widest'>
                    USEFUL LINKS
                    <hr className='h-1 border-none mt-4 w-full bg-[#2c3d4f]'/>
                </h1>
                <div className='flex mt-4 flex-col gap-2'>
                    <Link className='text-[#adb6c0]' href={'#'}>Home</Link>
                    <Link className='text-[#adb6c0]' href={'#'}>Products</Link>
                    <Link className='text-[#adb6c0]' href={'#'}>About</Link>
                    <Link className='text-[#adb6c0]' href={'#'}>Contact</Link>
                </div>
            </div>

            <div>
                <h1 className='text-lg relative inline-block text-white tracking-widest'>
                    CONTACT INFO
                    <hr className='h-1 border-none mt-4 w-full bg-[#2c3d4f]'/>
                </h1>
                <div className='flex mt-4 flex-col gap-6'>
                    <div className='flex items-center gap-2'>
                        <span className='p-1 bg-white rounded-md'>
                            <Phone size={22} className='text-[#041d2d]'></Phone>
                        </span>
                        <div className='flex flex-col'>
                            <span className='text-white'>Patel Jainish</span>
                            <span className='text-[#adb6c0] text-sm'>+91 6355007570</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='p-1 bg-white rounded-md'>
                            <Phone size={22} className='text-[#041d2d]'></Phone>
                        </span>
                        <div className='flex flex-col'>
                            <span className='text-white'>Patel Yagnik</span>
                            <span className='text-[#adb6c0] text-sm'>+91 9925867065</span>
                        </div>
                    </div>
                    <div className='flex items-start gap-2'>
                        <span className='p-1 bg-white rounded-md'>
                            <Mail size={22} className='text-[#041d2d]'></Mail>
                        </span>
                        <span className='text-[#adb6c0]'>procureexport24@gmail.com</span>
                    </div>
                    <div className='flex items-start gap-2'>
                        <span className='p-1 bg-white rounded-md'>
                            <MapPin size={22} className='text-[#041d2d]'></MapPin>
                        </span>
                        <span className='text-[#adb6c0]'>584, Patel Vas, First Line, Ralisana, Visnagar, Mahesana</span>
                    </div>
                </div>
            </div>

        </section>
    </div>
  )
}

export default Footer