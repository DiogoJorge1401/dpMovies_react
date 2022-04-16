import { EventHandler, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { categories, movieType, tmdbApi, tvType } from '../../api'
import { Item } from '../../interfaces/Item'
import { Button, OutlineButton } from '../button/Button'
import { Input } from '../input/Input'
import { MovieCard } from '../movie-card/MovieCard'
import './movieGrid.scss'

type Props = {
  category: string
}



export const MovieGrid = (props: Props) => {

  const [items, setItems] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const { keyword } = useParams()

  const loadMore = async () => {
    const getList = async () => {
      let response = null as any

      if (keyword === undefined) {
        const params = {
          page: page + 1
        }
        switch (props.category) {
          case categories.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
            break
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params })
            break;
        }
      } else {
        const params = {
          query: keyword,
          page: page + 1
        }

        response = await tmdbApi.search(props.category, { params })
      }

      setItems((items: Item[]) => [...items, ...response.results])
      setPage((page) => page + 1)
    }

    getList()
  }


  useEffect(() => {
    const getList = async () => {
      let response = null as any

      if (keyword === undefined) {
        const params = {}
        switch (props.category) {
          case categories.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
            break
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params })
            break;
        }
      } else {
        const params = {
          query: keyword
        }

        response = await tmdbApi.search(props.category, { params })
      }

      setItems(response.results)
      setTotalPage(response.total_pages)
    }

    getList()
  }, [props.category, keyword])

  return (
    <>
      <div className="section mb-3">
        <MovieSearch keyword={keyword} category={props.category} />
      </div>
      <div className='movie-grid'>
        {
          items.map((item: Item, i) => (
            <MovieCard key={i} category={props.category} item={item} />
          ))
        }
      </div>

      {
        page < totalPage ? (
          <div className="movie-grid__loadmore">
            <OutlineButton className='small' onClick={loadMore}>
              Load More
            </OutlineButton>
          </div>
        ) : (
          <></>
        )

      }
    </>
  )
}

const MovieSearch = (props: any) => {

  const navigate = useNavigate()

  const [keyword, setKeyword] = useState<string>(props.keyword ? props.keyword : '')

  const goToSearch = useCallback(
    () => {
      if (keyword.trim().length > 0) {
        navigate(`/${categories[props.category]}/search/${keyword}`)
      }
    },
    [keyword, props.category, navigate]
  )

  useEffect(() => {
    const enterEvent = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.keyCode === 13)
        goToSearch()

    }

    document.addEventListener('keyup', enterEvent)

    return () => {
      document.removeEventListener('keyup', enterEvent)
    }
  }, [keyword, goToSearch])

  return (
    <div className="movie-search">
      <Input
        type='text'
        placeholder='Enter keyword'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className='small' onClick={goToSearch}>
        Search
      </Button>
    </div>
  )
}