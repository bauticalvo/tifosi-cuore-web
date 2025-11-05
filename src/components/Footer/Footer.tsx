'use client'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

export const Footer = () => {
  const bautiUrl = 'https://bautistacalvo.vercel.app/'
  const BautiSpan = () => {
    return (
      <button
        className="text-bauti cursor-pointer "
        // onClick={() => {
        //   window.open(bautiUrl)
        // }}
      >
        J.B.CALVO
      </button>
    )
  }

  return (
    <footer className="bg-primary text-light py-16 px-6 w-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className=" bg-light rounded-full flex items-center justify-center mr-3">
                <img src="/logos/logo_acortado.svg" alt="tifosi_logo" className="h-[10vh] w-auto" />
              </div>
            </div>
            <p className="text-light/70 mb-4">Desde el corazon del hincha</p>
            <div className="flex space-x-4">
              {[FaInstagram, FaWhatsapp].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-light/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {['Productos', 'Empresa', 'Soporte'].map((category) => (
            <div key={category}>
              <h4 className="font-semibold text-lg mb-6">{category}</h4>
              <ul className="space-y-3">
                {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-light/70 hover:text-accent transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-light/20 mt-12 pt-8 text-center">
          <p className="text-light/50">© 2025 TIFOSI CUORE. Todos los derechos reservados.</p>
          <p className="text-light/50">
            Desarrollado por <BautiSpan />
          </p>
        </div>
      </div>
    </footer>
  )
}
