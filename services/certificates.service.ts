import { httpClient } from "@/lib/http-client"

export interface CertificateItem {
  _id: string
  image: string
  createdAt?: string
  updatedAt?: string
}

export interface CertificatesListResponse {
  success: boolean
  data?: CertificateItem[]
}

export async function getCertificates(): Promise<CertificateItem[]> {
  const { data, ok } = await httpClient<CertificatesListResponse>("/api/certificates")
  if (!ok) return []
  return Array.isArray(data?.data) ? data.data : []
}

export async function createCertificate(formData: FormData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/certificates",
    { method: "POST", body: formData }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to create certificate")
}

export async function deleteCertificate(id: string): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    `/api/certificates/${id}`,
    { method: "DELETE" }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to delete certificate")
}
