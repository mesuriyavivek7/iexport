export interface AboutPageData {
  _id: string
  bannerHeading: string
  bannerSubheading: string
  sectionImage: string
  sectionHeading: string
  sectionContentParagraph1: string
  sectionContentParagraph2: string
  visionTitle: string
  visionContent: string
  missionTitle: string
  missionContent: string
  ambitionTitle: string
  ambitionContent: string
  createdAt?: string
  updatedAt?: string
}

export interface AboutPageResponse {
  success: boolean
  data?: AboutPageData
}

/** GET about page content (call from client: fetch /api/about/page) */
export async function getAboutPage(): Promise<AboutPageData | null> {
  const res = await fetch("/api/about/page", { cache: "no-store" })
  if (!res.ok) return null
  const json = (await res.json()) as AboutPageResponse
  if (!json?.success || !json?.data) return null
  return json.data
}

/** PUT about page (call from client: FormData with all text fields + sectionImage?) */
export async function updateAboutPage(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/about/page", {
    method: "PUT",
    body: formData,
  })
  const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: json?.message ?? "Failed to update about page" }
  }
  return { success: json?.success ?? true }
}
