import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function CalculatorHeader({
  category = "BIRTH CHART",
  updatedDate = "21 JUL 2026",
  title = "Free Kundli Maker",
  icon = "/calculators/free-kundli-maker.png",
  subtitle = "A Kundli, or Janam Kundali, is a birth chart mapping the position of the planets, Sun and Moon across the twelve houses at your moment of birth. AstroTring generates it free using Swiss Ephemeris data, giving you your ascendant, planetary placements, Vimshottari Dasha periods and active yogas in seconds.",
  reviewerName = "Dr. Vineeta Chandrashekhar Phatak",
  reviewerTitle = "CHIEF ASTROLOGER · ASTROTRING",
  backUrl = "/calculators",
  backLabel = "All calculators",
}) {
  return (
    <div className="space-y-4 mb-7">
      {/* Top Breadcrumb Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-1 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-mlh-faint text-[10px] tracking-[0.22em] uppercase">
          <Link
            to="/calculators"
            className="text-mlh-muted hover:text-white transition-colors"
          >
            CALCULATORS
          </Link>
          <span>/</span>
          <span className="text-white">{title.toUpperCase()}</span>
        </div>

        <Link
          to={backUrl}
          className="inline-flex items-center gap-1.5 text-mlh-plum-300 hover:text-white text-[12px] font-sans transition-colors shrink-0 group"
        >
          <span className="font-mono text-xs transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span>{backLabel}</span>
        </Link>
      </div>

      {/* Header with Left Plate Icon + Title */}
      <div className="flex items-start gap-4 sm:gap-5 pt-2">
        {icon && (
          <span className="border-mlh-plum-400/30 grid h-[54px] w-[54px] flex-none place-items-center overflow-hidden rounded-[16px] sm:h-[62px] sm:w-[62px] border bg-mlh-plum-500/10">
            <img
              src={icon}
              alt=""
              width="46"
              height="46"
              className="pointer-events-none object-contain select-none"
            />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-[32px] leading-tight text-white sm:text-[38px] tracking-tight">
            {title}
          </h1>

          <div className="mt-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-mlh-plum-300">
            <span>{category}</span>
            <span>·</span>
            <span>UPDATED {updatedDate}</span>
          </div>
        </div>
      </div>

      {/* Description Subtitle */}
      <p className="text-mlh-muted mt-3 max-w-[700px] text-[15px] leading-relaxed">
        {subtitle}
      </p>

      {/* Astrologer Reviewer Pill */}
      {reviewerName && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-mlh-border/70 bg-mlh-surface/60 px-3.5 py-1.5 text-xs text-mlh-text backdrop-blur-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-mlh-plum-300 shrink-0" />
          <span>
            Reviewed by{" "}
            <strong className="text-white font-medium">{reviewerName}</strong>
            <span className="text-mlh-faint mx-1.5">·</span>
            <span className="font-mono text-[9.5px] text-mlh-plum-300 tracking-wider uppercase">
              {reviewerTitle}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
