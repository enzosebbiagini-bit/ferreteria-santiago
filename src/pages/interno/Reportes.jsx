import LayoutInterno from "../../components/LayoutInterno"
import Estado from "../../components/Estado"
import { ventasAnteriores } from "../../data/administracion"
import { useTienda } from "../../context/TiendaContext"
import { estadoInventario, formatoPrecio, masVendidos, totalVentas } from "../../utils"

function Reportes() {
  const { pedidos, productos, cotizaciones } = useTienda()

  const ventasDelMes = totalVentas(pedidos)
  const vendidos = masVendidos(pedidos).slice(0, 5)
  const stockCritico = productos.filter((producto) => producto.stock <= producto.stockMinimo)
  const pendientes = cotizaciones.filter((cotizacion) => cotizacion.estado === "Pendiente" || cotizacion.estado === "En revisión")

  // Meses anteriores (datos de ejemplo) + el mes actual calculado con los pedidos
  const ventasMensuales = [...ventasAnteriores, { mes: "Oct", monto: ventasDelMes }]

  // El valor más alto ocupa el 100% del ancho y el resto se calcula en proporción
  const mayorVenta = Math.max(...ventasMensuales.map((venta) => venta.monto))
  const mayorCantidad = vendidos.length > 0 ? vendidos[0].unidades : 1

  const resumen = [
    { titulo: "Ventas del mes", valor: formatoPrecio(ventasDelMes), detalle: "Pedidos pagados" },
    { titulo: "Producto más vendido", valor: vendidos.length > 0 ? vendidos[0].producto : "Sin ventas", detalle: vendidos.length > 0 ? vendidos[0].unidades + " unidades" : "" },
    { titulo: "Stock crítico", valor: stockCritico.length + " productos", detalle: "En el mínimo o bajo él" },
    { titulo: "Cotizaciones pendientes", valor: pendientes.length, detalle: "Por revisar" },
  ]

  return (
    <LayoutInterno
      titulo="Reportes"
      descripcion="Ventas, stock crítico, productos más vendidos y cotizaciones pendientes."
    >

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resumen.map((dato) => (
          <div key={dato.titulo} className="tarjeta">
            <p className="etiqueta">{dato.titulo}</p>
            <p className="text-2xl font-semibold mt-2">{dato.valor}</p>
            <p className="texto-suave text-xs mt-1">{dato.detalle}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {/* Gráfico de barras hecho solo con elementos HTML y CSS */}
        <div className="tarjeta">
          <h2 className="font-semibold">Ventas por mes</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {ventasMensuales.map((venta) => (
              <li key={venta.mes} className="grid grid-cols-[36px_1fr_92px] items-center gap-3">
                <span className="texto-suave">{venta.mes}</span>
                <span className="bg-neutral-100 rounded-full h-3">
                  <span
                    className="block bg-neutral-900 rounded-full h-3"
                    style={{ width: (venta.monto / mayorVenta) * 100 + "%" }}
                  ></span>
                </span>
                <span className="text-right">{formatoPrecio(venta.monto)}</span>
              </li>
            ))}
          </ul>
          <p className="texto-suave text-xs mt-4">
            Junio a septiembre son datos de ejemplo; octubre se calcula con los pedidos pagados.
          </p>
        </div>

        <div className="tarjeta">
          <h2 className="font-semibold">Productos más vendidos</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {vendidos.map((item) => (
              <li key={item.producto}>
                <span className="flex justify-between gap-3">
                  <span>{item.producto}</span>
                  <span className="texto-suave">{item.unidades} un.</span>
                </span>
                <span className="block bg-neutral-100 rounded-full h-2 mt-1">
                  <span
                    className="block bg-acento rounded-full h-2"
                    style={{ width: (item.unidades / mayorCantidad) * 100 + "%" }}
                  ></span>
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="min-w-0">
          <h2 className="font-semibold mb-3">Stock crítico</h2>
          <div className="tabla-contenedor bg-white">
            <table className="tabla">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Stock / mínimo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {stockCritico.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.stock} / {producto.stockMinimo}</td>
                    <td><Estado texto={estadoInventario(producto)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="font-semibold mb-3">Cotizaciones pendientes</h2>
          <div className="tabla-contenedor bg-white">
            <table className="tabla">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pendientes.map((cotizacion) => (
                  <tr key={cotizacion.id}>
                    <td>{cotizacion.id}</td>
                    <td>{cotizacion.cliente}</td>
                    <td><Estado texto={cotizacion.estado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </LayoutInterno>
  )
}

export default Reportes
