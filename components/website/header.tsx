"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/categories', label: 'PRODUCTS' },
    { href: '/about', label: 'ABOUT US' },
    { href: '/contact', label: 'CONTACT US' },
  ]

  return (
    <>
      <header className={`py-2 backdrop-blur-sm z-50 shadow px-4 sm:px-6 ${isScrolled ? "bg-[#082F49]/40" : "bg-[#f1f5f9]/10"} transition-all duration-300 fixed top-0 left-0 right-0`}>
        <section className='flex justify-between items-center mx-auto max-w-6xl'>
          <Link href={'/'} className="shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <Image
              alt='Logo'
              height={80}
              width={180}
              src={'/assets/whlogo.png'}
              className="h-14 w-auto md:h-20 object-contain"
            />
          </Link>

          <nav className='hidden md:block'>
            <ul className='flex items-center justify-center gap-6 lg:gap-8'>
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  className='font-medium text-white transition-all tracking-wide duration-300 hover:text-(--color-secondary-blue)'
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </section>
      </header>

      {/* Mobile menu: sibling of header so it's in same tree and state updates apply. High z-index so it draws above page content. */}
      <div
        className="fixed inset-0 z-[9999] md:hidden"
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <nav
          className={`fixed top-0 right-0 bottom-0 w-full max-w-[300px] bg-[#082F49] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-white font-semibold tracking-wide">Menu</span>
            <button
              type="button"
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col p-4 gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className="block font-medium text-white py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors hover:text-(--color-secondary-blue)"
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header