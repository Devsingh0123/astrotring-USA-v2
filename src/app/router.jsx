import { createBrowserRouter } from "react-router-dom"
import RootLayout from "@/components/layout/RootLayout"
import HomePage from "@/pages/HomePage"
import PlaceholderPage from "@/pages/PlaceholderPage"
import NotFoundPage from "@/pages/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "chat",
        element: <PlaceholderPage title="Ask Vaani — AI Vedic Consultation" />,
      },
      {
        path: "vaani",
        element: <PlaceholderPage title="Ask Vaani — AI Vedic Consultation" />,
      },
      {
        path: "calculators",
        element: <PlaceholderPage title="Vedic Calculators Suite" />,
      },
      {
        path: "calculators/:toolName",
        element: <PlaceholderPage title="Vedic Calculator" />,
      },
      {
        path: "reports",
        element: <PlaceholderPage title="Vedic Deep Reports" />,
      },
      {
        path: "reports/:slug",
        element: <PlaceholderPage title="Vedic Report Preview" />,
      },
      {
        path: "horoscope",
        element: <PlaceholderPage title="Daily & Weekly Horoscopes" />,
      },
      {
        path: "compatibility",
        element: <PlaceholderPage title="Kundli Milan Compatibility" />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router
