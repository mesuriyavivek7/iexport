import { httpClient } from "@/lib/http-client"

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

export async function getLeads(): Promise<LeadItem[]> {
  const { data, ok } = await httpClient<LeadsListResponse>("/api/leads")
  if (!ok) return []
  return Array.isArray(data?.data) ? data.data : []
}

export interface SubmitLeadPayload {
  name: string
  email: string
  message: string
}

export async function submitLead(payload: SubmitLeadPayload): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/leads",
    { method: "POST", body: JSON.stringify(payload) }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to send inquiry")
}
