"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"

interface CalendarReservasProps {
  onDateSelect: (date: Date | null) => void
  selectedDate: Date | null
}

export function CalendarReservas({ onDateSelect, selectedDate }: CalendarReservasProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Fechas ocupadas (simuladas - en el futuro vendrán de una base de datos)
  // Remover el array fechasOcupadas completamente

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDatePast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isDateSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString()
  }

  // Remover las funciones isDateOccupied, canSelectDate

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    const today = new Date()
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    if (prevMonthDate >= new Date(today.getFullYear(), today.getMonth())) {
      setCurrentMonth(prevMonthDate)
    }
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const days = getDaysInMonth(currentMonth)

  return (
    <Card className="border-2 border-[#DC9171]/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-[#DC8C47] flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Selecciona la Fecha de tu Pijamada
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Header del calendario */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={prevMonth}
            className="border-[#DC8C47] text-[#DC8C47] hover:bg-[#DC8C47] hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <h3 className="text-lg font-semibold text-[#DC8C47]">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>

          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className="border-[#DC8C47] text-[#DC8C47] hover:bg-[#DC8C47] hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-[#B2A98C] p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="p-2"></div>
            }

            const isPast = isDatePast(date)
            const isSelected = isDateSelected(date)
            const canSelect = !isPast

            return (
              <button
                key={index}
                onClick={() => (canSelect ? onDateSelect(date) : null)}
                disabled={!canSelect}
                className={`
                  relative p-2 text-sm rounded-lg transition-all duration-300 hover:scale-105
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-[#DC8C47] to-[#DC9171] text-white scale-105 shadow-lg"
                      : canSelect
                        ? "bg-white hover:bg-[#DC8C47]/10 text-[#DC8C47] border border-[#DC9171]/20 hover:border-[#DC8C47] hover:shadow-md"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                <span className="relative z-10">{date.getDate()}</span>
              </button>
            )
          })}
        </div>

        {/* Leyenda */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-[#DC8C47] to-[#DC9171] rounded"></div>
            <span className="text-[#DC8C47]">Fecha seleccionada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-[#DC9171]/20 rounded"></div>
            <span className="text-[#B2A98C]">Disponible para seleccionar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span className="text-gray-400">Fecha pasada</span>
          </div>
        </div>

        {/* Información de la fecha seleccionada */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-gradient-to-r from-[#DC8C47]/10 to-[#DC9171]/10 rounded-lg">
            <div className="flex items-center gap-2 text-[#DC8C47]">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">
                Fecha seleccionada:{" "}
                {selectedDate.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm text-[#B2A98C] mt-1">
              Confirmaremos la disponibilidad de esta fecha cuando te contactes con nosotros.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
