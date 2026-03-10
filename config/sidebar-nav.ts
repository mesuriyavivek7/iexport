export interface NavItem {
  label: string
  href: string
  icon?: string
}

export interface NavGroup {
  label: string
  href?: string
  items: NavItem[]
}

export const SIDEBAR_NAV: (NavItem | NavGroup)[] = [
  { label: "Dashboard", href: "/admin" },
  {
    label: "Home",
    items: [
      { label: "Hero", href: "/admin/home/hero" },
      { label: "About", href: "/admin/home/about" },
      { label: "Category Section", href: "/admin/home/category" },
      { label: "Stats", href: "/admin/home/stats" },
      { label: "Showcase", href: "/admin/home/showcase" },
    ],
  },
  {
    label: "Category",
    items: [
      { label: "Section", href: "/admin/category/section" },
      { label: "Categories", href: "/admin/category/categories" },
    ],
  },
  { label: "About", href: "/admin/about" },
  { label: "Products", href: "/admin/products" },
  { label: "Certificate", href: "/admin/certificate" },
  { label: "Contact", href: "/admin/contact" },
  { label: "Leads", href: "/admin/leads" },
]

export function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item && Array.isArray((item as NavGroup).items)
}
