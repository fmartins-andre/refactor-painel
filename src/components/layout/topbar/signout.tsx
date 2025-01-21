import { MouseEventHandler } from 'react'
import { useAuth } from '@/services/providers/auth-provider'
import { useNavigate } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function SignOutButton() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const signOutOnClick: MouseEventHandler<HTMLButtonElement> = async () => {
    await logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="flex w-full items-center justify-start px-4">
      <Button
        type="submit"
        variant="ghost"
        className="text-error hover:text-error inline-flex w-full items-center justify-start gap-2 font-bold"
        onClick={signOutOnClick}
      >
        <LogOutIcon className="text-error size-4" />
        Sair
      </Button>
    </div>
  )
}
