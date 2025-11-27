import ProductList from "@/components/products/product-list"
import ProductFilters from "@/components/products/product-filters"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: PageProps) {
  const { q, pmin, pmax, category, rating } = await searchParams

  const minPriceParsed = Number(pmin)
  const minPrice = !isNaN(minPriceParsed) ? minPriceParsed : undefined

  const maxPriceParsed = Number(pmax)
  const maxPrice = !isNaN(maxPriceParsed) ? maxPriceParsed : undefined

  return (
    <div className="mt-6">
      <div className="grid lg:grid-cols-4 gap-6">
        <ProductFilters />

        <ProductList
          query={(q as string) ?? undefined}
          priceMin={minPrice}
          priceMax={maxPrice}
          category={(category as string) ?? undefined}
          rating={rating === "true"}
        />
      </div>
    </div>
  )
}
