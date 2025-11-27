"use client"

import { useEffect, useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../ui/input-group"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"

function formatNumber(value: string) {
  if (!value) return ""
  const num = parseInt(value, 10)
  if (isNaN(num)) return ""
  return num.toLocaleString("id-ID")
}

function parseNumber(value: string) {
  return value.replace(/\./g, "")
}

export default function ProductPriceFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [minimumPrice, setMinimumPrice] = useState(
    searchParams.get("pmin") || ""
  )
  const [maximumPrice, setMaximumPrice] = useState(
    searchParams.get("pmax") || ""
  )
  const [minDisplay, setMinDisplay] = useState(formatNumber(minimumPrice))
  const [maxDisplay, setMaxDisplay] = useState(formatNumber(maximumPrice))

  const updateQuery = (pmin: string, pmax: string) => {
    if (pmin && pmax && parseInt(pmin, 10) > parseInt(pmax, 10)) {
      toast.error("Minimum price cannot be greater than maximum price")
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    if (pmin) params.set("pmin", String(parseInt(pmin, 10)))
    else params.delete("pmin")

    if (pmax) params.set("pmax", String(parseInt(pmax, 10)))
    else params.delete("pmax")

    router.replace(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      updateQuery(minimumPrice, maximumPrice)
    }, 500)

    return () => clearTimeout(handler)
  }, [minimumPrice, maximumPrice])

  return (
    <div className="space-y-3">
      <p className="font-semibold text-lg">Price</p>
      <div className="space-y-4">
        <InputGroup>
          <InputGroupAddon>$</InputGroupAddon>
          <InputGroupInput
            placeholder="Minimum Price"
            type="text"
            value={minDisplay}
            onChange={(e) => {
              const raw = parseNumber(e.target.value)
              setMinimumPrice(raw)
              setMinDisplay(formatNumber(raw))
            }}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>$</InputGroupAddon>
          <InputGroupInput
            placeholder="Maximum Price"
            type="text"
            value={maxDisplay}
            onChange={(e) => {
              const raw = parseNumber(e.target.value)
              setMaximumPrice(raw)
              setMaxDisplay(formatNumber(raw))
            }}
          />
        </InputGroup>
      </div>
    </div>
  )
}
