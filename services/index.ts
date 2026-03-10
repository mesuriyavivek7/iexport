export { apiUrl, apiFetch } from "./api"
export {
  login,
  type LoginCredentials,
  type LoginResponse,
  type LoginResult,
  type LoginErrorResponse,
} from "./auth.service"
export {
  getHero,
  updateHero,
  type HeroData,
  type HeroResponse,
} from "./hero.service"
export {
  getAboutHome,
  updateAboutHome,
  type AboutHomeData,
  type AboutHomeResponse,
} from "./about.service"
export {
  getStats,
  updateStats,
  type StatItem,
  type StatsData,
  type StatsResponse,
} from "./stats.service"
export {
  getShowcase,
  updateShowcase,
  type ShowcaseData,
  type ShowcaseResponse,
} from "./showcase.service"
export {
  getCategorySection,
  updateCategorySection,
  type CategorySectionData,
  type CategorySectionResponse,
} from "./category-section.service"
export {
  getAboutPage,
  updateAboutPage,
  type AboutPageData,
  type AboutPageResponse,
} from "./about-page.service"
export {
  getCategoriesPage,
  updateCategoriesPage,
  type CategoriesPageData,
  type CategoriesPageResponse,
} from "./categories-page.service"
export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type CategoryItem,
  type CategoriesListResponse,
} from "./categories.service"
export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductItem,
  type ProductCategoryRef,
  type ProductsListResponse,
} from "./products.service"
export {
  getCertificates,
  createCertificate,
  deleteCertificate,
  type CertificateItem,
  type CertificatesListResponse,
} from "./certificates.service"
export {
  getContactUs,
  updateContactUs,
  type ContactUsData,
  type ContactUsPayload,
  type ContactUsResponse,
  type ContactPerson,
  type SocialLinks,
} from "./contact-us.service"
export {
  getLeads,
  type LeadItem,
  type LeadsListResponse,
} from "./leads.service"
