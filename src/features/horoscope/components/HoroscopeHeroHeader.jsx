import { useState } from "react"
import { Link } from "react-router-dom"
import { Moon } from "lucide-react"

export default function HoroscopeHeroHeader({
  sign,
  activePeriod,
  onPeriodChange,
  onOpenMoonSignModal,
}) {
  const [todayFormatted] = useState(() =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date())
  )

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-mlh-muted uppercase">
        <Link to="/horoscopes" className="hover:text-white transition-colors">
          HOROSCOPES
        </Link>
        <span className="text-white/20">›</span>
        <span className="text-mlh-plum font-semibold">{sign.latin.toUpperCase()}</span>
      </nav>

      {/* Hero Sign Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0 shadow-sm">
          {sign.emoji}
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
            {sign.latin} horoscope{" "}
            <span className="italic font-serif font-normal text-mlh-plum-300">
              today
            </span>
          </h1>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-mlh-muted pt-1">
            <span className="text-white font-semibold">{sign.vedic} RASHI</span>
            <span className="text-white/20">·</span>
            <span className="text-mlh-plum font-medium">RULED BY {sign.ruler}</span>
          </div>
        </div>
      </div>

      {/* Rashi Advisory Notice with action */}
      <div className="rounded-2xl border border-mlh-plum/30 bg-gradient-to-r from-mlh-plum/15 via-[#181926] to-[#12131c] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-mlh-muted">
          <Moon className="w-4 h-4 text-mlh-plum shrink-0" />
          <span>
            For those with the Moon in <strong className="text-white">{sign.latin} ({sign.vedic})</strong> at birth.
            Not sure of your Rashi?
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenMoonSignModal}
          className="text-xs text-mlh-plum hover:text-white font-semibold underline underline-offset-4 shrink-0 transition-colors cursor-pointer"
        >
          Find your Moon sign
        </button>
      </div>

      {/* Timeframe Switcher & Date Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-b border-[#252637]/70 pb-4">
        <div className="inline-flex items-center bg-[#181926] p-1 rounded-xl border border-[#252637]">
          <button
            type="button"
            onClick={() => onPeriodChange && onPeriodChange("daily")}
            className={`px-4 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
              activePeriod === "daily"
                ? "bg-mlh-plum text-white font-semibold shadow-sm"
                : "text-mlh-muted hover:text-white"
            }`}
          >
            Daily
          </button>
          <Link
            to="/horoscopes"
            className="px-4 py-1.5 text-xs text-mlh-muted hover:text-white rounded-lg transition-all"
          >
            Monthly
          </Link>
          <Link
            to="/horoscopes"
            className="px-4 py-1.5 text-xs text-mlh-muted hover:text-white rounded-lg transition-all"
          >
            Yearly
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181926] border border-[#252637] text-[11px] font-mono text-mlh-muted">
          <span className="font-semibold text-mlh-plum">TODAY</span>
          <span className="text-white/20">·</span>
          <span>{todayFormatted}</span>
        </div>
      </div>
    </div>
  )
}
