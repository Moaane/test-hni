import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const montserratSans = Montserrat({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "E-commerce Store",
  description:
    "Shop your favorite products, manage your cart, and enjoy a personalized online shopping experience.",
  keywords: ["ecommerce", "shop", "online store", "products", "cart"],
  authors: [{ name: "E-commerce Team" }],
  openGraph: {
    title: "E-commerce Store",
    description:
      "Shop your favorite products, manage your cart, and enjoy a personalized online shopping experience.",
    url: "https://www.example.com",
    siteName: "E-commerce Store",
    images: [
      {
        url: "https://www.example.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "E-commerce Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Store",
    description:
      "Shop your favorite products, manage your cart, and enjoy a personalized online shopping experience.",
    images: ["https://www.example.com/images/og-banner.jpg"],
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserratSans.variable} antialiased`}>
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  )
}
