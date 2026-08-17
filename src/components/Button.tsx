import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button type="button" className={`btn-primary ${className ?? ''}`.trim()} {...rest}>
      {children}
    </button>
  )
}
