/**
 * Server-side data fetchers for the public website.
 * Uses lib/api.ts for cached fetch and on-demand revalidation.
 */

import { fetchApiData, fetchFromBackend } from "@/lib/api"

/** Cache: 1h. When CMS updates, backend should POST /api/revalidate with path or tag so users get fresh data immediately. */
const CACHE = { revalidate: 3600 }
const HOME_TAG = { ...CACHE, tags: ["home"] }
const CONTACT_TAG = { ...CACHE, tags: ["contact"] }
const CATEGORIES_TAG = { ...CACHE, tags: ["categories"] }
const ABOUT_TAG = { ...CACHE, tags: ["about"] }

export interface HeroData {
  heroImage: string
  heading: string
  subheading: string
  tags: string[]
}

export interface AboutHomeData {
  aboutImage: string
  heading: string
  subheading: string
  contentParagraph1: string
  contentParagraph2: string
}

export interface CategorySectionData {
  heading: string
  subheading: string
}

export interface CategoryItem {
  _id: string
  name: string
  image: string
  productCount?: number
}

export interface StatItem {
  count: string
  title: string
}

export interface ShowcaseData {
  image1: string
  image2: string
  image3: string
  heading: string
  paragraph: string
  points: string[]
}

export interface CertificateItem {
  _id: string
  image: string
}

export interface ContactUsData {
  contactPersons: { name: string; mobileNo: string }[]
  email: string[]
  points: string[]
  socialLinks: { instagram?: string; linkedin?: string; facebook?: string }
}

export interface AboutPageData {
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
}

export interface ProductByCategoryItem {
  _id: string
  name: string
  image: string
  category: { _id: string; name: string; image: string }
}

// ---- Home page (tag: home) ----

export async function getHeroForHome(): Promise<HeroData | null> {
  return fetchApiData<HeroData>("/api/hero", HOME_TAG)
}

export async function getAboutHomeForHome(): Promise<AboutHomeData | null> {
  return fetchApiData<AboutHomeData>("/api/about/home", HOME_TAG)
}

export async function getCategorySectionForHome(): Promise<CategorySectionData | null> {
  return fetchApiData<CategorySectionData>("/api/category-section", HOME_TAG)
}

export async function getCategoriesForHome(): Promise<CategoryItem[]> {
  const data = await fetchApiData<CategoryItem[]>("/api/categories", {
    ...HOME_TAG,
    tags: ["home", "categories"],
  })
  return Array.isArray(data) ? data : []
}

export async function getStatsForHome(): Promise<StatItem[]> {
  try {
    const json = await fetchFromBackend<{
      data?: { stats?: StatItem[] }
      stats?: StatItem[]
    }>("/api/stats", HOME_TAG)
    const stats = json?.data?.stats ?? json?.stats
    return Array.isArray(stats) ? stats : []
  } catch {
    return []
  }
}

export async function getShowcaseForHome(): Promise<ShowcaseData | null> {
  return fetchApiData<ShowcaseData>("/api/showcase", HOME_TAG)
}

export async function getCertificatesForHome(): Promise<CertificateItem[]> {
  const data = await fetchApiData<CertificateItem[]>("/api/certificates", HOME_TAG)
  return Array.isArray(data) ? data : []
}

export interface HomePageData {
  hero: HeroData | null
  aboutHome: AboutHomeData | null
  categorySection: CategorySectionData | null
  categories: CategoryItem[]
  stats: StatItem[]
  showcase: ShowcaseData | null
  certificates: CertificateItem[]
}

export async function fetchHomePageData(): Promise<HomePageData> {
  const [hero, aboutHome, categorySection, categories, stats, showcase, certificates] =
    await Promise.all([
      getHeroForHome(),
      getAboutHomeForHome(),
      getCategorySectionForHome(),
      getCategoriesForHome(),
      getStatsForHome(),
      getShowcaseForHome(),
      getCertificatesForHome(),
    ])
  return {
    hero,
    aboutHome,
    categorySection,
    categories,
    stats,
    showcase,
    certificates,
  }
}

// ---- Categories page (tag: categories) ----

export async function getCategoriesPage(): Promise<CategorySectionData | null> {
  return fetchApiData<CategorySectionData>("/api/categories-page", CATEGORIES_TAG)
}

export async function getProductsByCategory(
  categoryId: string
): Promise<ProductByCategoryItem[]> {
  try {
    const data = await fetchApiData<ProductByCategoryItem[]>(
      `/api/products/category/${categoryId}`,
      { ...CACHE, tags: ["categories", `category-${categoryId}`] }
    )
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

// ---- Contact (tag: contact) ----

export async function getContactUsForHome(): Promise<ContactUsData | null> {
  return fetchApiData<ContactUsData>("/api/contact-us", CONTACT_TAG)
}

// ---- About page (tag: about) ----

export async function getAboutPageForPublic(): Promise<AboutPageData | null> {
  return fetchApiData<AboutPageData>("/api/about/page", ABOUT_TAG)
}
