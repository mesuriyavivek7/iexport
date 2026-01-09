import React from 'react'
import Image from 'next/image'

type Props = {}

const Transaport = (props: Props) => {
  return (
    <div className='relative px-6 py-20'>
        <section className='mx-auto max-w-6xl grid grid-cols-2 items-center gap-4'>
        <div className="grid grid-cols-2 gap-2 h-105">
  
  {/* LEFT IMAGE - FULL HEIGHT */}
  <div className="relative h-full w-full overflow-hidden rounded-lg">
    <Image
      src="/assets/truck.jpg"
      alt="truck"
      fill
      className="object-cover"
      priority
    />
  </div>

  {/* RIGHT SIDE - TWO STACKED IMAGES */}
  <div className="grid grid-rows-2 gap-2 h-full">
    
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <Image
        src="/assets/ship.jpg"
        alt="ship"
        fill
        className="object-cover"
      />
    </div>

    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <Image
        src="/assets/cargo.jpg"
        alt="cargo"
        fill
        className="object-cover"
      />
    </div>

  </div>
</div>

            <div className=''></div>
        </section>
    </div>
  )
}

export default Transaport