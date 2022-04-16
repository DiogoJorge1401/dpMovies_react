import { axiosCient } from './axiosClient'

type Props = { [key: string]: string }

export const categories: Props = {
  movie: 'movie',
  tv: 'tv',
}
export const movieType: Props = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
}
export const tvType: Props = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air',
}
export const tmdbApi = {
  getMoviesList: (type: string, params: any) => {
    const url = 'movie/' + movieType[type]
    return axiosCient.get(url, params)
  },
  getTvList: (type: string, params: any) => {
    const url = 'tv/' + tvType[type]
    return axiosCient.get(url, params)
  },
  getVideos: (category: string, id: string) => {
    const url = `${categories[category]}/${id}/videos`
    return axiosCient.get(url, { params: {} })
  },
  search: (category: string, params: any) => {
    const url = `search/${categories[category]}`
    return axiosCient.get(url, params)
  },
  detail: (category: string, id: string, params: any) => {
    const url = `${categories[category]}/${id}`
    return axiosCient.get(url, params)
  },
  credits: (category: string, id: string) => {
    const url = `${categories[category]}/${id}/credits`

    return axiosCient.get(url, { params: {} })
  },
  similar: (category: string, id: string) => {
    const url = `${categories[category]}/${id}/similar`

    return axiosCient.get(url, { params: {} })
  },
}
