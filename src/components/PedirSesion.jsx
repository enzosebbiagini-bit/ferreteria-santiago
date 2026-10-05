import { Link } from "react-router-dom"

// Se muestra cuando una página necesita que el cliente haya iniciado sesión.
// "volver" es la ruta a la que se regresa después de entrar.
export default function PedirSesion({ texto, volver }) {
  return (
    <section className="contenedor py-24 text-center max-w-lg">
      <h1 className="titulo-seccion">Inicia sesión para continuar</h1>
      <p className="texto-suave mt-3">{texto}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to={"/login?volver=" + volver} className="btn btn-principal">Iniciar sesión</Link>
        <Link to="/registro" className="btn btn-claro">Crear cuenta</Link>
      </div>
    </section>
  )
}
