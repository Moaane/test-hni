import LoginForm from "@/components/auth/login-form"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <div className="min-h-svh flex flex-col gap-4 p-6 md:p-10">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              height={32}
              width={32}
              alt="logo ecommerce"
              className="object-contain mb-1"
            />
            <span className="font-bold text-xl">Ecommerce</span>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm space-y-6 xl:space-y-12">
            <div className="xl:space-y-2 text-center">
              <h1 className="text-2xl xl:text-4xl font-bold">
                Sign in to your account
              </h1>
              <p className="text-muted-foreground text-sm text-balance xl:text-xl">
                Enter your username or email to log in
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative">
        <Image
          src="/images/banner.jpg"
          alt="banner ecommerce"
          layout="fill"
          className="object-cover"
          priority
        />
      </div>
    </main>
  )
}
