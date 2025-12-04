import { CategorySection } from '../components/Landing/CategorySection'
import { ShopByVersion } from '../components/Landing/ShopByVersion'
import { Section4 } from '../components/Landing/Section4'
import { HeroSectionBloke } from '@/components/BlockCore/Landing/HeroSectionBloke'
import { TeamsGrid } from '@/components/Landing/TeamsSection'
import { CategoriesGrid } from '@/components/Landing/CategoriesGrid'

export const Landing = () => {
  return (
    <div className="bg-primary mt-[10vh]  w-screen flex flex-col items-center overflow-x-scroll no-scrollbar">
      <HeroSectionBloke />
      <CategorySection />
      <Section4 />
      <TeamsGrid />
      {/* <Storytelling /> */}
      <CategoriesGrid />
    </div>
  )
}

export default Landing
