"use client"

import React from "react"
import { signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AdminNavbarProps {
  /** Optional user name for avatar fallback */
  userName?: string | null
  userImage?: string | null
  /** Optional slot for sidebar toggle (e.g. hamburger), rendered to the left of the Dashboard heading */
  menuTrigger?: React.ReactNode
}

export function AdminNavbar({ userName, userImage, menuTrigger }: AdminNavbarProps) {
  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?"

  return (
    <header
      className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 lg:px-6"
      role="banner"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {menuTrigger}
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[var(--color-primary-purple)]"
            aria-label="Open profile menu"
          >
            <Avatar className="size-8 cursor-pointer border-2 border-border">
              <AvatarImage src={userImage ?? undefined} alt={userName ?? ""} />
              <AvatarFallback className="bg-[var(--color-primary-purple)]/20 text-[var(--color-primary-purple)] text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onSelect={() => signOut({ callbackUrl: "/cms-login" })}
              className="text-destructive focus:text-destructive"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
