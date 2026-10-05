import Layout from "../components/Layout"

function Nosotros() {
  return (
    <Layout>
      <section className="contenedor py-14 max-w-3xl">
        <h1 className="titulo-pagina">Nosotros</h1>
        <p className="mt-6 text-lg texto-suave">
          Ferretería Santiago es un comercio local que atiende a maestros,
          contratistas, pequeñas constructoras y clientes particulares.
        </p>
        <p className="mt-4 texto-suave">
          Durante años atendimos solo en mesón. En las horas punta se formaban
          filas y muchas consultas de stock había que resolverlas revisando
          estanterías y bodega. Por eso creamos esta plataforma: para que puedas
          ver productos, precios y disponibilidad a cualquier hora, armar tu
          pedido y pedir cotizaciones sin tener que venir al local.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-semibold">500+</p>
            <p className="texto-suave text-sm mt-1">Productos en catálogo</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">7</p>
            <p className="texto-suave text-sm mt-1">Categorías</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">24/7</p>
            <p className="texto-suave text-sm mt-1">Consulta de disponibilidad</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Nosotros
