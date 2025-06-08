// Definición de tipos para los precios
export interface Prices {
  tentBase: number // Precio base de 3 carpitas
  tentAdditional: number // Precio por carpita adicional
  workshop: {
    small: number // Hasta 6 invitados
    medium: number // Hasta 10 invitados
    large: number // Hasta 14 invitados
  }
  metegol: number
  kitTrays: number
  drawingBoards: number
  breakfast: number
  pictionaryAir: number // Nuevo servicio
}

// Precios por defecto
export const defaultPrices: Prices = {
  tentBase: 120000,
  tentAdditional: 18000,
  workshop: {
    small: 18000,
    medium: 24000,
    large: 28000,
  },
  metegol: 5000,
  kitTrays: 1800,
  drawingBoards: 2000,
  breakfast: 3800,
  pictionaryAir: 10000, // Nuevo servicio
}

// Guardar precios en localStorage
export const savePrices = (prices: Prices): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("suenos_felices_prices", JSON.stringify(prices))
  }
}

// Cargar precios desde localStorage
export const loadPrices = (): Prices => {
  if (typeof window !== "undefined") {
    const savedPrices = localStorage.getItem("suenos_felices_prices")
    if (savedPrices) {
      try {
        const parsed = JSON.parse(savedPrices)
        // Asegurar que el nuevo servicio esté incluido
        return {
          ...defaultPrices,
          ...parsed,
          pictionaryAir: parsed.pictionaryAir || defaultPrices.pictionaryAir,
        }
      } catch (e) {
        console.error("Error parsing saved prices", e)
      }
    }
  }
  return defaultPrices
}

// Contraseña de administrador (en una aplicación real, esto debería estar en el servidor)
export const ADMIN_PASSWORD = "suenosfelices2025"
