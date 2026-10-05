import { useState } from "react"
import LayoutInterno from "../../components/LayoutInterno"
import { useTienda } from "../../context/TiendaContext"

function AdminCategorias() {
  const {
    categorias, marcas, productos,
    agregarCategoria, eliminarCategoria, agregarMarca, eliminarMarca, mostrarAviso,
  } = useTienda()

  const [nuevaCategoria, setNuevaCategoria] = useState("")
  const [nuevaMarca, setNuevaMarca] = useState("")

  function enviarCategoria(evento) {
    evento.preventDefault()
    agregarCategoria(nuevaCategoria.trim())
    setNuevaCategoria("")
    mostrarAviso("Categoría agregada.")
  }

  function enviarMarca(evento) {
    evento.preventDefault()
    agregarMarca(nuevaMarca.trim())
    setNuevaMarca("")
    mostrarAviso("Marca agregada.")
  }

  // No se deja eliminar una categoría o marca que todavía tiene productos
  function quitarCategoria(categoria, cantidad) {
    if (cantidad > 0) {
      mostrarAviso("No se puede eliminar: tiene " + cantidad + " productos.")
      return
    }
    eliminarCategoria(categoria.id)
  }

  function quitarMarca(marca, cantidad) {
    if (cantidad > 0) {
      mostrarAviso("No se puede eliminar: tiene " + cantidad + " productos.")
      return
    }
    eliminarMarca(marca.id)
  }

  return (
    <LayoutInterno
      titulo="Categorías y marcas"
      descripcion="Organiza el catálogo por categoría y por marca."
    >

      <h2 className="text-xl font-semibold">Categorías</h2>
      <form onSubmit={enviarCategoria} className="mt-4 flex flex-wrap gap-2 max-w-md">
        <label className="sr-only" htmlFor="nueva-categoria">Nombre de la categoría</label>
        <input
          id="nueva-categoria"
          type="text"
          className="input flex-1"
          placeholder="Nueva categoría"
          required
          value={nuevaCategoria}
          onChange={(evento) => setNuevaCategoria(evento.target.value)}
        />
        <button type="submit" className="btn btn-principal">+ Agregar</button>
      </form>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categorias.map((categoria) => {
          const cantidad = productos.filter((producto) => producto.categoria === categoria.nombre).length

          return (
            <div key={categoria.id} className="tarjeta">
              <p className="etiqueta">Categoría</p>
              <p className="text-lg font-semibold mt-1">{categoria.nombre}</p>
              <p className="texto-suave text-sm">Productos: {cantidad}</p>
              <button type="button" onClick={() => quitarCategoria(categoria, cantidad)} className="btn btn-claro btn-chico mt-4">
                Eliminar
              </button>
            </div>
          )
        })}
      </div>

      <h2 className="text-xl font-semibold mt-12">Marcas</h2>
      <form onSubmit={enviarMarca} className="mt-4 flex flex-wrap gap-2 max-w-md">
        <label className="sr-only" htmlFor="nueva-marca">Nombre de la marca</label>
        <input
          id="nueva-marca"
          type="text"
          className="input flex-1"
          placeholder="Nueva marca"
          required
          value={nuevaMarca}
          onChange={(evento) => setNuevaMarca(evento.target.value)}
        />
        <button type="submit" className="btn btn-principal">+ Agregar</button>
      </form>

      <div className="tabla-contenedor bg-white mt-4">
        <table className="tabla">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Productos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((marca) => {
              const cantidad = productos.filter((producto) => producto.marca === marca.nombre).length

              return (
                <tr key={marca.id}>
                  <td className="font-medium">{marca.nombre}</td>
                  <td>{cantidad}</td>
                  <td>
                    <button type="button" onClick={() => quitarMarca(marca, cantidad)} className="btn btn-claro btn-chico">
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </LayoutInterno>
  )
}

export default AdminCategorias
