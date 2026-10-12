import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">AstroTring</h1>
      <p className="text-muted-foreground">Testing shadcn/ui Button (Base UI + Nova preset)</p>
      <div className="flex gap-2">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  )
}
