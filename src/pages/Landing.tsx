import { CategorySection } from '../components/Landing/CategorySection'
import { ShopByVersion } from '../components/Landing/ShopByVersion'
import { Section4 } from '../components/Landing/Section4'
import { HeroSectionBloke } from '@/components/BlockCore/Landing/HeroSectionBloke'

export const Landing = () => {
  return (
    <div className="bg-primary mt-[10vh]  w-screen flex flex-col items-center overflow-x-scroll no-scrollbar">
      <HeroSectionBloke />
      <CategorySection />
      <Section4 />
      {/* <Storytelling /> */}
      <ShopByVersion />
    </div>
  )
}

export default Landing
