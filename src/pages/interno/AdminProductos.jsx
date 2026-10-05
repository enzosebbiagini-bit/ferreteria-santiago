import { useState } from "react"
import LayoutInterno from "../../components/LayoutInterno"
import Estado from "../../components/Estado"
import { useTienda } from "../../context/TiendaContext"
import { estadoStock, formatoPrecio } from "../../utils"

function AdminProductos() {
  const { productos, categorias, marcas, proveedores, guardarProducto, eliminarProducto, mostrarAviso } = useTienda()

  // Valores con los que parte el formulario al crear un producto
  const vacio = {
    nombre: "",
    marca: marcas.length > 0 ? marcas[0].nombre : "",
    categoria: categorias.length > 0 ? categorias[0].nombre : "",
    precio: "",
    precioOferta: "",
    stock: "",
    stockMinimo: "",
    proveedor: proveedores.length > 0 ? proveedores[0].nombre : "",
    imagen: "",
    descripcion: "",
  }

  const [abierto, setAbierto] = useState(false)
  const [formulario, setFormulario] = useState(vacio)

  // Cambia un solo campo del formulario
  function cambiar(campo, valor) {
    setFormulario({ ...formulario, [campo]: valor })
  }

  function nuevo() {
    setFormulario(vacio)
    setAbierto(true)
  }

  function editar(producto) {
    setFormulario({ ...producto, precioOferta: producto.precioOferta || "" })
    setAbierto(true)
    window.scrollTo(0, 0)
  }

  function eliminar(producto) {
    if (window.confirm("¿Eliminar " + producto.nombre + " del catálogo?")) {
      eliminarProducto(producto.id)
      mostrarAviso("Producto eliminado.")
    }
  }

  function enviar(evento) {
    evento.preventDefault()

    // Los inputs entregan texto, por eso los números se convierten
    guardarProducto({
      ...formulario,
      nombre: formulario.nombre.trim(),
      precio: Number(formulario.precio),
      precioOferta: Number(formulario.precioOferta) || 0,
      stock: Number(formulario.stock),
      stockMinimo: Number(formulario.stockMinimo),
    })

    mostrarAviso(formulario.id ? "Producto actualizado." : "Producto agregado.")
    setAbierto(false)
  }

  return (
    <LayoutInterno
      titulo="Administrar productos"
      descripcion="Crea, edita o elimina los productos del catálogo."
    >

      {!abierto && (
        <button type="button" onClick={nuevo} className="btn btn-principal mb-6">+ Agregar producto</button>
      )}

      {/* Formulario para agregar o editar */}
      {abierto && (
        <form onSubmit={enviar} className="tarjeta mb-6 grid gap-4 sm:grid-cols-2">
          <h2 className="sm:col-span-2 font-semibold">
            {formulario.id ? "Editar producto" : "Nuevo producto"}
          </h2>
          <label className="campo">
            Nombre
            <input type="text" className="input" required value={formulario.nombre} onChange={(evento) => cambiar("nombre", evento.target.value)} />
          </label>
          <label className="campo">
            Marca
            <select className="input" value={formulario.marca} onChange={(evento) => cambiar("marca", evento.target.value)}>
              {marcas.map((marca) => (
                <option key={marca.id}>{marca.nombre}</option>
              ))}
            </select>
          </label>
          <label className="campo">
            Categoría
            <select className="input" value={formulario.categoria} onChange={(evento) => cambiar("categoria", evento.target.value)}>
              {categorias.map((categoria) => (
                <option key={categoria.id}>{categoria.nombre}</option>
              ))}
            </select>
          </label>
          <label className="campo">
            Proveedor
            <select className="input" value={formulario.proveedor} onChange={(evento) => cambiar("proveedor", evento.target.value)}>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id}>{proveedor.nombre}</option>
              ))}
            </select>
          </label>
          <label className="campo">
            Precio
            <input type="number" min="1" className="input" required value={formulario.precio} onChange={(evento) => cambiar("precio", evento.target.value)} />
          </label>
          <label className="campo">
            Precio de oferta (opcional)
            <input type="number" min="0" className="input" value={formulario.precioOferta} onChange={(evento) => cambiar("precioOferta", evento.target.value)} />
          </label>
          <label className="campo">
            Stock
            <input type="number" min="0" className="input" required value={formulario.stock} onChange={(evento) => cambiar("stock", evento.target.value)} />
          </label>
          <label className="campo">
            Stock mínimo
            <input type="number" min="0" className="input" required value={formulario.stockMinimo} onChange={(evento) => cambiar("stockMinimo", evento.target.value)} />
          </label>
          <label className="campo sm:col-span-2">
            Imagen (dirección web, opcional)
            <input type="text" className="input" placeholder="https://..." value={formulario.imagen} onChange={(evento) => cambiar("imagen", evento.target.value)} />
          </label>
          <label className="campo sm:col-span-2">
            Descripción
            <textarea rows="3" className="input" value={formulario.descripcion} onChange={(evento) => cambiar("descripcion", evento.target.value)}></textarea>
          </label>
          <div className="sm:col-span-2 flex gap-2">
            <button type="submit" className="btn btn-oscuro">Guardar producto</button>
            <button type="button" onClick={() => setAbierto(false)} className="btn btn-claro">Cancelar</button>
          </div>
        </form>
      )}

      <div className="tabla-contenedor bg-white">
        <table className="tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="font-medium">{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.marca}</td>
                <td>{formatoPrecio(producto.precio)}</td>
                <td>{producto.stock}</td>
                <td><Estado texto={estadoStock(producto)} /></td>
                <td>
                  <span className="flex gap-2">
                    <button type="button" onClick={() => editar(producto)} className="btn btn-claro btn-chico">Editar</button>
                    <button type="button" onClick={() => eliminar(producto)} className="btn btn-claro btn-chico">Eliminar</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="texto-suave text-xs mt-4">
        Los cambios de precio y de stock quedan registrados en la auditoría.
      </p>

    </LayoutInterno>
  )
}

export default AdminProductos
