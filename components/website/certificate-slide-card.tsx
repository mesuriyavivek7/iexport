import React from 'react'
import Image from 'next/image'

export interface CertificateSlideItem {
  id: string | number
  image: string
}

const CertificateSlideCard = ({ certificate }: { certificate: CertificateSlideItem }) => {
  return (
    <div className="flex w-full aspect-[55/35] items-center justify-center bg-white sm:aspect-auto sm:h-35 sm:w-55">
      <div className="relative h-full w-full">
        <Image
          src={certificate.image}
          alt={`Certificate ${certificate.id}`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized={certificate.image.startsWith('http')}
        />
      </div>
    </div>
  )
}

export default CertificateSlideCard