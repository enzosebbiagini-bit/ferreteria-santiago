import { Link } from "react-router-dom"
import Estado from "./Estado"
import { formatoPrecio } from "../utils"
import { useTienda } from "../context/TiendaContext"

export default function ProductoCard({
  id,
  nombre,
  marca,
  precio,
  precioOferta,
  imagen,
  estado
}) {
  const { agregarAlCarrito } = useTienda()
  const sinStock = estado === "Sin stock"

  return (
    <article className="flex flex-col">

      <Link
        to={"/producto/" + id}
        className="relative block bg-neutral-100 rounded-2xl overflow-hidden hover:opacity-90 transition duration-300"
      >
        {precioOferta > 0 && (
          <span className="absolute top-3 left-3 bg-acento text-black text-xs font-semibold px-2 py-1 rounded-full">
            Oferta
          </span>
        )}
        {imagen ? (
          <img
            src={imagen}
            alt={nombre}
            className="w-full h-56 object-cover"
          />
        ) : (
          <span className="flex h-56 items-center justify-center texto-suave text-sm">Sin imagen</span>
        )}
      </Link>

      <p className="etiqueta mt-4">{marca}</p>
      <h3 className="font-semibold mt-1">{nombre}</h3>

      <p className="mt-1">
        {precioOferta > 0 ? (
          <>
            <span className="font-semibold">{formatoPrecio(precioOferta)}</span>
            <span className="texto-suave line-through text-sm ml-2">{formatoPrecio(precio)}</span>
          </>
        ) : (
          <span className="font-semibold">{formatoPrecio(precio)}</span>
        )}
      </p>

      <div className="mt-2">
        <Estado texto={estado} />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {sinStock ? (
          <Link to="/cotizaciones" className="btn btn-claro btn-chico">Consultar</Link>
        ) : (
          <button type="button" onClick={() => agregarAlCarrito(id)} className="btn btn-principal btn-chico">
            Agregar al carrito
          </button>
        )}
        <Link to={"/producto/" + id} className="btn btn-claro btn-chico">Ver producto</Link>
      </div>

    </article>
  )
}
