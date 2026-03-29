import { httpClient } from "@/lib/http-client"

export interface HeroData {
  _id: string
  heroImage: string
  heading: string
  subheading: string
  tags: string[]
  createdAt?: string
  updatedAt?: string
}

export interface HeroResponse {
  success: boolean
  data: HeroData
}

export async function getHero(): Promise<HeroData | null> {
  const { data, ok } = await httpClient<HeroResponse>("/api/hero")
  if (!ok || !data?.success || !data?.data) return null
  return data.data
}

export async function updateHero(formData: FormData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/hero",
    { method: "PUT", body: formData }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update hero")
}
