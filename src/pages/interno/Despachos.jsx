import LayoutInterno from "../../components/LayoutInterno"
import Estado from "../../components/Estado"
import { useTienda } from "../../context/TiendaContext"

// Devuelve el estado que sigue en la preparación de un pedido.
function siguienteEstado(pedido) {
  if (pedido.estado === "Pendiente") {
    return "En preparación"
  }
  if (pedido.estado === "En preparación") {
    return "Listo"
  }
  if (pedido.estado === "Listo") {
    return pedido.tipo === "Retiro" ? "Retirado" : "Despachado"
  }
  // Retirado, Despachado y Anulado son estados finales
  return ""
}

function Despachos() {
  const { pedidos, cambiarEstadoPedido, mostrarAviso } = useTienda()

  function avanzar(pedido) {
    const estado = siguienteEstado(pedido)
    cambiarEstadoPedido(pedido.id, estado)
    mostrarAviso("Pedido #" + pedido.id + ": " + estado + ".")
  }

  function anular(pedido) {
    if (window.confirm("¿Anular el pedido #" + pedido.id + "? El stock vuelve a bodega.")) {
      cambiarEstadoPedido(pedido.id, "Anulado")
      mostrarAviso("Pedido #" + pedido.id + " anulado.")
    }
  }

  return (
    <LayoutInterno
      titulo="Preparación de pedidos"
      descripcion="Órdenes de retiro y despacho que debe preparar bodega."
    >

      <div className="tabla-contenedor bg-white">
        <table className="tabla">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Pago</th>
              <th>Responsable</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              const siguiente = siguienteEstado(pedido)

              return (
                <tr key={pedido.id}>
                  <td className="font-medium">#{pedido.id}</td>
                  <td>
                    {pedido.cliente}
                    {pedido.direccion && (
                      <span className="block texto-suave text-xs">{pedido.direccion}</span>
                    )}
                  </td>
                  <td>{pedido.tipo}</td>
                  <td><Estado texto={pedido.estado} /></td>
                  <td><Estado texto={pedido.pago} /></td>
                  <td>{pedido.responsable}</td>
                  <td>
                    {siguiente ? (
                      <span className="flex gap-2">
                        <button type="button" onClick={() => avanzar(pedido)} className="btn btn-oscuro btn-chico">
                          Marcar “{siguiente}”
                        </button>
                        <button type="button" onClick={() => anular(pedido)} className="btn btn-claro btn-chico">
                          Anular
                        </button>
                      </span>
                    ) : (
                      <span className="texto-suave">Sin acciones</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="texto-suave text-xs mt-4">
        Estados: Pendiente → En preparación → Listo → Retirado o Despachado.
        Al quedar “Listo” el cliente recibe una notificación. Las anulaciones
        quedan en la auditoría.
      </p>

    </LayoutInterno>
  )
}

export default Despachos
