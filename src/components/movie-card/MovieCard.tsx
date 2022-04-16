import { Link } from 'react-router-dom'
import { apiConfig, categories } from '../../api'
import { Item } from '../../interfaces/Item'
import { Button } from '../button/Button'
import './movieCard.scss'

type Props = {
  item: Item
  category: string
}



export const MovieCard = (props: Props) => {

  const item = props.item

  const link = `/${categories[props.category]}/${item.id}`

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path as string)



  return (
    <Link to={link}>
      
      <div
        className='movie-card'
        style={{ backgroundImage: `url(${bg})` }}>
        <Button className=''>
          <i className="bx bx-play"></i>
        </Button>
      </div>

      <h3>{(item.title) || item.name}</h3>
    </Link>
  )
}