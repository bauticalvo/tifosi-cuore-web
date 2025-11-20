'use client'

import { HeroSection } from './HeroSection'
import { CategorySection } from './CategorySection'

import { ShopByVersion } from './ShopByVersion'
import { Storytelling } from './Storytelling'
import { HeroCarousel } from '../Custom/HeroCarousel'
import { Section4 } from './Section4'

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
