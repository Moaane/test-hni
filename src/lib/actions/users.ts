"use server"

import { IUser } from "@/interfaces/user"
import { cookies } from "next/headers"

export async function findUserByToken(): Promise<{
  success: boolean
  data: IUser | null
}> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access-token")?.value

  const response = await fetch(
    "https://dummyjson.com/auth/me?select=firstName",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )

  if (!response.ok) {
    return { success: false, data: null }
  }

  const result = await response.json()

  const { password, ...userWithoutPassword } = result

  return { success: true, data: userWithoutPassword }
}
