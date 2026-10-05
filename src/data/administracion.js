// Datos con los que parte el área interna.

export const proveedores = [
  { id: 1, nombre: "Proveedor Industrial Norte", contacto: "Carla Muñoz", correo: "ventas@industrialnorte.example", estado: "Activo" },
  { id: 2, nombre: "Distribuidora Construcción Sur", contacto: "Raúl Vera", correo: "contacto@construccionsur.example", estado: "Activo" },
  { id: 3, nombre: "Importadora Herramientas Chile", contacto: "Ana Torres", correo: "pedidos@herramientaschile.example", estado: "Activo" },
]

// Cuentas de demostración, una por perfil. Todas usan la misma clave de prueba.
// IMPORTANTE: es un prototipo sin servidor, por eso las claves están a la vista.
// En el sistema real las contraseñas se guardan cifradas en la base de datos.
export const claveDemo = "demo1234"

export const usuarios = [
  { id: 1, nombre: "Juan Carrera", correo: "cliente@demo.cl", clave: claveDemo, tipo: "Cliente", estado: "Activo" },
  { id: 2, nombre: "Constructora Ejemplo", correo: "constructora@demo.cl", clave: claveDemo, tipo: "Cliente", estado: "Activo" },
  { id: 3, nombre: "Camila Díaz", correo: "vendedor@demo.cl", clave: claveDemo, tipo: "Vendedor", estado: "Activo" },
  { id: 4, nombre: "Pedro Soto", correo: "bodega@demo.cl", clave: claveDemo, tipo: "Almacenista", estado: "Activo" },
  { id: 5, nombre: "Andrea Fuentes", correo: "admin@demo.cl", clave: claveDemo, tipo: "Administrador", estado: "Activo" },
  { id: 6, nombre: "Rosa Santiago", correo: "propietario@demo.cl", clave: claveDemo, tipo: "Propietario", estado: "Activo" },
  { id: 7, nombre: "María Pía", correo: "maria@demo.cl", clave: claveDemo, tipo: "Cliente", estado: "Inactivo" },
]

// Qué puede hacer cada perfil dentro del sistema.
export const roles = [
  { nombre: "Cliente", descripcion: "Consulta el catálogo, arma pedidos y solicita cotizaciones.", acceso: "Tienda y área cliente" },
  { nombre: "Vendedor", descripcion: "Gestiona cotizaciones y revisa los clientes.", acceso: "Cotizaciones, clientes" },
  { nombre: "Almacenista", descripcion: "Actualiza el stock y prepara retiros y despachos.", acceso: "Inventario, despachos" },
  { nombre: "Administrador", descripcion: "Administra productos, categorías, marcas, proveedores y usuarios.", acceso: "Todos los módulos" },
  { nombre: "Propietario", descripcion: "Revisa los reportes y la actividad del negocio.", acceso: "Reportes, auditoría" },
]

// Módulos del área interna y los perfiles que pueden entrar a cada uno.
export const modulos = [
  { nombre: "Productos", ruta: "/interno/productos", perfiles: ["Administrador"] },
  { nombre: "Categorías y marcas", ruta: "/interno/categorias", perfiles: ["Administrador"] },
  { nombre: "Proveedores", ruta: "/interno/proveedores", perfiles: ["Administrador"] },
  { nombre: "Clientes y usuarios", ruta: "/interno/usuarios", perfiles: ["Administrador", "Vendedor"] },
  { nombre: "Inventario", ruta: "/interno/inventario", perfiles: ["Administrador", "Almacenista"] },
  { nombre: "Cotizaciones", ruta: "/interno/cotizaciones", perfiles: ["Administrador", "Vendedor"] },
  { nombre: "Despachos", ruta: "/interno/despachos", perfiles: ["Administrador", "Almacenista"] },
  { nombre: "Reportes", ruta: "/interno/reportes", perfiles: ["Administrador", "Propietario"] },
  { nombre: "Auditoría", ruta: "/interno/auditoria", perfiles: ["Administrador", "Propietario"] },
]

export const movimientos = [
  { id: 1, fecha: "05/10/2026", producto: "Cemento 25 kg", tipo: "Ingreso proveedor", cantidad: "+200", usuario: "Pedro Soto" },
  { id: 2, fecha: "04/10/2026", producto: "Taladro Percutor 650W", tipo: "Venta", cantidad: "-1", usuario: "Sistema (pedido #1024)" },
  { id: 3, fecha: "04/10/2026", producto: "Sierra Circular 1400W", tipo: "Devolución", cantidad: "+1", usuario: "Camila Díaz" },
  { id: 4, fecha: "03/10/2026", producto: "Cable Eléctrico 2,5 mm (rollo 50 m)", tipo: "Ajuste autorizado", cantidad: "-3", usuario: "Pedro Soto" },
]

export const auditoria = [
  { id: 1, fecha: "05/10/2026", usuario: "Andrea Fuentes (Administrador)", accion: "Cambio de precio", modulo: "Productos", detalle: "Casco de Seguridad: oferta a $5.490" },
  { id: 2, fecha: "03/10/2026", usuario: "Pedro Soto (Almacenista)", accion: "Ajuste de stock", modulo: "Inventario", detalle: "Cable Eléctrico 2,5 mm: 3 → 0" },
  { id: 3, fecha: "02/10/2026", usuario: "Camila Díaz (Vendedor)", accion: "Anulación de pedido", modulo: "Pedidos", detalle: "Pedido #1021" },
]

// Ventas de los meses anteriores (el mes actual se calcula con los pedidos pagados).
export const ventasAnteriores = [
  { mes: "Jun", monto: 5200000 },
  { mes: "Jul", monto: 6100000 },
  { mes: "Ago", monto: 5800000 },
  { mes: "Sep", monto: 7300000 },
]
