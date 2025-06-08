"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type Prices, defaultPrices, loadPrices, savePrices } from "@/lib/prices"
import { Save, Home, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function PriceEditor() {
  const [prices, setPrices] = useState<Prices>(defaultPrices)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Cargar precios guardados al montar el componente
    const savedPrices = loadPrices()
    setPrices(savedPrices)
  }, [])

  const handleChange = (key: string, value: string) => {
    const numValue = Number.parseInt(value, 10) || 0

    if (key.includes(".")) {
      const [parent, child] = key.split(".")
      setPrices((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Prices],
          [child]: numValue,
        },
      }))
    } else {
      setPrices((prev) => ({
        ...prev,
        [key]: numValue,
      }))
    }

    setIsSaved(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Guardar precios en localStorage
    savePrices(prices)

    setTimeout(() => {
      setIsLoading(false)
      setIsSaved(true)
      toast({
        title: "Precios actualizados",
        description: "Los cambios se han guardado correctamente.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      })
    }, 800)
  }

  const handleReset = () => {
    setPrices(defaultPrices)
    setIsSaved(false)
    toast({
      title: "Precios restablecidos",
      description: "Se han restaurado los precios predeterminados. No olvides guardar los cambios.",
      variant: "destructive",
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="border-2 border-[#DC9171]/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-[#DC8C47] flex items-center justify-between">
          <span>Editor de Precios</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/")}
              className="border-[#DC8C47] text-[#DC8C47] hover:bg-[#DC8C47] hover:text-white"
            >
              <Home className="w-4 h-4 mr-1" />
              Inicio
            </Button>
          </div>
        </CardTitle>
        <CardDescription className="text-[#B2A98C]">
          Modifica los precios de los servicios y guarda los cambios
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Precios de carpitas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#DC8C47]">Precios de Carpitas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="tentBase" className="text-sm font-medium text-[#B2A98C]">
                  Precio base (3 carpitas)
                </label>
                <div className="flex items-center">
                  <Input
                    id="tentBase"
                    type="number"
                    value={prices.tentBase}
                    onChange={(e) => handleChange("tentBase", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.tentBase)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="tentAdditional" className="text-sm font-medium text-[#B2A98C]">
                  Precio por carpita adicional
                </label>
                <div className="flex items-center">
                  <Input
                    id="tentAdditional"
                    type="number"
                    value={prices.tentAdditional}
                    onChange={(e) => handleChange("tentAdditional", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.tentAdditional)}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-[#DC9171]/20" />

          {/* Precios de taller creativo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#DC8C47]">Taller Creativo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="workshopSmall" className="text-sm font-medium text-[#B2A98C]">
                  Caja chica (hasta 6 invitadas)
                </label>
                <div className="flex items-center">
                  <Input
                    id="workshopSmall"
                    type="number"
                    value={prices.workshop.small}
                    onChange={(e) => handleChange("workshop.small", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.workshop.small)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="workshopMedium" className="text-sm font-medium text-[#B2A98C]">
                  Caja mediana (hasta 10 invitadas)
                </label>
                <div className="flex items-center">
                  <Input
                    id="workshopMedium"
                    type="number"
                    value={prices.workshop.medium}
                    onChange={(e) => handleChange("workshop.medium", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.workshop.medium)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="workshopLarge" className="text-sm font-medium text-[#B2A98C]">
                  Caja grande (hasta 14 invitadas)
                </label>
                <div className="flex items-center">
                  <Input
                    id="workshopLarge"
                    type="number"
                    value={prices.workshop.large}
                    onChange={(e) => handleChange("workshop.large", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.workshop.large)}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-[#DC9171]/20" />

          {/* Otros servicios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#DC8C47]">Otros Servicios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="pictionaryAir" className="text-sm font-medium text-[#B2A98C]">
                  Pictionary Air
                </label>
                <div className="flex items-center">
                  <Input
                    id="pictionaryAir"
                    type="number"
                    value={prices.pictionaryAir}
                    onChange={(e) => handleChange("pictionaryAir", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.pictionaryAir)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="metegol" className="text-sm font-medium text-[#B2A98C]">
                  Mini Metegol
                </label>
                <div className="flex items-center">
                  <Input
                    id="metegol"
                    type="number"
                    value={prices.metegol}
                    onChange={(e) => handleChange("metegol", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.metegol)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="kitTrays" className="text-sm font-medium text-[#B2A98C]">
                  Kit Bandejas y Vasos (por carpa)
                </label>
                <div className="flex items-center">
                  <Input
                    id="kitTrays"
                    type="number"
                    value={prices.kitTrays}
                    onChange={(e) => handleChange("kitTrays", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.kitTrays)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="drawingBoards" className="text-sm font-medium text-[#B2A98C]">
                  Tablitas con Actividades (cada una)
                </label>
                <div className="flex items-center">
                  <Input
                    id="drawingBoards"
                    type="number"
                    value={prices.drawingBoards}
                    onChange={(e) => handleChange("drawingBoards", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.drawingBoards)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="breakfast" className="text-sm font-medium text-[#B2A98C]">
                  Combo Desayuno (cada uno)
                </label>
                <div className="flex items-center">
                  <Input
                    id="breakfast"
                    type="number"
                    value={prices.breakfast}
                    onChange={(e) => handleChange("breakfast", e.target.value)}
                    className="border-2 border-[#DC9171]/20"
                    min="0"
                  />
                  <span className="ml-2 text-[#B2A98C]">{formatCurrency(prices.breakfast)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="border-red-400 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Restablecer valores predeterminados
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#DC8C47] to-[#DC9171] hover:from-[#DC9171] hover:to-[#D2A278] text-white"
            disabled={isLoading || isSaved}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Guardando..." : isSaved ? "Guardado" : "Guardar cambios"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
