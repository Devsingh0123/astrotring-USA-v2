import { ThumbsUp, AlertCircle, Briefcase, Heart, Activity } from "lucide-react"

export default function DailyVedicReading({ reading }) {
  if (!reading) return null

  return (
    <section className="space-y-6">
      {/* Author Credential Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-mlh-plum/20 border border-mlh-plum/40 flex items-center justify-center text-sm font-bold text-mlh-plum font-serif">
          M
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">
            AstroTring Astrology Team
          </h3>
          <p className="text-[10px] font-mono tracking-wider text-mlh-muted uppercase">
            VEDIC ASTROLOGERS · ASTROTRING
          </p>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-serif text-white tracking-tight">
        According to your Moon sign
      </h2>

      {/* 5 Blocks: Positive, Negative, Career, Love, Health */}
      <div className="space-y-4">
        {/* 1. POSITIVE */}
        <div className="rounded-2xl border border-[#252637] bg-[#12131c]/80 p-5 space-y-2 hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
              POSITIVE
            </span>
          </div>
          <p className="text-sm text-mlh-muted leading-relaxed">
            {reading.positive}
          </p>
        </div>

        {/* 2. NEGATIVE */}
        <div className="rounded-2xl border border-[#252637] bg-[#12131c]/80 p-5 space-y-2 hover:border-rose-500/30 transition-colors">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-rose-400 uppercase">
              NEGATIVE
            </span>
          </div>
          <p className="text-sm text-mlh-muted leading-relaxed">
            {reading.negative}
          </p>
        </div>

        {/* 3. CAREER */}
        <div className="rounded-2xl border border-[#252637] bg-[#12131c]/80 p-5 space-y-2 hover:border-amber-500/30 transition-colors">
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase">
              CAREER
            </span>
          </div>
          <p className="text-sm text-mlh-muted leading-relaxed">
            {reading.career}
          </p>
        </div>

        {/* 4. LOVE */}
        <div className="rounded-2xl border border-[#252637] bg-[#12131c]/80 p-5 space-y-2 hover:border-pink-500/30 transition-colors">
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-pink-400 uppercase">
              LOVE
            </span>
          </div>
          <p className="text-sm text-mlh-muted leading-relaxed">
            {reading.love}
          </p>
        </div>

        {/* 5. HEALTH */}
        <div className="rounded-2xl border border-[#252637] bg-[#12131c]/80 p-5 space-y-2 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              HEALTH
            </span>
          </div>
          <p className="text-sm text-mlh-muted leading-relaxed">
            {reading.health}
          </p>
        </div>
      </div>
    </section>
  )
}
