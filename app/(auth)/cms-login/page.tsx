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
    <div className="relative h-screen p-8">
      <div className="grid h-full grid-cols-2 items-center gap-16">
        {/* Form Section */}
        <div className="flex p-18 flex-col gap-12">
          <div className="flex justify-center items-center">
            <Image
              src="/assets/logo.jpg"
              width={250}
              height={150}
              alt="logo"
            />
          </div>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <div className="relative border rounded-md border-[#e6ebf1]">
                <input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-none w-full p-4 outline-none transition-all duration-300
                    focus-within:ring-2
                    focus-within:ring-(--color-primary-purple)
                    focus-within:border-(--color-primary-purple)
                    focus-within:rounded-md"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="text-[#6b7180]" size={22} aria-hidden />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <div className="relative border rounded-md border-[#e6ebf1]">
                <input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-none w-full p-4 outline-none transition-all duration-300
                    focus-within:ring-2
                    focus-within:ring-(--color-primary-purple)
                    focus-within:border-(--color-primary-purple)
                    focus-within:rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Eye className="text-[#6b7180]" aria-hidden />
                  ) : (
                    <EyeOff className="text-[#6b7180]" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-(--color-primary-purple) text-lg font-bold tracking-wide cursor-pointer h-14 hover:bg-(--color-primary-purple-hover) disabled:opacity-70 disabled:cursor-not-allowed"
              size="lg"
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </div>
          {/* content */}
          <div className='rounded-2xl p-12 overflow-hidden relative h-full'>
             <div className="absolute z-20 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[26px_36px] mask-[radial-gradient(ellipse_80%_40%_at_50%_100%,#000_70%,transparent_110%)]"></div>
             <div className="absolute inset-0 bg-[linear-gradient(135deg,#f0f0ff_0%,#fffafd_100%)] pointer-events-none" />
             <div className='relative z-40'>
                <h2 className='text-3xl font-semibold text-primary'>Procure Export</h2>
                <div className='flex flex-col gap-4 mt-10'>
                    <h4 className='text-xl'>Sign in to your account</h4>
                    <h2 className='text-4xl font-semibold'>Welcome Back!</h2>
                    <p className='text-[#4c5663] w-11/12'>Please sign in to your account by completing the necessary fields below</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <LoginForm />
    </Suspense>
  )
}