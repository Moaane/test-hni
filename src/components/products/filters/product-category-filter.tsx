"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { findAllProductCategories } from "@/lib/actions/products"
import { Badge } from "@/components/ui/badge"
import { CategoryFilterSkeleton } from "./product-category-filter-skeleton"

export default function ProductCategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    searchParams.get("category") || undefined
  )
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function fetchCategories() {
    setLoading(true)
    try {
      const response = await findAllProductCategories()
      if (response.success) {
        setCategories(response.categories)
        updateQuery(selectedCategory)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedCategory === category) {
      setSelectedCategory(undefined)
      params.delete("category")
    } else {
      setSelectedCategory(category)
      params.set("category", category)
    }

    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const updateQuery = (selectedCategory?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedCategory && categories.includes(selectedCategory)) {
      params.set("category", selectedCategory)
    } else params.delete("category")

    router.replace(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="space-y-3">
      <p className="font-semibold text-lg">Category</p>
      <div className="text-sm flex flex-wrap gap-x-2 gap-y-4">
        {loading ? (
          <CategoryFilterSkeleton />
        ) : categories.length > 0 ? (
          categories.map((category, index) => (
            <Badge
              key={index}
              className={`bg-secondary text-secondary-foreground hover:bg-primary hover:text-background cursor-pointer capitalize ${
                selectedCategory === category
                  ? "text-background font-semibold bg-primary"
                  : ""
              }`}
              onClick={() => handleUpdateCategory(category)}
            >
              {category.replace("-", " ")}
            </Badge>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  )
}
