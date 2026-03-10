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
  email: string
  points: string[]
  socialLinks: SocialLinks
  createdAt?: string
  updatedAt?: string
}

export interface ContactUsResponse {
  success: boolean
  data?: ContactUsData
}

export type ContactUsPayload = Omit<
  ContactUsData,
  "_id" | "createdAt" | "updatedAt"
>

/** GET contact us (call from client: fetch /api/contact-us) */
export async function getContactUs(): Promise<ContactUsData | null> {
  const res = await fetch("/api/contact-us", { cache: "no-store" })
  if (!res.ok) return null
  const json = (await res.json()) as ContactUsResponse
  if (!json?.success || !json?.data) return null
  return json.data
}

/** PUT contact us (JSON body) */
export async function updateContactUs(
  payload: ContactUsPayload
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/contact-us", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to update contact us" }
  }
  return { success: data?.success ?? true }
}
