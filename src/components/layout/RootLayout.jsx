import { useState, useEffect } from "react"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Sidebar from "@/components/layout/Sidebar"
import MobileHeader from "@/components/layout/MobileHeader"
import AuthModal from "@/features/auth/AuthModal"
import { openAuthModal, closeAuthModal } from "@/store/slices/authSlice"

export default function RootLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const dispatch = useDispatch()
  const { isAuthModalOpen } = useSelector((state) => state.auth || {})

  const handleOpenAuth = () => {
    dispatch(openAuthModal())
  }

  // Listen for global unauthorized session expiration
  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch(openAuthModal())
    }
    window.addEventListener("astrotring:unauthorized", handleUnauthorized)
    return () => {
      window.removeEventListener("astrotring:unauthorized", handleUnauthorized)
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-[#0f090c] text-foreground flex flex-col md:flex-row font-sans selection:bg-mlh-plum/30 selection:text-white">
      <ScrollRestoration />

      {/* Desktop Collapsible Left Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onOpenBindModal={handleOpenAuth}
        />
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#0f090c] relative">
        {/* Mobile Top Header */}
        <MobileHeader onOpenBindModal={handleOpenAuth} />

        {/* Dynamic Page Outlet */}
        <main className="flex-1 flex flex-col relative">
          <Outlet context={{ onOpenBindModal: handleOpenAuth, onOpenAuthModal: handleOpenAuth }} />
        </main>
      </div>

      {/* Global Onboarding & Chart Binding Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => dispatch(closeAuthModal())}
      />
    </div>
  )
}

