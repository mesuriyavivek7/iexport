import { Button } from '@/components/ui/button'
import React from 'react'


//Importing icons
import { SquareCheckBig, Phone, MapPin } from 'lucide-react';

type Props = {}

const Contact = (props: Props) => {
  return (
    <div className='px-8 py-16'>
        <section className='mx-auto max-w-6xl '>
             <div className='flex flex-col items-center gap-4'>
               <span className='text-lg text-[#9b9b9b] font-medium'>CONTACT US</span>
               <h1 className='text-5xl leading-12 font-bold'>
                  <span className='text-primary'>Get in touch </span>
                  <span className='text-secondary'>with us</span>
               </h1>
               <p className='text-center w-3xl text-[16px] text-[#333333] leading-7'>We’d love to discuss your sourcing, exporting, or bulk supply requirements.
                Fill out the form below or reach out to us directly for reliable and timely import–export solutions.</p>
             </div>

             <div className='grid grid-cols-2 gap-20 mt-28 items-start'>
               <div>
                <form className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-sm'>NAME</label>
                        <input className='border p-2 outline-none resize-none rounded-md shadow-sm' type="text" id='name' placeholder='Your name' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-sm'>EMAIL</label>
                        <input className='border p-2 outline-none resize-none rounded-md shadow-sm' type="text" id='name' placeholder='Enter your email' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="message" className='text-sm'>MESSAGE</label>
                        <textarea placeholder='Enter your message' id='message' className='border p-2 outline-none resize-none rounded-md shadow-sm'></textarea>
                    </div>
                    <Button className='cursor-pointer mt-4 h-12 btn-primary font-bold' size={"lg"}>
                        Send your inquiry
                    </Button>
                </form>
                
               </div>

                <div>
                   <div className='flex flex-col gap-4'>
                    <h2 className='font-semibold text-lg'>You can also contact us via </h2>
                    <div className='flex items-center gap-12'>
                        <div className='flex items-center gap-4'>
                           <span className='border p-2 rounded-full'>
                            <Phone></Phone>
                           </span>
                           <div className='flex flex-col'>
                             <h4 className='font-medium text-sm'>Patel Jainish</h4>
                             <span className='text-sm'>+91 6355007570</span>
                           </div>
                        </div>
                        <div className='flex items-center gap-4'>
                           <span className='border p-2 rounded-full'>
                            <Phone></Phone>
                           </span>
                           <div className='flex flex-col'>
                             <h4 className='font-medium text-sm'>Patel Yagnik</h4>
                             <span className='text-sm'>+91 9925867065</span>
                           </div>
                        </div>
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
                </div>
             </div>


        </section>
    </div>
  )
}

export default Contact