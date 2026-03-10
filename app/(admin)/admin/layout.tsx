import React from "react"
import { redirect } from "next/navigation"
import { getAuth } from "@/auth"
import { AdminLayoutClient } from "@/components/cms/admin-layout-client"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuth()
  if (!session) {
    redirect("/cms-login?callbackUrl=/admin")
  }
  return (
    <div className="font-inter min-h-screen bg-[var(--color-primary-background)]">
      <AdminLayoutClient session={session}>{children}</AdminLayoutClient>
    </div>
  )
}
