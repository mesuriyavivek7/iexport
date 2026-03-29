"use client"

import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { useContactUs, useUpdateContactUs } from "@/hooks"
import { normalizeContactEmails } from "@/lib/contact-emails"
import type { ContactPerson, SocialLinks } from "@/services"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Trash2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"
const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

const defaultContactPerson = (): ContactPerson => ({ name: "", mobileNo: "" })
const defaultSocialLinks = (): SocialLinks => ({ instagram: "", linkedin: "", facebook: "" })

function ContactPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className={`h-4 w-32 rounded ${sk}`} />
        <div className={`h-24 w-full rounded-lg ${sk}`} />
        <div className={`h-4 w-24 rounded ${sk}`} />
        <div className={`h-10 w-full rounded-lg ${sk}`} />
        <div className={`h-4 w-28 rounded ${sk}`} />
        <div className={`h-32 w-full rounded-lg ${sk}`} />
        <div className={`h-10 w-32 rounded-lg ${sk}`} />
      </div>
    </div>
  )
}

export default function ContactPage() {
  const { data, isLoading } = useContactUs()
  const updateContactUs = useUpdateContactUs()

  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([
    defaultContactPerson(),
    defaultContactPerson(),
  ])
  const [emails, setEmails] = useState<string[]>([""])
  const [points, setPoints] = useState<string[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(defaultSocialLinks())

  useEffect(() => {
    if (!data) return
    const raw = Array.isArray(data.contactPersons) ? data.contactPersons : []
    setContactPersons([...raw, defaultContactPerson(), defaultContactPerson()].slice(0, 2))
    const list = normalizeContactEmails(data.email, [])
    setEmails(list.length > 0 ? list : [""])
    setPoints(Array.isArray(data.points) ? [...data.points] : [])
    setSocialLinks({
      instagram: data.socialLinks?.instagram ?? "",
      linkedin: data.socialLinks?.linkedin ?? "",
      facebook: data.socialLinks?.facebook ?? "",
    })
  }, [data])

  const updateContactPerson = (index: number, field: keyof ContactPerson, value: string) =>
    setContactPersons((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })

  const addEmail = () => setEmails((prev) => [...prev, ""])
  const removeEmail = (index: number) =>
    setEmails((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)))
  const updateEmail = (index: number, value: string) =>
    setEmails((prev) => { const next = [...prev]; next[index] = value; return next })

  const addPoint = () => setPoints((prev) => [...prev, ""])
  const removePoint = (index: number) => setPoints((prev) => prev.filter((_, i) => i !== index))
  const updatePoint = (index: number, value: string) =>
    setPoints((prev) => { const next = [...prev]; next[index] = value; return next })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailList = emails.map((e) => e.trim()).filter(Boolean)
    if (emailList.length === 0) {
      toast.error("Add at least one contact email.")
      return
    }
    updateContactUs.mutate({
      contactPersons,
      email: emailList,
      points: points.filter((p) => p.trim()),
      socialLinks: {
        instagram: socialLinks.instagram?.trim() || undefined,
        linkedin: socialLinks.linkedin?.trim() || undefined,
        facebook: socialLinks.facebook?.trim() || undefined,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage contact persons, email, service points, and social links.
        </p>
      </div>

      {isLoading ? (
        <ContactPageSkeleton />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact persons */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact persons (2)</h3>
            <div className="space-y-4">
              {contactPersons.map((person, index) => (
                <div key={index} className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-3 sm:flex-row sm:items-center sm:gap-4">
                  <div className="min-w-0 flex-1 space-y-2 sm:flex sm:gap-4 sm:space-y-0">
                    <div className="min-w-0 flex-1">
                      <label className={labelClass}>Name</label>
                      <input type="text" value={person.name} onChange={(e) => updateContactPerson(index, "name", e.target.value)} placeholder="e.g. Patel Jainish" className={inputClass} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label className={labelClass}>Mobile no</label>
                      <input type="text" value={person.mobileNo} onChange={(e) => updateContactPerson(index, "mobileNo", e.target.value)} placeholder="e.g. +91 6355007570" className={inputClass} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emails */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Contact emails</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Add or remove addresses. At least one valid email is required to save.
                </p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addEmail} className="gap-1 shrink-0">
                <Plus className="size-4" />Add email
              </Button>
            </div>
            <div className="space-y-2">
              {emails.map((value, index) => (
                <div key={`email-${index}`} className="flex gap-2">
                  <input
                    type="email"
                    id={index === 0 ? "contact-email-0" : undefined}
                    autoComplete="email"
                    value={value}
                    onChange={(e) => updateEmail(index, e.target.value)}
                    placeholder={index === 0 ? "e.g. procureexport24@gmail.com" : `Email ${index + 1}`}
                    className={inputClass}
                    aria-label={`Contact email ${index + 1}`}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeEmail(index)} disabled={emails.length <= 1} aria-label={`Remove email ${index + 1}`} className="shrink-0">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Points */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Service points</h3>
              <Button type="button" variant="outline" size="sm" onClick={addPoint} className="gap-1">
                <Plus className="size-4" />Add
              </Button>
            </div>
            <div className="space-y-2">
              {points.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={point} onChange={(e) => updatePoint(index, e.target.value)} placeholder={`Point ${index + 1}`} className={inputClass} />
                  <Button type="button" variant="outline" size="icon" onClick={() => removePoint(index)} aria-label="Remove point" className="shrink-0">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Social links</h3>
            <div className="space-y-4">
              {[
                { id: "social-instagram", key: "instagram" as const, label: "Instagram URL", placeholder: "https://www.instagram.com/..." },
                { id: "social-linkedin", key: "linkedin" as const, label: "LinkedIn URL", placeholder: "https://www.linkedin.com/..." },
                { id: "social-facebook", key: "facebook" as const, label: "Facebook URL", placeholder: "https://www.facebook.com/..." },
              ].map(({ id, key, label, placeholder }) => (
                <div key={key} className="space-y-2">
                  <label htmlFor={id} className={labelClass}>{label}</label>
                  <input id={id} type="url" value={socialLinks[key] ?? ""} onChange={(e) => setSocialLinks((prev) => ({ ...prev, [key]: e.target.value }))} placeholder={placeholder} className={inputClass} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-6">
            <Button type="submit" disabled={updateContactUs.isPending} className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]">
              {updateContactUs.isPending ? <><Loader2 className="size-4 shrink-0 animate-spin" /><span>Saving…</span></> : "Save changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
