import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const About = (props: Props) => {
  return (
    <div className='px-8 py-20'>
        <section className='mx-auto max-w-6xl gap-4 grid grid-cols-2 items-center'>
           <div className='flex justify-center items-center'>
             <Image 
             alt='about'
             height={480}
             width={480}
             src={'/assets/about.png'}></Image>
           </div>
           <div className='flex flex-col gap-4'>
             <h4 className='text-lg text-[#9b9b9b] font-medium'>ABOUT PROCURE EXPORT</h4>
             <h1 className='text-4xl leading-12 font-bold'>
                <span className='text-primary'>Your Trusted Partner in </span>
                <br></br>
                <span className='text-secondary'>International Trade </span>
             </h1>
             <div className='flex flex-col gap-2'>
             <p className='text-[#333333] leading-7'>
              Welcome to Procure Exports, your trusted partner in delivering the finest quality agricultural and food products to markets worldwide. With a passion for excellence and a commitment to global trade, we specialize in the export of premium fruits and vegetables, authentic spices, aromatic coffee, and high-grade rice.
             </p>
             <p className='text-[#333333] leading-7'>
              At Procure Exports, we believe in connecting cultures through the richness of food and agriculture. Our carefully sourced products are cultivated with care, meeting the highest standards of quality and freshness. Whether it's the vibrant flavors of fresh produce, the bold aroma of our spices, the rich taste of coffee, or the superior quality of our rice, we ensure every product reflects our dedication to excellence. 
             </p>
             </div>
             <Link href={'/about'}>
             <Button size={"lg"} className='w-48 group btn-primary font-bold cursor-pointer '>
                Read More Details
                <ChevronRight className='group-hover:translate-x-2 transition-all duration-300'></ChevronRight>
             </Button>
             </Link>
           </div>
        </section>
    </div>
  )
}

export default About