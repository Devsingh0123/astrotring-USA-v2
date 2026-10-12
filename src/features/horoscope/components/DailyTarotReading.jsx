import { Briefcase, Heart, Activity } from "lucide-react"

export default function DailyTarotReading({ tarotCard, tarotReading }) {
  if (!tarotReading) return null

  return (
    <section className="space-y-6 pt-4 border-t border-[#252637]/70">
      {/* Author Credential Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-sm font-bold text-purple-300 font-serif">
          A
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Anjali</h3>
          <p className="text-[10px] font-mono tracking-wider text-mlh-muted uppercase">
            TAROT READER · ASTROTRING
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-serif text-white tracking-tight">
          Tarot horoscope
        </h2>

        {/* Card Drawn Banner */}
        <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-5 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wide text-purple-300 uppercase">
            <span className="text-amber-400">✻</span>
            <span className="font-semibold">CARD DRAWN:</span>
            <span className="text-white font-bold">{tarotCard}</span>
          </div>
          <p className="text-sm text-mlh-muted leading-relaxed">
            {tarotReading.overview}
          </p>
        </div>
      </div>

      {/* 3 Tarot Blocks: Career, Love, Health */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-[#252637] bg-[#12131c]/80 p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-mlh-plum" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-mlh-plum uppercase">
              CAREER
            </span>
          </div>
          <p className="text-sm text-mlh-muted leading-relaxed">
            {tarotReading.career}
          </p>
        </div>

        <div className="rounded-2xl border border-[#252637] bg-[#12131c]/80 p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-pink-400 uppercase">
              LOVE
            </span>
          </div>
          <p className="text-sm text-mlh-muted leading-relaxed">
            {tarotReading.love}
          </p>
        </div>

        <div className="rounded-2xl border border-[#252637] bg-[#12131c]/80 p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              HEALTH
            </span>
          </div>
          <p className="text-sm text-mlh-muted leading-relaxed">
            {tarotReading.health}
          </p>
        </div>
      </div>
    </section>
  )
}
