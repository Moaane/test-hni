"use server"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refresh-token")?.value

  if (!refreshToken) return NextResponse.redirect("/login")

  const response = await fetch("https://dummyjson.com/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken: refreshToken,
      expiresInMins: 30,
    }),
    credentials: "include",
  })

  const result = await response.json()

  if (!response.ok) return NextResponse.redirect("/login")

  const res = NextResponse.json({ success: true, data: result })
  res.cookies.set("access-token", result.accessToken, {
    httpOnly: true,
    maxAge: 60 * 1,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })

  res.cookies.set("refresh-token", result.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 3,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })

  return res
}
