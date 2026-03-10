"use client"

import React, { useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { AdminNavbar } from "./admin-navbar"
import { AdminSidebarAside, AdminSidebarDrawer } from "./admin-sidebar"
import type { Session } from "next-auth"

interface AdminLayoutClientProps {
  session: Session
  children: React.ReactNode
}

export function AdminLayoutClient({ session, children }: AdminLayoutClientProps) {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <div className="flex h-screen flex-col lg:flex-row">
        <AdminSidebarAside />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <AdminNavbar
            userName={session.user?.name ?? session.user?.email}
            userImage={session.user?.image}
            menuTrigger={
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
            }
          />
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <SheetContent side="left" className="w-64 p-0">
        <AdminSidebarDrawer onClose={() => setSheetOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
