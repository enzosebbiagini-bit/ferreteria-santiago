import { Link, useParams } from "react-router-dom"
import Layout from "../components/Layout"
import Estado from "../components/Estado"
import { useTienda } from "../context/TiendaContext"
import { estadoStock, formatoPrecio, precioFinal } from "../utils"

function DetalleProducto() {
  const { productos, agregarAlCarrito } = useTienda()

  // El id viene en la URL, por ejemplo /producto/3
  const { id } = useParams()
  const producto = productos.find((item) => item.id === Number(id))

  if (!producto) {
    return (
      <Layout>
        <section className="contenedor py-24 text-center">
          <h1 className="titulo-pagina">Producto no encontrado</h1>
          <Link to="/productos" className="btn btn-claro mt-6">Volver al catálogo</Link>
        </section>
      </Layout>
    )
  }

  const estado = estadoStock(producto)

  return (
    <Layout>
      <section className="contenedor py-14">

        <Link to="/productos" className="text-sm texto-suave hover:underline">
          ← Volver a productos
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-center">

          <div className="bg-neutral-100 rounded-3xl overflow-hidden">
            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-80 md:h-[26rem] object-cover"
              />
            ) : (
              <span className="flex h-80 items-center justify-center texto-suave">Sin imagen</span>
            )}
          </div>

          <div>
            <p className="etiqueta">{producto.marca} · {producto.categoria}</p>
            <h1 className="titulo-pagina mt-3">{producto.nombre}</h1>
            <p className="texto-suave mt-4">{producto.descripcion}</p>

            <p className="mt-6 text-3xl font-semibold">
              {formatoPrecio(precioFinal(producto))}
              {producto.precioOferta > 0 && (
                <span className="texto-suave line-through text-base font-normal ml-3">
                  {formatoPrecio(producto.precio)}
                </span>
              )}
            </p>

            <div className="mt-3">
              <Estado texto={estado} />
              <span className="texto-suave text-sm ml-3">
                {producto.stock} unidades en bodega
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {estado === "Sin stock" ? (
                <span className="btn btn-claro">Sin stock por ahora</span>
              ) : (
                <button type="button" onClick={() => agregarAlCarrito(producto.id)} className="btn btn-principal">
                  Agregar al carrito
                </button>
              )}
              <Link to="/cotizaciones" className="btn btn-claro">Cotizar por cantidad</Link>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  )
}

export default DetalleProducto
