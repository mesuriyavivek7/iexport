import { httpClient } from "@/lib/http-client"

export interface AboutPageData {
  _id: string
  bannerHeading: string
  bannerSubheading: string
  sectionImage: string
  sectionHeading: string
  sectionContentParagraph1: string
  sectionContentParagraph2: string
  visionTitle: string
  visionContent: string
  missionTitle: string
  missionContent: string
  ambitionTitle: string
  ambitionContent: string
  createdAt?: string
  updatedAt?: string
}

export interface AboutPageResponse {
  success: boolean
  data?: AboutPageData
}

export async function getAboutPage(): Promise<AboutPageData | null> {
  const { data, ok } = await httpClient<AboutPageResponse>("/api/about/page")
  if (!ok || !data?.success || !data?.data) return null
  return data.data
}

export async function updateAboutPage(formData: FormData): Promise<void> {
  const { data, ok } = await httpClient<{ success?: boolean; message?: string }>(
    "/api/about/page",
    { method: "PUT", body: formData }
  )
  if (!ok) throw new Error(data?.message ?? "Failed to update about page")
}
