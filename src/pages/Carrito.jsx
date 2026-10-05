import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import PasosCompra from "../components/PasosCompra"
import { useTienda } from "../context/TiendaContext"
import { formatoPrecio, sumar } from "../utils"

function Carrito() {
  const { lineasCarrito, cambiarCantidad, quitarDelCarrito } = useTienda()
  const subtotal = sumar(lineasCarrito)

  return (
    <Layout>
      <section className="contenedor py-14">

        <PasosCompra actual={1} />
        <h1 className="titulo-pagina">Carrito de compra</h1>

        {lineasCarrito.length === 0 ? (
          <div className="tarjeta mt-8 text-center">
            <p className="texto-suave">Tu carrito está vacío.</p>
            <Link to="/productos" className="btn btn-principal mt-6">Ver productos</Link>
          </div>
        ) : (
          <>
            <div className="tabla-contenedor mt-8">
              <table className="tabla">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                    <th><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody>
                  {lineasCarrito.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className="flex items-center gap-3">
                          {item.imagen && (
                            <img
                              src={item.imagen}
                              alt=""
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          {item.nombre}
                        </span>
                      </td>
                      <td>
                        <label className="sr-only" htmlFor={"cantidad-" + item.id}>
                          Cantidad de {item.nombre}
                        </label>
                        <input
                          id={"cantidad-" + item.id}
                          type="number"
                          min="1"
                          max={item.stock}
                          value={item.cantidad}
                          onChange={(evento) => cambiarCantidad(item.id, evento.target.value)}
                          className="input w-20"
                        />
                      </td>
                      <td>{formatoPrecio(item.precio)}</td>
                      <td className="font-medium">{formatoPrecio(item.cantidad * item.precio)}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => quitarDelCarrito(item.id)}
                          className="btn btn-claro btn-chico"
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <Link to="/productos" className="text-sm hover:underline">← Seguir comprando</Link>
              <div className="text-right">
                <p className="texto-suave text-sm">Subtotal</p>
                <p className="text-2xl font-semibold">{formatoPrecio(subtotal)}</p>
                <Link to="/pedido" className="btn btn-principal mt-4">Continuar pedido</Link>
              </div>
            </div>
          </>
        )}

      </section>
    </Layout>
  )
}

export default Carrito
