"use client"

import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "../ui/input-group"
import { Button } from "../ui/button"
import { useState } from "react"
import { addCart } from "@/lib/actions/cart"
import { useUser } from "../providers/user-provider"
import { notFound } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import { saveToLocalCart } from "@/utils/action-client"
import Link from "next/link"

interface ComponentProps {
  title: string
  thumbnail: string
  price: number
  productId: number
}

export default function ProductAddToCart({
  price,
  productId,
  title,
  thumbnail,
}: ComponentProps) {
  const data = useUser()
  const [quantity, setQuantity] = useState<number>(1)
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  if (!data || !data?.user.id) {
    return notFound()
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true)
    try {
      e.preventDefault()

      const response = await addCart({
        product: {
          id: productId,
          quantity: quantity,
        },
        userId: data?.user.id as number,
      })

      if (response.success && response.products) {
        const p = response.products[0]

        saveToLocalCart({
          id: p.id,
          title: p.title,
          price: p.price,
          discountedPrice: p.discountedPrice,
          discountPercentage: p.discountPercentage,
          quantity: p.quantity,
          thumbnail: p.thumbnail,
        })
        setOpen(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center justify-between">
          <p>Quantity</p>
          <InputGroup className="w-fit">
            <InputGroupAddon>
              <InputGroupButton
                disabled={quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <Minus />
              </InputGroupButton>
              {quantity}
              <InputGroupAddon align="inline-end">
                <InputGroupButton onClick={() => setQuantity(quantity + 1)}>
                  <Plus />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex items-center justify-between">
          <p>Total:</p>
          <p className="text-lg font-semibold">${price * quantity}</p>
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Adding item to cart
            </>
          ) : (
            <>
              <ShoppingCart /> Add to cart
            </>
          )}
        </Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="lg:min-w-xl">
          <DialogHeader>
            <DialogTitle className="text-left">Item added to cart</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
            <div className="flex items-center gap-2 lg:gap-6">
              <Image src={thumbnail} height={64} width={64} alt="product image" />
              <p className="font-medium">{title}</p>
            </div>

            <Link href="/cart">
              <Button size="lg" className="w-full lg:w-fit">
                <ShoppingCart /> View Cart
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
