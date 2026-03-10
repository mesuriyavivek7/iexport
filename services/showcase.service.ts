export interface ShowcaseData {
  _id: string
  image1: string
  image2: string
  image3: string
  heading: string
  paragraph: string
  points: string[]
  createdAt?: string
  updatedAt?: string
}

export interface ShowcaseResponse {
  success: boolean
  data?: ShowcaseData
}

/** GET showcase content (call from client: fetch /api/showcase) */
export async function getShowcase(): Promise<ShowcaseData | null> {
  const res = await fetch("/api/showcase", { cache: "no-store" })
  if (!res.ok) return null
  const json = (await res.json()) as ShowcaseResponse
  if (!json?.success || !json?.data) return null
  return json.data
}

/** PUT showcase content (call from client: FormData with image1?, image2?, image3?, heading, paragraph, points[]) */
export async function updateShowcase(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/showcase", {
    method: "PUT",
    body: formData,
  })
  const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: json?.message ?? "Failed to update showcase" }
  }
  return { success: json?.success ?? true }
}
