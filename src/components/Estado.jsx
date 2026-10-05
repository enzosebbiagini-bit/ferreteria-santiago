// Etiqueta de estado: un punto de color + el texto.
// El texto siempre se muestra, así no se depende solo del color.

const positivos = ["Disponible", "Aprobada", "Listo", "Activo", "Normal", "Pagado", "Retirado", "Despachado", "Convertida en venta"]
const advertencias = ["Últimas unidades", "Stock bajo", "Pendiente", "En revisión", "En preparación", "Reservado"]
const negativos = ["Sin stock", "Crítico", "Rechazada", "Inactivo", "Anulado"]

export default function Estado({ texto }) {
  let colorPunto = "bg-neutral-400"

  if (positivos.includes(texto)) {
    colorPunto = "bg-green-600"
  } else if (advertencias.includes(texto)) {
    colorPunto = "bg-acento"
  } else if (negativos.includes(texto)) {
    colorPunto = "bg-red-600"
  }

  return (
    <span className="inline-flex items-center gap-2 text-sm text-neutral-700 whitespace-nowrap">
      <span className={"w-2 h-2 rounded-full " + colorPunto} aria-hidden="true"></span>
      {texto}
    </span>
  )
}
