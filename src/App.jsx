import { Route, Routes } from 'react-router'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import Landing from './pages/Landing'
import { ProductsPage } from './components/shop/products/ProducstPage'
import {ProductDetail} from './components/shop/detail/ProductDetail'
import { BlokeCore } from './pages/BlokeCore'
import ScrollToTop from './hooks/useScrollToTop'

function App() {

  return (
      <div className='h-auto w-full font-primary bg-primary overflow-x-scroll no-scrollbar'>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/blokecore" element={<BlokeCore />} />
          <Route path="/products" element={<ProductsPage />}/>
          <Route path='/products/:slug' element={<ProductDetail />} />
        </Routes>
        <Footer />
      </div>
 
  )
}

export default App
