import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConfig, tmdbApi } from '../../api'


type Props = {
  id: string
}

export const VideoList = (props: Props) => {

  const { category } = useParams()


  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category as string, props.id) as any

      setVideos(res.results.slice(0, 5))
    }

    getVideos()
  }, [category, props.id])


  return (
    <>
      {
        videos.map((item, idx) => (
          <Video key={idx} item={item} />
        ))
      }
    </>
  )
}

const Video = (props: any) => {
  const item = props.item
  const iframeRef = useRef<any>(null)

  useEffect(() => {
    const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
    iframeRef.current.setAttribute('height', height)
  }, [])

  return (
    <div className="video">
      <div className="video__title">
        <h2>
          {item.name}
        </h2>
      </div>

      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title='video'
      ></iframe>

    </div>
  )
}