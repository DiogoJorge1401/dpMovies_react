import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConfig, tmdbApi } from '../../api'

type Props = {
  id: string
}

export const CastList = (props: Props) => {

  const { category } = useParams()

  const [casts, setCasts] = useState<any[]>([])

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category as string, props.id) as any

      setCasts(res.cast.slice(0, 5))
    }

    getCredits()
  }, [category, props.id])


  return (
    <div className='casts'>
      {
        casts.map((item, idx) => (
          <div key={idx} className="casts__item">
            <div className="casts__item__img"
              style={{
                backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`
              }}
            ></div>
            
            <p className="casts__item__name">
              {item.name}
            </p>
          </div>
        ))
      }
    </div>
  )
}