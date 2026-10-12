import { useOutletContext } from "react-router-dom"
import ZodiacWheelBackground from "@/components/sections/ZodiacWheelBackground"
import HeroChatInput from "@/components/sections/HeroChatInput"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  const context = useOutletContext() || {}
  const onOpenBindModal = context.onOpenBindModal || (() => {})

  return (
    <div className="flex-1 flex flex-col justify-between relative min-h-screen">
      {/* Centered Hero Stage with Astrological Background */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full overflow-hidden">
        {/* Background Concentric Dial */}
        <ZodiacWheelBackground />

        {/* Hero Form & 4 Example Cards */}
        <HeroChatInput onOpenBindModal={onOpenBindModal} />
      </div>

      {/* Melooha Complete Footer */}
      <Footer />
    </div>
  )
}
