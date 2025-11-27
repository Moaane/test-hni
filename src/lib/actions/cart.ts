"use server"

export type CartResponse = Awaited<ReturnType<typeof addCart>>

export async function addCart({
  userId,
  product: { id, quantity },
}: {
  userId: number
  product: {
    id: number
    quantity: number
  }
}): Promise<{
  success: boolean
  products:
    | [
        {
          id: number
          title: string
          price: number
          quantity: number
          total: number
          discountPercentage: number
          discountedPrice: number
          thumbnail: string
        }
      ]
    | undefined
}> {
  const response = await fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      products: [
        {
          id: id,
          quantity: quantity,
        },
      ],
    }),
  })

  if (!response.ok) {
    return {
      success: false,
      products: undefined,
    }
  }

  const result = await response.json()

  return {
    success: true,
    products: result.products,
  }
}
