import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Layout from "../components/Layout"
import { useTienda } from "../context/TiendaContext"
import { usuarios as cuentasDemo, claveDemo } from "../data/administracion"

function Login() {
  const { iniciarSesion, usuarios } = useTienda()
  const navegar = useNavigate()
  const [parametros] = useSearchParams()

  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")
  const [error, setError] = useState("")

  function enviar(evento) {
    evento.preventDefault()

    const mensaje = iniciarSesion(correo, clave)
    if (mensaje) {
      setError(mensaje)
      return
    }

    // Si venía de otra página (por ejemplo el pedido) vuelve a ella.
    // Si no, el cliente va a su cuenta y el personal al área interna.
    const usuario = usuarios.find((item) => item.correo.toLowerCase() === correo.trim().toLowerCase())
    const volver = parametros.get("volver")

    if (volver) {
      navegar(volver)
    } else if (usuario.tipo === "Cliente") {
      navegar("/mi-cuenta")
    } else {
      navegar("/interno")
    }
  }

  // Rellena el formulario con una cuenta de demostración
  function usarCuenta(cuenta) {
    setCorreo(cuenta.correo)
    setClave(claveDemo)
    setError("")
  }

  return (
    <Layout>
      <section className="contenedor py-16 max-w-md">

        <h1 className="titulo-pagina text-center">Iniciar sesión</h1>

        <form onSubmit={enviar} className="tarjeta mt-8 grid gap-4">
          <label className="campo">
            Correo electrónico
            <input
              type="email"
              className="input"
              autoComplete="email"
              required
              value={correo}
              onChange={(evento) => setCorreo(evento.target.value)}
            />
          </label>
          <label className="campo">
            Contraseña
            <input
              type="password"
              className="input"
              autoComplete="current-password"
              required
              value={clave}
              onChange={(evento) => setClave(evento.target.value)}
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-700">{error}</p>
          )}

          <button type="submit" className="btn btn-principal">Iniciar sesión</button>
        </form>

        <p className="text-center text-sm mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="font-semibold underline">Crear cuenta</Link>
        </p>

        {/* Cuentas de prueba para revisar cada perfil */}
        <details className="tarjeta mt-8 text-sm">
          <summary className="cursor-pointer font-medium">Cuentas de demostración</summary>
          <p className="texto-suave text-xs mt-3">
            Elige un perfil para rellenar el formulario y luego presiona “Iniciar sesión”.
          </p>
          <ul className="mt-3 grid gap-2">
            {cuentasDemo
              .filter((cuenta) => cuenta.estado === "Activo")
              .map((cuenta) => (
                <li key={cuenta.id}>
                  <button
                    type="button"
                    onClick={() => usarCuenta(cuenta)}
                    className="w-full flex justify-between gap-3 px-3 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer text-left"
                  >
                    <span className="font-medium">{cuenta.tipo}</span>
                    <span className="texto-suave">{cuenta.correo}</span>
                  </button>
                </li>
              ))}
          </ul>
        </details>

        <p className="texto-suave text-xs text-center mt-8">
          Prototipo sin servidor: las cuentas se guardan solo en este navegador.
          En el sistema final las contraseñas se guardan cifradas y la sesión
          se controla en el servidor.
        </p>

      </section>
    </Layout>
  )
}

export default Login
