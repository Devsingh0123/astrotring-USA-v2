import { useState } from "react"
import { Outlet, ScrollRestoration } from "react-router-dom"
import Sidebar from "@/components/layout/Sidebar"
import MobileHeader from "@/components/layout/MobileHeader"
import BindChartModal from "@/components/layout/BindChartModal"

export default function RootLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isBindModalOpen, setIsBindModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0f090c] text-foreground flex flex-col md:flex-row font-sans selection:bg-mlh-plum/30 selection:text-white">
      <ScrollRestoration />

      {/* Desktop Collapsible Left Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onOpenBindModal={setIsBindModalOpen}
        />
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#0f090c] relative">
        {/* Mobile Top Header */}
        <MobileHeader onOpenBindModal={setIsBindModalOpen} />

        {/* Dynamic Page Outlet */}
        <main className="flex-1 flex flex-col relative">
          <Outlet context={{ onOpenBindModal: setIsBindModalOpen }} />
        </main>
      </div>

      {/* Global Onboarding & Chart Binding Modal */}
      <BindChartModal
        isOpen={isBindModalOpen}
        onClose={setIsBindModalOpen}
      />
    </div>
  )
}
