import { Route, Routes } from 'react-router'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import Landing from './pages/Landing'
import { ProductsPage } from './components/shop/products/ProducstPage'
import {ProductDetail} from './components/shop/detail/ProductDetail'
import { BlokeCore } from './pages/BlokeCore'

function App() {

  return (
      <div className='h-full w-full font-primary  overflow-x-scroll no-scrollbar'>
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
