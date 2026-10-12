import { useState } from "react"
import { Sparkles, Check, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BindChartModal({ isOpen, onClose }) {
  const [phone, setPhone] = useState("")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] p-0 overflow-hidden border border-mlh-border bg-[#0f090c] text-foreground rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-5 min-h-[420px]">
          {/* Left Hero Column */}
          <div className="md:col-span-2 p-6 md:p-8 bg-gradient-to-b from-[#1c0d17] to-[#12080f] border-b md:border-b-0 md:border-r border-mlh-border flex flex-col justify-between relative overflow-hidden">
            {/* Subtle radial aura */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-mlh-plum/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-mlh-plum flex items-center justify-center text-mlh-plum-100 shadow-sm border border-mlh-plum-400/40">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </span>
                <span className="font-serif font-bold text-lg tracking-tight text-white">
                  AstroTring
                </span>
              </div>

              <h2 className="text-2xl font-serif font-normal text-white leading-tight">
                Bind the instrument to your <span className="text-mlh-plum-300 italic">chart</span>
              </h2>

              <ul className="space-y-3 pt-2 text-xs text-mlh-muted">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-mlh-success shrink-0" />
                  <span>Readings saved to your chart, not a cookie</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-mlh-success shrink-0" />
                  <span>Vaani remembers every thread</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-mlh-success shrink-0" />
                  <span>Astropedia stays free</span>
                </li>
              </ul>
            </div>

            <div className="text-[10px] text-mlh-faint font-mono pt-4">
              Vedic Swiss-Ephemeris Engine
            </div>
          </div>

          {/* Right Form Column */}
          <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between relative bg-[#12131c]">
            <button
              onClick={() => onClose(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-mlh-muted hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-wider">
                <span className="text-mlh-plum-300 font-semibold border-b-2 border-mlh-plum pb-0.5">
                  YOUR NUMBER
                </span>
                <span className="text-mlh-faint">STEP 1 OF 5</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-normal text-white">
                  What's your number?
                </h3>
                <p className="text-xs text-mlh-muted leading-relaxed">
                  We'll text a code to verify it. Your chart and readings stay tied to this number.
                </p>
              </div>

              {/* Number Input */}
              <div className="flex items-center rounded-xl border border-mlh-border-hi bg-[#0c070a] px-3 py-1.5 focus-within:border-mlh-plum focus-within:ring-1 focus-within:ring-mlh-plum transition-all">
                <span className="text-xs font-mono font-medium text-mlh-text-hi pr-2 border-r border-mlh-border flex items-center gap-1">
                  IN <span className="text-mlh-muted">+91</span>
                </span>
                <Input
                  type="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-0 bg-transparent text-sm font-mono text-white placeholder:text-mlh-faint focus-visible:ring-0 shadow-none h-9 pl-3"
                />
              </div>

              <Button
                disabled={phone.length < 10}
                className="w-full bg-[#1c1d29] hover:bg-mlh-plum text-white font-medium py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-[#1c1d29]"
              >
                Continue
              </Button>
            </div>

            <div className="text-[10px] text-center font-mono text-mlh-faint pt-4 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>WE ONLY USE YOUR NUMBER TO SIGN YOU IN</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
