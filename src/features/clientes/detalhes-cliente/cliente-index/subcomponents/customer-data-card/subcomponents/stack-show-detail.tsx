import { ReactNode } from 'react'

export interface Props {
  label: string
  value: ReactNode
}

export function DoubleColumnData({ label, value }: Props) {
  return (
    <div className="my-2 flex flex-col items-start gap-1">
      <span className="line-clamp-2 max-w-full text-ellipsis text-wrap break-all font-sans text-sm font-bold">
        {label}
      </span>
      <span className="line-clamp-2 max-w-full text-ellipsis text-wrap break-all font-sans text-sm font-medium text-[#7D93B8]">
        {value}
      </span>
    </div>
  )
}
