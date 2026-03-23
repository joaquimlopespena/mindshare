import { Toaster } from "@/components/ui/sonner"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-200">
      <main className="mx-auto px-16 py-4">
        {children}
      </main>

      <Toaster />
    </div>
  )
}
