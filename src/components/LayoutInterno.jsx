import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { modulos } from "../data/administracion"
import { useTienda } from "../context/TiendaContext"
import Aviso from "./Aviso"

// Estructura común del área interna: barra superior oscura + menú de módulos.
// También revisa que el usuario tenga permiso para ver la página.
export default function LayoutInterno({ titulo, descripcion, children }) {
  const { sesion, cerrarSesion } = useTienda()
  const { pathname } = useLocation()
  const navegar = useNavigate()

  // Sin sesión, o con sesión de cliente, no se puede entrar al área interna
  if (!sesion || sesion.tipo === "Cliente") {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center">
        <section className="contenedor text-center max-w-lg">
          <p className="etiqueta">Área interna</p>
          <h1 className="titulo-seccion mt-3">Acceso solo para el personal</h1>
          <p className="texto-suave mt-3">
            Inicia sesión con una cuenta de vendedor, almacenista,
            administrador o propietario.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/login?volver=/interno" className="btn btn-principal">Iniciar sesión</Link>
            <Link to="/" className="btn btn-claro">Volver a la tienda</Link>
          </div>
        </section>
      </div>
    )
  }

  // Módulos que puede ver el perfil de la sesión
  const misModulos = modulos.filter((modulo) => modulo.perfiles.includes(sesion.tipo))

  // El módulo de la página actual (el panel no es un módulo, lo ven todos)
  const moduloActual = modulos.find((modulo) => modulo.ruta === pathname)
  const tienePermiso = !moduloActual || moduloActual.perfiles.includes(sesion.tipo)

  function salir() {
    cerrarSesion()
    navegar("/")
  }

  return (
    <div className="min-h-screen bg-neutral-50">

      <header className="bg-neutral-900 text-white">
        <div className="contenedor py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link to="/interno" className="font-semibold">
            Ferretería Santiago <span className="text-acento">· Área interna</span>
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-neutral-300">{sesion.nombre} · {sesion.tipo}</span>
            <Link to="/" className="underline">Ver tienda</Link>
            <button type="button" onClick={salir} className="underline cursor-pointer">Salir</button>
          </div>
        </div>
      </header>

      <div className="contenedor py-8 grid gap-8 md:grid-cols-[210px_1fr]">

        <nav aria-label="Módulos internos" className="overflow-x-auto">
          <ul className="flex md:flex-col gap-1 text-sm whitespace-nowrap">
            <li>
              <NavLink to="/interno" end className={estiloEnlace}>Panel</NavLink>
            </li>
            {misModulos.map((modulo) => (
              <li key={modulo.ruta}>
                <NavLink to={modulo.ruta} className={estiloEnlace}>
                  {modulo.nombre}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* min-w-0 evita que las tablas anchas estiren la página */}
        <main className="min-w-0">
          {tienePermiso ? (
            <>
              <h1 className="titulo-seccion">{titulo}</h1>
              <p className="texto-suave mt-1">{descripcion}</p>
              {moduloActual && (
                <p className="text-xs texto-suave mt-2">
                  Perfiles con acceso: {moduloActual.perfiles.join(", ")}
                </p>
              )}
              <div className="mt-8">
                {children}
              </div>
            </>
          ) : (
            <div className="tarjeta text-center">
              <h1 className="text-xl font-semibold">No tienes permiso para ver este módulo</h1>
              <p className="texto-suave mt-2">
                Tu perfil es {sesion.tipo}. Este módulo es para: {moduloActual.perfiles.join(", ")}.
              </p>
              <Link to="/interno" className="btn btn-claro mt-6">Volver al panel</Link>
            </div>
          )}
        </main>

      </div>

      <Aviso />
    </div>
  )
}

function estiloEnlace({ isActive }) {
  if (isActive) {
    return "block px-3 py-2 rounded-lg bg-neutral-900 text-white"
  }
  return "block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-200"
}
