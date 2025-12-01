
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
    <footer className="bg-primary text-light py-16 px-6 w-screen flex flex-col items-center">
      <section className='flex space-x-2 p-2 items-center '></section>
      <section className='flex space-x-2 p-2 items-center '></section>
      <section className='flex space-x-2 py-2 px-10 items-center justify-between w-full'>
          <p className="text-light/50">
            Desarrollado por <BautiSpan />
          </p>
          <img src="/logos/logo_acortado.svg" className="h-20"/>
          <p className="text-light/50">© 2025 TIFOSI CUORE</p>
      </section>
    </footer>
  )
}
