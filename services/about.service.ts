export interface AboutHomeData {
  _id: string
  aboutImage: string
  heading: string
  subheading: string
  contentParagraph1: string
  contentParagraph2: string
  createdAt?: string
  updatedAt?: string
}

export interface AboutHomeResponse {
  success: boolean
  data: AboutHomeData
}

/** GET about home content (call from client: fetch /api/about/home) */
export async function getAboutHome(): Promise<AboutHomeData | null> {
  const res = await fetch("/api/about/home", { cache: "no-store" })
  if (!res.ok) return null
  const json = (await res.json()) as AboutHomeResponse
  if (!json?.success || !json?.data) return null
  return json.data
}

/** PUT about home content (call from client: FormData with heading, subheading, contentParagraph1, contentParagraph2, aboutImage?) */
export async function updateAboutHome(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/about/home", {
    method: "PUT",
    body: formData,
  })
  const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: json?.message ?? "Failed to update about section" }
  }
  return { success: json?.success ?? true }
}
