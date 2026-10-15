import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const PLANET_NAMES = [
  { key: "Ascendant", label: "Ascendant (Lagna)", glyph: "✦" },
  { key: "Sun", label: "Sun (Surya)", glyph: "☉" },
  { key: "Moon", label: "Moon (Chandra)", glyph: "☽" },
  { key: "Mars", label: "Mars (Mangal)", glyph: "♂" },
  { key: "Mercury", label: "Mercury (Budha)", glyph: "☿" },
  { key: "Jupiter", label: "Jupiter (Guru)", glyph: "♃" },
  { key: "Venus", label: "Venus (Shukra)", glyph: "♀" },
  { key: "Saturn", label: "Saturn (Shani)", glyph: "♄" },
  { key: "Rahu", label: "Rahu (North Node)", glyph: "☊" },
  { key: "Ketu", label: "Ketu (South Node)", glyph: "☋" },
];

function formatDegree(degree) {
  if (degree === undefined || degree === null) return "—";
  const degInSign = degree % 30;
  const d = Math.floor(degInSign);
  const m = Math.floor((degInSign - d) * 60);
  const s = Math.floor(((degInSign - d) * 60 - m) * 60);
  return `${d}° ${m}' ${s}"`;
}

export default function PlanetaryTable({ chartData = {} }) {
  return (
    <div className="rounded-2xl border border-mlh-border/80 bg-mlh-surface/80 backdrop-blur-md overflow-hidden shadow-xl shadow-black/20">
      <div className="px-5 py-4 border-b border-mlh-border/60 flex items-center justify-between">
        <div>
          <h3 className="text-base font-heading font-medium text-mlh-text-hi">
            Planetary Positions (Graha Sphutas)
          </h3>
          <p className="text-xs text-mlh-muted font-mono">
            Nirayana (Sidereal) Zodiac · Lahiri Ayanamsha
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-mlh-bg/60">
            <TableRow className="border-mlh-border/60 hover:bg-transparent">
              <TableHead className="text-[11px] font-mono tracking-wider text-mlh-muted uppercase py-3">
                Planet
              </TableHead>
              <TableHead className="text-[11px] font-mono tracking-wider text-mlh-muted uppercase">
                Sign (Rashi)
              </TableHead>
              <TableHead className="text-[11px] font-mono tracking-wider text-mlh-muted uppercase">
                Degree
              </TableHead>
              <TableHead className="text-[11px] font-mono tracking-wider text-mlh-muted uppercase">
                Nakshatra
              </TableHead>
              <TableHead className="text-[11px] font-mono tracking-wider text-mlh-muted uppercase">
                Pada
              </TableHead>
              <TableHead className="text-[11px] font-mono tracking-wider text-mlh-muted uppercase">
                Lord
              </TableHead>
              <TableHead className="text-[11px] font-mono tracking-wider text-mlh-muted uppercase text-right">
                Motion
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PLANET_NAMES.map(({ key, label, glyph }) => {
              const data = chartData[key] || chartData[key.toLowerCase()];
              if (!data) return null;

              const isRetro = Boolean(data.retrograde);
              const isAsc = key === "Ascendant";

              return (
                <TableRow
                  key={key}
                  className="border-mlh-border/40 hover:bg-mlh-bg/40 transition-colors"
                >
                  <TableCell className="py-3 font-medium text-sm text-mlh-text-hi">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-mlh-amber w-4 text-center font-serif">
                        {glyph}
                      </span>
                      <span>{label}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-mlh-text">
                    {data.sign || "—"}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-mlh-text-hi">
                    {formatDegree(data.longitude)}
                  </TableCell>
                  <TableCell className="text-xs text-mlh-text">
                    {data.nakshatra || "—"}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-mlh-amber font-semibold">
                    {data.pada || "—"}
                  </TableCell>
                  <TableCell className="text-xs text-mlh-muted">
                    {data.sign_lord || data.nakshatra_lord || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    {isAsc ? (
                      <Badge
                        variant="outline"
                        className="border-mlh-amber/40 text-mlh-amber bg-mlh-amber/10 text-[10px] font-mono"
                      >
                        LAGNA
                      </Badge>
                    ) : isRetro ? (
                      <Badge
                        variant="outline"
                        className="border-amber-500/40 text-amber-400 bg-amber-500/10 text-[10px] font-mono"
                      >
                        RETRO (R)
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-mlh-border text-mlh-muted text-[10px] font-mono"
                      >
                        DIRECT
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
