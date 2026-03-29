/**
 * Normalize contact email from API (array) or legacy single string.
 */
export function normalizeContactEmails(
  email: string | string[] | undefined,
  fallback: string[]
): string[] {
  if (Array.isArray(email)) {
    const list = email.map((e) => String(e).trim()).filter(Boolean)
    return list.length > 0 ? list : fallback
  }
  if (typeof email === "string" && email.trim()) {
    return [email.trim()]
  }
  return fallback
}
