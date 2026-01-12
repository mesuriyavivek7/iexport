import React from 'react'
import { Certificate } from '@/data/certificateSlides'
import Image from 'next/image'

const CertificateSlideCard = ({certificate}: {certificate:Certificate}) => {
  return (
    <div className="flex items-center justify-center h-35 w-55 bg-white">
      <div className="relative h-full w-full">
        <Image
          src={certificate.image}
          alt={`certificate ${certificate.id}`}
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default CertificateSlideCard