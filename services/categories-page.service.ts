import { httpClient } from "@/lib/http-client"

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

export async function getCategoriesPage(): Promise<CategoriesPageData | null> {
  const { data, ok } = await httpClient<CategoriesPageResponse>("/api/categories-page")
  if (!ok || !data?.success || !data?.data) return null
  return data.data
}

export async function updateCategoriesPage(payload: {
  heading: string
  subheading: string
}): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/categories-page",
    { method: "PUT", body: JSON.stringify(payload) }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update categories page")
}
