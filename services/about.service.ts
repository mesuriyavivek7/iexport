import { httpClient } from "@/lib/http-client"

export interface AboutHomeData {
  _id: string
  aboutImage: string
  heading: string
  subheading: string
  contentParagraph1: string
  contentParagraph2: string
  createdAt?: string
  updatedAt?: string
}

export interface AboutHomeResponse {
  success: boolean
  data: AboutHomeData
}

export async function getAboutHome(): Promise<AboutHomeData | null> {
  const { data, ok } = await httpClient<AboutHomeResponse>("/api/about/home")
  if (!ok || !data?.success || !data?.data) return null
  return data.data
}

export async function updateAboutHome(formData: FormData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/about/home",
    { method: "PUT", body: formData }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update about section")
}
