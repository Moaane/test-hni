"use server"

import { IProduct } from "@/interfaces/product"

export async function findAllProducts({
  query,
  meta,
  category,
}: {
  query?: string
  meta: { total: number; skip: number; limit: number }
  category?: string
}): Promise<{
  success: boolean
  data: IProduct[] | []
  meta: { total: number; skip: number; limit: number }
}> {
  const params = new URLSearchParams({
    limit: meta.limit.toString(),
    skip: meta.skip.toString(),
    select: "id,title,price,stock,thumbnail,rating,category",
  })

  const hasCategory = category && category.length > 0
  const hasQuery = query && query.length > 0

  if (hasQuery) {
    params.set("q", query as string)
  }

  const endpoint = hasCategory
    ? `https://dummyjson.com/products/category/${category}`
    : hasQuery
    ? "https://dummyjson.com/products/search"
    : "https://dummyjson.com/products"

  const response = await fetch(`${endpoint}?${params.toString()}`)

  if (!response.ok) {
    return { success: false, data: [], meta: { total: 0, skip: 0, limit: 0 } }
  }

  const { products, total, limit, skip } = await response.json()

  return {
    success: true,
    data: products,
    meta: {
      total,
      limit,
      skip,
    },
  }
}

export async function findAllProductCategories(): Promise<{
  success: boolean
  categories: string[] | []
}> {
  const response = await fetch("https://dummyjson.com/products/category-list", {
    method: "GET",
  })

  if (!response.ok) {
    return {
      success: false,
      categories: [],
    }
  }

  const result = await response.json()

  return {
    success: true,
    categories: result,
  }
}

export async function findProduct({
  productId,
}: {
  productId: string
}): Promise<{ success: boolean; product: IProduct | undefined }> {
  const response = await fetch(`https://dummyjson.com/products/${productId}`)

  if (!response.ok) {
    return {
      success: false,
      product: undefined,
    }
  }

  const result = await response.json()

  return {
    success: true,
    product: result,
  }
}
