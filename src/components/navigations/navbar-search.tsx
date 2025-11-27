"use client"

import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function NavbarSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState<string | undefined>(
    searchParams.get("q") || ""
  )
  const params = new URLSearchParams(searchParams.toString())

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (search) {
      params.set("q", search)
    } else params.delete("q")

    router.replace(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    setSearch(search)
  }, [search])

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <InputGroup className="max-w-full md:max-w-sm w-full">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupInput
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
    </form>
  )
}
