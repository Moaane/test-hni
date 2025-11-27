"use client"

import { IProduct } from "@/interfaces/product"
import { findAllProducts } from "@/lib/actions/products"
import { useEffect, useState } from "react"
import ProductCard from "./product-card"
import ProductCardSkeleton from "./product-card-skeleton"
import ProductFiltersDrawer from "./product-filters-drawer"
import Image from "next/image"

interface ComponentProps {
  query?: string
  priceMin?: number
  priceMax?: number
  category?: string
  rating?: boolean
}

export default function ProductList({
  query,
  priceMin,
  priceMax,
  category,
  rating,
}: ComponentProps) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [meta, setMeta] = useState<{
    total: number
    skip: number
    limit: number
  }>({ total: 0, skip: 0, limit: 50 })
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const fetchProducts = async (customSkip?: number) => {
    const currentSkip = customSkip !== undefined ? customSkip : meta.skip

    if (loading || (!hasMore && customSkip === undefined)) return
    setLoading(true)
    try {
      const currentMeta = { ...meta, skip: currentSkip }
      const response = await findAllProducts({
        meta: currentMeta,
        query,
        category,
      })

      if (response.success) {
        let newData = response.data

        if (rating) {
          newData = newData.filter((p) => p.rating > 4)
        }

        if (query && category) {
          newData = newData.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
          )
        }
        if (priceMin !== undefined)
          newData = newData.filter((p) => p.price >= priceMin)
        if (priceMax !== undefined)
          newData = newData.filter((p) => p.price <= priceMax)

        setProducts((prev) => {
          if (currentSkip === 0) return newData
          const map = new Map()
          ;[...prev, ...newData].forEach((item) => map.set(item.id, item))
          return Array.from(map.values())
        })

        setMeta((prev) => {
          let newSkip = currentSkip + prev.limit
          if (newSkip > response.meta.total) newSkip = response.meta.total
          if (newSkip >= response.meta.total) setHasMore(false)
          return { ...prev, skip: newSkip, total: response.meta.total }
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        fetchProducts()
      }
    }

    window.addEventListener("scroll", handleScroll)

    if (
      document.body.offsetHeight <= window.innerHeight &&
      !loading &&
      hasMore
    ) {
      fetchProducts()
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore, meta.skip])

  useEffect(() => {
    setProducts([])
    setMeta({ total: 0, skip: 0, limit: 50 })
    setHasMore(true)
    fetchProducts(0)
  }, [query, priceMin, priceMax, category, rating])

  return (
    <div className="space-y-4 lg:space-y-6 col-span-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg lg:text-2xl font-semibold">
          Our Most Popular Products
        </h1>

        <ProductFiltersDrawer />
      </div>

      {products.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-6xl mb-4">😕</p>
          <p className="text-gray-500 text-lg">No products found.</p>
          <p className="text-gray-500 text-base mt-1">Try search another products.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}

          {loading &&
            Array.from({ length: meta.limit }).map((_, idx) => (
              <ProductCardSkeleton key={`skeleton-${idx}`} />
            ))}
        </div>
      )}

      {!hasMore && products.length > 1 && (
        <div className="pt-4 pb-8">
          <p className="text-center mt-4">No more products</p>
        </div>
      )}
    </div>
  )
}
