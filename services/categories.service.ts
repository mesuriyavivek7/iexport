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

/** GET all categories (call from client: fetch /api/categories) */
export async function getCategories(): Promise<CategoryItem[]> {
  const res = await fetch("/api/categories", { cache: "no-store" })
  if (!res.ok) return []
  const json = (await res.json()) as CategoriesListResponse
  const data = json?.data
  return Array.isArray(data) ? data : []
}

/** POST create category (FormData: name, image) */
export async function createCategory(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/categories", {
    method: "POST",
    body: formData,
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to create category" }
  }
  return { success: data?.success ?? true }
}

/** PUT update category (FormData: name, image?) */
export async function updateCategory(
  id: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`/api/categories/${id}`, {
    method: "PUT",
    body: formData,
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to update category" }
  }
  return { success: data?.success ?? true }
}

/** DELETE category */
export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`/api/categories/${id}`, { method: "DELETE" })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to delete category" }
  }
  return { success: data?.success ?? true }
}
