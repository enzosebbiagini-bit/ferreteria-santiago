import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import Layout from "../components/Layout"
import ListaProductos from "../components/ListaProductos"
import { useTienda } from "../context/TiendaContext"
import { estadoStock, precioFinal } from "../utils"

function Productos() {
  const { productos, categorias, marcas } = useTienda()
  // Si se llega desde el inicio, la búsqueda o la categoría vienen en la URL
  const [parametros] = useSearchParams()

  const [buscar, setBuscar] = useState(parametros.get("buscar") || "")
  const [categoria, setCategoria] = useState(parametros.get("categoria") || "Todas")
  const [marca, setMarca] = useState("Todas")
  const [precioMaximo, setPrecioMaximo] = useState("Todos")
  const [disponibilidad, setDisponibilidad] = useState("Todas")

  // Se revisa cada producto contra los filtros elegidos
  const filtrados = productos.filter((producto) => {
    const coincideTexto = producto.nombre.toLowerCase().includes(buscar.toLowerCase())
    const coincideCategoria = categoria === "Todas" || producto.categoria === categoria
    const coincideMarca = marca === "Todas" || producto.marca === marca
    const coincidePrecio = precioMaximo === "Todos" || precioFinal(producto) <= Number(precioMaximo)
    const coincideStock = disponibilidad === "Todas" || estadoStock(producto) === disponibilidad

    return coincideTexto && coincideCategoria && coincideMarca && coincidePrecio && coincideStock
  })

  return (
    <Layout>
      <section className="contenedor py-14">

        <h1 className="titulo-pagina">Productos</h1>
        <p className="texto-suave mt-2">
          Consulta el catálogo por categoría, marca, precio y disponibilidad.
        </p>

        {/* Filtros */}
        <form
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          onSubmit={(evento) => evento.preventDefault()}
        >
          <label className="campo sm:col-span-2 lg:col-span-1">
            Búsqueda
            <input
              type="search"
              className="input"
              placeholder="¿Qué estás buscando?"
              value={buscar}
              onChange={(evento) => setBuscar(evento.target.value)}
            />
          </label>

          <label className="campo">
            Categoría
            <select className="input" value={categoria} onChange={(evento) => setCategoria(evento.target.value)}>
              <option>Todas</option>
              {categorias.map((item) => (
                <option key={item.id}>{item.nombre}</option>
              ))}
            </select>
          </label>

          <label className="campo">
            Marca
            <select className="input" value={marca} onChange={(evento) => setMarca(evento.target.value)}>
              <option>Todas</option>
              {marcas.map((item) => (
                <option key={item.id}>{item.nombre}</option>
              ))}
            </select>
          </label>

          <label className="campo">
            Rango de precio
            <select className="input" value={precioMaximo} onChange={(evento) => setPrecioMaximo(evento.target.value)}>
              <option value="Todos">Todos</option>
              <option value="5000">Hasta $5.000</option>
              <option value="20000">Hasta $20.000</option>
              <option value="50000">Hasta $50.000</option>
              <option value="100000">Hasta $100.000</option>
            </select>
          </label>

          <label className="campo">
            Disponibilidad
            <select className="input" value={disponibilidad} onChange={(evento) => setDisponibilidad(evento.target.value)}>
              <option>Todas</option>
              <option>Disponible</option>
              <option>Últimas unidades</option>
              <option>Sin stock</option>
            </select>
          </label>
        </form>

        <p className="texto-suave text-sm mt-8 mb-6">
          {filtrados.length} productos encontrados
        </p>

        {filtrados.length > 0 ? (
          <ListaProductos lista={filtrados} />
        ) : (
          <p className="tarjeta text-center texto-suave">
            No hay productos con esos filtros. Prueba con otra categoría o marca.
          </p>
        )}

      </section>
    </Layout>
  )
}

export default Productos
