"use client"

import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  getContactUs,
  updateContactUs,
  type ContactPerson,
  type ContactUsPayload,
  type SocialLinks,
} from "@/services"
import { normalizeContactEmails } from "@/lib/contact-emails"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Trash2 } from "lucide-react"

const sk = "animate-pulse bg-gray-300"

function ContactPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-8 w-48 rounded-md ${sk}`} />
      <div className="space-y-4">
        <div className={`h-4 w-32 rounded ${sk}`} />
        <div className={`h-24 w-full rounded-lg ${sk}`} />
        <div className={`h-4 w-24 rounded ${sk}`} />
        <div className={`h-10 w-full rounded-lg ${sk}`} />
        <div className={`h-4 w-28 rounded ${sk}`} />
        <div className={`h-32 w-full rounded-lg ${sk}`} />
        <div className={`h-4 w-24 rounded ${sk}`} />
        <div className={`h-10 w-full rounded-lg ${sk}`} />
        <div className={`h-10 w-32 rounded-lg ${sk}`} />
      </div>
    </div>
  )
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--color-primary-purple)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-purple)]"
const labelClass = "block text-sm font-medium text-foreground"

const defaultContactPerson = (): ContactPerson => ({ name: "", mobileNo: "" })
const defaultSocialLinks = (): SocialLinks => ({
  instagram: "",
  linkedin: "",
  facebook: "",
})

export default function ContactPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([
    defaultContactPerson(),
    defaultContactPerson(),
  ])
  const [emails, setEmails] = useState<string[]>([""])
  const [points, setPoints] = useState<string[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(defaultSocialLinks())

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const data = await getContactUs()
      if (cancelled) return
      setLoading(false)
      if (data) {
        const raw = Array.isArray(data.contactPersons) ? data.contactPersons : []
        const two = [...raw, defaultContactPerson(), defaultContactPerson()].slice(0, 2)
        setContactPersons(two)
        {
          const list = normalizeContactEmails(data.email, [])
          setEmails(list.length > 0 ? list : [""])
        }
        setPoints(Array.isArray(data.points) ? [...data.points] : [])
        setSocialLinks({
          instagram: data.socialLinks?.instagram ?? "",
          linkedin: data.socialLinks?.linkedin ?? "",
          facebook: data.socialLinks?.facebook ?? "",
        })
      } else {
        setContactPersons([defaultContactPerson(), defaultContactPerson()])
        setEmails([""])
        setPoints([])
        setSocialLinks(defaultSocialLinks())
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const updateContactPerson = (
    index: number,
    field: keyof ContactPerson,
    value: string
  ) =>
    setContactPersons((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })

  const addEmail = () => setEmails((prev) => [...prev, ""])
  const removeEmail = (index: number) =>
    setEmails((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)))
  const updateEmail = (index: number, value: string) =>
    setEmails((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })

  const addPoint = () => setPoints((prev) => [...prev, ""])
  const removePoint = (index: number) =>
    setPoints((prev) => prev.filter((_, i) => i !== index))
  const updatePoint = (index: number, value: string) =>
    setPoints((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const emailList = emails.map((e) => e.trim()).filter(Boolean)
      if (emailList.length === 0) {
        toast.error("Add at least one contact email.")
        setSaving(false)
        return
      }
      const payload: ContactUsPayload = {
        contactPersons,
        email: emailList,
        points: points.filter((p) => p.trim()),
        socialLinks: {
          instagram: socialLinks.instagram?.trim() || undefined,
          linkedin: socialLinks.linkedin?.trim() || undefined,
          facebook: socialLinks.facebook?.trim() || undefined,
        },
      }
      const result = await updateContactUs(payload)
      if (result.success) {
        toast.success("Contact details updated successfully.")
      } else {
        toast.error(result.error ?? "Update failed.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage contact persons, email, service points, and social links.
          </p>
        </div>
        <ContactPageSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage contact persons, email, service points, and social links.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact persons (always 2) */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Contact persons (2)</h3>
          <div className="space-y-4">
            {contactPersons.map((person, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="min-w-0 flex-1 space-y-2 sm:flex sm:gap-4 sm:space-y-0">
                  <div className="min-w-0 flex-1">
                    <label className={labelClass}>Name</label>
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) =>
                        updateContactPerson(index, "name", e.target.value)
                      }
                      placeholder="e.g. Patel Jainish"
                      className={inputClass}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <label className={labelClass}>Mobile no</label>
                    <input
                      type="text"
                      value={person.mobileNo}
                      onChange={(e) =>
                        updateContactPerson(index, "mobileNo", e.target.value)
                      }
                      placeholder="e.g. +91 6355007570"
                      className={inputClass}
                    />
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addEmail}
              className="gap-1 shrink-0"
            >
              <Plus className="size-4" />
              Add email
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
                  placeholder={
                    index === 0
                      ? "e.g. procureexport24@gmail.com"
                      : `Email ${index + 1}`
                  }
                  className={inputClass}
                  aria-label={`Contact email ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeEmail(index)}
                  disabled={emails.length <= 1}
                  aria-label={`Remove email ${index + 1}`}
                  className="shrink-0"
                >
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
              <Plus className="size-4" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {points.map((point, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => updatePoint(index, e.target.value)}
                  placeholder={`Point ${index + 1}`}
                  className={inputClass}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removePoint(index)}
                  aria-label="Remove point"
                  className="shrink-0"
                >
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
            <div className="space-y-2">
              <label htmlFor="social-instagram" className={labelClass}>
                Instagram URL
              </label>
              <input
                id="social-instagram"
                type="url"
                value={socialLinks.instagram ?? ""}
                onChange={(e) =>
                  setSocialLinks((prev) => ({ ...prev, instagram: e.target.value }))
                }
                placeholder="https://www.instagram.com/..."
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="social-linkedin" className={labelClass}>
                LinkedIn URL
              </label>
              <input
                id="social-linkedin"
                type="url"
                value={socialLinks.linkedin ?? ""}
                onChange={(e) =>
                  setSocialLinks((prev) => ({ ...prev, linkedin: e.target.value }))
                }
                placeholder="https://www.linkedin.com/..."
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="social-facebook" className={labelClass}>
                Facebook URL
              </label>
              <input
                id="social-facebook"
                type="url"
                value={socialLinks.facebook ?? ""}
                onChange={(e) =>
                  setSocialLinks((prev) => ({ ...prev, facebook: e.target.value }))
                }
                placeholder="https://www.facebook.com/..."
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border pt-6">
          <Button
            type="submit"
            disabled={saving}
            className="gap-2 bg-[var(--color-primary-purple)] hover:bg-[var(--color-primary-purple-hover)]"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 shrink-0 animate-spin" />
                <span>Saving…</span>
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
