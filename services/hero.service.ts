export interface HeroData {
  _id: string
  heroImage: string
  heading: string
  subheading: string
  tags: string[]
  createdAt?: string
  updatedAt?: string
}

export interface HeroResponse {
  success: boolean
  data: HeroData
}

/** GET hero content (call from client: fetch /api/hero) */
export async function getHero(): Promise<HeroData | null> {
  const res = await fetch("/api/hero", { cache: "no-store" })
  if (!res.ok) return null
  const json = (await res.json()) as HeroResponse
  if (!json?.success || !json?.data) return null
  return json.data
}

/** PUT hero content (call from client: FormData with heading, subheading, tags, heroImage?) */
export async function updateHero(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/hero", {
    method: "PUT",
    body: formData,
  })
  const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: json?.message ?? "Failed to update hero" }
  }
  return { success: json?.success ?? true }
}
