import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft } from "lucide-react"

export default function PlaceholderPage({ title = "Feature Under Construction" }) {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-12 space-y-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Sparkles className="w-6 h-6 text-amber-500" />
      </div>
      <h1 className="text-2xl font-bold font-heading">{title}</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        This Vedic instrument is currently being prepared. Explore our AI consultation on the homepage.
      </p>
      <Button asChild variant="outline" size="sm">
        <Link to="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </Button>
    </div>
  )
}
