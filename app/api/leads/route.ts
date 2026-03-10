import { NextResponse } from "next/server"

const getBaseUrl = () =>
  process.env.BACKEND_URL || "http://localhost:5020"

export async function GET() {
  try {
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const res = await fetch(`${baseUrl}/api/leads`, { cache: "no-store" })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      )
    }
    const { name, email, message } = body as { name?: string; email?: string; message?: string }
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required" },
        { status: 400 }
      )
    }
    const baseUrl = getBaseUrl().replace(/\/$/, "")
    const res = await fetch(`${baseUrl}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to submit inquiry" },
      { status: 500 }
    )
  }
}
