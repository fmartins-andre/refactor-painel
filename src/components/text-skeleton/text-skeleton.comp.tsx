import { ComponentProps } from 'react'

export function TextSkeleton(props: ComponentProps<'span'>) {
  return (
    <span {...props}>
      <span className="motion-text-loop-muted">.</span>
      <span className="motion-text-loop-muted motion-delay-75">.</span>
      <span className="motion-text-loop-muted motion-delay-100">.</span>
    </span>
  )
}
