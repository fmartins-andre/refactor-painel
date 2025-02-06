import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, value, ...props }, ref) => {
    return icon ? (
      <div
        className={cn(
          'dark:border-input placeholder:text-muted-foreground dark:bg-gray900 flex h-9 w-full items-center gap-5 rounded-md border border-[#F1F5F9] bg-[#F1F5F9] py-1 pr-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium  disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        <input
          value={value ?? ''}
          type={type}
          ref={ref}
          className="h-9 w-full pl-1 focus:border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
          {...props}
        />
        {icon}
      </div>
    ) : (
      <input
        value={value ?? ''}
        type={type}
        className={cn(
          'dark:border-input placeholder:text-muted-foreground focus-visible:ring-ring dark:bg-gray900 flex h-9 w-full rounded-md border border-[#F1F5F9] bg-[#F1F5F9] px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
