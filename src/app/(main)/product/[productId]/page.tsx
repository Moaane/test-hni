import { findProduct } from "@/lib/actions/products"
import { notFound } from "next/navigation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import ProductAddToCart from "@/components/products/product-add-to-cart"
import ProductNotFound from "@/components/products/product-not-found"

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const { product, success } = await findProduct({ productId })

  if (!success || !product) {
    return <ProductNotFound />
  }

  const productFinalPrice = Math.ceil(
    product.price - (product?.price * product?.discountPercentage) / 100
  )

  return (
    <div className="mt-6">
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="w-full h-fit lg:col-span-3">
          <Carousel className="border rounded-xl shadow-sm max-h-[80svh] ">
            <CarouselContent>
              {product?.images.map((image) => (
                <CarouselItem key={image}>
                  <Image
                    src={image}
                    height={512}
                    width={512}
                    alt="product images"
                    loading="lazy"
                    className="h-full w-full max-h-[80svh] object-contain object-center aspect-square"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="lg:absolute bottom-0 left-5 lg:left-10 z-50" />
            <CarouselNext className="lg:absolute bottom-0 right-5 lg:right-10 z-50" />
          </Carousel>
        </div>

        <Card className="lg:col-span-2">
          <CardHeader className="gap-4">
            <div className="grid gap-2">
              <CardTitle className="lg:text-xl">{product?.title}</CardTitle>
              <div className="flex items-center gap-2">
                <p className="text-sm">
                  Stock: <span className="font-semibold">{product?.stock}</span>
                </p>
                <span className="opacity-30 text-[10px] leading-0 bg-red-200">
                  ●
                </span>
                <div className="text-sm flex items-center gap-1">
                  <p>Rating: </p>
                  <div className="flex items-center gap-1">
                    <Star className="text-transparent fill-primary size-4 mt-0.5" />
                    <span className="font-semibold">{product?.rating}</span>(
                    {product?.reviews.length})
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <p className="lg:text-4xl font-semibold">${productFinalPrice}</p>
              <p className="lg:text-sm font-semibold line-through text-destructive/50">
                ${product?.price}
              </p>
            </div>
          </CardHeader>

          <CardContent className="h-full flex flex-col gap-6 justify-between">
            <div className="space-y-6 lg:space-y-4">
              <p className="text-muted-foreground text-sm">
                {product?.description}
              </p>

              <div className="grid grid-cols-2 items-center w-fit gap-y-2 gap-x-1 text-sm">
                <p className="opacity-80">Brand:</p>
                <p className="font-semibold">{product?.brand ?? "-"}</p>
                <p className="opacity-80">Category:</p>
                <p className="font-semibold capitalize">
                  {product?.category ?? "-"}
                </p>
                <p className="opacity-80">Weight:</p>
                <p className="font-semibold">{product?.weight ?? "-"} kg</p>
                <p className="opacity-80">Brand:</p>
                <p className="font-semibold">{product?.brand ?? "-"}</p>
              </div>
            </div>

            <ProductAddToCart
              title={product.title}
              thumbnail={product.thumbnail}
              price={productFinalPrice}
              productId={parseInt(productId, 10)}
            />
          </CardContent>
        </Card>
        <div className="border"></div>
      </div>
    </div>
  )
}
