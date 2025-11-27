import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-5 gap-6">
        <Skeleton className="col-span-3 h-[80svh]" />
        <Skeleton className="col-span-2 h-[80svh]" />
      </div>
    </div>
  )
}
