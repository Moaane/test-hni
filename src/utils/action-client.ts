"use client"

export function saveToLocalCart(product: {
  id: number
  title: string
  price: number
  quantity: number
  thumbnail: string
  discountPercentage: number
  discountedPrice: number
}) {
  const stored = localStorage.getItem("cart")
  const cart = stored ? JSON.parse(stored) : { items: [] }

  const existing = cart.items.find((i: any) => i.productId === product.id)

  if (existing) {
    existing.qty += product.quantity
  } else {
    const lastId =
      cart.items.length > 0 ? cart.items[cart.items.length - 1].id : 0

    const newItem = {
      id: lastId + 1,
      productId: product.id,
      title: product.title,
      price: product.price,
      qty: product.quantity,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage,
      discountedPrice: product.discountedPrice,
    }

    cart.items.push(newItem)
  }

  localStorage.setItem("cart", JSON.stringify(cart))

  return cart
}

export function getLocalCart() {
  const stored = localStorage.getItem("cart")
  return stored ? JSON.parse(stored) : { items: [] }
}

export function updateLocalCart(items: any[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("cart", JSON.stringify({ items }))
}

export function removeCartItem(id: number) {
  const cart = getLocalCart()
  const filtered = cart.items.filter((i: any) => i.id !== id)
  updateLocalCart(filtered)
  return filtered
}

export function updateCartQty(id: number, qty: number) {
  const cart = getLocalCart()
  const updated = cart.items.map((item: any) =>
    item.id === id ? { ...item, qty } : item
  )
  updateLocalCart(updated)
  return updated
}
