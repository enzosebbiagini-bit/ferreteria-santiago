import { createContext, useContext, useEffect, useState } from "react"
import { productos as productosIniciales } from "../data/productos"
import { categorias as categoriasIniciales, marcas as marcasIniciales } from "../data/categorias"
import { pedidos as pedidosIniciales, cotizaciones as cotizacionesIniciales, notificaciones as notificacionesIniciales } from "../data/ventas"
import {
  usuarios as usuariosIniciales,
  proveedores as proveedoresIniciales,
  movimientos as movimientosIniciales,
  auditoria as auditoriaInicial,
} from "../data/administracion"
import { hoy, precioFinal, formatoPrecio } from "../utils"

// Aquí vive toda la información de la tienda y las funciones que la cambian.
// Como no hay servidor ni base de datos, los datos se guardan en el
// localStorage del navegador: así siguen ahí al recargar la página.

const TiendaContext = createContext()

// Igual que useState, pero además guarda el valor en localStorage.
function useGuardado(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave)
      return guardado ? JSON.parse(guardado) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor))
    } catch {
      // Si el navegador bloquea el almacenamiento, la página sigue funcionando
    }
  }, [clave, valor])

  return [valor, setValor]
}

// Número único para las filas nuevas
function nuevoId() {
  return Date.now() + Math.random()
}

