import { HeroSection } from '../components/Landing/HeroSection'
import { CategorySection } from '../components/Landing/CategorySection'
import { ShopByVersion } from '../components/Landing/ShopByVersion'
import { Section4 } from '../components/Landing/Section4'

export const Landing = () => {
  return (
    <div className="bg-background mt-[10vh] min-h-screen w-screen flex flex-col items-center overflow-x-scroll no-scrollbar">
      <HeroSection />
      <CategorySection />
      <Section4 />
      {/* <Storytelling /> */}
      <ShopByVersion />
    </div>
  )
}

export default Landing
