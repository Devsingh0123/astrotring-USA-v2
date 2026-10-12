import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function RashiCard({ sign, timeframe = "Daily" }) {
  const navigate = useNavigate()

  const excerpt =
    timeframe === "Daily"
      ? sign.dailyExcerpt
      : timeframe === "Monthly"
      ? sign.monthlyExcerpt
      : sign.yearlyExcerpt

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/horoscopes/${sign.slug}/daily`)}
      className="cursor-pointer relative overflow-hidden rounded-2xl border border-[#252637] bg-[#12131c]/90 hover:bg-[#1a1b28] hover:border-mlh-plum/50 p-5 flex flex-col justify-between transition-all group min-h-[200px] shadow-sm hover:shadow-md"
    >
      {/* Astrological Watermark Glyph in background */}
      <span className="absolute right-3 bottom-2 text-6xl font-serif text-white/[0.04] select-none pointer-events-none group-hover:text-mlh-plum/[0.09] transition-colors">
        {sign.glyph}
      </span>

      {/* Card Header: Icon + Titles */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0 group-hover:border-mlh-plum/40 transition-colors">
            {sign.emoji}
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-serif tracking-tight flex items-center gap-1.5">
              <span>{sign.latin}</span>
              <span className="text-xs text-mlh-muted font-normal italic">
                {sign.vedic}
              </span>
            </h3>
          </div>
        </div>

        {/* Excerpt Body */}
        <p className="text-xs text-mlh-muted leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors">
          {excerpt}
        </p>
      </div>

      {/* Card Footer: Ruler & Action */}
      <div className="pt-4 border-t border-[#252637]/50 flex items-center justify-between text-[10px] font-mono relative z-10">
        <span className="text-mlh-plum font-semibold tracking-wider">
          RULED BY {sign.ruler}
        </span>
        <Link
          to={`/horoscopes/${sign.slug}/daily`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-mlh-muted group-hover:text-white font-semibold transition-colors"
        >
          <span>READ</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
