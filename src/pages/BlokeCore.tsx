import { HeroSectionBloke } from "@/components/BlockCore/Landing/HeroSectionBloke"
import { CategorySection } from "@/components/Landing/CategorySection"
import { Storytelling } from "@/components/Landing/Storytelling"


export const BlokeCore = () => {

    return (
        <div className="h-full w-full mt-[11vh]">
            <HeroSectionBloke />
            <Storytelling />
            <CategorySection />
        </div>
    )
}