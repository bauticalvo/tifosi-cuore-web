import { Route, Routes } from 'react-router'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import Landing from './pages/Landing'
import { ProductsPage } from './components/shop/products/ProducstPage'
import {ProductDetail} from './components/shop/detail/ProductDetail'
import { BlokeCore } from './pages/BlokeCore'
import ScrollToTop from './hooks/useScrollToTop'
import { useState } from 'react'
import { Menu } from './components/Header/Menu/Menu'
import { Error404 } from './pages/Error404'
import FaqPage from './pages/Faq'
import { Contact } from './pages/Contact'
import CartPage from './components/cart/CartPage'
import { Toaster } from 'react-hot-toast'

function App() {

  const [openMenu, setOpenMenu] = useState(false)

  return (
      <div className='h-auto w-full font-primary bg-primary overflow-x-scroll no-scrollbar'>
        <ScrollToTop />
        {
          openMenu && (
            <Menu setOpenMenu={setOpenMenu} />
          )
        }
        <Header setOpenMenu={setOpenMenu} />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/blokecore" element={<BlokeCore />} />
          <Route path="/shop" element={<ProductsPage />}/>
          <Route path='/shop/:slug' element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/faq" element={<FaqPage />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/*" element={<Error404 />}/>
        </Routes>
        <Footer />
      <Toaster />
      </div>
 
  )
}

export default App
