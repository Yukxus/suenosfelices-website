"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  MessageSquare,
  Settings,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Calendar,
  Users,
} from "lucide-react"

interface Reserva {
  id: string
  fecha: string
  cliente: string
  telefono: string
  tematica: string
  invitados: number
  carpitas: number
  total: number
  estado: "pendiente" | "confirmada" | "completada"
  fechaCreacion: string
}

export function AdminPanel() {
  const [reservas, setReservas] = useState<Reserva[]>([
    {
      id: "1",
      fecha: "2025-01-20",
      cliente: "María González",
      telefono: "+54 351 123 4567",
      tematica: "Boho Chic",
      invitados: 8,
      carpitas: 4,
      total: 138000,
      estado: "pendiente",
      fechaCreacion: "2025-01-07 14:30",
    },
    {
      id: "2",
      fecha: "2025-01-25",
      cliente: "Ana Martínez",
      telefono: "+54 351 987 6543",
      tematica: "Safari",
      invitados: 6,
      carpitas: 3,
      total: 120000,
      estado: "confirmada",
      fechaCreacion: "2025-01-06 16:45",
    },
  ])

  const [notificacionesConfig, setNotificacionesConfig] = useState({
    adminPhone: "5493513006092",
    autoConfirmacion: true,
    recordatorio24h: true,
    notificarNuevaReserva: true,
  })

  const [mensajePersonalizado, setMensajePersonalizado] = useState("")
  const [numeroDestino, setNumeroDestino] = useState("")

  const enviarNotificacion = async (tipo: string, data: any) => {
    try {
      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: tipo, data }),
      })

      const result = await response.json()

      if (result.success) {
        alert("✅ Notificación enviada correctamente")
      } else {
        alert("❌ Error enviando notificación")
      }
    } catch (error) {
      alert("❌ Error de conexión")
    }
  }

  const confirmarReserva = (id: string) => {
    setReservas((prev) => prev.map((reserva) => (reserva.id === id ? { ...reserva, estado: "confirmada" } : reserva)))

    const reserva = reservas.find((r) => r.id === id)
    if (reserva) {
      enviarNotificacion("confirmacion_cliente", {
        fecha: reserva.fecha,
        tematica: reserva.tematica,
        total: `$${reserva.total.toLocaleString()}`,
      })
    }
  }

  const enviarMensajePersonalizado = () => {
    if (!mensajePersonalizado || !numeroDestino) {
      alert("Por favor completa el mensaje y número de destino")
      return
    }

    // Aquí enviarías el mensaje personalizado
    console.log("Enviando mensaje personalizado:", mensajePersonalizado, "a:", numeroDestino)
    alert("✅ Mensaje personalizado enviado")
    setMensajePersonalizado("")
    setNumeroDestino("")
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "text-yellow-600 bg-yellow-50"
      case "confirmada":
        return "text-green-600 bg-green-50"
      case "completada":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Clock className="w-4 h-4" />
      case "confirmada":
        return <CheckCircle className="w-4 h-4" />
      case "completada":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-[#DC8C47]" />
            <div>
              <h1 className="text-2xl font-bold text-[#DC8C47]">Panel de Administración</h1>
              <p className="text-[#B2A98C]">Gestiona reservas y notificaciones automáticas</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Reservas Recientes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#DC8C47]">
                  <Calendar className="w-5 h-5" />
                  Reservas Recientes
                </CardTitle>
                <CardDescription>Gestiona las reservas y envía notificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservas.map((reserva) => (
                    <div key={reserva.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-[#DC8C47]">{reserva.cliente}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getEstadoColor(reserva.estado)}`}
                            >
                              {getEstadoIcon(reserva.estado)}
                              {reserva.estado}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {reserva.fecha}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {reserva.telefono}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {reserva.invitados} invitados
                            </div>
                            <div className="font-semibold text-[#DC9171]">${reserva.total.toLocaleString()}</div>
                          </div>

                          <p className="text-sm text-[#B2A98C]">
                            Temática: {reserva.tematica} • {reserva.carpitas} carpitas
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          {reserva.estado === "pendiente" && (
                            <Button
                              size="sm"
                              onClick={() => confirmarReserva(reserva.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirmar
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              enviarNotificacion("recordatorio", {
                                fecha: reserva.fecha,
                                cliente: reserva.cliente,
                                tematica: reserva.tematica,
                              })
                            }
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Recordatorio
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel de Control */}
          <div className="space-y-6">
            {/* Configuración de Notificaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#DC8C47]">
                  <Settings className="w-5 h-5" />
                  Configuración
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="adminPhone">Teléfono Admin</Label>
                  <Input
                    id="adminPhone"
                    value={notificacionesConfig.adminPhone}
                    onChange={(e) =>
                      setNotificacionesConfig((prev) => ({
                        ...prev,
                        adminPhone: e.target.value,
                      }))
                    }
                    placeholder="549351XXXXXXX"
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-[#DC8C47]">Notificaciones Automáticas</h4>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notificacionesConfig.notificarNuevaReserva}
                      onChange={(e) =>
                        setNotificacionesConfig((prev) => ({
                          ...prev,
                          notificarNuevaReserva: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <span className="text-sm">Nueva reserva</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notificacionesConfig.autoConfirmacion}
                      onChange={(e) =>
                        setNotificacionesConfig((prev) => ({
                          ...prev,
                          autoConfirmacion: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <span className="text-sm">Auto-confirmación cliente</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notificacionesConfig.recordatorio24h}
                      onChange={(e) =>
                        setNotificacionesConfig((prev) => ({
                          ...prev,
                          recordatorio24h: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <span className="text-sm">Recordatorio 24h</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Mensaje Personalizado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#DC8C47]">
                  <Send className="w-5 h-5" />
                  Mensaje Personalizado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="numeroDestino">Número de destino</Label>
                  <Input
                    id="numeroDestino"
                    value={numeroDestino}
                    onChange={(e) => setNumeroDestino(e.target.value)}
                    placeholder="549351XXXXXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    value={mensajePersonalizado}
                    onChange={(e) => setMensajePersonalizado(e.target.value)}
                    placeholder="Escribe tu mensaje personalizado..."
                    rows={4}
                  />
                </div>

                <Button onClick={enviarMensajePersonalizado} className="w-full bg-[#DC8C47] hover:bg-[#DC9171]">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>

            {/* Estadísticas Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#DC8C47]">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Reservas pendientes</span>
                    <span className="font-semibold text-yellow-600">
                      {reservas.filter((r) => r.estado === "pendiente").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Confirmadas</span>
                    <span className="font-semibold text-green-600">
                      {reservas.filter((r) => r.estado === "confirmada").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total mes</span>
                    <span className="font-semibold text-[#DC8C47]">
                      ${reservas.reduce((sum, r) => sum + r.total, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
