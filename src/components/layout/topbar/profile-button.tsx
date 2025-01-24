import { Link } from '@tanstack/react-router'
import { FileTextIcon, HomeIcon, Navigation } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { TextSkeleton } from '@/components/text-skeleton'

import { SignOutButton } from './signout'

interface Props {
  isLoading?: boolean
  user?: {
    nome: string
    email: string
  }
}

export function ProfileButton({ user, isLoading = false }: Props) {
  const validUser: NonNullableFields<Props['user']> =
    user ||
    ({
      nome: 'Usuário',
      email: 'usuario@exemplo.com.br',
    } satisfies NonNullableFields<Props['user']>)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2 bg-none pl-1">
        <div className="flex flex-col justify-end space-x-2 bg-none">
          <Avatar>
            <AvatarImage src={undefined} />
            <AvatarFallback>{validUser.nome.at(0)}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 mt-2 min-w-72 rounded-xl ">
        <div className="flex w-full flex-col items-start gap-1">
          <div className="flex flex-col items-start gap-1 p-4">
            <p className="font-medium max-w-[23ch] text-wrap line-clamp-2">
              {isLoading ? <TextSkeleton /> : validUser.nome}
            </p>
            <p className="text-muted-foreground text-xs font-medium max-w-[31ch] line-clamp-1 break-all">
              {isLoading ? (
                <span className="animate-pulse">
                  carregando
                  <TextSkeleton />
                </span>
              ) : (
                validUser.email
              )}
            </p>
          </div>
          <Separator className="bg-muted w-full" />
          <Link to="/dashboard" className="w-full px-4">
            <Button
              className="flex w-full flex-row justify-start space-x-1 "
              variant="ghost"
            >
              <HomeIcon className="size-4 self-center" />
              <p className="font-bold">Home</p>
            </Button>
          </Link>
          <Separator className="bg-muted w-full" />
          <Link
            // to="/minha-conta"
            to="/"
            className="w-full px-4"
          >
            <Button
              variant="ghost"
              className="flex w-full flex-row justify-start space-x-1 "
            >
              <FileTextIcon className="size-4 self-center" />
              <p className="font-bold">Minha Conta</p>
            </Button>
          </Link>
          <Separator className="bg-muted w-full" />
          <SignOutButton />
          <Separator />
          <div className="flex w-full flex-col items-center justify-center gap-3 p-4">
            <a
              href="https://emitte.com.br/emitte-mais-termos-de-uso-e-servicos"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-left text-sm font-bold underline underline-offset-2"
            >
              <p className="text-xs font-medium">Termos de Uso</p>
              <Navigation className="size-2" />
            </a>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
