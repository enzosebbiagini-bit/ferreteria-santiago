// Funciones pequeñas que se usan en varias páginas.

// 54990 -> "$54.990"
export function formatoPrecio(numero) {
  return "$" + numero.toLocaleString("es-CL")
}

// Devuelve el estado de stock que ve el cliente.
export function estadoStock(producto) {
  if (producto.stock === 0) {
    return "Sin stock"
  }
  if (producto.stock <= producto.stockMinimo) {
    return "Últimas unidades"
  }
  return "Disponible"
}

// Devuelve el estado de stock que ve bodega.
export function estadoInventario(producto) {
  if (producto.stock === 0) {
    return "Crítico"
  }
  if (producto.stock <= producto.stockMinimo) {
    return "Stock bajo"
  }
  return "Normal"
}

// Precio que paga el cliente (el de oferta si existe).
export function precioFinal(producto) {
  return producto.precioOferta || producto.precio
}

// Suma cantidad × precio de una lista de productos.
export function sumar(items) {
  let total = 0
  items.forEach((item) => {
    total = total + item.cantidad * item.precio
  })
  return total
}

// Fecha de hoy como "05/10/2026"
export function hoy() {
  const fecha = new Date()
  const dia = String(fecha.getDate()).padStart(2, "0")
  const mes = String(fecha.getMonth() + 1).padStart(2, "0")
  return dia + "/" + mes + "/" + fecha.getFullYear()
}

// Cuenta las unidades vendidas de cada producto (sin los pedidos anulados)
// y las devuelve ordenadas de mayor a menor.
export function masVendidos(pedidos) {
  const lista = []

  pedidos.forEach((pedido) => {
    if (pedido.estado === "Anulado") {
      return
    }
    pedido.items.forEach((item) => {
      const fila = lista.find((elemento) => elemento.producto === item.nombre)
      if (fila) {
        fila.unidades = fila.unidades + item.cantidad
      } else {
        lista.push({ producto: item.nombre, unidades: item.cantidad })
      }
    })
  })

  lista.sort((a, b) => b.unidades - a.unidades)
  return lista
}

// Suma el total de los pedidos pagados.
export function totalVentas(pedidos) {
  let total = 0
  pedidos.forEach((pedido) => {
    if (pedido.pago === "Pagado" && pedido.estado !== "Anulado") {
      total = total + sumar(pedido.items)
    }
  })
  return total
}
