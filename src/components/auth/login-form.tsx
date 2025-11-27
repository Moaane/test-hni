"use client"

import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { LoginSchema } from "@/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Eye, EyeClosed } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { login } from "@/lib/actions/auth"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  })

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      setLoading(true)
      await login({ values })
      router.replace("/")
    } catch (error: any) {
      setError(error.message || "something went wrong")
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Username</FieldLabel>

              <Input
                id={field.name}
                type="text"
                placeholder="username"
                autoComplete="username"
                aria-invalid={fieldState.invalid}
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  placeholder="username"
                  autoComplete="username"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />

                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}{" "}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={loading || !form.formState.isValid}>
          {loading ? "Loading..." : "Sign in"}
        </Button>
      </FieldGroup>
    </form>
  )
}
