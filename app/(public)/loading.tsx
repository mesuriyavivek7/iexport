/**
 * Minimal loading UI for public routes.
 * With cached server data and Link prefetch, this rarely shows;
 * when it does, we avoid a spinner for a calmer UX.
 */
export default function PublicLoading() {
  return (
    <div className="min-h-[40vh] w-full animate-pulse bg-[var(--color-primary-background)]/50" aria-hidden />
  )
}
