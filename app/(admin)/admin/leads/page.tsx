"use client"

import React, { useMemo, useState } from "react"
import { useLeads } from "@/hooks"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const sk = "animate-pulse bg-gray-300"

function LeadsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className={`h-9 w-64 rounded-md ${sk}`} />
      <div className="rounded-lg border border-border">
        <div className={`h-10 border-b border-border ${sk}`} />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-14 border-b border-border last:border-0 ${sk}`} />
        ))}
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

export default function LeadsPage() {
  const { data: leads = [], isLoading } = useLeads()
  const [search, setSearch] = useState("")

  const filteredLeads = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return leads
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.message.toLowerCase().includes(q)
    )
  }, [leads, search])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Leads</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          View leads submitted from the website contact form.
        </p>
      </div>

      {isLoading ? (
        <LeadsTableSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email, or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                aria-label="Search leads"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}
              {search.trim() && ` (filtered from ${leads.length})`}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card">
            {filteredLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  {search.trim()
                    ? "No leads match your search."
                    : "No leads yet. Submissions from the contact form will appear here."}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">Name</TableHead>
                    <TableHead className="w-[200px]">Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="w-[160px] text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead._id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-[var(--color-primary-purple)] hover:underline"
                        >
                          {lead.email}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-md truncate" title={lead.message}>
                        {lead.message}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatDate(lead.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </>
      )}
    </div>
  )
}
