import { apiFetch } from "./api"

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user?: { id?: string; email?: string; [key: string]: unknown }
  id?: string
  email?: string
  [key: string]: unknown
}

/** Backend error shape when login fails */
export interface LoginErrorResponse {
  message?: string
  status?: boolean
}

export type LoginResult =
  | { success: true; data: LoginResponse }
  | { success: false; message: string }

export async function login(
  credentials: LoginCredentials
): Promise<LoginResult> {
  const { data, ok } = await apiFetch<LoginResponse & LoginErrorResponse>(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(credentials),
    }
  )
  if (!ok) {
    const message =
      (data as LoginErrorResponse).message ?? "Invalid email or password."
    return { success: false, message }
  }
  return { success: true, data: data as LoginResponse }
}
