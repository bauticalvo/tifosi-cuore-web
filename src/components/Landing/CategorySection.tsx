'use client'
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md'

export const CategorySection = () => {
  const StyledTitle = 'text-light flex items-center text-xl md:text-2xl'

  const CategoryCard = ({ title, img }: { title: string; img: string }) => {
    return (
      <div className="flex items-center justify-center w-full md:w-1/3 h-[400px] md:h-auto border-y-1 border-r-1 border-light group relative ">
        <img src={img} alt="section3" className="w-full h-full object-cover bg-tertiary-alt" />
        <button className="absolute text-light z-10 text-center text-lg 2xl:text-xl  bg-primary px-8 rounded-md group-hover:px-4 group-hover:bg-accent group-hover:text-light transition-all">
          {title}
        </button>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <section className="bg-primary h-auto w-full flex flex-col items-center justify-center">
        <div className="w-full h-[70px] md:h-[100px] border-y border-light flex flex-col justify-center items-center">
          <h1 className="text-sm md:text-md text-light">Bienvenidos a Tifosi Cuore</h1>
          <h1 className={StyledTitle}>Explora nuestro catálogo</h1>
        </div>
      </section>
      <section className="h-auto w-full flex flex-col md:flex-row">
        <CategoryCard title="Camisetas" img="/images/static/camisetas.png" />
        <CategoryCard title="Shorts" img="/images/static/shorts.png" />
        <CategoryCard title="Buzos" img="/images/static/buzos.png" />
      </section>
    </div>
  )
}
