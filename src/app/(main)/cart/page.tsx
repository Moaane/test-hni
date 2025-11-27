"use client"

import { CartItem } from "@/components/cart/cart-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ICart } from "@/interfaces/cart"
import { getLocalCart } from "@/utils/action-client"
import Link from "next/link"
import { useEffect, useState } from "react"

function CartSkeleton() {
  return (
    <div className="py-4 space-y-4">
      <div className="flex gap-y-6 lg:gap-y-0 flex-col lg:flex-row justify-between items-start">
        {/* Left – Image & Title */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        {/* Right – Price & Actions */}
        <div className="flex flex-row lg:flex-col items-end justify-between lg:justify-normal w-full gap-4">
          <div className="text-right space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-md" /> {/* Trash Button */}
            <Skeleton className="h-10 w-24 rounded-md" /> {/* Quantity Group */}
          </div>
        </div>
      </div>

      <Skeleton className="h-px w-full" />
    </div>
  )
}

export default function CartPage() {
  const [products, setProducts] = useState<ICart[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = getLocalCart()
      setProducts(stored.items)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="mt-6 space-y-6 pb-12">
      <h1 className="text-lg lg:text-2xl font-semibold">Cart</h1>
      <Card>
        <CardContent>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="space-y-4">
                <CartSkeleton />
              </div>
            ))
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-6xl">😕</p>
              <p className="text-gray-500 text-lg">Your cart is empty.</p>
              <Link href="/">
                <Button variant="default">Go to Products</Button>
              </Link>
            </div>
          ) : (
            products.map((p) => (
              <CartItem key={p.id} p={p} onUpdate={setProducts} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
