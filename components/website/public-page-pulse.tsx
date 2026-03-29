/**
 * Same visual as app/(public)/loading.tsx — used inside client pages during query loading.
 */
export function PublicPagePulse() {
  return (
    <div
      className="min-h-[40vh] w-full animate-pulse bg-[var(--color-primary-background)]/50"
      aria-hidden
    />
  )
}
