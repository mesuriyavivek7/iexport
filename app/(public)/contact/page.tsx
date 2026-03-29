import React from 'react'
import {
  SquareCheckBig,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Facebook,
} from 'lucide-react'
import { getContactUsForHome } from '@/lib/home-data'
import { normalizeContactEmails } from '@/lib/contact-emails'
import ContactForm from '@/components/website/contact-form'

function telLink(mobileNo: string) {
  return `tel:${mobileNo.replace(/\s/g, '')}`
}

const defaultContactPersons = [
  { name: 'Patel Jainish', mobileNo: '+91 6355007570' },
  { name: 'Patel Yagnik', mobileNo: '+91 9925867065' },
]
const defaultEmails = ['procureexport24@gmail.com']
const defaultPoints = [
  'Source high-quality sand and seeds from trusted suppliers',
  'Ensure timely global shipping with end-to-end logistics support',
  'Get competitive pricing for bulk and long-term orders',
  'Rely on quality checks, documentation, and compliance handling',
]
const defaultSocial = {
  instagram: 'https://www.instagram.com/procure_export',
  linkedin: 'https://www.linkedin.com/in/procure-export-23329a3a8',
  facebook: 'https://www.facebook.com',
}

export default async function ContactPage() {
  const data = await getContactUsForHome()

  const persons = data?.contactPersons?.length ? data.contactPersons : defaultContactPersons
  const emails = normalizeContactEmails(data?.email, defaultEmails)
  const points = data?.points?.length ? data.points : defaultPoints
  const social = data?.socialLinks ?? defaultSocial

  return (
    <div>
      <div className='relative pt-28 sm:pt-36 pb-10 sm:pb-16'>
        <section className='relative z-40 mx-auto max-w-6xl px-4 sm:px-6'>
          <div className='flex flex-col items-center gap-3 sm:gap-4'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-10 md:leading-12 text-center text-white'>
              <span>Get in touch </span>
              <span>with us</span>
            </h1>
            <p className='text-center text-sm sm:text-base text-white leading-6 sm:leading-7 max-w-3xl'>
              We&apos;d love to discuss your sourcing, exporting, or bulk supply
              requirements. Fill out the form below or reach out to us directly
              for reliable and timely import–export solutions.
            </p>
          </div>
        </section>
        <div
          className='absolute z-40 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'
          aria-hidden
        />
        <div className='absolute z-10 inset-0 bg-(--color-primary-blue)' aria-hidden />
      </div>

      <div>
        <section className='mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start'>
            <div className='flex flex-col gap-4 sm:gap-6'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-semibold text-2xl sm:text-3xl md:text-4xl text-primary'>
                  Order Inquiry
                </h2>
                <p className='text-base sm:text-lg text-[#333333]'>
                  Please fill out the form below and our team will get back to
                  you shortly.
                </p>
              </div>
              <ContactForm />
            </div>

            <div className='flex flex-col gap-6 lg:gap-4'>
              <div className='flex flex-col gap-4'>
                <h2 className='font-semibold text-base sm:text-lg'>
                  You can also contact us via
                </h2>
                <div className='flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12'>
                  {persons.map((p) => {
                    if (p.name && p.mobileNo) {
                      return (
                       <div
                        key={p.name}
                        className='flex items-center gap-3 sm:gap-4'
                       >
                        <span
                          className='border border-(--color-primary-blue) p-2 rounded-full shrink-0'
                          aria-hidden
                        >
                          <Phone size={20} className='sm:w-5 sm:h-5' />
                        </span>
                        <div className='flex flex-col min-w-0'>
                          <h4 className='font-medium text-sm'>{p.name}</h4>
                          <a
                            href={telLink(p.mobileNo)}
                            className='text-sm text-foreground hover:text-primary'
                          >
                            {p.mobileNo}
                         </a>
                        </div>
                      </div>
                    )
                  }
                 })}
                </div>
                <div className='flex flex-col gap-3 sm:gap-4'>
                  {emails.map((addr, i) => (
                    <div
                      key={`${addr}-${i}`}
                      className='flex items-center gap-3 sm:gap-4'
                    >
                      <span
                        className='border border-(--color-primary-blue) p-2 rounded-full shrink-0'
                        aria-hidden
                      >
                        <Mail size={20} className='sm:w-5 sm:h-5' />
                      </span>
                      <a
                        href={`mailto:${addr}`}
                        className='min-w-0 text-sm sm:text-base text-foreground hover:text-primary break-all'
                      >
                        {addr}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-8'>
                <h2 className='font-medium text-base sm:text-lg'>
                  With our import & export services, you can
                </h2>
                <div className='flex flex-col gap-4 sm:gap-6'>
                  {points.map((text) => (
                    <div key={text} className='flex items-start gap-2'>
                      <SquareCheckBig
                        size={20}
                        className='text-primary shrink-0 mt-0.5 sm:w-5 sm:h-5'
                        aria-hidden
                      />
                      <span className='text-[#333333] text-sm sm:text-base'>
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex items-center gap-3 sm:gap-4 mt-2 sm:mt-6'>
                {social.instagram && (
                  <a
                    className='p-2.5 border border-(--color-primary-blue) transition-all duration-300 hover:bg-(--color-primary-blue) hover:text-white rounded-md'
                    href={social.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Instagram'
                  >
                    <Instagram size={22} />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    className='p-2.5 border border-(--color-primary-blue) transition-all duration-300 hover:bg-(--color-primary-blue) hover:text-white rounded-md'
                    href={social.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='LinkedIn'
                  >
                    <Linkedin size={22} />
                  </a>
                )}
                {social.facebook && (
                  <a
                    className='p-2.5 border border-(--color-primary-blue) transition-all duration-300 hover:bg-(--color-primary-blue) hover:text-white rounded-md'
                    href={social.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Facebook'
                  >
                    <Facebook size={22} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
