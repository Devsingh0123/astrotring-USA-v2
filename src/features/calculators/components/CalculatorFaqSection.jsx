import React from "react";

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    desc: "Enter your date, exact time and place of birth.",
  },
  {
    step: "02",
    desc: "AstroTring computes planetary degrees using Swiss Ephemeris and sets your ascendant.",
  },
  {
    step: "03",
    desc: "Read your chart: houses, planetary placements, Dasha timeline and yogas.",
  },
];

const DEFAULT_FAQS = [
  {
    q: "What is a Kundli?",
    a: "A Kundli, also called a Janam Kundali or birth chart, is an astrological map of the sky at the exact time and place of your birth. It shows where the planets, Sun and Moon sit across the twelve houses.",
  },
  {
    q: "How accurate is this Kundli calculator?",
    a: "It uses Swiss Ephemeris planetary data, the same source professional astrologers rely on, so planetary degrees, ascendant and Dasha periods are calculated to professional-grade precision.",
  },
  {
    q: "What if I don't know my exact birth time?",
    a: "If your birth time is unknown, toggle the 'Time unknown' switch. The calculator will render a Moon and Sun chart, providing qualitative planetary placements without an unreliable rising degree.",
  },
  {
    q: "What is the difference between Lagna and Rashi?",
    a: "Your Lagna (ascendant) is the constellation rising on the eastern horizon at birth; it frames every house in your chart. Your Rashi (Moon sign) is where the Moon was situated; it governs your internal emotional instincts.",
  },
];

export default function CalculatorFaqSection({
  howItWorks = HOW_IT_WORKS_STEPS,
  faqs = DEFAULT_FAQS,
  toolName = "Free Kundli Maker",
}) {
  return (
    <div className="space-y-12 mt-12 text-left">
      {/* How it works */}
      <div className="space-y-4">
        <h2 className="font-serif text-[24px] text-white sm:text-[28px] font-medium">
          How it works
        </h2>

        <div className="space-y-2.5">
          {howItWorks.map(({ step, desc }) => (
            <div
              key={step}
              className="flex items-start gap-4 rounded-xl border border-mlh-border/70 bg-mlh-surface/50 p-4 transition-colors hover:border-mlh-plum-400/30"
            >
              <span className="font-mono text-sm font-semibold text-mlh-plum-300 shrink-0 mt-0.5">
                {step}
              </span>
              <p className="text-sm text-mlh-text leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Understanding Tool */}
      <div className="space-y-5">
        <h2 className="font-serif text-[24px] text-white sm:text-[28px] font-medium">
          Understanding {toolName}
        </h2>

        <div className="space-y-3.5">
          {faqs.map(({ q, a }, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-mlh-border/70 bg-mlh-surface/50 p-5 space-y-2 transition-colors hover:border-mlh-plum-400/30"
            >
              <h3 className="font-serif text-[17px] text-white font-medium">
                {q}
              </h3>
              <p className="text-sm text-mlh-muted leading-relaxed">
                {a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
