import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md'

export const ShopByVersion = () => {
  const CategoryCard = ({ title, src }: { title: string; src: string }) => {
    return (
      <div className="w-[20vw] h-[30vh] flex flex-col items-start justify-center group">
        <img
          src={src}
          className="border border-tertiary bg-tertiary-alt h-full w-full object-cover object-top"
        />
        <h1 className="text-2xl underline group-hover:px-2 transition-all ">{title}</h1>
      </div>
    )
  }

  return (
    <div className="bg-primary border-t border-tertiary-alt h-[80vh] w-screen flex items-center overflow-x-scroll no-scrollbar text-light">
      <section className="w-[20vw] h-full flex flex-col items-start justify-center  px-6">
        <h1 className="text-5xl">Colecciones especiales.</h1>
        <button className="flex items-center">
          <MdOutlineSubdirectoryArrowRight className="mr-2 " />
          <span>Ver todos</span>
        </button>
      </section>
      <section className="w-[80vw] space-x-2 h-full flex flex-row items-center justify-center">
        <CategoryCard title="Retro" src="/images/blokecore/rona-retro.jpg" />
        <CategoryCard title="Idolos" src="/images/blokecore/messi-foto.jpg" />
        <CategoryCard title="Entrenamiento actual" src="/images/blokecore/mbappe-realmadrid.jpeg" />
      </section>
    </div>
  )
}
