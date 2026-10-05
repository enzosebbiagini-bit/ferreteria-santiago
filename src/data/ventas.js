// Pedidos, cotizaciones y notificaciones con los que parte el sistema.
// Cada línea de "items" guarda el id del producto, su nombre, la cantidad y el precio.

export const pedidos = [
  {
    id: "1026", cliente: "María Pía", correo: "maria@demo.cl", fecha: "05/10/2026",
    tipo: "Retiro", direccion: "", estado: "Pendiente", responsable: "Sin asignar",
    pago: "Reservado", metodo: "Reserva en tienda",
    items: [{ id: 4, nombre: "Pintura Látex Interior 1 gal", cantidad: 1, precio: 19990 }],
  },
  {
    id: "1025", cliente: "Constructora Ejemplo", correo: "constructora@demo.cl", fecha: "04/10/2026",
    tipo: "Despacho", direccion: "Camino a la Obra 500, Santiago", estado: "En preparación", responsable: "Pedro Soto",
    pago: "Pagado", metodo: "Transferencia",
    items: [
      { id: 3, nombre: "Cemento 25 kg", cantidad: 150, precio: 5990 },
      { id: 12, nombre: "Casco de Seguridad", cantidad: 20, precio: 6990 },
    ],
  },
  {
    id: "1024", cliente: "Juan Carrera", correo: "cliente@demo.cl", fecha: "04/10/2026",
    tipo: "Retiro", direccion: "", estado: "Listo", responsable: "Pedro Soto",
    pago: "Pagado", metodo: "Transferencia",
    items: [
      { id: 1, nombre: "Taladro Percutor 650W", cantidad: 1, precio: 54990 },
      { id: 3, nombre: "Cemento 25 kg", cantidad: 2, precio: 5990 },
    ],
  },
  {
    id: "1023", cliente: "José Pérez", correo: "jose.perez@correo.example", fecha: "02/10/2026",
    tipo: "Despacho", direccion: "Providencia 12, Santiago", estado: "Despachado", responsable: "Pedro Soto",
    pago: "Pagado", metodo: "Tarjeta",
    items: [
      { id: 3, nombre: "Cemento 25 kg", cantidad: 20, precio: 5990 },
      { id: 5, nombre: "Guantes de Seguridad", cantidad: 5, precio: 3990 },
    ],
  },
  {
    id: "1022", cliente: "Juan Carrera", correo: "cliente@demo.cl", fecha: "01/10/2026",
    tipo: "Retiro", direccion: "", estado: "Retirado", responsable: "Pedro Soto",
    pago: "Pagado", metodo: "Tarjeta",
    items: [{ id: 2, nombre: "Martillo Carpintero 16 oz", cantidad: 1, precio: 12990 }],
  },
]

export const cotizaciones = [
  {
    id: "COT-00124", cliente: "Constructora Ejemplo", empresa: "Constructora Ejemplo", correo: "constructora@demo.cl",
    telefono: "", fecha: "05/10/2026", estado: "Pendiente", vigencia: "15 días",
    observaciones: "Entrega en obra durante la mañana.",
    items: [
      { id: 3, nombre: "Cemento 25 kg", cantidad: 150, precio: 5990 },
      { id: 8, nombre: "Tornillos para Madera (caja 100 un.)", cantidad: 40, precio: 4490 },
      { id: 5, nombre: "Guantes de Seguridad", cantidad: 43, precio: 3990 },
    ],
  },
  {
    id: "COT-00123", cliente: "Juan Carrera", empresa: "", correo: "cliente@demo.cl",
    telefono: "", fecha: "04/10/2026", estado: "En revisión", vigencia: "7 días",
    observaciones: "",
    items: [
      { id: 4, nombre: "Pintura Látex Interior 1 gal", cantidad: 10, precio: 19990 },
      { id: 10, nombre: "Ampolleta LED 9W", cantidad: 20, precio: 1990 },
    ],
  },
  {
    id: "COT-00122", cliente: "José Pérez", empresa: "", correo: "jose.perez@correo.example",
    telefono: "", fecha: "02/10/2026", estado: "Aprobada", vigencia: "15 días",
    observaciones: "",
    items: [
      { id: 3, nombre: "Cemento 25 kg", cantidad: 100, precio: 5990 },
      { id: 11, nombre: "Llave de Lavaplatos", cantidad: 4, precio: 24990 },
    ],
  },
  {
    id: "COT-00121", cliente: "María Pía", empresa: "", correo: "maria@demo.cl",
    telefono: "", fecha: "30/09/2026", estado: "Rechazada", vigencia: "7 días",
    observaciones: "",
    items: [{ id: 2, nombre: "Martillo Carpintero 16 oz", cantidad: 5, precio: 12990 }],
  },
]

export const notificaciones = [
  { id: 1, correo: "cliente@demo.cl", fecha: "05/10/2026", texto: "Tu pedido #1024 está listo para retiro." },
  { id: 2, correo: "cliente@demo.cl", fecha: "04/10/2026", texto: "Tu comprobante de compra del pedido #1024 está disponible." },
  { id: 3, correo: "cliente@demo.cl", fecha: "04/10/2026", texto: "Recibimos tu cotización #COT-00123. Un vendedor la está revisando." },
]
