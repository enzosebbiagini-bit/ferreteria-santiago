import { useState } from "react"
import Layout from "../components/Layout"
import { useTienda } from "../context/TiendaContext"

function Contacto() {
  const { enviarMensaje } = useTienda()

  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [enviado, setEnviado] = useState(false)

  function enviar(evento) {
    evento.preventDefault()
    enviarMensaje({ nombre: nombre, correo: correo, mensaje: mensaje })
    setEnviado(true)
    setNombre("")
    setCorreo("")
    setMensaje("")
  }

  return (
    <Layout>
      <section className="contenedor py-14">
        <h1 className="titulo-pagina">Contacto</h1>
        <p className="texto-suave mt-2">Escríbenos o visítanos en el local.</p>

        <div className="mt-10 grid gap-10 md:grid-cols-2">

          <form onSubmit={enviar} className="tarjeta grid gap-4">
            <label className="campo">
              Nombre
              <input type="text" className="input" required value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
            </label>
            <label className="campo">
              Correo
              <input type="email" className="input" required value={correo} onChange={(evento) => setCorreo(evento.target.value)} />
            </label>
            <label className="campo">
              Mensaje
              <textarea rows="4" className="input" required value={mensaje} onChange={(evento) => setMensaje(evento.target.value)}></textarea>
            </label>

            {enviado && (
              <p role="status" className="text-sm bg-neutral-100 rounded-lg p-3">
                Mensaje recibido. Te responderemos a tu correo.
              </p>
            )}

            <div>
              <button type="submit" className="btn btn-oscuro">Enviar mensaje</button>
            </div>
          </form>

          <dl className="space-y-6">
            <div>
              <dt className="etiqueta">Dirección</dt>
              <dd className="mt-1">Av. Ejemplo 1234, Santiago</dd>
            </div>
            <div>
              <dt className="etiqueta">Horario</dt>
              <dd className="mt-1">Lunes a sábado, 8:30 a 18:30</dd>
            </div>
            <div>
              <dt className="etiqueta">Teléfono</dt>
              <dd className="mt-1">+56 2 2345 6789</dd>
            </div>
            <div>
              <dt className="etiqueta">Correo</dt>
              <dd className="mt-1">contacto@ferreteriasantiago.example</dd>
            </div>
          </dl>

        </div>
      </section>
    </Layout>
  )
}

export default Contacto
