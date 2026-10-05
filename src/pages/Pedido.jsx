import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import PasosCompra from "../components/PasosCompra"
import PedirSesion from "../components/PedirSesion"
import { useTienda } from "../context/TiendaContext"
import { formatoPrecio, sumar } from "../utils"

function Pedido() {
  const { sesion, lineasCarrito, crearPedido } = useTienda()
  const navegar = useNavigate()

  const [tipo, setTipo] = useState("Retiro")
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")

  if (!sesion) {
    return (
      <Layout>
        <PedirSesion texto="Necesitas una cuenta para confirmar tu pedido." volver="/pedido" />
      </Layout>
    )
  }

  if (lineasCarrito.length === 0) {
    return (
      <Layout>
        <section className="contenedor py-24 text-center">
          <h1 className="titulo-seccion">No hay productos en el carrito</h1>
          <Link to="/productos" className="btn btn-principal mt-6">Ver productos</Link>
        </section>
      </Layout>
    )
  }

  const subtotal = sumar(lineasCarrito)

  function enviar(evento) {
    evento.preventDefault()

    const numero = crearPedido({
      nombre: sesion.nombre,
      correo: sesion.correo,
      telefono: telefono,
      tipo: tipo,
      direccion: tipo === "Despacho" ? direccion : "",
    })

    // El número del pedido viaja en la URL hacia la página de pago
    navegar("/pago?pedido=" + numero)
  }

  return (
    <Layout>
      <section className="contenedor py-14">

        <PasosCompra actual={2} />
        <h1 className="titulo-pagina">Confirmar pedido</h1>

        <form onSubmit={enviar} className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">

          <div className="grid gap-8 h-fit">

            <fieldset>
              <legend className="etiqueta">Método de entrega</legend>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <label className="tarjeta flex gap-3 cursor-pointer has-checked:border-black">
                  <input
                    type="radio"
                    name="entrega"
                    className="mt-1 accent-black"
                    checked={tipo === "Retiro"}
                    onChange={() => setTipo("Retiro")}
                  />
                  <span>
                    <span className="block font-semibold">Retiro en tienda</span>
                    <span className="block texto-suave text-sm">Retira tu pedido cuando esté preparado.</span>
                  </span>
                </label>
                <label className="tarjeta flex gap-3 cursor-pointer has-checked:border-black">
                  <input
                    type="radio"
                    name="entrega"
                    className="mt-1 accent-black"
                    checked={tipo === "Despacho"}
                    onChange={() => setTipo("Despacho")}
                  />
                  <span>
                    <span className="block font-semibold">Despacho</span>
                    <span className="block texto-suave text-sm">Recibe tu compra en la dirección indicada.</span>
                  </span>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="etiqueta">Datos del cliente</legend>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <label className="campo">
                  Nombre
                  <input type="text" className="input bg-neutral-100" value={sesion.nombre} readOnly />
                </label>
                <label className="campo">
                  Correo
                  <input type="email" className="input bg-neutral-100" value={sesion.correo} readOnly />
                </label>
                <label className="campo">
                  Teléfono
                  <input
                    type="tel"
                    className="input"
                    placeholder="+56 9 1234 5678"
                    required
                    value={telefono}
                    onChange={(evento) => setTelefono(evento.target.value)}
                  />
                </label>
                {/* La dirección solo se pide si el pedido es con despacho */}
                {tipo === "Despacho" && (
                  <label className="campo">
                    Dirección
                    <input
                      type="text"
                      className="input"
                      placeholder="Calle, número y comuna"
                      required
                      value={direccion}
                      onChange={(evento) => setDireccion(evento.target.value)}
                    />
                  </label>
                )}
              </div>
            </fieldset>

          </div>

          {/* Resumen del pedido */}
          <aside className="tarjeta h-fit">
            <h2 className="font-semibold">Resumen</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {lineasCarrito.map((item) => (
                <li key={item.id} className="flex justify-between gap-4">
                  <span>{item.cantidad} × {item.nombre}</span>
                  <span>{formatoPrecio(item.cantidad * item.precio)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 pt-4 border-t border-neutral-200 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="texto-suave">Subtotal</dt>
                <dd>{formatoPrecio(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="texto-suave">Entrega</dt>
                <dd>{tipo === "Retiro" ? "Retiro en tienda" : "Despacho"}</dd>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2">
                <dt>Total</dt>
                <dd>{formatoPrecio(subtotal)}</dd>
              </div>
            </dl>
            <button type="submit" className="btn btn-principal w-full mt-6">Confirmar pedido</button>
          </aside>

        </form>
      </section>
    </Layout>
  )
}

export default Pedido
