import type { PropsWithChildren } from 'react'
import { getBrandDetails } from '@/utils/get-brand-details'
import { Link } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type RegisterOrLoginProps = PropsWithChildren<{
  title: string
  subtitle: string
  mode: 'register' | 'login'
}>

const brand = getBrandDetails()

export function RegisterOrLogin({
  children,
  title,
  subtitle,
  mode,
}: RegisterOrLoginProps) {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <img
          src={brand.logoPath.alternative}
          alt={`${brand.name} logo`}
          width={200}
          height={60}
        />

        <Card className="flex w-full flex-col rounded-2xl">
          <CardHeader className="bg-primary  flex flex-col items-center justify-center rounded-t-2xl">
            <CardTitle className="text-xl text-white">{title}</CardTitle>
            <CardDescription className="w-60  text-white md:w-auto">
              {subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex w-full flex-col items-center gap-2 py-2 md:gap-5">
            {children}
          </CardContent>
        </Card>
      </div>
      {RenderFooter(mode)}
    </div>
  )
}

const FooterLogin = () => {
  return (
    <div className="mt-5 flex gap-1">
      {/* <span className="text-blue text-sm">Não possui um cadastro?</span>
      <Link
        href="/auth/interesse-sistema"
        className="text-primary text-sm underline"
      >
        Falar com Especialista
      </Link> */}
    </div>
  )
}

const FooterRegister = () => {
  return (
    <div className="mt-5 flex gap-1">
      <span className="text-blue text-sm">Já possui um cadastro?</span>
      <Link to="/login" className="text-primary text-sm underline">
        Fazer login
      </Link>
    </div>
  )
}

const footerObj = {
  login: FooterLogin,
  register: FooterRegister,
}

const RenderFooter = (mode: 'register' | 'login') => {
  return footerObj[mode]()
}
