import { useState } from "react"
import LayoutInterno from "../../components/LayoutInterno"
import Estado from "../../components/Estado"
import { useTienda } from "../../context/TiendaContext"

function Proveedores() {
  const { proveedores, productos, agregarProveedor, cambiarEstadoProveedor, mostrarAviso } = useTienda()

  const [abierto, setAbierto] = useState(false)
  const [nombre, setNombre] = useState("")
  const [contacto, setContacto] = useState("")
  const [correo, setCorreo] = useState("")

  function enviar(evento) {
    evento.preventDefault()
    agregarProveedor({ nombre: nombre.trim(), contacto: contacto.trim(), correo: correo.trim() })
    setNombre("")
    setContacto("")
    setCorreo("")
    setAbierto(false)
    mostrarAviso("Proveedor agregado.")
  }

  return (
    <LayoutInterno
      titulo="Proveedores"
      descripcion="Empresas que abastecen a la ferretería."
    >

      {!abierto && (
        <button type="button" onClick={() => setAbierto(true)} className="btn btn-principal mb-6">
          + Agregar proveedor
        </button>
      )}

      {abierto && (
        <form onSubmit={enviar} className="tarjeta mb-6 grid gap-4 sm:grid-cols-3">
          <label className="campo">
            Proveedor
            <input type="text" className="input" required value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
          </label>
          <label className="campo">
            Contacto
            <input type="text" className="input" required value={contacto} onChange={(evento) => setContacto(evento.target.value)} />
          </label>
          <label className="campo">
            Correo
            <input type="email" className="input" required value={correo} onChange={(evento) => setCorreo(evento.target.value)} />
          </label>
          <div className="sm:col-span-3 flex gap-2">
            <button type="submit" className="btn btn-oscuro">Guardar proveedor</button>
            <button type="button" onClick={() => setAbierto(false)} className="btn btn-claro">Cancelar</button>
          </div>
        </form>
      )}

      <div className="tabla-contenedor bg-white">
        <table className="tabla">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Contacto</th>
              <th>Correo</th>
              <th>Productos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id}>
                <td className="font-medium">{proveedor.nombre}</td>
                <td>{proveedor.contacto}</td>
                <td>{proveedor.correo}</td>
                <td>{productos.filter((producto) => producto.proveedor === proveedor.nombre).length}</td>
                <td><Estado texto={proveedor.estado} /></td>
                <td>
                  <button type="button" onClick={() => cambiarEstadoProveedor(proveedor.id)} className="btn btn-claro btn-chico">
                    {proveedor.estado === "Activo" ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </LayoutInterno>
  )
}

export default Proveedores
