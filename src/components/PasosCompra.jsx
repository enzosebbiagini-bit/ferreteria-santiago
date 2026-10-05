import { Link } from "react-router-dom"

const pasos = [
  { numero: 1, texto: "Carrito", ruta: "/carrito" },
  { numero: 2, texto: "Confirmar pedido", ruta: "/pedido" },
  { numero: 3, texto: "Pago o reserva", ruta: "/pago" },
]

// Muestra en qué paso de la compra está el cliente.
export default function PasosCompra({ actual }) {
  return (
    <ol className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-8">
      {pasos.map((paso) => (
        <li key={paso.numero}>
          <Link
            to={paso.ruta}
            aria-current={paso.numero === actual ? "step" : undefined}
            className={paso.numero === actual ? "font-semibold border-b-2 border-acento pb-1" : "texto-suave pb-1"}
          >
            {paso.numero}. {paso.texto}
          </Link>
        </li>
      ))}
    </ol>
  )
}
