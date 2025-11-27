import ProductCategoryFilter from "./filters/product-category-filter"
import ProductPriceFilter from "./filters/product-price-filter"
import ProductRatingFilter from "./filters/product-rating-filter"

export default function ProductFilters() {
  return (
    <div className="hidden lg:flex w-full max-h-fit p-6 bg-card text-card-foreground flex-col gap-6 rounded-xl border pt-6 pb-10 shadow-sm space-y-2">
      <ProductPriceFilter />
      <ProductRatingFilter />
      <ProductCategoryFilter />
    </div>
  )
}
