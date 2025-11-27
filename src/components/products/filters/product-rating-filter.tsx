"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"

export default function ProductRatingFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [rating, setRating] = useState<boolean>(
    searchParams.get("rating") === "true" || false
  )

  const handleUpdateRating = () => {
    const params = new URLSearchParams(searchParams.toString())

    const newValue = !rating
    setRating(newValue)

    if (newValue) {
      params.set("rating", "true")
    } else {
      params.delete("rating")
    }

    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const updateQuery = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (rating) {
      params.set("rating", "true")
    } else params.delete("rating")

    router.replace(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    updateQuery()
  }, [])

  return (
    <div className="space-y-3">
      <p className="font-semibold text-lg">Rating</p>
      <div className="flex items-center gap-3">
        <Checkbox
          id="rating"
          checked={rating}
          onCheckedChange={handleUpdateRating}
        />
        <Label htmlFor="rating">
          <Star className="text-transparent fill-primary size-5" />
          <span className="text-sm">Rating above 4</span>
        </Label>
      </div>
    </div>
  )
}
