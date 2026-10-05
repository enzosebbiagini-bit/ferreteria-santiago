import { useState } from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import Estado from "../components/Estado"
import { useTienda } from "../context/TiendaContext"
import { formatoPrecio, precioFinal, sumar } from "../utils"

function Cotizaciones() {
  const { sesion, productos, cotizaciones, crearCotizacion } = useTienda()

  // Si hay sesión, el formulario parte con los datos de la cuenta
  const [nombre, setNombre] = useState(sesion ? sesion.nombre : "")
  const [empresa, setEmpresa] = useState("")
  const [correo, setCorreo] = useState(sesion ? sesion.correo : "")
  const [telefono, setTelefono] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [vigencia, setVigencia] = useState("15 días")

  // Productos que se van agregando a la solicitud
  const [items, setItems] = useState([])
  const [idProducto, setIdProducto] = useState(productos[0].id)
  const [cantidad, setCantidad] = useState(1)

  const [error, setError] = useState("")
  const [enviada, setEnviada] = useState("")

  function agregarProducto() {
    const producto = productos.find((item) => item.id === Number(idProducto))
    const unidades = Number(cantidad)

    if (!unidades || unidades < 1) {
      setError("Indica una cantidad mayor que cero.")
      return
    }

    const yaEsta = items.find((item) => item.id === producto.id)
    if (yaEsta) {
      // Si el producto ya estaba en la lista se suman las cantidades
      setItems(items.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + unidades } : item)))
    } else {
      setItems([...items, { id: producto.id, nombre: producto.nombre, cantidad: unidades, precio: precioFinal(producto) }])
    }
    setCantidad(1)
    setError("")
  }

  function quitarProducto(id) {
    setItems(items.filter((item) => item.id !== id))
  }

  function enviar(evento) {
    evento.preventDefault()

    if (items.length === 0) {
      setError("Agrega al menos un producto a la solicitud.")
      return
    }

    const id = crearCotizacion({
      nombre: nombre,
      empresa: empresa,
      correo: correo.trim().toLowerCase(),
      telefono: telefono,
      observaciones: observaciones,
      vigencia: vigencia,
      items: items,
    })

    setEnviada(id)
    setItems([])
    setObservaciones("")
    setError("")
  }

  const misCotizaciones = sesion ? cotizaciones.filter((item) => item.correo === sesion.correo) : []

  return (
    <Layout>
      <section className="contenedor py-14">

        <p className="etiqueta">Contratistas · Maestros · Pequeñas constructoras</p>
        <h1 className="titulo-pagina mt-3">Solicita una cotización</h1>
        <p className="texto-suave mt-2 max-w-xl">
          Indica los productos, las cantidades y hasta cuándo necesitas que se
          mantengan los precios. Un vendedor revisará tu solicitud.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">

          {/* Formulario de solicitud */}
          <div>
            {enviada && (
              <div role="status" className="tarjeta border-l-4 border-l-acento mb-6">
                <p className="font-semibold">Solicitud enviada: cotización #{enviada}</p>
                <p className="texto-suave text-sm mt-1">
                  Quedó en estado “Pendiente”. Puedes ver su avance en tu cuenta.
                </p>
              </div>
            )}

            <form onSubmit={enviar} className="tarjeta grid gap-4 sm:grid-cols-2">
              <label className="campo">
                Nombre
                <input type="text" className="input" placeholder="Tu nombre" required value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
              </label>
              <label className="campo">
                Empresa
                <input type="text" className="input" placeholder="Opcional" value={empresa} onChange={(evento) => setEmpresa(evento.target.value)} />
              </label>
              <label className="campo">
                Correo
                <input type="email" className="input" placeholder="nombre@correo.cl" required value={correo} onChange={(evento) => setCorreo(evento.target.value)} />
              </label>
              <label className="campo">
                Teléfono
                <input type="tel" className="input" placeholder="+56 9 1234 5678" value={telefono} onChange={(evento) => setTelefono(evento.target.value)} />
              </label>

              {/* Productos solicitados */}
              <fieldset className="sm:col-span-2 border-t border-neutral-200 pt-4">
                <legend className="etiqueta">Productos solicitados</legend>
                <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_100px_auto] sm:items-end">
                  <label className="campo">
                    Producto
                    <select className="input" value={idProducto} onChange={(evento) => setIdProducto(evento.target.value)}>
                      {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                      ))}
                    </select>
                  </label>
                  <label className="campo">
                    Cantidad
                    <input type="number" min="1" className="input" value={cantidad} onChange={(evento) => setCantidad(evento.target.value)} />
                  </label>
                  <button type="button" onClick={agregarProducto} className="btn btn-oscuro">Agregar</button>
                </div>

                {items.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 bg-neutral-100 rounded-lg px-3 py-2">
                        <span>{item.cantidad} × {item.nombre}</span>
                        <span className="flex items-center gap-3">
                          {formatoPrecio(item.cantidad * item.precio)}
                          <button type="button" onClick={() => quitarProducto(item.id)} className="underline cursor-pointer">
                            Quitar
                          </button>
                        </span>
                      </li>
                    ))}
                    <li className="flex justify-between font-semibold px-3 pt-2">
                      <span>Total estimado</span>
                      <span>{formatoPrecio(sumar(items))}</span>
                    </li>
                  </ul>
                )}
              </fieldset>

              <label className="campo sm:col-span-2">
                Observaciones
                <textarea rows="3" className="input" placeholder="Entrega en obra, marcas preferidas, etc." value={observaciones} onChange={(evento) => setObservaciones(evento.target.value)}></textarea>
              </label>
              <label className="campo sm:col-span-2">
                Vigencia solicitada
                <select className="input" value={vigencia} onChange={(evento) => setVigencia(evento.target.value)}>
                  <option>7 días</option>
                  <option>15 días</option>
                  <option>30 días</option>
                </select>
              </label>

              {error && (
                <p role="alert" className="sm:col-span-2 text-sm text-red-700">{error}</p>
              )}

              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-principal">Enviar solicitud</button>
              </div>
            </form>
          </div>

          {/* Cotizaciones del cliente */}
          <div>
            <h2 className="etiqueta">Mis cotizaciones</h2>

            {!sesion && (
              <p className="tarjeta mt-3 text-sm texto-suave">
                <Link to="/login?volver=/cotizaciones" className="underline text-black">Inicia sesión</Link>{" "}
                para ver el estado de tus cotizaciones.
              </p>
            )}

            {sesion && misCotizaciones.length === 0 && (
              <p className="tarjeta mt-3 text-sm texto-suave">Todavía no has solicitado cotizaciones.</p>
            )}

            <div className="mt-3 grid gap-4">
              {misCotizaciones.map((cotizacion) => (
                <article key={cotizacion.id} className="tarjeta">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">Cotización #{cotizacion.id}</h3>
                    <Estado texto={cotizacion.estado} />
                  </div>

                  <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <dt className="texto-suave">Fecha</dt>
                      <dd className="font-medium">{cotizacion.fecha}</dd>
                    </div>
                    <div>
                      <dt className="texto-suave">Vigencia</dt>
                      <dd className="font-medium">{cotizacion.vigencia}</dd>
                    </div>
                    <div>
                      <dt className="texto-suave">Total estimado</dt>
                      <dd className="font-medium">{formatoPrecio(sumar(cotizacion.items))}</dd>
                    </div>
                  </dl>

                  <details className="mt-4 text-sm">
                    <summary className="cursor-pointer font-medium">Ver productos cotizados</summary>
                    <ul className="mt-3 space-y-2">
                      {cotizacion.items.map((linea) => (
                        <li key={linea.id} className="flex justify-between gap-4">
                          <span>{linea.cantidad} × {linea.nombre}</span>
                          <span>{formatoPrecio(linea.cantidad * linea.precio)}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>
    </Layout>
  )
}

export default Cotizaciones
