import './button.scss'

type Props = {
  onClick?: () => void
  className: string
  children: React.ReactNode
}

export const Button = ({ onClick, className, children }: Props) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick ? onClick : () => { }}
    >
      {children}
    </button>
  )
}

export const OutlineButton = ({ children, className, onClick }: Props) => {
  return (
    <Button
      className={`btn-outline ${className}`}
      onClick={onClick ? onClick : () => { }}
    >
      {children}
    </Button>
  )
}
