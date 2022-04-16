import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { apiConfig, categories, movieType, tmdbApi } from '../../api'
import { Button, OutlineButton } from '../button/Button'
import { Modal, ModalContent } from '../modal/Modal'
import './heroSlide.scss'

export const HeroSlide = () => {

  SwiperCore.use([Autoplay])

  const [movieItems, setMovieItems] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      const params = {
        page: 1,
      }

      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, { params }) as any

        setMovieItems(response.results.slice(0, 4))
      } catch (error) {
        console.log('error', error)
      }
    }

    getMovies()
  }, [])

  return (
    <div className='hero-slide'>
      <Swiper
        modules={[Autoplay]}
        grabCursor
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {
          movieItems.map((item: any, idx) => (
            <SwiperSlide key={idx}>
              {({ isActive }: { isActive: boolean }) => (
                <HeroSlideItem
                  item={item}
                  className={isActive ? 'active' : ''}
                />
              )}
            </SwiperSlide>
          ))
        }
      </Swiper>
      {
        movieItems.map((item, idx) => <TrailerModal key={idx} item={item} />)
      }
    </div>
  )
}

const HeroSlideItem = (
  props: { item: any, className: string }
) => {
  const navigate = useNavigate()

  const item = props.item

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)

    const videos = await tmdbApi.getVideos(categories.movie, item.id) as any

    if (videos.results.length > 0) {
      const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key

      modal?.querySelector('.modal__content > iframe')?.setAttribute('src', videoSrc)
    } else {
      const modalContent = (modal?.querySelector('.modal__content')?.innerHTML) as any
      modalContent.innerHTML = 'No trailer'
    }

    modal?.classList.toggle('active')
  }

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={
        {
          backgroundImage: `url(${background})`
        }
      }
    >
      <div
        className="hero-slide__item__content container"
      >

        <div className="hero-slide__item__content__info">

          <h2 className="title">
            {item.title}
          </h2>

          <div className="overview">
            {item.overview}
          </div>

          <div className="btns">

            <Button
              className=''
              onClick={() => navigate('/movie/' + item.id)}
            >
              Watch now
            </Button>

            <OutlineButton
              className=''
              onClick={setModalActive}
            >
              Watch trailer
            </OutlineButton>

          </div>
        </div>

        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>

      </div>
    </div>
  )

}

const TrailerModal = (
  props: any
) => {
  const item = props.item

  const iframeRef = useRef<any>(null)

  const onClose = () => iframeRef.current.setAttribute('src', '')

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width='100%'
          height='500px'
          title='trailer'
        ></iframe>
      </ModalContent>
    </Modal>
  )
}