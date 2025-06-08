"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ADMIN_PASSWORD } from "@/lib/prices"
import { Lock } from "lucide-react"

export function LoginForm() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simular una pequeña demora para dar sensación de procesamiento
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Guardar el estado de autenticación en sessionStorage (se borrará al cerrar el navegador)
        sessionStorage.setItem("admin_authenticated", "true")
        router.push("/admin/dashboard")
      } else {
        setError("Contraseña incorrecta. Por favor, inténtalo de nuevo.")
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-[#DC9171]/20 shadow-xl">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <Lock className="h-12 w-12 text-[#DC8C47]" />
        </div>
        <CardTitle className="text-2xl text-center text-[#DC8C47]">Panel de Administración</CardTitle>
        <CardDescription className="text-center text-[#B2A98C]">
          Ingresa tu contraseña para acceder al panel de administración
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-[#DC9171]/20 focus:border-[#DC8C47] focus:ring-[#DC8C47]"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#DC8C47] to-[#DC9171] hover:from-[#DC9171] hover:to-[#D2A278] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Verificando..." : "Acceder"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
