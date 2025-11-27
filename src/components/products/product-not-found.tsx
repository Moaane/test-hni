import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80svh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">😕</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Product not found
      </h2>
      <p className="text-gray-500 mb-8">
        The product you are looking for might have been removed or does not
        exist.
      </p>
      <Link href="/">
        <Button variant="default">Back to Products</Button>
      </Link>
    </div>
  )
}
