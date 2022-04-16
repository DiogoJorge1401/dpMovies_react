import { Link } from 'react-router-dom'
import { categories, movieType, tvType } from '../api'
import { OutlineButton } from '../components/button/Button'
import { HeroSlide } from '../components/hero-slide/HeroSlide'
import { MovieList } from '../components/movie-list/MovieList'

export const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">

          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to='/movie'>
              <OutlineButton className='small' >
                View more
              </OutlineButton>
            </Link>
          </div>

          <MovieList
            category={categories.movie}
            type={movieType.popular}
          />

        </div>

        <div className="section mb-3">

          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to='/movie'>
              <OutlineButton className='small' >
                View more
              </OutlineButton>
            </Link>
          </div>

          <MovieList
            category={categories.movie}
            type={movieType.top_rated}
          />

        </div>

        <div className="section mb-3">

          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to='/tv'>
              <OutlineButton className='small' >
                View more
              </OutlineButton>
            </Link>
          </div>

          <MovieList
            category={categories.tv}
            type={tvType.popular}
          />

        </div>

        <div className="section mb-3">

          <div className="section__header mb-2">
            <h2>Top Rated TV</h2>
            <Link to='/tv'>
              <OutlineButton className='small' >
                View more
              </OutlineButton>
            </Link>
          </div>

          <MovieList
            category={categories.tv}
            type={tvType.top_rated}
          />

        </div>

      </div>
    </>
  )
}
