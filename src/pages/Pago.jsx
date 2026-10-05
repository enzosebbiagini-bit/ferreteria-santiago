import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Layout from "../components/Layout"
import PasosCompra from "../components/PasosCompra"
import PedirSesion from "../components/PedirSesion"
import { useTienda } from "../context/TiendaContext"
import { formatoPrecio, sumar } from "../utils"

function Pago() {
  const { sesion, pedidos, registrarPago } = useTienda()
  const navegar = useNavigate()
  const [parametros] = useSearchParams()

  const [tipo, setTipo] = useState("Pago")
  const [metodo, setMetodo] = useState("Transferencia")

  if (!sesion) {
    return (
      <Layout>
        <PedirSesion texto="Inicia sesión para pagar o reservar tu pedido." volver="/mi-cuenta" />
      </Layout>
    )
  }

  // El número del pedido viene en la URL: /pago?pedido=1027
  const pedido = pedidos.find((item) => item.id === parametros.get("pedido") && item.correo === sesion.correo)

  if (!pedido || pedido.pago !== "Pendiente") {
    return (
      <Layout>
        <section className="contenedor py-24 text-center">
          <h1 className="titulo-seccion">No hay un pedido pendiente de pago</h1>
          <p className="texto-suave mt-2">Revisa tus pedidos en tu cuenta.</p>
          <Link to="/mi-cuenta" className="btn btn-claro mt-6">Ir a mi cuenta</Link>
        </section>
      </Layout>
    )
  }

  // Al elegir "Reserva" el método pasa a ser reserva en tienda
  function elegirTipo(nuevo) {
    setTipo(nuevo)
    setMetodo(nuevo === "Reserva" ? "Reserva en tienda" : "Transferencia")
  }

  function enviar(evento) {
    evento.preventDefault()
    registrarPago(pedido.id, tipo, metodo)
    navegar("/mi-cuenta")
  }

  const metodos = tipo === "Pago" ? ["Transferencia", "Tarjeta"] : ["Reserva en tienda"]

  return (
    <Layout>
      <section className="contenedor py-14 max-w-2xl">

        <PasosCompra actual={3} />
        <h1 className="titulo-pagina">Pago o reserva</h1>
        <p className="texto-suave mt-2">
          Paga tu pedido ahora o resérvalo y paga al retirar.
        </p>

        <dl className="tarjeta mt-8 grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="texto-suave">Pedido</dt>
            <dd className="font-semibold">#{pedido.id}</dd>
          </div>
          <div>
            <dt className="texto-suave">Cliente</dt>
            <dd className="font-semibold">{pedido.cliente}</dd>
          </div>
          <div>
            <dt className="texto-suave">Monto</dt>
            <dd className="font-semibold">{formatoPrecio(sumar(pedido.items))}</dd>
          </div>
        </dl>

        <form onSubmit={enviar} className="mt-8 grid gap-8">

          <fieldset>
            <legend className="etiqueta">Tipo de registro</legend>
            <div className="mt-3 flex flex-wrap gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="tipo" className="accent-black" checked={tipo === "Pago"} onChange={() => elegirTipo("Pago")} />
                Pago
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="tipo" className="accent-black" checked={tipo === "Reserva"} onChange={() => elegirTipo("Reserva")} />
                Reserva
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="etiqueta">Método</legend>
            <div className="mt-3 grid gap-3">
              {metodos.map((opcion) => (
                <label key={opcion} className="tarjeta flex items-center gap-3 cursor-pointer has-checked:border-black">
                  <input
                    type="radio"
                    name="metodo"
                    className="accent-black"
                    checked={metodo === opcion}
                    onChange={() => setMetodo(opcion)}
                  />
                  {opcion}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <button type="submit" className="btn btn-principal">
              {tipo === "Pago" ? "Registrar pago" : "Registrar reserva"}
            </button>
            <p className="texto-suave text-xs mt-3">
              Prototipo: no existe una pasarela de pago real ni se piden datos
              de tarjeta. Solo se registra el pedido como pagado o reservado.
            </p>
          </div>

        </form>
      </section>
    </Layout>
  )
}

export default Pago
