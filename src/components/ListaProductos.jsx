import ProductoCard from "./ProductoCard"
import { estadoStock } from "../utils"

// Grilla de productos. Recibe la lista que se quiere mostrar.
export default function ListaProductos({ lista }) {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {lista.map((producto) => (
        <ProductoCard
          key={producto.id}
          id={producto.id}
          nombre={producto.nombre}
          marca={producto.marca}
          precio={producto.precio}
          precioOferta={producto.precioOferta}
          imagen={producto.imagen}
          estado={estadoStock(producto)}
        />
      ))}
    </div>
  )
}
