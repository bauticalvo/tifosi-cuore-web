export const Storytelling = () => {
  return (
    <div className="h-auto lg:h-screen w-full flex flex-col lg:flex-row border-t border-tertiary-alt text-light">
      <section className="w-full lg:w-1/2 lg:h-full bg-primary/90 flex flex-col space-y-4 items-center justify-center text-start p-20 md:p-32 2xl:p-44">
        <div className="bg-primary/90 flex h-full w-full flex-col space-y-4 items-center justify-center text-start py-10">
          <h1 className="text-xl md:text-4xl 2xl:text-6xl">tifosi cuore</h1>
          <p className="text-lg md:text-2xl 2xl:text-4xl px-10">
            Nacimos para llevar el fútbol a la moda urbana. Cada prenda tiene historia, cada
            temporada un recuerdo.
          </p>
        </div>
      </section>
      <section className="w-full lg:w-1/2 lg:h-full ">
        <img src="/images/blokecore/milanstreet.jpeg" alt="story" className="h-full w-full" />
      </section>
    </div>
  )
}
