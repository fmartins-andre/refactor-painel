import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/form/FormInput'
import { Icons } from '@/components/images/icons'

import { useSubmitHandler } from './helpers/use-submit-handler.hook'
import { LocalLoginFormSchema, localLoginSchema } from './local-login.schema'

export function LocalLoginForm() {
  const form = useForm<LocalLoginFormSchema>({
    resolver: zodResolver(localLoginSchema),
  })

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  function handleSetShowPassword() {
    setShowPassword(!showPassword)
  }

  const { isPending, submitHandler } = useSubmitHandler({
    handleSubmit: form.handleSubmit,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={submitHandler}
        className="mt-5 flex w-full flex-col items-center gap-5"
      >
        <FormInput<LocalLoginFormSchema>
          name="email"
          label="Email"
          placeholder="Inserir e-mail"
          className="border bg-white"
          icon={
            <EnvelopeClosedIcon className="text-muted-foreground size-8 p-1" />
          }
          disabled={form.formState.isSubmitting || isPending}
        />
        <FormInput<LocalLoginFormSchema>
          name="senha"
          type={showPassword ? 'text' : 'password'}
          label="Senha"
          placeholder="Inserir senha"
          className="border bg-white"
          icon={
            showPassword ? (
              <EyeOpenIcon
                className="text-muted-foreground size-8 cursor-pointer p-1"
                onClick={handleSetShowPassword}
              />
            ) : (
              <EyeClosedIcon
                className="text-muted-foreground size-8 cursor-pointer p-1"
                onClick={handleSetShowPassword}
              />
            )
          }
          disabled={form.formState.isSubmitting || isPending}
        />
        <div className="flex w-full flex-col items-center gap-5">
          <Button
            type="submit"
            className="w-full items-center gap-5"
            disabled={form.formState.isSubmitting || isPending}
          >
            Entrar
            {(form.formState.isSubmitting || isPending) && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full items-center gap-5 underline"
            disabled={form.formState.isSubmitting || isPending}
            onClick={() => navigate({ to: '/recuperar-senha' })}
          >
            Esqueceu sua senha?
          </Button>
        </div>
      </form>
    </Form>
  )
}
