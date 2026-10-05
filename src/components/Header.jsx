import { Link, NavLink, useNavigate } from "react-router-dom"
import { useTienda } from "../context/TiendaContext"

const menu = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Productos", ruta: "/productos" },
  { texto: "Categorías", ruta: "/categorias" },
  { texto: "Ofertas", ruta: "/ofertas" },
  { texto: "Cotizaciones", ruta: "/cotizaciones" },
  { texto: "Nosotros", ruta: "/nosotros" },
  { texto: "Contacto", ruta: "/contacto" },
]

function Header() {
  const { sesion, cerrarSesion, unidadesCarrito } = useTienda()
  const navegar = useNavigate()

  function salir() {
    cerrarSesion()
    navegar("/")
  }

  return (
    <header className="sticky top-0 z-10 bg-white/95 border-b border-neutral-200">
      <div className="contenedor flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3">

        <Link to="/" className="leading-tight">
          <span className="block text-xs texto-suave">Ferretería</span>
          <span className="block text-lg font-semibold tracking-tight">
            Santiago<span className="text-acento">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 text-sm lg:order-3">
          {sesion ? (
            <>
              {/* El personal va al área interna; el cliente, a su cuenta */}
              {sesion.tipo === "Cliente" ? (
                <Link to="/mi-cuenta" className="hover:underline">Hola, {sesion.nombre.split(" ")[0]}</Link>
              ) : (
                <Link to="/interno" className="hover:underline">Área interna</Link>
              )}
              <button type="button" onClick={salir} className="hidden sm:inline hover:underline cursor-pointer">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Iniciar sesión</Link>
              <Link to="/registro" className="hidden sm:inline hover:underline">Registrarse</Link>
            </>
          )}
          <Link to="/carrito" className="btn btn-oscuro btn-chico">
            Carrito ({unidadesCarrito})
          </Link>
        </div>

        {/* En pantallas chicas el menú pasa a una segunda fila que se desliza */}
        <nav aria-label="Menú principal" className="w-full lg:w-auto lg:order-2 overflow-x-auto">
          <ul className="flex gap-6 text-sm whitespace-nowrap">
            {menu.map((item) => (
              <li key={item.ruta}>
                <NavLink
                  to={item.ruta}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "block py-1 font-semibold border-b-2 border-acento"
                      : "block py-1 text-neutral-600 hover:text-black border-b-2 border-transparent"
                  }
                >
                  {item.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  )
}
export default Header
