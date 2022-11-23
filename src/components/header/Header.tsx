import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/tmovie.png'
import './header.scss'


const headerNav = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'Movies',
    path: '/movie'
  },
  {
    display: 'TV Series',
    path: '/tv'
  },
]



export const Header = () => {

  const { pathname } = useLocation()
  const headerRef = useRef<any>(null)

  const active = headerNav.findIndex(el => el.path === pathname)

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink')
      } else {
        headerRef.current.classList.remove('shrink')
      }
    }

    window.addEventListener('scroll', shrinkHeader)

    return () => {
      window.removeEventListener('scroll', shrinkHeader)
    }
  }, [])

  return (
    <div
      ref={headerRef} className='header'
    >
      <div
        className="header__wrap container"
      >
        <div className="logo">
          <img src={logo} alt="" />
          <Link to='/' >dpMovies</Link>
        </div>

        <ul className="header__nav">
          {
            headerNav.map((el, idx) => (
              <li
                key={idx}
                className={idx === active ? 'active' : ''}>
                <Link to={el.path}>
                  {el.display}
                </Link>
              </li>
            ))
          }
        </ul>

      </div>
    </div>
  )
}
