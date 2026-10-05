import { useState } from "react"
import LayoutInterno from "../../components/LayoutInterno"
import Estado from "../../components/Estado"
import { useTienda } from "../../context/TiendaContext"
import { estadoInventario } from "../../utils"

function Inventario() {
  const { productos, movimientos, registrarMovimiento, mostrarAviso } = useTienda()

  const [idProducto, setIdProducto] = useState(productos.length > 0 ? productos[0].id : "")
  const [tipo, setTipo] = useState("Ingreso proveedor")
  const [cantidad, setCantidad] = useState("")

  const esAjuste = tipo === "Ajuste autorizado"

  function enviar(evento) {
    evento.preventDefault()
    registrarMovimiento(Number(idProducto), tipo, Number(cantidad))
    setCantidad("")
    mostrarAviso("Movimiento registrado.")
  }

  return (
    <LayoutInterno
      titulo="Control de inventario"
      descripcion="Stock actual de cada producto y sus últimos movimientos."
    >

      {/* Registrar un movimiento */}
      <h2 className="text-xl font-semibold">Registrar movimiento</h2>
      <form onSubmit={enviar} className="tarjeta mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <label className="campo">
          Producto
          <select className="input" value={idProducto} onChange={(evento) => setIdProducto(evento.target.value)}>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>{producto.nombre}</option>
            ))}
          </select>
        </label>
        <label className="campo">
          Tipo de movimiento
          <select className="input" value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
            <option>Venta</option>
            <option>Ingreso proveedor</option>
            <option>Devolución</option>
            <option>Ajuste autorizado</option>
          </select>
        </label>
        <label className="campo">
          {/* En un ajuste se escribe el stock corregido; en el resto, cuánto entra o sale */}
          {esAjuste ? "Stock corregido" : "Cantidad"}
          <input
            type="number"
            min={esAjuste ? "0" : "1"}
            className="input"
            required
            value={cantidad}
            onChange={(evento) => setCantidad(evento.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-oscuro">Registrar</button>
      </form>
      <p className="texto-suave text-xs mt-3">
        Los ajustes de stock quedan registrados en la auditoría.
      </p>

      <h2 className="text-xl font-semibold mt-12">Stock por producto</h2>
      <div className="tabla-contenedor bg-white mt-4">
        <table className="tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock actual</th>
              <th>Stock mínimo</th>
              <th>Último movimiento</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => {
              // Los movimientos están ordenados del más nuevo al más antiguo
              const ultimo = movimientos.find((movimiento) => movimiento.producto === producto.nombre)

              return (
                <tr key={producto.id}>
                  <td className="font-medium">{producto.nombre}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.stockMinimo}</td>
                  <td>{ultimo ? ultimo.tipo + " (" + ultimo.cantidad + ")" : "Sin movimientos"}</td>
                  <td><Estado texto={estadoInventario(producto)} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Historial */}
      <h2 className="text-xl font-semibold mt-12">Movimientos recientes</h2>
      <div className="tabla-contenedor bg-white mt-4">
        <table className="tabla">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Movimiento</th>
              <th>Cantidad</th>
              <th>Registrado por</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.slice(0, 20).map((movimiento) => (
              <tr key={movimiento.id}>
                <td>{movimiento.fecha}</td>
                <td>{movimiento.producto}</td>
                <td>{movimiento.tipo}</td>
                <td>{movimiento.cantidad}</td>
                <td>{movimiento.usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </LayoutInterno>
  )
}

export default Inventario
