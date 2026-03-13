"use client"
import React, { Suspense, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Mail, Eye, EyeOff } from "lucide-react"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin"
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      })
      if (result?.ok && result.url) {
        router.push(result.url)
        return
      }
      setError(result?.error ?? "Invalid email or password")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden bg-[#fafbfc]">
      <div className="mx-auto grid min-h-dvh w-full max-w-6xl grid-cols-1 items-stretch gap-0 md:grid-cols-2 md:gap-0 md:items-center md:py-6 lg:gap-8 lg:py-8">
        {/* Brand / welcome — compact banner on mobile, right panel on desktop */}
        <div className="order-1 md:order-2 md:flex md:min-h-[min(100dvh,640px)] md:items-stretch md:p-4 lg:p-6">
          <div className="relative min-h-[180px] overflow-hidden rounded-none bg-[linear-gradient(135deg,#f0f0ff_0%,#fffafd_100%)] px-5 py-8 sm:min-h-[200px] sm:px-8 md:min-h-full md:flex-1 md:rounded-2xl md:px-8 md:py-12 lg:p-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[length:26px_36px] mask-[radial-gradient(ellipse_80%_40%_at_50%_100%,#000_70%,transparent_110%)] md:rounded-2xl"
              aria-hidden
            />
            <div className="relative z-10 flex h-full flex-col justify-center">
              <h2 className="text-lg font-semibold text-primary sm:text-xl">
                Procure Export
              </h2>
              <div className="mt-3 flex flex-col gap-2 sm:mt-6 sm:gap-3">
                <p className="text-sm font-medium text-muted-foreground sm:text-base">
                  Sign in to your account
                </p>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                  Welcome back
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-[#4c5663] sm:text-base">
                  Please sign in by completing the fields below.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form — full width on mobile, left column on desktop */}
        <div className="order-2 flex flex-col justify-center px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-6 md:order-1 md:px-8 md:py-10 lg:px-12 lg:py-12">
          <div className="mx-auto flex w-full max-w-md flex-col gap-6 sm:gap-8 md:max-w-lg">
            <div className="flex justify-center">
              <Image
                src="/assets/logo.jpg"
                width={250}
                height={150}
                alt="Procure Export logo"
                className="h-auto w-[180px] object-contain sm:w-[220px] md:w-[250px]"
                priority
              />
            </div>
            <form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleSubmit}>
              {error && (
                <div
                  className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 sm:px-4 sm:py-3"
                  role="alert"
                >
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative rounded-md border border-[#e6ebf1] bg-white shadow-sm">
                  <input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="min-h-12 w-full rounded-md border-none bg-transparent px-4 py-3 pr-12 text-base outline-none transition-all focus-visible:ring-2 focus-visible:ring-(--color-primary-purple) sm:min-h-14 sm:p-4"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 sm:right-4">
                    <Mail className="text-[#6b7180]" size={20} aria-hidden />
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative rounded-md border border-[#e6ebf1] bg-white shadow-sm">
                  <input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="min-h-12 w-full rounded-md border-none bg-transparent px-4 py-3 pr-12 text-base outline-none transition-all focus-visible:ring-2 focus-visible:ring-(--color-primary-purple) sm:min-h-14 sm:p-4"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-[#6b7180] hover:bg-gray-100 sm:right-3"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <Eye size={20} aria-hidden />
                    ) : (
                      <EyeOff size={20} aria-hidden />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="min-h-12 w-full cursor-pointer bg-(--color-primary-purple) text-base font-bold tracking-wide hover:bg-(--color-primary-purple-hover) disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-14 sm:text-lg"
                size="lg"
              >
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-[#fafbfc] px-4">
          <p className="text-sm text-muted-foreground sm:text-base">Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
