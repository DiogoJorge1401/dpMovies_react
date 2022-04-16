import { ChangeEvent } from 'react'
import './input.scss'

type Props = {
  type: string
  placeholder: string
  value: any
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = (
  { type, placeholder, value, onChange }: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange ? (e) => onChange(e) : () => { }}
    />
  )
}