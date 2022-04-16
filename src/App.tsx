import { BrowserRouter } from 'react-router-dom'
import 'swiper/css'
import './App.scss'
import './assets/boxicons-2.1.2/css/boxicons.min.css'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { MyRoutes } from './config/Routes'


export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MyRoutes />
      <Footer />
    </BrowserRouter>
  )
}
