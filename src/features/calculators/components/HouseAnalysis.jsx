import React from "react";
import { ZODIAC_SIGNS, SIGN_NAMES_TO_NUM } from "./NorthIndianChart";

const BHAVA_NAMES = [
  { num: 1, sanskrit: "Tanu Bhava", theme: "Self, Physical Body & General Well-being" },
  { num: 2, sanskrit: "Dhana Bhava", theme: "Wealth, Speech & Immediate Family" },
  { num: 3, sanskrit: "Sahaja Bhava", theme: "Courage, Siblings & Communication" },
  { num: 4, sanskrit: "Sukha Bhava", theme: "Mother, Vehicles, Mind & Real Estate" },
  { num: 5, sanskrit: "Putra Bhava", theme: "Children, Intellect, Romance & Past Merits" },
  { num: 6, sanskrit: "Ari Bhava", theme: "Enemies, Debts, Disease & Daily Routine" },
  { num: 7, sanskrit: "Yuvati Bhava", theme: "Spouse, Marriage & Business Partnerships" },
  { num: 8, sanskrit: "Randhra Bhava", theme: "Longevity, Transformation & Occult Sciences" },
  { num: 9, sanskrit: "Dharma Bhava", theme: "Fortune, Higher Wisdom, Guru & Pilgrimage" },
  { num: 10, sanskrit: "Karma Bhava", theme: "Career, Public Status, Authority & Fame" },
  { num: 11, sanskrit: "Labha Bhava", theme: "Gains, Older Siblings, Social Circles & Hopes" },
  { num: 12, sanskrit: "Vyaya Bhava", theme: "Expenditure, Foreign Lands, Isolation & Moksha" },
];

export default function HouseAnalysis({ chartData = {}, summary = {} }) {
  const ascendantSignStr =
    summary?.ascendantSign ||
    chartData?.Ascendant?.sign ||
    chartData?.ascendant?.sign ||
    "Aries";

  const lagnaNum = SIGN_NAMES_TO_NUM[ascendantSignStr.toLowerCase()] || 1;

  // Group planets into houses
  const planetsInHouses = {};
  for (let i = 1; i <= 12; i++) planetsInHouses[i] = [];

  const planetKeys = [
    "Ascendant",
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
    "Rahu",
    "Ketu",
  ];

  planetKeys.forEach((key) => {
    const pData = chartData[key] || chartData[key.toLowerCase()];
    if (!pData) return;
    let houseNum = pData.house;
    if (!houseNum && pData.sign) {
      const pSignNum = SIGN_NAMES_TO_NUM[pData.sign.toLowerCase()] || 1;
      houseNum = ((pSignNum - lagnaNum + 12) % 12) + 1;
    }
    if (houseNum && houseNum >= 1 && houseNum <= 12) {
      planetsInHouses[houseNum].push(key);
    }
  });

  return (
    <div className="rounded-2xl border border-mlh-border/80 bg-mlh-surface/80 backdrop-blur-md p-5 sm:p-6 shadow-xl shadow-black/20">
      <div className="pb-4 mb-5 border-b border-mlh-border/60">
        <h3 className="text-base sm:text-lg font-heading font-medium text-mlh-text-hi">
          The 12 Bhavas (House Significance)
        </h3>
        <p className="text-xs text-mlh-muted font-mono">
          Vedic house significations mapped from Lagna: {ascendantSignStr}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {BHAVA_NAMES.map(({ num, sanskrit, theme }) => {
          const signNum = ((lagnaNum - 1 + (num - 1)) % 12) + 1;
          const signInfo = ZODIAC_SIGNS[signNum];
          const planets = planetsInHouses[num] || [];

          return (
            <div
              key={num}
              className={`p-3.5 rounded-xl border transition-all ${
                num === 1
                  ? "border-mlh-amber/40 bg-mlh-amber/5"
                  : [4, 7, 10].includes(num)
                  ? "border-mlh-border-hi bg-mlh-surface-hi/40"
                  : [5, 9].includes(num)
                  ? "border-mlh-border-hi bg-mlh-surface/90"
                  : "border-mlh-border/60 bg-mlh-bg/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-semibold text-mlh-amber">
                  House {num} · {sanskrit}
                </span>
                <span className="text-[11px] font-mono text-mlh-muted">
                  {signInfo?.name} ({signNum})
                </span>
              </div>

              <p className="text-xs text-mlh-muted leading-relaxed line-clamp-2">
                {theme}
              </p>

              {planets.length > 0 ? (
                <div className="mt-2.5 pt-2 border-t border-mlh-border/40 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-mono text-mlh-muted uppercase tracking-wider">
                    Planets:
                  </span>
                  {planets.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded text-[11px] font-mono font-medium border border-mlh-border bg-mlh-surface text-mlh-text-hi"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-2.5 pt-2 border-t border-mlh-border/30 text-[10px] font-mono text-mlh-faint">
                  Empty House
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
