"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Star,
  Calculator,
  Phone,
  Mail,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  Moon,
  TreePine,
  Flower,
} from "lucide-react"
import { CalendarReservas } from "@/components/calendar-reservas"

export default function SuenosFelicesLanding() {
  const [selectedTents, setSelectedTents] = useState<number>(3)
  const [selectedTheme, setSelectedTheme] = useState<string>("")
  const [guestCount, setGuestCount] = useState<number>(5)
  const [additionalServices, setAdditionalServices] = useState({
    workshop: false,
    metegol: false,
    kitTrays: 0,
    drawingBoards: 0,
    breakfast: 0,
  })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Nuevas imágenes del carrusel principal en formato vertical
  const carouselImages = [
    "/images/carrusel1.jpg",
    "/images/carrusel2.jpg",
    "/images/carrusel3.jpg",
    "/images/carrusel4.jpg",
    "/images/safari.jpg",
    "/images/flamencos.jpg",
    "/images/campamento-militar.jpg",
    "/images/tiktok.jpg",
    "/images/futbol.jpg",
    "/images/boho.jpg",
    "/images/bajo-el-mar.jpg",
  ]

  // Temáticas con todas las imágenes reales
  const tematicas = [
    { name: "Boho Chic", image: "/images/boho.jpg" },
    { name: "Bosque Nórdico", image: "/images/bosque-nordico.jpg" },
    { name: "Jardín Encantado", image: "/images/jardin-encantado.jpg" },
    { name: "Flamencos", image: "/images/flamencos.jpg" },
    { name: "Safari", image: "/images/safari.jpg" },
    { name: "Llamitas Norteñas", image: "/images/llamitas-nortenas.jpg" },
    { name: "Bajo el Mar", image: "/images/bajo-el-mar.jpg" },
    { name: "Campamento Militar", image: "/images/campamento-militar.jpg" },
    { name: "Fútbol", image: "/images/futbol.jpg" },
    { name: "TikTok", image: "/images/tiktok.jpg" },
  ]

  // Testimonios de clientes
  const testimonios = [
    {
      texto:
        "¡Increíble experiencia! Mi hija no para de hablar de lo maravillosa que fue su pijamada. Todo estuvo perfecto, desde la decoración hasta las actividades. ¡Súper recomendado!",
      autor: "María González",
      hijos: "Sofía, 8 años",
    },
    {
      texto:
        "El servicio fue excepcional. Los niños se divirtieron muchísimo y nosotros como padres pudimos relajarnos sabiendo que todo estaba en buenas manos. ¡Volveremos a contratar!",
      autor: "Carlos Rodríguez",
      hijos: "Mateo y Lucas, 7 y 9 años",
    },
    {
      texto:
        "Superó todas nuestras expectativas. La atención al detalle, la calidad de los materiales y la dedicación del equipo hicieron que fuera una noche mágica para mi pequeña.",
      autor: "Ana Martínez",
      hijos: "Valentina, 6 años",
    },
  ]

  // Precios actualizados según la imagen "Nuestra Propuesta"
  const tentPrices = {
    3: 120000, // 3 carpitas para 5/6 peques
    4: 138000, // 4 carpitas para 7/8 niñ@s
    5: 156000, // 5 carpitas para 9/10 niñ@s
    6: 174000, // 6 carpitas para 11/12 niñ@s
  }

  const additionalPrices = {
    workshop: 20000,
    metegol: 5000,
    kitTrays: 1800,
    drawingBoards: 2000,
    breakfast: 3800,
  }

  const calculateTotal = () => {
    let total = 0

    // Precio base de 3 carpitas + carpitas adicionales
    total += 120000 + (selectedTents - 3) * 18000

    // Taller creativo con precios variables según invitados
    if (additionalServices.workshop) {
      if (guestCount <= 6) {
        total += 18000 // Caja chica
      } else if (guestCount <= 10) {
        total += 24000 // Caja mediana
      } else {
        total += 28000 // Caja grande
      }
    }

    if (additionalServices.metegol) total += additionalPrices.metegol
    total += additionalServices.kitTrays * additionalPrices.kitTrays
    total += additionalServices.drawingBoards * additionalPrices.drawingBoards
    total += additionalServices.breakfast * additionalPrices.breakfast

    return total
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const updateAdditionalService = (service: string, value: number | boolean) => {
    setAdditionalServices((prev) => ({
      ...prev,
      [service]: value,
    }))
  }

  const nextImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
      setIsTransitioning(false)
    }, 200)
  }

  const prevImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
      setIsTransitioning(false)
    }, 200)
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000)
    return () => clearInterval(interval)
  }, [isTransitioning])

  const getWorkshopPrice = () => {
    if (guestCount <= 6) return 18000
    if (guestCount <= 10) return 24000
    return 28000
  }

  const getWorkshopDescription = () => {
    if (guestCount <= 6) return "Caja chica (hasta 6 invitadas)"
    if (guestCount <= 10) return "Caja mediana (hasta 10 invitadas)"
    return "Caja grande (hasta 14 invitadas)"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 text-[#DC8C47]/20 animate-bounce">
          <Star className="w-6 h-6" />
        </div>
        <div className="absolute top-40 right-20 text-[#DC9171]/20 animate-pulse">
          <Heart className="w-8 h-8" />
        </div>
        <div className="absolute bottom-40 left-20 text-[#B2A98C]/20 animate-bounce delay-1000">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="absolute top-60 right-10 text-[#D2A278]/20 animate-pulse delay-500">
          <Moon className="w-6 h-6" />
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50 transition-all duration-300 hover:bg-white/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <img src="/images/logo-new.png" alt="Sueños Felices Pijamadas" className="w-14 h-14 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#B2A98C] transition-colors duration-300 group-hover:text-[#DC9171]">
                Sueños Felices
              </h1>
              <p className="text-sm text-[#B2A98C]">Pijamadas</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            {["galeria", "tematicas", "calculadora", "testimonios", "contacto"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-[#DC8C47] hover:text-[#DC9171] transition-all duration-300 hover:scale-105 capitalize relative group"
              >
                {item === "galeria" ? "Galería" : item === "temáticas" ? "Temáticas" : item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DC9171] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-4 md:mb-6 animate-pulse">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 md:w-6 md:h-6 fill-[#DC8C47] text-[#DC8C47] animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          <div className="relative flex justify-center mb-6 md:mb-8">
            <div className="transition-transform duration-500 hover:scale-110 animate-fade-in">
              <img
                src="/images/logo-new.png"
                alt="Sueños Felices Pijamadas"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300"
              />
            </div>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-[#B2A98C] mb-6 md:mb-8 max-w-3xl mx-auto px-4 animate-slide-up">
            Creamos experiencias mágicas e inolvidables para los pequeños de la casa. Pijamadas temáticas llenas de
            diversión, aventura y sueños felices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 animate-slide-up delay-300">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#DC8C47] to-[#DC9171] hover:from-[#DC9171] hover:to-[#D2A278] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              onClick={() => document.getElementById("calculadora")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Calculator className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Calcular Precio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#DC8C47] text-[#DC8C47] hover:bg-[#DC8C47] hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105 group"
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-125 transition-transform duration-300" />
              Contactar
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Carousel Section */}
      <section id="galeria" className="py-20 px-4 bg-white/50 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TreePine className="w-8 h-8 text-[#DC8C47] animate-bounce" />
              <h2 className="text-4xl font-bold text-[#DC8C47]">Nuestro Trabajo</h2>
              <Flower className="w-8 h-8 text-[#DC9171] animate-bounce delay-300" />
            </div>
            <p className="text-center text-[#B2A98C] text-lg">Momentos mágicos que hemos creado</p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Carrusel con diseño de 3 imágenes */}
            <div className="flex items-center justify-center gap-4 md:gap-8 h-[500px] md:h-[600px]">
              {/* Imagen anterior (izquierda) */}
              <div
                className="relative group cursor-pointer transition-all duration-500 hover:scale-105"
                onClick={prevImage}
              >
                <div className="w-32 md:w-48 h-40 md:h-64 rounded-2xl overflow-hidden shadow-lg opacity-60 hover:opacity-80 transition-all duration-300">
                  <img
                    src={
                      carouselImages[(currentImageIndex - 1 + carouselImages.length) % carouselImages.length] ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt="Imagen anterior"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Imagen central (protagonista) */}
              <div className="relative group">
                <div
                  className={`w-64 md:w-80 h-80 md:h-[480px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
                    isTransitioning ? "scale-95 opacity-70" : "scale-100 opacity-100"
                  } group-hover:scale-105`}
                >
                  <img
                    src={carouselImages[currentImageIndex] || "/placeholder.svg"}
                    alt={`Pijamada ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                  {/* Overlay con información */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold mb-2">Pijamada Mágica</h3>
                    <p className="text-sm opacity-90">Experiencias únicas llenas de diversión</p>
                  </div>
                </div>
              </div>

              {/* Imagen siguiente (derecha) */}
              <div
                className="relative group cursor-pointer transition-all duration-500 hover:scale-105"
                onClick={nextImage}
              >
                <div className="w-32 md:w-48 h-40 md:h-64 rounded-2xl overflow-hidden shadow-lg opacity-60 hover:opacity-80 transition-all duration-300">
                  <img
                    src={carouselImages[(currentImageIndex + 1) % carouselImages.length] || "/placeholder.svg"}
                    alt="Imagen siguiente"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Controles de navegación mejorados */}
            <div className="flex justify-center mt-8 space-x-3">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`transition-all duration-300 hover:scale-125 ${
                    index === currentImageIndex
                      ? "w-8 h-3 bg-gradient-to-r from-[#DC8C47] to-[#DC9171] rounded-full scale-125"
                      : "w-3 h-3 bg-[#DC8C47]/30 hover:bg-[#DC8C47]/60 rounded-full"
                  }`}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true)
                      setTimeout(() => {
                        setCurrentImageIndex(index)
                        setIsTransitioning(false)
                      }, 150)
                    }
                  }}
                />
              ))}
            </div>

            {/* Botones de navegación flotantes */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-[#DC8C47] text-[#DC8C47] transition-all duration-300 hover:scale-110 hover:shadow-xl backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-[#DC8C47] text-[#DC8C47] transition-all duration-300 hover:scale-110 hover:shadow-xl backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Temáticas Section */}
      <section id="tematicas" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-[#DC8C47] animate-spin" />
              <h2 className="text-4xl font-bold text-[#DC8C47]">Nuestras Temáticas</h2>
            </div>
            <p className="text-center text-[#B2A98C] text-lg">Elige la temática perfecta para tu pijamada</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {tematicas.map((tematica, index) => (
              <Card
                key={index}
                className="border-2 border-[#DC9171]/20 hover:border-[#DC8C47] transition-all duration-300 hover:shadow-lg overflow-hidden group hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square relative">
                  <img
                    src={tematica.image || "/placeholder.svg"}
                    alt={tematica.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:from-black/40"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="text-white font-bold text-sm md:text-base text-center transition-all duration-300 group-hover:scale-110">
                      {tematica.name}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculadora" className="py-20 px-4 bg-white/50 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calculator className="w-8 h-8 text-[#DC8C47] animate-bounce" />
              <h2 className="text-4xl font-bold text-[#DC8C47]">Calculadora de Precios</h2>
            </div>
            <p className="text-center text-[#B2A98C] text-lg">Personaliza tu pijamada y conoce el precio al instante</p>
          </div>

          <Card className="border-2 border-[#DC9171]/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#DC8C47] flex items-center">
                <Calculator className="w-6 h-6 mr-2 animate-pulse" />
                Configura tu Pijamada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Theme Selection */}
              <div>
                <h3 className="text-lg font-semibold text-[#DC8C47] mb-4">Selecciona la temática</h3>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full p-3 border-2 border-[#DC9171]/20 rounded-lg focus:border-[#DC8C47] focus:outline-none transition-colors duration-300 text-[#DC8C47] bg-white"
                >
                  <option value="">Elige una temática...</option>
                  {tematicas.map((tematica, index) => (
                    <option key={index} value={tematica.name}>
                      {tematica.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calendar Section */}
              <div>
                <CalendarReservas selectedDate={selectedDate} onDateSelect={setSelectedDate} />
              </div>

              <Separator className="bg-[#DC9171]/20" />

              {/* Guest Count */}
              <div>
                <h3 className="text-lg font-semibold text-[#DC8C47] mb-4">Número de invitados</h3>
                <div className="flex items-center justify-center space-x-4 p-4 border-2 border-[#DC9171]/20 rounded-lg">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuestCount(Math.max(5, guestCount - 1))}
                    className="w-10 h-10 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                    disabled={guestCount === 5}
                  >
                    -
                  </Button>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-[#DC8C47]">{guestCount}</span>
                    <p className="text-sm text-[#B2A98C]">invitados</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuestCount(Math.min(20, guestCount + 1))}
                    className="w-10 h-10 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                    disabled={guestCount === 20}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Separator className="bg-[#DC9171]/20" />

              {/* Tent Selection */}
              <div>
                <h3 className="text-lg font-semibold text-[#DC8C47] mb-4">Número de carpitas</h3>

                <div className="space-y-4">
                  {/* Contador de carpitas */}
                  <div className="flex items-center justify-center space-x-4 p-4 border-2 border-[#DC9171]/20 rounded-lg">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTents(Math.max(3, selectedTents - 1))}
                      className="w-10 h-10 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                      disabled={selectedTents === 3}
                    >
                      -
                    </Button>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-[#DC8C47]">{selectedTents}</span>
                      <p className="text-sm text-[#B2A98C]">carpitas</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTents(Math.min(10, selectedTents + 1))}
                      className="w-10 h-10 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                      disabled={selectedTents === 10}
                    >
                      +
                    </Button>
                  </div>

                  {/* Información de precios */}
                  <div className="bg-gradient-to-r from-[#DC8C47]/5 to-[#DC9171]/5 p-4 rounded-lg">
                    <div className="text-center space-y-2">
                      <p className="text-[#DC8C47] font-semibold">Precio base (3 carpitas): {formatPrice(120000)}</p>
                      {selectedTents > 3 && (
                        <p className="text-[#DC9171] font-medium">
                          + {selectedTents - 3} carpita{selectedTents > 4 ? "s" : ""} adicional
                          {selectedTents > 4 ? "es" : ""}: {formatPrice((selectedTents - 3) * 18000)}
                        </p>
                      )}
                      <p className="text-lg font-bold text-[#DC8C47]">
                        Total carpitas: {formatPrice(120000 + (selectedTents - 3) * 18000)}
                      </p>
                    </div>
                  </div>

                  {/* Comentarios informativos */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#B2A98C]">
                      <div className="w-2 h-2 bg-[#DC8C47] rounded-full"></div>
                      <span>Por cada carpita entran dos invitados</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B2A98C]">
                      <div className="w-2 h-2 bg-[#DC9171] rounded-full"></div>
                      <span>Cada carpita adicional: {formatPrice(18000)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#DC8C47] font-medium">
                      <div className="w-2 h-2 bg-[#DC8C47] rounded-full"></div>
                      <span>Consultar disponibilidad si se necesita más de 10 carpitas</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-[#DC9171]/20" />

              {/* Additional Services */}
              <div>
                <h3 className="text-lg font-semibold text-[#DC8C47] mb-4">Servicios Adicionales</h3>
                <div className="space-y-4">
                  {/* Taller Creativo */}
                  <div className="flex items-center justify-between p-4 border border-[#DC9171]/20 rounded-lg transition-all duration-300 hover:shadow-md hover:border-[#DC8C47] group">
                    <div className="flex-1">
                      <span className="font-medium text-[#DC8C47] group-hover:text-[#DC9171] transition-colors duration-300">
                        Taller Creativo
                      </span>
                      <p className="text-sm text-[#B2A98C] mt-1">
                        Kit de bijoutería con numerosas bolitas, perlas y dijes para divertirse
                      </p>
                      <p className="text-sm font-semibold text-[#DC9171]">
                        {formatPrice(getWorkshopPrice())} - {getWorkshopDescription()}
                      </p>
                    </div>
                    <Button
                      variant={additionalServices.workshop ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateAdditionalService("workshop", !additionalServices.workshop)}
                      className={`transition-all duration-300 hover:scale-105 ${
                        additionalServices.workshop
                          ? "bg-[#DC8C47] hover:bg-[#DC9171] scale-105"
                          : "border-[#DC8C47] text-[#DC8C47] hover:bg-[#DC8C47] hover:text-white"
                      }`}
                    >
                      {additionalServices.workshop ? "Añadido" : "Añadir"}
                    </Button>
                  </div>

                  {/* Mini Metegol */}
                  <div className="flex items-center justify-between p-4 border border-[#DC9171]/20 rounded-lg transition-all duration-300 hover:shadow-md hover:border-[#DC8C47] group">
                    <div className="flex-1">
                      <span className="font-medium text-[#DC8C47] group-hover:text-[#DC9171] transition-colors duration-300">
                        Mini Metegol
                      </span>
                      <p className="text-sm text-[#B2A98C] mt-1">Alquiler toda la noche</p>
                      <p className="text-sm font-semibold text-[#DC9171]">{formatPrice(5000)}</p>
                    </div>
                    <Button
                      variant={additionalServices.metegol ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateAdditionalService("metegol", !additionalServices.metegol)}
                      className={`transition-all duration-300 hover:scale-105 ${
                        additionalServices.metegol
                          ? "bg-[#DC8C47] hover:bg-[#DC9171] scale-105"
                          : "border-[#DC8C47] text-[#DC8C47] hover:bg-[#DC8C47] hover:text-white"
                      }`}
                    >
                      {additionalServices.metegol ? "Añadido" : "Añadir"}
                    </Button>
                  </div>

                  {/* Kit Bandejas y Vasos */}
                  <div className="flex items-center justify-between p-4 border border-[#DC9171]/20 rounded-lg transition-all duration-300 hover:shadow-md hover:border-[#DC8C47] group">
                    <div className="flex-1">
                      <span className="font-medium text-[#DC8C47] group-hover:text-[#DC9171] transition-colors duration-300">
                        Kit Bandejas y Vasos
                      </span>
                      <p className="text-sm text-[#B2A98C] mt-1">
                        Super práctico para usar toda la noche, sumale a cada carpa una BANDEJA GRANDE + 2 VASITOS CON
                        TAPA Y SORBETES DESCARTABLES
                      </p>
                      <p className="text-sm font-semibold text-[#DC9171]">{formatPrice(1800)} por carpa</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateAdditionalService("kitTrays", Math.max(0, additionalServices.kitTrays - 1))
                        }
                        className="w-8 h-8 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                        disabled={additionalServices.kitTrays === 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold">{additionalServices.kitTrays}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateAdditionalService("kitTrays", Math.min(10, additionalServices.kitTrays + 1))
                        }
                        className="w-8 h-8 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                        disabled={additionalServices.kitTrays === 10}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Tablitas con Actividades */}
                  <div className="flex items-center justify-between p-4 border border-[#DC9171]/20 rounded-lg transition-all duration-300 hover:shadow-md hover:border-[#DC8C47] group">
                    <div className="flex-1">
                      <span className="font-medium text-[#DC8C47] group-hover:text-[#DC9171] transition-colors duration-300">
                        Tablitas con Actividades
                      </span>
                      <p className="text-sm text-[#B2A98C] mt-1">
                        Incluyen hojas con actividades y dibujos para colorear acorde a temática y edad
                      </p>
                      <p className="text-sm font-semibold text-[#DC9171]">{formatPrice(2000)} cada una</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateAdditionalService("drawingBoards", Math.max(0, additionalServices.drawingBoards - 1))
                        }
                        className="w-8 h-8 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                        disabled={additionalServices.drawingBoards === 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold">{additionalServices.drawingBoards}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateAdditionalService("drawingBoards", Math.min(14, additionalServices.drawingBoards + 1))
                        }
                        className="w-8 h-8 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                        disabled={additionalServices.drawingBoards === 14}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Combo Desayuno */}
                  <div className="flex items-center justify-between p-4 border border-[#DC9171]/20 rounded-lg transition-all duration-300 hover:shadow-md hover:border-[#DC8C47] group">
                    <div className="flex-1">
                      <span className="font-medium text-[#DC8C47] group-hover:text-[#DC9171] transition-colors duration-300">
                        Combo Desayuno
                      </span>
                      <p className="text-sm text-[#B2A98C] mt-1">
                        Rico desayuno presentado en bandeja (consultar opciones)
                      </p>
                      <p className="text-sm font-semibold text-[#DC9171]">Desde {formatPrice(3800)} cada uno</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateAdditionalService("breakfast", Math.max(0, additionalServices.breakfast - 1))
                        }
                        className="w-8 h-8 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                        disabled={additionalServices.breakfast === 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold">{additionalServices.breakfast}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateAdditionalService("breakfast", Math.min(10, additionalServices.breakfast + 1))
                        }
                        className="w-8 h-8 p-0 transition-all duration-300 hover:scale-110 hover:bg-[#DC8C47] hover:text-white"
                        disabled={additionalServices.breakfast === 10}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-[#DC9171]/20" />

              {/* Total */}
              <div className="bg-gradient-to-r from-[#DC8C47]/10 to-[#DC9171]/10 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#DC8C47]">Total:</span>
                  <span className="text-3xl font-bold text-[#DC9171] animate-pulse">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
                {calculateTotal() > 0 && (
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-[#DC8C47] to-[#DC9171] hover:from-[#DC9171] hover:to-[#D2A278] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    size="lg"
                    onClick={() => {
                      let message = `Hola! Me interesa contratar una pijamada de Sueños Felices\n\n`
                      message += `DETALLES DEL PEDIDO:\n`

                      if (selectedDate) {
                        message += `Fecha solicitada: ${selectedDate.toLocaleDateString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}\n`
                      }

                      if (selectedTheme) {
                        message += `Temática: ${selectedTheme}\n`
                      }

                      message += `Número de invitados: ${guestCount}\n`

                      message += `Carpitas: ${selectedTents} carpitas (${selectedTents * 2} invitados máximo)\n`

                      message += `\nSERVICIOS ADICIONALES:\n`

                      if (additionalServices.workshop) {
                        message += `Taller Creativo (${getWorkshopDescription()}): ${formatPrice(getWorkshopPrice())}\n`
                      }

                      if (additionalServices.metegol) {
                        message += `Mini Metegol: ${formatPrice(5000)}\n`
                      }

                      if (additionalServices.kitTrays > 0) {
                        message += `Kit Bandejas y Vasos: ${additionalServices.kitTrays} unidades\n`
                      }

                      if (additionalServices.drawingBoards > 0) {
                        message += `Tablitas con Actividades: ${additionalServices.drawingBoards} unidades\n`
                      }

                      if (additionalServices.breakfast > 0) {
                        message += `Combo Desayuno: ${additionalServices.breakfast} unidades\n`
                      }

                      message += `\nTOTAL ESTIMADO: ${formatPrice(calculateTotal())}\n\n`
                      message += `Espero su respuesta para coordinar todos los detalles!`

                      window.open(`https://wa.me/5493513006092?text=${encodeURIComponent(message)}`, "_blank")
                    }}
                  >
                    <Heart className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform duration-300" />
                    Reservar Ahora
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonios Section */}
      <section id="testimonios" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-[#DC8C47] animate-bounce" />
              <h2 className="text-4xl font-bold text-[#DC8C47]">Lo que Dicen Nuestros Clientes</h2>
            </div>
            <p className="text-center text-[#B2A98C] text-lg">Testimonios reales de familias felices</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonios.map((testimonio, index) => (
              <Card
                key={index}
                className="border-2 border-[#DC9171]/20 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <Quote className="w-8 h-8 text-[#DC8C47] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <CardDescription className="text-[#B2A98C] text-base leading-relaxed">
                    "{testimonio.texto}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-t border-[#DC9171]/20 pt-4">
                    <p className="font-semibold text-[#DC8C47] group-hover:text-[#DC9171] transition-colors duration-300">
                      {testimonio.autor}
                    </p>
                    <p className="text-sm text-[#B2A98C]">{testimonio.hijos}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4 bg-white/50 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#DC8C47] mb-4">Contacto</h2>
            <p className="text-center text-[#B2A98C] text-lg">
              ¡Estamos aquí para hacer realidad los sueños de tus pequeños!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-[#DC9171]/20 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <Phone className="w-12 h-12 text-[#DC8C47] mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <CardTitle className="text-[#DC8C47] group-hover:text-[#DC9171] transition-colors duration-300">
                  Teléfono
                </CardTitle>
                <CardDescription className="text-[#B2A98C]">
                  <a
                    href="tel:+5493513006092"
                    className="hover:text-[#DC8C47] transition-colors duration-300 hover:underline"
                  >
                    +54 351 300 6092
                  </a>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-[#DC9171]/20 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <Mail className="w-12 h-12 text-[#DC8C47] mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <CardTitle className="text-[#DC8C47] group-hover:text-[#DC9171] transition-colors duration-300">
                  Email
                </CardTitle>
                <CardDescription className="text-[#B2A98C]">
                  <a
                    href="mailto:julxbaigo@gmail.com"
                    className="hover:text-[#DC8C47] transition-colors duration-300 hover:underline"
                  >
                    julxbaigo@gmail.com
                  </a>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-[#DC9171]/20 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <Heart className="w-12 h-12 text-[#DC8C47] mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <CardTitle className="text-[#DC8C47] group-hover:text-[#DC9171] transition-colors duration-300">
                  Servicio a Domicilio
                </CardTitle>
                <CardDescription className="text-[#B2A98C]">
                  Llevamos la magia
                  <br />
                  directamente a tu hogar
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#DC8C47] to-[#DC9171] hover:from-[#DC9171] hover:to-[#D2A278] text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl group"
              onClick={() => window.open("https://instagram.com/suenos_felices_pijamadas", "_blank")}
            >
              <Instagram className="w-6 h-6 mr-3 group-hover:scale-125 transition-transform duration-300" />
              <span className="font-bold">Síguenos en Instagram</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#DC8C47] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#DC8C47] to-[#DC9171]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center space-x-2 mb-4 group">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <img
                src="/images/logo-new.png"
                alt="Sueños Felices Pijamadas"
                className="w-16 h-16 object-contain bg-white/10 rounded-full p-1"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                Sueños Felices Pijamadas
              </h3>
            </div>
          </div>
          <p className="text-white/80 mb-4">Creando momentos mágicos e inolvidables</p>
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-white text-white animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p className="text-white/60 text-sm">© 2025 Sueños Felices Pijamadas. Todos los derechos reservados.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  )
}
