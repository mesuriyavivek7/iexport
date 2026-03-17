import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react'

export interface FooterContactData {
  contactPersons: { name: string; mobileNo: string }[]
  email: string
  points?: string[]
  socialLinks?: { instagram?: string; linkedin?: string; facebook?: string }
}

const defaultContactPersons = [
  { name: 'Patel Jainish', mobileNo: '+91 6355007570' },
  { name: 'Patel Yagnik', mobileNo: '+91 9925867065' },
]
const defaultEmail = 'procureexport24@gmail.com'
const defaultAddress = '584, Patel Vas, First Line, Ralisana, Visnagar, Mahesana'

function telLink(mobileNo: string) {
  return `tel:${mobileNo.replace(/\s/g, '')}`
}

const Footer = ({ data }: { data?: FooterContactData | null }) => {
  const persons = data?.contactPersons?.length ? data.contactPersons : defaultContactPersons
  const email = data?.email || defaultEmail
  const address = defaultAddress
  const social = data?.socialLinks

  return (
    <div className='bg-[#041d2d] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16'>
      <section className='mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-10 sm:gap-12 lg:gap-16'>
        {/* Logo & about */}
        <div className='flex flex-col gap-4 sm:col-span-2 lg:col-span-1'>
          <Image
            alt='logo'
            height={90}
            width={200}
            src={'/assets/whlogo.png'}
            className='h-14 w-auto sm:h-16 lg:h-[90px] object-contain object-left'
          />
          <p className='text-[#adb6c0] leading-7 text-[15px] sm:text-[17px] tracking-wide max-w-md'>
            We are a trusted supplier and trader, delivering premium-
            quality products globally with a commitment to freshness,
            reliability, and customer satisfaction
          </p>
          {(social?.instagram || social?.linkedin || social?.facebook) && (
            <div className='flex items-center gap-3'>
              {social.instagram && (
                <a href={social.instagram} target='_blank' rel='noopener noreferrer' className='text-[#adb6c0] hover:text-white transition-colors' aria-label='Instagram'>
                  <Instagram size={22} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target='_blank' rel='noopener noreferrer' className='text-[#adb6c0] hover:text-white transition-colors' aria-label='LinkedIn'>
                  <Linkedin size={22} />
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target='_blank' rel='noopener noreferrer' className='text-[#adb6c0] hover:text-white transition-colors' aria-label='Facebook'>
                  <Facebook size={22} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Our expertise */}
        <div>
          <h2 className='text-base sm:text-lg relative inline-block text-white tracking-widest font-semibold'>
            OUR EXPERTISE
            <hr className='h-1 border-none mt-3 sm:mt-4 w-full bg-[#2c3d4f]'/>
          </h2>
          <div className='flex mt-3 sm:mt-4 flex-col gap-2'>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Fruits & Vegetables</span>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Spices</span>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Coffee</span>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Rice</span>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Multi Products</span>
          </div>
        </div>

        {/* Useful links */}
        <div>
          <h2 className='text-base sm:text-lg relative inline-block text-white tracking-widest font-semibold'>
            USEFUL LINKS
            <hr className='h-1 border-none mt-3 sm:mt-4 w-full bg-[#2c3d4f]'/>
          </h2>
          <div className='flex mt-3 sm:mt-4 flex-col gap-2'>
            <Link className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors py-1' href='/'>Home</Link>
            <Link className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors py-1' href='/categories'>Products</Link>
            <Link className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors py-1' href='/about'>About</Link>
            <Link className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors py-1' href='/contact'>Contact</Link>
          </div>
        </div>

        {/* Contact info */}
        <div className='sm:col-span-2 lg:col-span-1'>
          <h2 className='text-base sm:text-lg relative inline-block text-white tracking-widest font-semibold'>
            CONTACT INFO
            <hr className='h-1 border-none mt-3 sm:mt-4 w-full bg-[#2c3d4f]'/>
          </h2>
          <div className='flex mt-3 sm:mt-4 flex-col gap-4 sm:gap-6'>
            {persons.map((p) => {
              if (p.name && p.mobileNo) {
              return (
              <div key={p.name} className='flex items-center gap-3'>
                <span className='p-1.5 sm:p-1 bg-white rounded-md shrink-0'>
                  <Phone size={20} className='text-[#041d2d] sm:w-[22px] sm:h-[22px]' aria-hidden />
                </span>
                <div className='flex flex-col min-w-0'>
                  <span className='text-white text-sm sm:text-base'>{p.name}</span>
                  <a href={telLink(p.mobileNo)} className='text-[#adb6c0] text-sm hover:text-white transition-colors'>{p.mobileNo}</a>
                </div>
              </div>
              )
              }
             })}
            <div className='flex items-start gap-3'>
              <span className='p-1.5 sm:p-1 bg-white rounded-md shrink-0 mt-0.5'>
                <Mail size={20} className='text-[#041d2d] sm:w-[22px] sm:h-[22px]' aria-hidden />
              </span>
              <a href={`mailto:${email}`} className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors break-all'>{email}</a>
            </div>
            <div className='flex items-start gap-3'>
              <span className='p-1.5 sm:p-1 bg-white rounded-md shrink-0 mt-0.5'>
                <MapPin size={20} className='text-[#041d2d] sm:w-[22px] sm:h-[22px]' aria-hidden />
              </span>
              <span className='text-[#adb6c0] text-sm sm:text-base leading-snug'>{address}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
