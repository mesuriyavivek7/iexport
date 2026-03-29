import { httpClient } from "@/lib/http-client"

export interface CategorySectionData {
  heading: string
  subheading: string
}

export interface CategorySectionResponse {
  success: boolean
  data?: CategorySectionData
}

export async function getCategorySection(): Promise<CategorySectionData | null> {
  const { data, ok } = await httpClient<CategorySectionResponse>("/api/category-section")
  if (!ok || !data?.success || !data?.data) return null
  return data.data
}

export async function updateCategorySection(payload: CategorySectionData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/category-section",
    { method: "PUT", body: JSON.stringify(payload) }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update category section")
}
