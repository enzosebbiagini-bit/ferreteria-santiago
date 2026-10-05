import { useTienda } from "../context/TiendaContext"

// Mensaje corto que aparece abajo cuando pasa algo ("Producto agregado").
export default function Aviso() {
  const { aviso } = useTienda()

  if (!aviso) {
    return null
  }

  return (
    <p
      role="status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 bg-neutral-900 text-white text-sm px-5 py-3 rounded-full shadow-lg max-w-[90vw] text-center"
    >
      {aviso}
    </p>
  )
}
