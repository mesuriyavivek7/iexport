import { httpClient } from "@/lib/http-client"

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

export async function getProducts(): Promise<ProductItem[]> {
  const { data, ok } = await httpClient<ProductsListResponse>("/api/products")
  if (!ok) return []
  return Array.isArray(data?.data) ? data.data : []
}

/** Products for a single category (public category detail page). */
export async function getProductsByCategory(categoryId: string): Promise<ProductItem[]> {
  const { data, ok } = await httpClient<ProductsListResponse>(
    `/api/products/category/${categoryId}`
  )
  if (!ok) return []
  return Array.isArray(data?.data) ? data.data : []
}

export async function createProduct(formData: FormData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/products",
    { method: "POST", body: formData }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to create product")
}

export async function updateProduct(id: string, formData: FormData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    `/api/products/${id}`,
    { method: "PUT", body: formData }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update product")
}

export async function deleteProduct(id: string): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    `/api/products/${id}`,
    { method: "DELETE" }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to delete product")
}
