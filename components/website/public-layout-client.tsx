"use client"

import type { ReactNode } from "react"
import Header from "@/components/website/header"
import Footer from "@/components/website/footer"
import { useContactUs } from "@/hooks"
import type { FooterContactData } from "@/components/website/footer"
import type { ContactUsData } from "@/services"

function toFooterData(data: ContactUsData): FooterContactData {
  return {
    contactPersons: data.contactPersons,
    email: data.email,
    points: data.points,
    socialLinks: data.socialLinks,
  }
}

export function PublicLayoutClient({ children }: { children: ReactNode }) {
  const { data } = useContactUs()
  const footerData = data ? toFooterData(data) : undefined

  return (
    <main className="h-full font-roboto-condensed">
      <Header />
      {children}
      <Footer data={footerData} />
    </main>
  )
}
