export interface LeadItem {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
  updatedAt?: string
}

export interface LeadsListResponse {
  success: boolean
  data?: LeadItem[]
}

/** GET all leads (call from client: fetch /api/leads) */
export async function getLeads(): Promise<LeadItem[]> {
  const res = await fetch("/api/leads", { cache: "no-store" })
  if (!res.ok) return []
  const json = (await res.json()) as LeadsListResponse
  const data = json?.data
  return Array.isArray(data) ? data : []
}
