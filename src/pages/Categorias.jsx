import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import { useTienda } from "../context/TiendaContext"

function Categorias() {
  const { categorias, productos } = useTienda()

  return (
    <Layout>
      <section className="contenedor py-14">

        <h1 className="titulo-pagina">Categorías</h1>
        <p className="texto-suave mt-2">Elige una categoría para ver sus productos.</p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => {
            // Cuántos productos del catálogo son de esta categoría
            const cantidad = productos.filter((producto) => producto.categoria === categoria.nombre).length

            return (
              <li key={categoria.id}>
                <Link
                  to={"/productos?categoria=" + categoria.nombre}
                  className="flex items-center gap-5 bg-neutral-100 rounded-2xl p-6 hover:bg-neutral-200 transition duration-300"
                >
                  {categoria.imagen ? (
                    <img
                      src={categoria.imagen}
                      alt=""
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                  ) : (
                    <span className="w-20 h-20 rounded-xl bg-neutral-200"></span>
                  )}
                  <span>
                    <span className="block text-lg font-semibold">{categoria.nombre}</span>
                    <span className="block texto-suave text-sm">{cantidad} productos</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

      </section>
    </Layout>
  )
}

export default Categorias
