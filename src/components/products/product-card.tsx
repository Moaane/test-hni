import { IProduct } from "@/interfaces/product"
import { Card, CardContent, CardHeader } from "../ui/card"
import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "../ui/badge"
import Link from "next/link"

interface ComponentProps {
  product: IProduct
}

export default function ProductCard({ product }: ComponentProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="py-4 overflow-hidden shadow-none hover:shadow-md transition-shadow h-full duration-150">
        <CardHeader className="pb-0 px-0 relative gap-0">
          <Image
            src={product.thumbnail}
            height={200}
            width={200}
            alt={product.title}
            className="w-full object-cover"
          />
          <Badge
            variant="outline"
            className="absolute right-3 top-0 backdrop-blur-md capitalize bg-foreground/5"
          >
            {product.category.replace("-", " ")}
          </Badge>
        </CardHeader>
        <CardContent className="px-4 flex flex-col gap-3 justify-between h-full">
          <p className="line-clamp-2 text-sm">{product.title}</p>
          <div className="flex items-center gap-1">
            <p className="font-semibold">${product.price}</p>
            <span className="opacity-30 text-[10px] leading-0">
              ●
            </span>
            <div className="flex items-center gap-1">
              <Star className="text-transparent fill-primary size-4" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
