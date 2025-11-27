import { ListFilter } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import ProductPriceFilter from "./filters/product-price-filter";
import ProductRatingFilter from "./filters/product-rating-filter";
import ProductCategoryFilter from "./filters/product-category-filter";

export default function ProductFiltersDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild className="block lg:hidden">
        <Button variant="secondary" size="sm" className="flex gap-2">
          <ListFilter className="size-4" />{" "}
          <span className="text-xs">Filter</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-left text-xl">Filter</DrawerTitle>
        </DrawerHeader>

        <div className="w-full p-4 text-card-foreground grid gap-4 space-y-2 h-full overflow-y-scroll pb-12">
          <ProductPriceFilter />
          <ProductRatingFilter />
          <ProductCategoryFilter />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
