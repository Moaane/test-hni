"use client"

import { ArrowLeft, LogOut, ShoppingCart } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import Image from "next/image"
import NavbarSearch from "./navbar-search"
import { useUser } from "../providers/user-provider"
import Link from "next/link"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/actions/auth"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
  const data = useUser()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
  }

  const handleBack = () => {
    router.back()
  }

  const outsideHome = pathname === "/"

  return (
    <nav className="py-4 border-b sticky top-0 bg-background z-50 container max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 lg:gap-6 w-full">
          <Link href="/" className="hidden md:block">
            <Image
              src="/images/logo.png"
              height={44}
              width={44}
              alt="logo ecommerce"
              className="h-auto mb-2"
            />
          </Link>

          <Button
            size="icon"
            variant="secondary"
            className={outsideHome ? "hidden" : ""}
            onClick={handleBack}
          >
            <ArrowLeft className="size-5" />
          </Button>

          <NavbarSearch />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="secondary" size="icon">
              <ShoppingCart className="size-5" />
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={data?.user.image}
                    alt={`${data?.user.firstName} profile picture`}
                  />
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                {/* <DropdownMenuSeparator /> */}

                {/* <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/billing">Billing</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/team">Team</Link>
                </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => handleLogout()}
                >
                  <LogOut className="mr-2 h-4 w-4 text-destructive" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
