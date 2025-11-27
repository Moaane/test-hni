import { updateToken } from "@/lib/actions/auth"
import { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  return await updateToken(request)
}

export const config = {
  matcher: ["/", "/product/:productId", "/cart"],
}
