"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Home,
  FolderTree,
  Info,
  Package,
  Award,
  MessageCircle,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { SIDEBAR_NAV, isNavGroup } from "@/config/sidebar-nav"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dashboard: LayoutDashboard,
  Home: Home,
  Category: FolderTree,
  About: Info,
  Products: Package,
  Certificate: Award,
  Contact: MessageCircle,
  Leads: Users,
}

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2 px-2 py-4">
      {SIDEBAR_NAV.map((item) => {
        if (isNavGroup(item)) {
          return (
            <NavGroup
              key={item.label}
              group={item}
              pathname={pathname}
              onNavClick={onNavClick}
            />
          )
        }
        const Icon = iconMap[item.label]
        const isActive = pathname === item.href
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-[var(--color-primary-purple)] text-white"
                : "text-foreground/80 hover:bg-[var(--color-primary-purple-hover)]/15 hover:text-foreground"
            )}
          >
            {Icon && <Icon className="size-5 shrink-0" />}
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function NavGroup({
  group,
  pathname,
  onNavClick,
}: {
  group: { label: string; items: { label: string; href: string }[] }
  pathname: string
  onNavClick?: () => void
}) {
  const [open, setOpen] = useState(
    () => group.items.some((i) => pathname === i.href) || pathname.startsWith(
      group.label === "Home" ? "/admin/home" : "/admin/category"
    )
  )
  const Icon = iconMap[group.label]

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          "text-foreground/80 hover:bg-[var(--color-primary-purple-hover)]/15 hover:text-foreground"
        )}
      >
        <span className="flex items-center gap-3">
          {Icon && <Icon className="size-5 shrink-0" />}
          {group.label}
        </span>
        {open ? (
          <ChevronDown className="size-4 shrink-0" aria-hidden />
        ) : (
          <ChevronRight className="size-4 shrink-0" aria-hidden />
        )}
      </button>
      {open && (
        <div className="ml-4 flex flex-col border-l border-border/60 pl-2">
          {group.items.map((sub) => {
            const isActive = pathname === sub.href
            return (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onNavClick}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-[var(--color-primary-purple)] text-white font-medium"
                    : "text-muted-foreground hover:bg-[var(--color-primary-purple-hover)]/10 hover:text-foreground"
                )}
              >
                {sub.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Desktop sidebar (always visible on lg+) */
export function AdminSidebarAside() {
  return (
    <aside
      className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex"
      aria-label="Admin navigation"
    >
      <div className="flex h-20 items-center justify-center gap-2 px-4">
        <Image src="/assets/logo.jpg" width={150} height={100} alt="Logo" />
      </div>
      <SidebarContent />
    </aside>
  )
}

/** Mobile drawer content (used inside SheetContent) */
export function AdminSidebarDrawer({ onClose }: { onClose?: () => void }) {
  return (
    <>
      <div className="flex h-14 items-center border-b border-border px-4">
        <span className="font-semibold text-foreground">CMS</span>
      </div>
      <SidebarContent onNavClick={onClose} />
    </>
  )
}

