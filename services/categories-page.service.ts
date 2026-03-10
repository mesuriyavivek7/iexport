export interface CategoriesPageData {
  _id: string
  heading: string
  subheading: string
  createdAt?: string
  updatedAt?: string
}

export interface CategoriesPageResponse {
  success: boolean
  data?: CategoriesPageData
}

/** GET categories page content (call from client: fetch /api/categories-page) */
export async function getCategoriesPage(): Promise<CategoriesPageData | null> {
  const res = await fetch("/api/categories-page", { cache: "no-store" })
  if (!res.ok) return null
  const json = (await res.json()) as CategoriesPageResponse
  if (!json?.success || !json?.data) return null
  return json.data
}

/** PUT categories page (call from client: { heading, subheading }) */
export async function updateCategoriesPage(
  payload: { heading: string; subheading: string }
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/categories-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to update categories page" }
  }
  return { success: data?.success ?? true }
}
