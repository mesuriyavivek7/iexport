import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image';



//Importing icons
import { SquareCheckBig, Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

type Props = {}

const Contact = (props: Props) => {
  return (
    <div>
       <div className='relative pt-36 pb-16'>
          <section className='mx-auto z-40 relative max-w-6xl'>
            <div className='flex flex-col items-center gap-4'>
               {/* <span className='text-lg text-[#9b9b9b] font-medium'>CONTACT US</span> */}
               <h1 className='text-5xl leading-12 font-bold'>
                  <span className='text-white'>Get in touch </span>
                  <span className='text-white'>with us</span>
               </h1>
               <p className='text-center w-3xl text-[16px] text-white leading-7'>We’d love to discuss your sourcing, exporting, or bulk supply requirements.
                Fill out the form below or reach out to us directly for reliable and timely import–export solutions.</p>
             </div>
          </section>
          <div className="absolute z-40 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

          <div className='absolute z-10 inset-0 bg-(--color-primary-blue)'></div>
        </div>

      <div>
        <section className='mx-auto max-w-6xl'>
             <div className='grid grid-cols-2 gap-20 py-16 items-start'>
               <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                  <h2 className='font-semibold text-4xl text-primary'>Order Inquiry</h2>
                  <p className='text-lg text-[#333333]'>Please fill out the form below and our team will get back to you shortly.</p>
                </div>
                <form className='flex flex-col gap-8'>
                    <input className='border-b p-2 outline-none resize-none' type="text" id='name' placeholder='Your name' />
                    <input className='border-b p-2 outline-none resize-none' type="text" id='name' placeholder='Enter your email' />
                    <textarea rows={3} placeholder='Enter your message' id='message' className='border-b p-2 outline-none resize-none'></textarea>
                    <Button className='cursor-pointer mt-4 h-12 btn-primary font-bold' size={"lg"}>
                        Send your inquiry
                    </Button>
                </form>
               </div>

                <div className=''>
                   <div className='flex flex-col gap-4'>
                    <h2 className='font-semibold text-lg'>You can also contact us via </h2>
                    <div className='flex items-center gap-12'>
                        <div className='flex items-center gap-4'>
                           <span className='border border-(--color-primary-blue) p-2 rounded-full'>
                            <Phone></Phone>
                           </span>
                           <div className='flex flex-col'>
                             <h4 className='font-medium text-sm'>Patel Jainish</h4>
                             <span className='text-sm'>+91 6355007570</span>
                           </div>
                        </div>
                        <div className='flex items-center gap-4'>
                           <span className='border border-(--color-primary-blue) p-2 rounded-full'>
                            <Phone></Phone>
                           </span>
                           <div className='flex flex-col'>
                             <h4 className='font-medium text-sm'>Patel Yagnik</h4>
                             <span className='text-sm'>+91 9925867065</span>
                           </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                          <span className='border border-(--color-primary-blue) p-2 rounded-full'>
                            <Mail></Mail>
                          </span>
                          <h4>
                          procureexport24@gmail.com
                          </h4>
                    </div>
                   </div> 
                   <div className='flex mt-8 flex-col gap-4'>
                    <h2 className='font-medium text-lg'>With our import & export services, you can</h2>
                    <div className='flex flex-col gap-6'>
                        <div className='flex items-center gap-2'>
                          <SquareCheckBig></SquareCheckBig>
                          <span className='text-[#333333]'>Source high-quality sand and seeds from trusted suppliers</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <SquareCheckBig></SquareCheckBig>
                          <span className='text-[#333333]'>Ensure timely global shipping with end-to-end logistics support</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <SquareCheckBig></SquareCheckBig>
                          <span className='text-[#333333]'>Get competitive pricing for bulk and long-term orders</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <SquareCheckBig></SquareCheckBig>
                          <span className='text-[#333333]'>Rely on quality checks, documentation, and compliance handling</span>
                        </div>
                    </div>
                   </div>
                   <div className='flex mt-6 items-center gap-4'>
                     <a className='p-2 border border-(--color-primary-blue)  transition-all duration-300 hover:bg-(--color-primary-blue) hover:text-white rounded-md' href='https://www.instagram.com/procure_export?utm_source=qr&igsh=aGViZ3JqeDV2MTho' target='_blank'>
                       <Instagram size={22}></Instagram>
                     </a>
                     <a className='p-2 border border-(--color-primary-blue)  transition-all duration-300 hover:bg-(--color-primary-blue) hover:text-white rounded-md' href='https://www.linkedin.com/in/procure-export-23329a3a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target='_blank'>
                      <Linkedin size={22}></Linkedin>
                     </a>
                     <a className='p-2 border border-(--color-primary-blue)  transition-all duration-300 hover:bg-(--color-primary-blue) hover:text-white rounded-md' href='#' target='_blank'>
                      <Facebook size={22}></Facebook>
                     </a>
                   </div>
              </div>
             </div>
        </section>
    </div>
  </div>
  )
}

export default Contact