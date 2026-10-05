import { Link } from "react-router-dom"
import LayoutInterno from "../../components/LayoutInterno"
import { roles, modulos } from "../../data/administracion"
import { useTienda } from "../../context/TiendaContext"
import { formatoPrecio, totalVentas } from "../../utils"

const consideraciones = [
  "Diseño responsive para escritorio, tablet y teléfono",
  "Interfaz, lógica y datos separados (components, context, pages y data)",
  "Base de datos relacional con integridad de datos",
  "Control de roles y permisos por perfil",
  "Contraseñas cifradas y control de sesión",
  "Validación de entradas en formularios",
  "Registro de errores y bitácora de operaciones críticas",
  "Mensajes claros y manual básico de uso",
]

function PanelInterno() {
  const { sesion, pedidos, productos, cotizaciones, mensajes, restablecerDatos } = useTienda()

  const porPreparar = pedidos.filter((pedido) => pedido.estado === "Pendiente" || pedido.estado === "En preparación")
  const stockBajo = productos.filter((producto) => producto.stock <= producto.stockMinimo)
  const pendientes = cotizaciones.filter((cotizacion) => cotizacion.estado === "Pendiente" || cotizacion.estado === "En revisión")

  const resumen = [
    { titulo: "Ventas pagadas", valor: formatoPrecio(totalVentas(pedidos)) },
    { titulo: "Pedidos por preparar", valor: porPreparar.length },
    { titulo: "Stock bajo o crítico", valor: stockBajo.length + " productos" },
    { titulo: "Cotizaciones pendientes", valor: pendientes.length },
  ]

  function restablecer() {
    if (window.confirm("Se borrarán los cambios guardados en este navegador y volverán los datos de ejemplo. ¿Continuar?")) {
      restablecerDatos()
    }
  }

  return (
    <LayoutInterno
      titulo="Panel interno"
      descripcion="Resumen del negocio y acceso a los módulos según el perfil."
    >

      {/* Resumen */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resumen.map((dato) => (
          <div key={dato.titulo} className="tarjeta">
            <p className="etiqueta">{dato.titulo}</p>
            <p className="text-2xl font-semibold mt-2">{dato.valor}</p>
          </div>
        ))}
      </div>

      {/* Permisos por módulo */}
      <h2 className="text-xl font-semibold mt-12">Módulos y permisos</h2>
      <div className="tabla-contenedor mt-4 bg-white">
        <table className="tabla">
          <thead>
            <tr>
              <th>Módulo</th>
              <th>Perfiles con acceso</th>
              <th>Tu acceso</th>
            </tr>
          </thead>
          <tbody>
            {modulos.map((modulo) => (
              <tr key={modulo.ruta}>
                <td className="font-medium">{modulo.nombre}</td>
                <td>{modulo.perfiles.join(", ")}</td>
                <td>
                  {sesion && modulo.perfiles.includes(sesion.tipo) ? (
                    <Link to={modulo.ruta} className="underline">Abrir</Link>
                  ) : (
                    <span className="texto-suave">Sin permiso</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Perfiles */}
      <h2 className="text-xl font-semibold mt-12">Perfiles del sistema</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {roles.map((rol) => (
          <div key={rol.nombre} className="tarjeta">
            <p className="font-semibold">{rol.nombre}</p>
            <p className="texto-suave text-sm mt-1">{rol.descripcion}</p>
            <p className="text-xs mt-3">Acceso: {rol.acceso}</p>
          </div>
        ))}
      </div>

      {/* Mensajes del formulario de contacto: solo los ve el administrador */}
      {sesion && sesion.tipo === "Administrador" && (
        <>
          <h2 className="text-xl font-semibold mt-12">Mensajes de contacto</h2>
          {mensajes.length === 0 ? (
            <p className="tarjeta mt-4 texto-suave text-sm">No hay mensajes.</p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {mensajes.map((mensaje) => (
                <li key={mensaje.id} className="tarjeta text-sm">
                  <p className="font-medium">{mensaje.nombre} · {mensaje.correo}</p>
                  <p className="mt-1">{mensaje.mensaje}</p>
                  <p className="texto-suave text-xs mt-2">{mensaje.fecha}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Requerimientos no funcionales */}
      <details className="tarjeta mt-12">
        <summary className="cursor-pointer font-semibold">
          Consideraciones del sistema final
        </summary>
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 list-disc pl-5">
          {consideraciones.map((texto) => (
            <li key={texto}>{texto}</li>
          ))}
        </ul>
        <p className="texto-suave text-xs mt-4">
          Este prototipo guarda los datos en el navegador. La seguridad y la
          base de datos corresponden a la etapa de backend.
        </p>
      </details>

      {sesion && sesion.tipo === "Administrador" && (
        <div className="mt-8">
          <button type="button" onClick={restablecer} className="btn btn-claro btn-chico">
            Restablecer datos de ejemplo
          </button>
        </div>
      )}

    </LayoutInterno>
  )
}

export default PanelInterno
