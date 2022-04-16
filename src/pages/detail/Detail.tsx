import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConfig, tmdbApi } from '../../api'
import { MovieList } from '../../components/movie-list/MovieList'
import { Item } from '../../interfaces/Item'
import { CastList } from './CastList'
import './detail.scss'
import { VideoList } from './VideoList'


export const Detail = () => {

  const { category, id } = useParams()

  const [item, setItem] = useState<Item>(null as any)

  useEffect(() => {
    const getDetail = async () => {

      const params = {}

      const response = await tmdbApi.detail(category as string, id as string, { params }) as Item

      setItem(response)

      window.scrollTo(0, 0)
    }

    getDetail()
  }, [category, id])

  return (
    <>
      {
        item && (
          <>
            <div
              className="banner"
              style={{
                backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path || '')})`
              }}
            >
            </div>

            <div
              className="mb-3 movie-content container">

              <div className="movie-content__poster">

                <div className="movie-content__poster__img"
                  style={
                    {
                      backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path || '')})`
                    }
                  }
                >
                </div>
              </div>

              <div className="movie-content__info">
                <h1 className="title">
                  {item.title || item.name}
                </h1>

                <div className="genres">
                  {
                    item.genres && item.genres.slice(0, 5).map((genre, idx) => (
                      <span className='genres__item' key={idx}>{genre.name}</span>
                    ))
                  }
                </div>

                <p className="overview">
                  {item.overview}
                </p>

                <div className="cast">
                  <div className="section__header">
                    <h2>Casts</h2>
                  </div>
                  <CastList id={item.id + ''} />
                </div>
              </div>
            </div>

            <div className="container">
              <div className="section mb-3">
                <VideoList id={item.id + ''} />
              </div>
              <div className="section mb-3">
                <div className="section__header mb-2">
                  <h2>Similar</h2>
                </div>
                <MovieList category={category as string} id={item.id + ''} type='similar' />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}
