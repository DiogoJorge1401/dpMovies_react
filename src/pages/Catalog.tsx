import { useParams } from 'react-router-dom'
import { categories } from '../api'
import { MovieGrid } from '../components/movie-grid/MovieGrid'
import { PageHeader } from '../components/page-header/PageHeader'

export const Catalog = () => {

  const { category } = useParams()

  return (
    <>
      <PageHeader>
        {category === categories.movie ? 'Movies' : 'TV Series'}
      </PageHeader>

      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={(category as string)} />
        </div>
      </div>
      
    </>
  )
}
