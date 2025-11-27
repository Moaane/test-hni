"use client"

import { IUser } from "@/interfaces/user"
import { createContext, ReactNode, useContext } from "react"

interface UserContextProps {
  user: IUser
}

const UserContext = createContext<UserContextProps | null>(null)

export function UserProvider({
  children,
  value,
}: {
  children: ReactNode
  value: UserContextProps
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
