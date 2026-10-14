import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Sparkles, Check, X, ArrowLeft, Loader2, ShieldCheck, Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  closeAuthModal,
  setEmail as setStoreEmail,
  setStep as setStoreStep,
  clearError,
  sendOtp,
  verifyOtp,
} from "@/store/slices/authSlice"

export default function AuthModal({ isOpen: propsIsOpen, onClose: propsOnClose }) {
  const dispatch = useDispatch()
  const {
    isAuthModalOpen,
    email: storeEmail,
    step,
    cooldownSeconds,
    isNewUser,
    loading,
    error,
  } = useSelector((state) => state.auth || {})

  // Support both Redux state and explicit props
  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isAuthModalOpen

  const [localEmail, setLocalEmail] = useState(storeEmail || "")
  const [otp, setOtp] = useState("")
  const [resendTimer, setResendTimer] = useState(30)

  // Countdown timer for OTP resend cooldown
  useEffect(() => {
    let interval = null
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [step, resendTimer])

  const handleClose = (open) => {
    if (!open) {
      if (propsOnClose) {
        propsOnClose(false)
      }
      dispatch(closeAuthModal())
      setOtp("")
    }
  }

  const isValidEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim())
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    const trimmedEmail = localEmail.trim()
    if (!isValidEmail(trimmedEmail)) return

    dispatch(clearError())
    dispatch(setStoreEmail(trimmedEmail))
    const result = await dispatch(sendOtp({ email: trimmedEmail }))
    if (!result.error) {
      setResendTimer(cooldownSeconds || 30)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const trimmedOtp = otp.trim()
    if (trimmedOtp.length !== 6) return

    dispatch(clearError())
    const emailToVerify = localEmail || storeEmail
    const result = await dispatch(verifyOtp({ email: emailToVerify, otp: trimmedOtp }))
    if (!result.error) {
      if (propsOnClose) {
        propsOnClose(false)
      }
      setOtp("")
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0 || loading) return
    dispatch(clearError())
    const emailToTarget = localEmail || storeEmail
    const result = await dispatch(sendOtp({ email: emailToTarget }))
    if (!result.error) {
      setResendTimer(cooldownSeconds || 30)
    }
  }

  const handleBackToEmail = () => {
    dispatch(clearError())
    dispatch(setStoreStep(1))
    setOtp("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px] p-0 overflow-hidden border border-mlh-border bg-[#0f090c] text-foreground rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-5 min-h-[440px]">
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
                  <span>Astropedia stays free & unlimited</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-mlh-success shrink-0" />
                  <span>Passwordless OTP verification</span>
                </li>
              </ul>
            </div>

            <div className="text-[10px] text-mlh-faint font-mono pt-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-mlh-plum" />
              <span>Vedic Swiss-Ephemeris Engine</span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between relative bg-[#12131c]">
            {/* Close Button */}
            <button
              onClick={() => handleClose(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-mlh-muted hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Step 1: Email Entry */}
            {step === 1 && (
              <form onSubmit={handleEmailSubmit} className="space-y-6 pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono tracking-wider">
                  <span className="text-mlh-plum-300 font-semibold border-b-2 border-mlh-plum pb-0.5">
                    YOUR EMAIL
                  </span>
                  <span className="text-mlh-faint">STEP 1 OF 2</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-normal text-white">
                    What&apos;s your email?
                  </h3>
                  <p className="text-xs text-mlh-muted leading-relaxed">
                    We&apos;ll email you a 6-digit one-time code to sign you in or create your account. No passwords needed.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                    {error}
                  </div>
                )}

                {/* Email Input */}
                <div className="flex items-center rounded-xl border border-mlh-border-hi bg-[#0c070a] px-3 py-1.5 focus-within:border-mlh-plum focus-within:ring-1 focus-within:ring-mlh-plum transition-all">
                  <Mail className="w-4 h-4 text-mlh-muted shrink-0 mr-2" />
                  <Input
                    type="email"
                    placeholder="alex.mercer@example.com"
                    value={localEmail}
                    onChange={(e) => setLocalEmail(e.target.value)}
                    className="border-0 bg-transparent text-sm font-sans text-white placeholder:text-mlh-faint focus-visible:ring-0 shadow-none h-9 p-0"
                    autoFocus
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!isValidEmail(localEmail) || loading}
                  className="w-full bg-[#1c1d29] hover:bg-mlh-plum text-white font-medium py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-[#1c1d29] cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Code...
                    </span>
                  ) : (
                    "Send Verification Code"
                  )}
                </Button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit} className="space-y-6 pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono tracking-wider">
                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    className="text-mlh-muted hover:text-white inline-flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>CHANGE EMAIL</span>
                  </button>
                  <span className="text-mlh-faint">STEP 2 OF 2</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-normal text-white">
                    Enter verification code
                  </h3>
                  <p className="text-xs text-mlh-muted leading-relaxed">
                    Sent to <span className="text-white font-mono">{localEmail || storeEmail}</span>
                  </p>
                  {isNewUser && (
                    <span className="inline-block text-[10px] font-mono uppercase bg-mlh-plum/20 text-mlh-plum-200 px-2 py-0.5 rounded-md border border-mlh-plum/40">
                      Creating New Account
                    </span>
                  )}
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                    {error}
                  </div>
                )}

                {/* OTP Input */}
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="text-center font-mono text-2xl tracking-[0.4em] h-12 bg-[#0c070a] border-mlh-border-hi text-white placeholder:text-white/10 rounded-xl focus-visible:ring-mlh-plum"
                      autoFocus
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-mlh-faint">Enter 6-digit code</span>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendTimer > 0 || loading}
                      className="text-mlh-plum hover:underline disabled:opacity-40 disabled:no-underline font-medium cursor-pointer"
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={otp.length !== 6 || loading}
                  className="w-full bg-mlh-plum hover:bg-mlh-plum/90 text-white font-medium py-2.5 rounded-xl transition-all disabled:opacity-40 cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying Chart...
                    </span>
                  ) : (
                    "Verify & Bind Chart"
                  )}
                </Button>
              </form>
            )}

            <div className="text-[10px] text-center font-mono text-mlh-faint pt-4 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>OTP-ONLY PASSWORDLESS AUTHENTICATION</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
