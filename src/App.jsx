import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import Landing from './components/Landing/Landing'

function App() {

  return (
      <div className='h-full w-full font-primary bg-black overflow-x-scroll no-scrollbar'>
        <Header />
        <Landing />
        <Footer />
      </div>
 
  )
}

export default App
