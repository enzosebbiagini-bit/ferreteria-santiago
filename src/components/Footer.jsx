import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-neutral-100 mt-24 text-sm">
      <div className="contenedor py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">

        <div>
          <p className="font-semibold">Ferretería Santiago</p>
          <p className="texto-suave mt-2">
            Herramientas y materiales para maestros, contratistas y hogares.
          </p>
        </div>

        <div>
          <p className="etiqueta">Tienda</p>
          <ul className="mt-3 space-y-2">
            <li><Link to="/productos" className="hover:underline">Productos</Link></li>
            <li><Link to="/categorias" className="hover:underline">Categorías</Link></li>
            <li><Link to="/ofertas" className="hover:underline">Ofertas</Link></li>
            <li><Link to="/cotizaciones" className="hover:underline">Cotizaciones</Link></li>
          </ul>
        </div>

        <div>
          <p className="etiqueta">Mi cuenta</p>
          <ul className="mt-3 space-y-2">
            <li><Link to="/carrito" className="hover:underline">Carrito</Link></li>
            <li><Link to="/mi-cuenta" className="hover:underline">Pedidos y cotizaciones</Link></li>
            <li><Link to="/login" className="hover:underline">Iniciar sesión</Link></li>
          </ul>
        </div>

        <div>
          <p className="etiqueta">Ayuda</p>
          <ul className="mt-3 space-y-2">
            <li><Link to="/nosotros" className="hover:underline">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
            <li><Link to="/interno" className="hover:underline">Acceso personal interno</Link></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-neutral-200">
        <div className="contenedor py-5 flex flex-wrap justify-between gap-2 texto-suave text-xs">
          <p>© 2026 Ferretería Santiago · Prototipo frontend con datos de ejemplo, sin backend.</p>
          <Link to="/creditos" className="hover:underline">Créditos de imágenes</Link>
        </div>
      </div>
    </footer>
  )
}
