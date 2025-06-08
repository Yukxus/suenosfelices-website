"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PriceEditor } from "@/components/admin/price-editor"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const authenticated = sessionStorage.getItem("admin_authenticated") === "true"
    setIsAuthenticated(authenticated)

    if (!authenticated) {
      router.push("/admin")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated")
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC8C47] mx-auto"></div>
          <p className="mt-4 text-[#B2A98C]">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // No renderizar nada mientras redirige
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/images/logo-new.png" alt="Sueños Felices Pijamadas" className="w-10 h-10 object-contain" />
            <h1 className="text-xl font-bold text-[#B2A98C]">Panel de Administración</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-red-400 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <PriceEditor />
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-orange-200 py-4">
        <div className="container mx-auto px-4 text-center text-[#B2A98C] text-sm">
          © 2025 Sueños Felices Pijamadas - Panel de Administración
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
