import { useState } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import { motion } from "framer-motion"
import Footer from "@/components/layout/Footer"
import {
  HoroscopeHeroHeader,
  DailyVedicReading,
  DailyTarotReading,
  DailySidebar,
  signsData,
} from "@/features/horoscope"

export default function DailyHoroscopePage() {
  const { sign: signParam } = useParams()
  const { onOpenAuthModal, onOpenBindModal } = useOutletContext() || {}
  const [activePeriod, setActivePeriod] = useState("daily")

  const handleOpenAuth = onOpenAuthModal || onOpenBindModal

  // Resolve sign data with fallback to Aries
  const currentSignKey = (signParam || "aries").toLowerCase()
  const sign = signsData[currentSignKey] || signsData.aries

  // List of other 11 signs for the sidebar navigation
  const otherSigns = Object.values(signsData).filter(
    (s) => s.slug !== sign.slug
  )

  return (
    <div className="min-h-full flex flex-col bg-[#0f090c] text-foreground">
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 space-y-10">
        {/* Hero Header Section */}
        <HoroscopeHeroHeader
          sign={sign}
          activePeriod={activePeriod}
          onPeriodChange={setActivePeriod}
          onOpenMoonSignModal={() => handleOpenAuth && handleOpenAuth(true)}
        />

        {/* 2-Column Main Reading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Reading Column (8 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-8 space-y-12"
          >
            {/* Vedic Moon Sign Reading */}
            <DailyVedicReading reading={sign.moonSignReading} />

            {/* Tarot Card Reading */}
            <DailyTarotReading
              tarotCard={sign.tarotCard}
              tarotReading={sign.tarotReading}
            />
          </motion.div>

          {/* Right Column / Sidebar (4 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <DailySidebar sign={sign} otherSigns={otherSigns} />
          </motion.div>
        </div>
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
