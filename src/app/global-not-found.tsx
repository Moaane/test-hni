import "./globals.css"
import { Montserrat } from "next/font/google"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const montserratSans = Montserrat({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={montserratSans.className}>
      <body>
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Oops! Page not found.
          </h2>
          <p className="text-gray-500 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/">
            <Button variant="default">Go Back Home</Button>
          </Link>
        </div>
      </body>
    </html>
  )
}
