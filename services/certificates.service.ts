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

/** GET all certificates (call from client: fetch /api/certificates) */
export async function getCertificates(): Promise<CertificateItem[]> {
  const res = await fetch("/api/certificates", { cache: "no-store" })
  if (!res.ok) return []
  const json = (await res.json()) as CertificatesListResponse
  const data = json?.data
  return Array.isArray(data) ? data : []
}

/** POST create certificate (FormData: image) */
export async function createCertificate(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/certificates", {
    method: "POST",
    body: formData,
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to create certificate" }
  }
  return { success: data?.success ?? true }
}

/** DELETE certificate */
export async function deleteCertificate(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to delete certificate" }
  }
  return { success: data?.success ?? true }
}
