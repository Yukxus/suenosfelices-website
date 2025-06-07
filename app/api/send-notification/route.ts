import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    // Aquí integraremos con el servicio de WhatsApp
    // Por ahora simularemos el envío

    let message = ""
    const phoneNumber = process.env.ADMIN_WHATSAPP || "5493513006092"

    switch (type) {
      case "nueva_reserva":
        message = `🎉 NUEVA RESERVA - Sueños Felices

📅 Fecha: ${data.fecha}
🎨 Temática: ${data.tematica || "No especificada"}
👥 Invitados: ${data.invitados}
🏕️ Carpitas: ${data.carpitas}
💰 Total: ${data.total}

📱 Cliente: ${data.clienteInfo || "Información pendiente"}

⏰ Recibida: ${new Date().toLocaleString("es-ES")}

¡Confirma disponibilidad y contacta al cliente!`
        break

      case "recordatorio":
        message = `⏰ RECORDATORIO - Pijamada Mañana

📅 Fecha: ${data.fecha}
👥 Cliente: ${data.cliente}
🎨 Temática: ${data.tematica}

¡Prepara todo para la pijamada de mañana!`
        break

      case "confirmacion_cliente":
        message = `✅ ¡Hola! Tu reserva de pijamada está confirmada:

📅 Fecha: ${data.fecha}
🎨 Temática: ${data.tematica}
💰 Total: ${data.total}

Te contactaremos 24hs antes para coordinar detalles.

¡Gracias por elegir Sueños Felices! 🌟`
        break
    }

    // Aquí integraremos con WhatsApp Business API
    // Por ahora retornamos éxito simulado
    console.log("Mensaje a enviar:", message)
    console.log("Número destino:", phoneNumber)

    // Simular envío exitoso
    return NextResponse.json({
      success: true,
      message: "Notificación enviada correctamente",
      data: { message, phoneNumber },
    })
  } catch (error) {
    console.error("Error enviando notificación:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
