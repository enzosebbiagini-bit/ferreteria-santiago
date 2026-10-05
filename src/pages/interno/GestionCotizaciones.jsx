import { useState } from "react"
import LayoutInterno from "../../components/LayoutInterno"
import Estado from "../../components/Estado"
import { useTienda } from "../../context/TiendaContext"
import { formatoPrecio, sumar } from "../../utils"

function GestionCotizaciones() {
  const {
    cotizaciones, cambiarEstadoCotizacion, modificarCotizacion, convertirEnVenta, mostrarAviso,
  } = useTienda()

  // Cotización que se está viendo o modificando, y copia de sus productos para editar
  const [idAbierta, setIdAbierta] = useState("")
  const [editando, setEditando] = useState(false)
  const [items, setItems] = useState([])

  const abierta = cotizaciones.find((cotizacion) => cotizacion.id === idAbierta)

  function ver(cotizacion) {
    setIdAbierta(cotizacion.id)
    setItems(cotizacion.items)
    setEditando(false)
  }

  function modificar(cotizacion) {
    setIdAbierta(cotizacion.id)
    setItems(cotizacion.items)
    setEditando(true)
  }

  // Cambia la cantidad o el precio de una línea mientras se edita
  function cambiarLinea(id, campo, valor) {
    setItems(items.map((item) => (item.id === id ? { ...item, [campo]: Number(valor) } : item)))
  }

  function guardarCambios(evento) {
    evento.preventDefault()
    modificarCotizacion(idAbierta, items)
    setEditando(false)
    mostrarAviso("Cotización modificada. Quedó en revisión.")
  }

  function aprobar(id) {
    cambiarEstadoCotizacion(id, "Aprobada")
    mostrarAviso("Cotización aprobada. Se notificó al cliente.")
  }

  function rechazar(id) {
    cambiarEstadoCotizacion(id, "Rechazada")
    mostrarAviso("Cotización rechazada. Se notificó al cliente.")
  }

  function convertir(id) {
    const numero = convertirEnVenta(id)
    mostrarAviso("Se creó el pedido #" + numero + ".")
  }

  return (
    <LayoutInterno
      titulo="Gestión de cotizaciones"
      descripcion="Revisa, modifica, aprueba o rechaza las solicitudes antes de convertirlas en venta."
    >

      <div className="tabla-contenedor bg-white">
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map((cotizacion) => {
              // Una cotización rechazada o ya vendida no se puede seguir cambiando
              const cerrada = cotizacion.estado === "Rechazada" || cotizacion.estado === "Convertida en venta"

              return (
                <tr key={cotizacion.id}>
                  <td className="font-medium">{cotizacion.id}</td>
                  <td>{cotizacion.cliente}</td>
                  <td>{cotizacion.fecha}</td>
                  <td><Estado texto={cotizacion.estado} /></td>
                  <td>{formatoPrecio(sumar(cotizacion.items))}</td>
                  <td>
                    <span className="flex gap-2">
                      <button type="button" onClick={() => ver(cotizacion)} className="btn btn-claro btn-chico">Ver</button>
                      {!cerrada && (
                        <>
                          <button type="button" onClick={() => modificar(cotizacion)} className="btn btn-claro btn-chico">Modificar</button>
                          {cotizacion.estado !== "Aprobada" && (
                            <button type="button" onClick={() => aprobar(cotizacion.id)} className="btn btn-oscuro btn-chico">Aprobar</button>
                          )}
                          <button type="button" onClick={() => rechazar(cotizacion.id)} className="btn btn-claro btn-chico">Rechazar</button>
                        </>
                      )}
                      {/* Solo una cotización aprobada puede pasar a venta */}
                      {cotizacion.estado === "Aprobada" && (
                        <button type="button" onClick={() => convertir(cotizacion.id)} className="btn btn-principal btn-chico">
                          Convertir en venta
                        </button>
                      )}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="texto-suave text-xs mt-4">
        Estados posibles: Pendiente, En revisión, Aprobada, Rechazada y Convertida en venta.
      </p>

      {/* Detalle de la cotización elegida */}
      {abierta && (
        <form onSubmit={guardarCambios} className="tarjeta mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">
              {editando ? "Modificar" : "Detalle de"} cotización #{abierta.id}
            </h2>
            <Estado texto={abierta.estado} />
          </div>

          <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-4">
            <div>
              <dt className="texto-suave">Cliente</dt>
              <dd className="font-medium">{abierta.cliente}</dd>
            </div>
            <div>
              <dt className="texto-suave">Correo</dt>
              <dd className="font-medium break-all">{abierta.correo}</dd>
            </div>
            <div>
              <dt className="texto-suave">Vigencia</dt>
              <dd className="font-medium">{abierta.vigencia}</dd>
            </div>
            <div>
              <dt className="texto-suave">Observaciones</dt>
              <dd className="font-medium">{abierta.observaciones || "Sin observaciones"}</dd>
            </div>
          </dl>

          <div className="tabla-contenedor mt-5">
            <table className="tabla">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>
                      {editando ? (
                        <input
                          type="number"
                          min="1"
                          required
                          aria-label={"Cantidad de " + item.nombre}
                          className="input py-1 w-24"
                          value={item.cantidad}
                          onChange={(evento) => cambiarLinea(item.id, "cantidad", evento.target.value)}
                        />
                      ) : (
                        item.cantidad
                      )}
                    </td>
                    <td>
                      {editando ? (
                        <input
                          type="number"
                          min="1"
                          required
                          aria-label={"Precio de " + item.nombre}
                          className="input py-1 w-28"
                          value={item.precio}
                          onChange={(evento) => cambiarLinea(item.id, "precio", evento.target.value)}
                        />
                      ) : (
                        formatoPrecio(item.precio)
                      )}
                    </td>
                    <td>{formatoPrecio(item.cantidad * item.precio)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-right font-semibold mt-4">Total: {formatoPrecio(sumar(items))}</p>

          <div className="mt-4 flex gap-2">
            {editando && (
              <button type="submit" className="btn btn-oscuro">Guardar cambios</button>
            )}
            <button type="button" onClick={() => setIdAbierta("")} className="btn btn-claro">Cerrar</button>
          </div>
        </form>
      )}

    </LayoutInterno>
  )
}

export default GestionCotizaciones
