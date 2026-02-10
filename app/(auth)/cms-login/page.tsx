"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
//Importing icons 
import { Mail, Eye, EyeOff } from 'lucide-react'

type Props = {}

const Login = (props: Props) => {
  const [showPassword, setShowpassword] = useState(false)

  return (
    <div className='relative h-screen p-8'>
       <div className='grid h-full grid-cols-2 items-center gap-16'>
          {/* Form Section */}
          <div className='flex p-18 flex-col gap-12'>
            <div className='flex justify-center items-center'>
             <Image
              src={'/assets/logo.jpg'}
              width={250}
              height={150}
              alt='logo'
              ></Image>
            </div>
            <form className='flex flex-col gap-8'>
               <div className='flex flex-col gap-2'>
                 <label htmlFor="email">Email</label>
                 <div className='relative border rounded-md border-[#e6ebf1]'>
                    <input 
                    placeholder='Enter your email' 
                    type="text" 
                    className='border-none w-full p-4 outline-none transition-all duration-300
                    focus-within:ring-2
                    focus-within:ring-(--color-primary-purple)
                    focus-within:border-(--color-primary-purple)
                    focus-within:rounded-md
                    '/>
                    <span className='absolute right-4 top-1/2 -translate-y-1/2'>
                      <Mail className='text-[#6b7180]' size={22}></Mail>
                    </span>
                 </div>
               </div>
               <div className='flex flex-col gap-2'>
                 <label htmlFor="email">Password</label>
                 <div className='relative border rounded-md border-[#e6ebf1]'>
                    <input 
                    placeholder='Enter your password' 
                    type={showPassword ? "text" : "password"} 
                    className='border-none w-full p-4 outline-none transition-all duration-300
                    focus-within:ring-2
                    focus-within:ring-(--color-primary-purple)
                    focus-within:border-(--color-primary-purple)
                    focus-within:rounded-md
                    '/>
                    <button type='button' onClick={()=> setShowpassword((prev) => !prev)} className='absolute right-4 top-1/2 -translate-y-1/2'>
                      {showPassword ? <Eye className='text-[#6b7180]'></Eye> : <EyeOff className='text-[#6b7180]'></EyeOff> }
                    </button>
                 </div>
               </div>
               <Button className='bg-(--color-primary-purple) text-lg font-bold tracking-wide cursor-pointer h-14 hover:bg-(--color-primary-purple-hover)' size="lg">
                Sign In
               </Button>
            </form>
          </div>
          {/* content */}
          <div className='rounded-2xl p-12 overflow-hidden relative h-full'>
             <div className="absolute z-20 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[26px_36px] mask-[radial-gradient(ellipse_80%_40%_at_50%_100%,#000_70%,transparent_110%)]"></div>
             <div className="absolute inset-0 bg-[linear-gradient(135deg,#f0f0ff_0%,#fffafd_100%)] pointer-events-none" />
             <div className='relative z-40'>
                <h2 className='text-3xl font-semibold text-primary'>Procure Export</h2>
                <div className='flex flex-col gap-4 mt-10'>
                    <h4 className='text-xl'>Sign in to your account</h4>
                    <h2 className='text-4xl font-semibold'>Welcome Back!</h2>
                    <p className='text-[#4c5663] w-11/12'>Please sign in to your account by completing the necessary fields below</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}

export default Login