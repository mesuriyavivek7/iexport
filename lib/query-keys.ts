/**
 * Centralized TanStack Query key factory.
 * Every query/mutation key lives here so cache invalidation is consistent.
 */
export const queryKeys = {
  analytics: {
    all: () => ["analytics"] as const,
    dashboard: () => ["analytics", "dashboard"] as const,
  },
  hero: {
    all: () => ["hero"] as const,
  },
  about: {
    all: () => ["about"] as const,
    home: () => ["about", "home"] as const,
    page: () => ["about", "page"] as const,
  },
  stats: {
    all: () => ["stats"] as const,
  },
  showcase: {
    all: () => ["showcase"] as const,
  },
  categorySection: {
    all: () => ["category-section"] as const,
  },
  categoriesPage: {
    all: () => ["categories-page"] as const,
  },
  categories: {
    all: () => ["categories"] as const,
    list: () => ["categories", "list"] as const,
  },
  products: {
    all: () => ["products"] as const,
    list: () => ["products", "list"] as const,
    byCategory: (categoryId: string) =>
      ["products", "byCategory", categoryId] as const,
  },
  certificates: {
    all: () => ["certificates"] as const,
    list: () => ["certificates", "list"] as const,
  },
  leads: {
    all: () => ["leads"] as const,
    list: () => ["leads", "list"] as const,
  },
  contactUs: {
    all: () => ["contact-us"] as const,
  },
} as const
