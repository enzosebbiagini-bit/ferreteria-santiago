import Layout from "../components/Layout"
import ListaProductos from "../components/ListaProductos"
import { useTienda } from "../context/TiendaContext"

function Ofertas() {
  const { productos } = useTienda()
  // Solo los productos que tienen precio de oferta
  const enOferta = productos.filter((producto) => producto.precioOferta > 0)

  return (
    <Layout>
      <section className="contenedor py-14">
        <span className="bg-acento text-black text-xs font-semibold px-3 py-1 rounded-full">
          Ofertas de octubre
        </span>
        <h1 className="titulo-pagina mt-4">Ofertas</h1>
        <p className="texto-suave mt-2 mb-10">
          Precios rebajados por tiempo limitado o hasta agotar stock.
        </p>
        <ListaProductos lista={enOferta} />
      </section>
    </Layout>
  )
}

export default Ofertas
