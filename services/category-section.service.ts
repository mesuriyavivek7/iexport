export interface CategorySectionData {
  heading: string
  subheading: string
}

export interface CategorySectionResponse {
  success: boolean
  data?: CategorySectionData
}

/** GET category section (home page) – call from client: fetch /api/category-section */
export async function getCategorySection(): Promise<CategorySectionData | null> {
  const res = await fetch("/api/category-section", { cache: "no-store" })
  if (!res.ok) return null
  const json = (await res.json()) as CategorySectionResponse
  if (!json?.success || !json?.data) return null
  return json.data
}

/** PUT category section – call from client: { heading, subheading } */
export async function updateCategorySection(
  payload: CategorySectionData
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/category-section", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to update category section" }
  }
  return { success: data?.success ?? true }
}
