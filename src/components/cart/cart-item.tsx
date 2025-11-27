"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "../ui/input-group"
import { Separator } from "../ui/separator"
import { ICart } from "@/interfaces/cart"
import { Button } from "../ui/button"
import { debounce } from "@/utils/debounce"
import { removeCartItem, updateCartQty } from "@/utils/action-client"

interface ComponentProps {
  p: ICart
  onUpdate: (newItems: ICart[]) => void
}

export function CartItem({ p, onUpdate }: ComponentProps) {
  const finalPrice = Math.ceil(p.price - (p.price * p.discountPercentage) / 100)
  const [quantity, setQuantity] = useState<number>(p.qty)

  const debouncedQtyUpdate = useMemo(
    () =>
      debounce((newQty: number) => {
        const updated = updateCartQty(p.id, newQty)
        onUpdate(updated)
      }, 400),
    [p.id, onUpdate]
  )

  const handleQtyChange = (newQty: number) => {
    setQuantity(newQty)
    debouncedQtyUpdate(newQty)
  }

  const handleDelete = () => {
    const updated = removeCartItem(p.id)
    onUpdate(updated)
  }

  return (
    <div className="py-2 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Image
            height={120}
            width={120}
            src={p.thumbnail}
            alt={p.title}
            className="border rounded-lg"
          />
          <p className="text-lg font-medium">{p.title}</p>
        </div>

        {/* Price */}
        <div className="lg:gap-6 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-normal">
          <div className="text-right gap-2 lg:gap-1 flex flex-row lg:flex-col items-end">
            <p className="text-lg font-semibold">${finalPrice}</p>
            <p className="text-sm text-muted-foreground line-through">
              ${p.price}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={handleDelete}>
              <Trash className="text-muted-foreground" />
            </Button>

            <InputGroup className="w-fit">
              <InputGroupAddon>
                <InputGroupButton
                  disabled={quantity <= 1}
                  onClick={() => handleQtyChange(quantity - 1)}
                >
                  <Minus />
                </InputGroupButton>

                {quantity}

                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={() => handleQtyChange(quantity + 1)}
                  >
                    <Plus />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>

      <Separator />
    </div>
  )
}