export function TiendaProvider({ children }) {
  const [productos, setProductos] = useGuardado("fs_productos", productosIniciales)
  const [categorias, setCategorias] = useGuardado("fs_categorias", categoriasIniciales)
  const [marcas, setMarcas] = useGuardado("fs_marcas", marcasIniciales)
  const [proveedores, setProveedores] = useGuardado("fs_proveedores", proveedoresIniciales)
  const [usuarios, setUsuarios] = useGuardado("fs_usuarios", usuariosIniciales)
  const [idSesion, setIdSesion] = useGuardado("fs_sesion", null)
  const [carrito, setCarrito] = useGuardado("fs_carrito", [])
  const [pedidos, setPedidos] = useGuardado("fs_pedidos", pedidosIniciales)
  const [cotizaciones, setCotizaciones] = useGuardado("fs_cotizaciones", cotizacionesIniciales)
  const [notificaciones, setNotificaciones] = useGuardado("fs_notificaciones", notificacionesIniciales)
  const [movimientos, setMovimientos] = useGuardado("fs_movimientos", movimientosIniciales)
  const [auditoria, setAuditoria] = useGuardado("fs_auditoria", auditoriaInicial)
  const [mensajes, setMensajes] = useGuardado("fs_mensajes", [])

  // Mensaje corto que aparece abajo unos segundos ("Producto agregado")
  const [aviso, setAviso] = useState("")

  // Usuario que tiene la sesión iniciada (o undefined si no hay nadie)
  const sesion = usuarios.find((usuario) => usuario.id === idSesion)

  // Nombre que queda registrado en movimientos y auditoría
  const firma = sesion ? sesion.nombre + " (" + sesion.tipo + ")" : "Sistema"

  function mostrarAviso(texto) {
    setAviso(texto)
    setTimeout(() => setAviso(""), 2500)
  }

  function notificar(correo, texto) {
    const nueva = { id: nuevoId(), correo: correo, fecha: hoy(), texto: texto }
    setNotificaciones((lista) => [nueva, ...lista])
  }

  function auditar(accion, modulo, detalle) {
    const registro = { id: nuevoId(), fecha: hoy(), usuario: firma, accion: accion, modulo: modulo, detalle: detalle }
    setAuditoria((lista) => [registro, ...lista])
  }

  // Suma (signo 1) o resta (signo -1) al stock los productos de un pedido
  // y deja anotado el movimiento.
  function moverStock(items, signo, tipo, usuario) {
    setProductos((lista) =>
      lista.map((producto) => {
        const item = items.find((linea) => linea.id === producto.id)
        if (!item) {
          return producto
        }
        return { ...producto, stock: Math.max(0, producto.stock + signo * item.cantidad) }
      })
    )

    const nuevos = items.map((item) => ({
      id: nuevoId(),
      fecha: hoy(),
      producto: item.nombre,
      tipo: tipo,
      cantidad: (signo > 0 ? "+" : "-") + item.cantidad,
      usuario: usuario,
    }))
    setMovimientos((lista) => [...nuevos, ...lista])
  }

  // ---------- Sesión (RF1) ----------

  // Devuelve un texto de error, o "" si la sesión se inició bien.
  function iniciarSesion(correo, clave) {
    const usuario = usuarios.find((item) => item.correo.toLowerCase() === correo.trim().toLowerCase())

    if (!usuario || usuario.clave !== clave) {
      return "El correo o la contraseña no son correctos."
    }
    if (usuario.estado !== "Activo") {
      return "Esta cuenta está desactivada. Contacta al administrador."
    }

    setIdSesion(usuario.id)
    return ""
  }

  function cerrarSesion() {
    setIdSesion(null)
  }

  // Crea una cuenta. Desde el registro público siempre es de tipo Cliente.
  function crearUsuario(datos, entrar) {
    const correo = datos.correo.trim().toLowerCase()
    const repetido = usuarios.some((item) => item.correo.toLowerCase() === correo)

    if (repetido) {
      return "Ya existe una cuenta con ese correo."
    }

    const nuevo = {
      id: nuevoId(),
      nombre: datos.nombre.trim(),
      correo: correo,
      clave: datos.clave,
      tipo: datos.tipo || "Cliente",
      estado: "Activo",
    }
    setUsuarios([...usuarios, nuevo])

    if (entrar) {
      setIdSesion(nuevo.id)
    }
    return ""
  }

  function cambiarTipoUsuario(id, tipo) {
    setUsuarios(usuarios.map((usuario) => (usuario.id === id ? { ...usuario, tipo: tipo } : usuario)))
  }

  function cambiarEstadoUsuario(id) {
    setUsuarios(
      usuarios.map((usuario) => {
        if (usuario.id !== id) {
          return usuario
        }
        return { ...usuario, estado: usuario.estado === "Activo" ? "Inactivo" : "Activo" }
      })
    )
  }

  // ---------- Carrito (RF3) ----------

  // Une cada línea del carrito con los datos del producto.
  const lineasCarrito = []
  carrito.forEach((linea) => {
    const producto = productos.find((item) => item.id === linea.id)
    if (producto) {
      lineasCarrito.push({
        id: producto.id,
        nombre: producto.nombre,
        imagen: producto.imagen,
        precio: precioFinal(producto),
        stock: producto.stock,
        cantidad: linea.cantidad,
      })
    }
  })

  let unidadesCarrito = 0
  lineasCarrito.forEach((linea) => {
    unidadesCarrito = unidadesCarrito + linea.cantidad
  })

  function agregarAlCarrito(id) {
    const producto = productos.find((item) => item.id === id)
    const linea = carrito.find((item) => item.id === id)
    const cantidadActual = linea ? linea.cantidad : 0

    if (cantidadActual >= producto.stock) {
      mostrarAviso("No quedan más unidades de " + producto.nombre + ".")
      return
    }

    if (linea) {
      setCarrito(carrito.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item)))
    } else {
      setCarrito([...carrito, { id: id, cantidad: 1 }])
    }
    mostrarAviso(producto.nombre + " se agregó al carrito.")
  }

  function cambiarCantidad(id, cantidad) {
    const producto = productos.find((item) => item.id === id)
    // La cantidad queda entre 1 y el stock disponible
    let nueva = Number(cantidad)
    if (!nueva || nueva < 1) {
      nueva = 1
    }
    if (nueva > producto.stock) {
      nueva = producto.stock
    }
    setCarrito(carrito.map((item) => (item.id === id ? { ...item, cantidad: nueva } : item)))
  }

  function quitarDelCarrito(id) {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  // ---------- Pedidos (RF3, RF6, RF8) ----------

  function siguienteNumeroPedido() {
    let mayor = 1000
    pedidos.forEach((pedido) => {
      if (Number(pedido.id) > mayor) {
        mayor = Number(pedido.id)
      }
    })
    return String(mayor + 1)
  }

  // Crea el pedido con lo que hay en el carrito y devuelve su número.
  function crearPedido(datos) {
    const id = siguienteNumeroPedido()
    const items = lineasCarrito.map((linea) => ({
      id: linea.id,
      nombre: linea.nombre,
      cantidad: linea.cantidad,
      precio: linea.precio,
    }))

    const pedido = {
      id: id,
      cliente: datos.nombre,
      correo: datos.correo,
      telefono: datos.telefono,
      fecha: hoy(),
      tipo: datos.tipo,
      direccion: datos.direccion,
      estado: "Pendiente",
      responsable: "Sin asignar",
      pago: "Pendiente",
      metodo: "",
      items: items,
    }

    setPedidos([pedido, ...pedidos])
    moverStock(items, -1, "Venta", "Sistema (pedido #" + id + ")")
    setCarrito([])
    notificar(datos.correo, "Recibimos tu pedido #" + id + ".")
    return id
  }

  function registrarPago(id, tipo, metodo) {
    const pedido = pedidos.find((item) => item.id === id)
    const pago = tipo === "Pago" ? "Pagado" : "Reservado"

    setPedidos(pedidos.map((item) => (item.id === id ? { ...item, pago: pago, metodo: metodo } : item)))

    if (pago === "Pagado") {
      notificar(pedido.correo, "Tu comprobante de compra del pedido #" + id + " está disponible.")
    } else {
      notificar(pedido.correo, "Tu pedido #" + id + " quedó reservado. Se paga al retirar.")
    }
  }

  function cambiarEstadoPedido(id, estado) {
    const pedido = pedidos.find((item) => item.id === id)

    setPedidos(
      pedidos.map((item) => {
        if (item.id !== id) {
          return item
        }
        // Quien cambia el estado queda como responsable
        return { ...item, estado: estado, responsable: sesion ? sesion.nombre : item.responsable }
      })
    )

    if (estado === "Listo") {
      const texto = pedido.tipo === "Retiro" ? "está listo para retiro." : "está listo para despacho."
      notificar(pedido.correo, "Tu pedido #" + id + " " + texto)
    }
    if (estado === "Despachado") {
      notificar(pedido.correo, "Tu pedido #" + id + " fue despachado.")
    }
    if (estado === "Anulado") {
      // Al anular se devuelve el stock y queda registro en la auditoría
      moverStock(pedido.items, 1, "Devolución", firma)
      auditar("Anulación de pedido", "Pedidos", "Pedido #" + id)
      notificar(pedido.correo, "Tu pedido #" + id + " fue anulado.")
    }
  }

  // ---------- Cotizaciones (RF4, RF5) ----------

  function crearCotizacion(datos) {
    let mayor = 0
    cotizaciones.forEach((cotizacion) => {
      const numero = Number(cotizacion.id.replace("COT-", ""))
      if (numero > mayor) {
        mayor = numero
      }
    })
    const id = "COT-" + String(mayor + 1).padStart(5, "0")

    const cotizacion = {
      id: id,
      cliente: datos.nombre,
      empresa: datos.empresa,
      correo: datos.correo,
      telefono: datos.telefono,
      fecha: hoy(),
      estado: "Pendiente",
      vigencia: datos.vigencia,
      observaciones: datos.observaciones,
      items: datos.items,
    }

    setCotizaciones([cotizacion, ...cotizaciones])
    notificar(datos.correo, "Recibimos tu cotización #" + id + ". Un vendedor la revisará.")
    return id
  }

  function cambiarEstadoCotizacion(id, estado) {
    const cotizacion = cotizaciones.find((item) => item.id === id)
    setCotizaciones(cotizaciones.map((item) => (item.id === id ? { ...item, estado: estado } : item)))

    if (estado === "Aprobada") {
      notificar(cotizacion.correo, "Tu cotización #" + id + " fue aprobada.")
    }
    if (estado === "Rechazada") {
      notificar(cotizacion.correo, "Tu cotización #" + id + " fue rechazada.")
    }
  }

  // Guarda cantidades y precios nuevos. La cotización queda "En revisión".
  function modificarCotizacion(id, items) {
    setCotizaciones(
      cotizaciones.map((item) => (item.id === id ? { ...item, items: items, estado: "En revisión" } : item))
    )
  }

  // Una cotización aprobada pasa a ser un pedido.
  function convertirEnVenta(id) {
    const cotizacion = cotizaciones.find((item) => item.id === id)
    const numero = siguienteNumeroPedido()

    const pedido = {
      id: numero,
      cliente: cotizacion.cliente,
      correo: cotizacion.correo,
      telefono: cotizacion.telefono,
      fecha: hoy(),
      tipo: "Retiro",
      direccion: "",
      estado: "Pendiente",
      responsable: "Sin asignar",
      pago: "Pendiente",
      metodo: "",
      items: cotizacion.items,
    }

    setPedidos([pedido, ...pedidos])
    setCotizaciones(
      cotizaciones.map((item) => (item.id === id ? { ...item, estado: "Convertida en venta" } : item))
    )
    moverStock(cotizacion.items, -1, "Venta", "Sistema (pedido #" + numero + ")")
    notificar(cotizacion.correo, "Tu cotización #" + id + " se convirtió en el pedido #" + numero + ".")
    return numero
  }

  // ---------- Productos, categorías, marcas y proveedores (RF9) ----------

  // Sirve para crear (sin id) y para editar (con id).
  function guardarProducto(datos) {
    if (datos.id) {
      const anterior = productos.find((item) => item.id === datos.id)
      setProductos(productos.map((item) => (item.id === datos.id ? { ...item, ...datos } : item)))

      if (anterior.precio !== datos.precio) {
        auditar("Cambio de precio", "Productos", datos.nombre + ": " + formatoPrecio(anterior.precio) + " → " + formatoPrecio(datos.precio))
      }
      if (anterior.stock !== datos.stock) {
        auditar("Ajuste de stock", "Productos", datos.nombre + ": " + anterior.stock + " → " + datos.stock)
      }
    } else {
      let mayor = 0
      productos.forEach((item) => {
        if (item.id > mayor) {
          mayor = item.id
        }
      })
      setProductos([...productos, { ...datos, id: mayor + 1 }])
    }
  }

  function eliminarProducto(id) {
    setProductos(productos.filter((item) => item.id !== id))
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  function agregarCategoria(nombre) {
    setCategorias([...categorias, { id: nuevoId(), nombre: nombre, imagen: "" }])
  }

  function eliminarCategoria(id) {
    setCategorias(categorias.filter((item) => item.id !== id))
  }

  function agregarMarca(nombre) {
    setMarcas([...marcas, { id: nuevoId(), nombre: nombre }])
  }

  function eliminarMarca(id) {
    setMarcas(marcas.filter((item) => item.id !== id))
  }

  function agregarProveedor(datos) {
    setProveedores([...proveedores, { ...datos, id: nuevoId(), estado: "Activo" }])
  }

  function cambiarEstadoProveedor(id) {
    setProveedores(
      proveedores.map((item) => {
        if (item.id !== id) {
          return item
        }
        return { ...item, estado: item.estado === "Activo" ? "Inactivo" : "Activo" }
      })
    )
  }

  // ---------- Inventario (RF7) ----------

  // En un "Ajuste autorizado" la cantidad es el stock corregido.
  // En los demás movimientos es lo que entra o sale.
  function registrarMovimiento(idProducto, tipo, cantidad) {
    const producto = productos.find((item) => item.id === idProducto)
    let stockNuevo = producto.stock

    if (tipo === "Venta") {
      stockNuevo = Math.max(0, producto.stock - cantidad)
    } else if (tipo === "Ajuste autorizado") {
      stockNuevo = cantidad
    } else {
      // Ingreso proveedor o Devolución
      stockNuevo = producto.stock + cantidad
    }

    const diferencia = stockNuevo - producto.stock
    setProductos(productos.map((item) => (item.id === idProducto ? { ...item, stock: stockNuevo } : item)))

    const movimiento = {
      id: nuevoId(),
      fecha: hoy(),
      producto: producto.nombre,
      tipo: tipo,
      cantidad: (diferencia >= 0 ? "+" : "") + diferencia,
      usuario: firma,
    }
    setMovimientos([movimiento, ...movimientos])

    if (tipo === "Ajuste autorizado") {
      auditar("Ajuste de stock", "Inventario", producto.nombre + ": " + producto.stock + " → " + stockNuevo)
    }
  }

  // ---------- Contacto ----------

  function enviarMensaje(datos) {
    setMensajes([{ ...datos, id: nuevoId(), fecha: hoy() }, ...mensajes])
  }

  // Borra todo lo guardado y vuelve a los datos de ejemplo.
  function restablecerDatos() {
    Object.keys(localStorage).forEach((clave) => {
      if (clave.startsWith("fs_")) {
        localStorage.removeItem(clave)
      }
    })
    window.location.href = "/"
  }

  const valor = {
    productos, categorias, marcas, proveedores, usuarios, pedidos, cotizaciones,
    notificaciones, movimientos, auditoria, mensajes,
    sesion, aviso, lineasCarrito, unidadesCarrito,
    iniciarSesion, cerrarSesion, crearUsuario, cambiarTipoUsuario, cambiarEstadoUsuario,
    agregarAlCarrito, cambiarCantidad, quitarDelCarrito,
    crearPedido, registrarPago, cambiarEstadoPedido,
    crearCotizacion, cambiarEstadoCotizacion, modificarCotizacion, convertirEnVenta,
    guardarProducto, eliminarProducto,
    agregarCategoria, eliminarCategoria, agregarMarca, eliminarMarca,
    agregarProveedor, cambiarEstadoProveedor,
    registrarMovimiento, enviarMensaje, restablecerDatos, mostrarAviso,
  }

  return (
    <TiendaContext.Provider value={valor}>
      {children}
    </TiendaContext.Provider>
  )
}

// Para usar los datos en cualquier componente: const { productos } = useTienda()
export function useTienda() {
  return useContext(TiendaContext)
}
