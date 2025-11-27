import Navbar from "@/components/navigations/navbar"
import { UserProvider } from "@/components/providers/user-provider"
import { findUserByToken } from "@/lib/actions/users"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default async function HomeLayout({ children }: LayoutProps) {
  const { data, success } = await findUserByToken()

  if (!success || !data) {
    redirect("/login")
  }

  return (
    <UserProvider value={{ user: data }}>
      <main>
        <Navbar />
        <div className="container max-w-7xl mx-auto">{children}</div>
      </main>
    </UserProvider>
  )
}
