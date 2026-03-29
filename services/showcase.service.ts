import { httpClient } from "@/lib/http-client"

export interface ShowcaseData {
  _id: string
  image1: string
  image2: string
  image3: string
  heading: string
  paragraph: string
  points: string[]
  createdAt?: string
  updatedAt?: string
}

export interface ShowcaseResponse {
  success: boolean
  data?: ShowcaseData
}

export async function getShowcase(): Promise<ShowcaseData | null> {
  const { data, ok } = await httpClient<ShowcaseResponse>("/api/showcase")
  if (!ok || !data?.success || !data?.data) return null
  return data.data
}

export async function updateShowcase(formData: FormData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/showcase",
    { method: "PUT", body: formData }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update showcase")
}
