import React from "react"
import { PublicLayoutClient } from "@/components/website/public-layout-client"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <PublicLayoutClient>{children}</PublicLayoutClient>
}
