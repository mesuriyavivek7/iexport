import { httpClient } from "@/lib/http-client"

export interface CategoryItem {
  _id: string
  name: string
  image: string
  createdAt?: string
  updatedAt?: string
  productCount?: number
}

export interface CategoriesListResponse {
  success: boolean
  data?: CategoryItem[]
}

export async function getCategories(): Promise<CategoryItem[]> {
  const { data, ok } = await httpClient<CategoriesListResponse>("/api/categories")
  if (!ok) return []
  return Array.isArray(data?.data) ? data.data : []
}

export async function createCategory(formData: FormData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/categories",
    { method: "POST", body: formData }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to create category")
}

export async function updateCategory(id: string, formData: FormData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    `/api/categories/${id}`,
    { method: "PUT", body: formData }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update category")
}

export async function deleteCategory(id: string): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    `/api/categories/${id}`,
    { method: "DELETE" }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to delete category")
}
