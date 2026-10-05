import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import ListaProductos from "../components/ListaProductos"
import { useTienda } from "../context/TiendaContext"

const ventajas = [
  { titulo: "Stock disponible", texto: "Consulta la disponibilidad de productos." },
  { titulo: "Cotizaciones", texto: "Solicita cotizaciones para proyectos y compras grandes." },
  { titulo: "Retiro o despacho", texto: "Elige cómo recibir tu pedido." },
  { titulo: "Compra online", texto: "Arma tu pedido de manera rápida y sencilla." },
]

function Inicio() {
  const { productos, categorias } = useTienda()
  // Los primeros seis productos se muestran como destacados
  const destacados = productos.slice(0, 6)

  return (
    <Layout>

      {/* Hero */}
      <section className="contenedor grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="etiqueta">Ferretería Santiago</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Todo lo que necesitas para construir.
          </h1>
          <p className="mt-6 text-lg texto-suave max-w-md">
            Compra herramientas y materiales, revisa disponibilidad y solicita
            cotizaciones desde cualquier lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/productos" className="btn btn-principal">Ver productos</Link>
            <Link to="/cotizaciones" className="btn btn-claro">Solicitar cotización</Link>
          </div>
        </div>
        <div className="bg-neutral-100 rounded-3xl overflow-hidden">
          <img
            src="/images/logo.jpg"
            alt="Logo Ferretería Santiago"
            className="w-full h-72 md:h-[26rem] object-cover"
          />
        </div>
      </section>

      {/* Propuesta de valor */}
      <section className="border-y border-neutral-200">
        <div className="contenedor grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {ventajas.map((ventaja) => (
            <div key={ventaja.titulo}>
              <h2 className="etiqueta text-black">{ventaja.titulo}</h2>
              <p className="texto-suave mt-2 text-sm">{ventaja.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Búsqueda */}
      <section className="contenedor py-20 text-center">
        <h2 className="titulo-seccion">¿Qué estás buscando?</h2>
        <form action="/productos" method="get" role="search" className="mt-6 mx-auto flex max-w-xl gap-2">
          <label htmlFor="buscar-inicio" className="sr-only">Buscar productos</label>
          <input
            id="buscar-inicio"
            name="buscar"
            type="search"
            placeholder="Taladro, cemento, pintura..."
            className="input"
          />
          <button type="submit" className="btn btn-oscuro">Buscar</button>
        </form>
      </section>

      {/* Categorías */}
      <section className="contenedor">
        <div className="flex items-end justify-between gap-4">
          <h2 className="titulo-seccion">Categorías</h2>
          <Link to="/categorias" className="text-sm hover:underline">Ver todas</Link>
        </div>
        <ul className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <Link
                to={"/productos?categoria=" + categoria.nombre}
                className="block bg-neutral-100 rounded-2xl overflow-hidden text-center hover:bg-neutral-200 transition duration-300"
              >
                {categoria.imagen ? (
                  <img
                    src={categoria.imagen}
                    alt=""
                    className="h-24 w-full object-cover"
                  />
                ) : (
                  <span className="block h-24 bg-neutral-200"></span>
                )}
                <span className="block px-2 py-3 text-sm font-medium">{categoria.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Productos destacados */}
      <section className="contenedor mt-24">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="titulo-seccion">Productos destacados</h2>
          <Link to="/productos" className="text-sm hover:underline">Ver catálogo</Link>
        </div>
        <ListaProductos lista={destacados} />
      </section>

      {/* Cotizaciones */}
      <section className="contenedor mt-24">
        <div className="bg-neutral-900 text-white rounded-3xl px-8 py-14 md:px-16 md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <p className="etiqueta text-acento">Maestros, contratistas y constructoras</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              ¿Compras para una obra? Pide tu cotización.
            </h2>
            <p className="mt-3 text-neutral-300 max-w-lg">
              Indica los productos y cantidades. Un vendedor revisa tu solicitud
              y te responde con precios y vigencia.
            </p>
          </div>
          <Link to="/cotizaciones" className="btn btn-principal mt-8 md:mt-0 shrink-0">
            Solicitar cotización
          </Link>
        </div>
      </section>

      {/* Retiro y despacho */}
      <section className="contenedor mt-24">
        <h2 className="titulo-seccion">Entrega de pedido</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="tarjeta">
            <p className="etiqueta">Retiro en tienda</p>
            <p className="mt-3 text-lg">Retira tu pedido cuando esté preparado.</p>
            <p className="texto-suave text-sm mt-2">Te avisamos por correo cuando esté listo.</p>
          </div>
          <div className="tarjeta">
            <p className="etiqueta">Despacho</p>
            <p className="mt-3 text-lg">Recibe tu compra en la dirección indicada.</p>
            <p className="texto-suave text-sm mt-2">Bodega prepara y despacha tu pedido.</p>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="contenedor mt-24 text-center">
        <h2 className="titulo-seccion">¿Necesitas ayuda?</h2>
        <p className="texto-suave mt-2">
          Av. Providencia 3124, Santiago · Lunes a sábado, 8:30 a 18:30
        </p>
        <Link to="/contacto" className="btn btn-claro mt-6">Contacto</Link>
      </section>

    </Layout>
  )
}

export default Inicio
