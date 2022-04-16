import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { apiConfig, categories, tmdbApi } from '../../api'
import { Item } from '../../interfaces/Item'
import { MovieCard } from '../movie-card/MovieCard'
import './movieList.scss'

type Props = {
  category: string
  type: string
  id?: string
}

export const MovieList = (props: Props) => {

  const [items, setItems] = useState([])

  useEffect(() => {
    const getList = async () => {
      let response = null as any
      const params = {}


      if (props.type !== 'similar') {
        switch (props.category) {
          case categories.movie:
            response = await tmdbApi.getMoviesList(props.type, { params })
            break;

          default:
            response = await tmdbApi.getTvList(props.type, { params })
            break
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id as string)
      }
      setItems(response.results)
    }

    getList()
  }, [])

  return (
    <div className='movie-list'>
      <Swiper
        grabCursor
        spaceBetween={10}
        slidesPerView='auto'
        
      >
        {
          items.map((item: Item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={props.category}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}