import { LocalLoginForm } from './local-login-form.comp'
import { RegisterOrLogin } from './register-login-layout'

export function AuthLocalLogin() {
  return (
    <div className="flex w-full h-full items-center justify-between">
      <RegisterOrLogin
        mode="login"
        title="Fazer Login"
        subtitle="Insira seus dados de acesso abaixo."
      >
        <LocalLoginForm />
      </RegisterOrLogin>
      <div className="hidden lg:w-1/2 lg:flex lg:items-center lg:justify-center bg-primary h-full text-primary-foreground">
        <img src="/login-image.png" alt="Login Image" />
      </div>
    </div>
  )
}
