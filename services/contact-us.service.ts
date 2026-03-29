import { httpClient } from "@/lib/http-client"

export interface ContactPerson {
  name: string
  mobileNo: string
}

export interface SocialLinks {
  instagram?: string
  linkedin?: string
  facebook?: string
}

export interface ContactUsData {
  _id: string
  contactPersons: ContactPerson[]
  email: string[]
  points: string[]
  socialLinks: SocialLinks
  createdAt?: string
  updatedAt?: string
}

export interface ContactUsResponse {
  success: boolean
  data?: ContactUsData
}

export type ContactUsPayload = Omit<ContactUsData, "_id" | "createdAt" | "updatedAt">

export async function getContactUs(): Promise<ContactUsData | null> {
  const { data, ok } = await httpClient<ContactUsResponse>("/api/contact-us")
  if (!ok || !data?.success || !data?.data) return null
  return data.data
}

export async function updateContactUs(payload: ContactUsPayload): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/contact-us",
    { method: "PUT", body: JSON.stringify(payload) }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update contact us")
}
