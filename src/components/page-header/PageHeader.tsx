import './pageHeader.scss'
import bg from '../../assets/footer-bg.jpg'

type Props = {
  children: React.ReactNode
}

export const PageHeader = ({ children }: Props) => {
  return (
    <div
      className='page-header'
      style={{
        backgroundImage: `url(${bg
          })`
      }}
    >
      <h2>{children}</h2>
    </div>
  )
}