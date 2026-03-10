export interface ProductCategoryRef {
  _id: string
  name: string
  image: string
}

export interface ProductItem {
  _id: string
  name: string
  image: string
  category: ProductCategoryRef
  createdAt?: string
  updatedAt?: string
}

export interface ProductsListResponse {
  success: boolean
  data?: ProductItem[]
}

/** GET all products (call from client: fetch /api/products) */
export async function getProducts(): Promise<ProductItem[]> {
  const res = await fetch("/api/products", { cache: "no-store" })
  if (!res.ok) return []
  const json = (await res.json()) as ProductsListResponse
  const data = json?.data
  return Array.isArray(data) ? data : []
}

/** POST create product (FormData: name, image, category) */
export async function createProduct(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/products", {
    method: "POST",
    body: formData,
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to create product" }
  }
  return { success: data?.success ?? true }
}

/** PUT update product (FormData: name, image?, category?) */
export async function updateProduct(
  id: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    body: formData,
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to update product" }
  }
  return { success: data?.success ?? true }
}

/** DELETE product */
export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok) {
    return { success: false, error: data?.message ?? "Failed to delete product" }
  }
  return { success: data?.success ?? true }
}
