"use server"

import { LoginSchema } from "@/schemas/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

export async function login({
  values,
}: {
  values: z.infer<typeof LoginSchema>
}) {
  try {
    const cookieStore = await cookies()
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        expiresInMins: 30,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message)
    }

    cookieStore.set("refresh-token", result.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    cookieStore.set("access-token", result.accessToken, {
      httpOnly: true,
      maxAge: 60 * 1,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    return { success: true }
  } catch (error: unknown) {
    throw error
  }
}

export async function updateToken(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh-token")?.value
  const accessToken = request.cookies.get("access-token")?.value

  if (!refreshToken)
    return NextResponse.redirect(new URL("/login", request.url))

  if (!accessToken || accessToken.trim().length === 0) {
    const response = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: refreshToken,
        expiresInMins: 1,
      }),
      credentials: "include",
    })

    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const result = await response.json()
    console.log("REFRESH TOKEN MANG")

    const res = NextResponse.next()
    res.cookies.set("access-token", result.accessToken, {
      httpOnly: true,
      maxAge: 60 * 1,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    res.cookies.set("refresh-token", result.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    return res
  }

  return NextResponse.next()
}

export async function logout() {
  const cookieStore = await cookies()

  cookieStore.delete("access-token")
  cookieStore.delete("refresh-token")

  redirect("/login")
}
