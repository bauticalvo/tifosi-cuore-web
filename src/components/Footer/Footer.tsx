
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

  const SpanCustom = ({text}: {text: string}) => {
    return (
      <span className="text-light">{text}</span>
    )
  }


  return (
    <footer className="bg-primary text-light py-2 px-6 w-screen flex flex-col items-center justify-end border-t border-light">
      <section className='flex space-x-2 p-2 items-center border-b border-light/10 w-full justify-center'>
        <SpanCustom text="Instagram" />
        <SpanCustom text="Tik Tok" />
        <SpanCustom text="|" />
        <SpanCustom text="FAQ" />
        <SpanCustom text="CONTACTO" />
      </section>
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
