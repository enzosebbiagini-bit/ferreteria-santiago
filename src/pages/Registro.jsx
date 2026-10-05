import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { useTienda } from "../context/TiendaContext"

function Registro() {
  const { crearUsuario } = useTienda()
  const navegar = useNavigate()

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [correo, setCorreo] = useState("")
  const [telefono, setTelefono] = useState("")
  const [clave, setClave] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [error, setError] = useState("")

  function enviar(evento) {
    evento.preventDefault()

    if (clave !== confirmar) {
      setError("Las contraseñas no coinciden.")
      return
    }

    const datos = {
      nombre: nombre + " " + apellido,
      correo: correo,
      telefono: telefono,
      clave: clave,
      tipo: "Cliente",
    }

    // El segundo valor (true) deja la sesión iniciada al crear la cuenta
    const mensaje = crearUsuario(datos, true)
    if (mensaje) {
      setError(mensaje)
      return
    }

    navegar("/mi-cuenta")
  }

  return (
    <Layout>
      <section className="contenedor py-16 max-w-xl">

        <h1 className="titulo-pagina text-center">Crear cuenta</h1>

        <form onSubmit={enviar} className="tarjeta mt-8 grid gap-4 sm:grid-cols-2">
          <label className="campo">
            Nombre
            <input type="text" className="input" required value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
          </label>
          <label className="campo">
            Apellido
            <input type="text" className="input" required value={apellido} onChange={(evento) => setApellido(evento.target.value)} />
          </label>
          <label className="campo">
            Correo
            <input type="email" className="input" autoComplete="email" required value={correo} onChange={(evento) => setCorreo(evento.target.value)} />
          </label>
          <label className="campo">
            Teléfono
            <input type="tel" className="input" value={telefono} onChange={(evento) => setTelefono(evento.target.value)} />
          </label>
          <label className="campo">
            Contraseña
            <input type="password" className="input" autoComplete="new-password" minLength="8" required value={clave} onChange={(evento) => setClave(evento.target.value)} />
          </label>
          <label className="campo">
            Confirmar contraseña
            <input type="password" className="input" autoComplete="new-password" minLength="8" required value={confirmar} onChange={(evento) => setConfirmar(evento.target.value)} />
          </label>
          <label className="campo sm:col-span-2">
            Tipo de usuario
            <select className="input" disabled>
              <option>Cliente</option>
            </select>
            <span className="texto-suave text-xs font-normal">
              Las cuentas de vendedor, almacenista y administrador las crea el administrador.
            </span>
          </label>

          <p className="sm:col-span-2 text-xs bg-neutral-100 rounded-lg p-3">
            No uses una contraseña real. Este prototipo no tiene servidor y
            guarda la cuenta, sin cifrar, solo en este navegador.
          </p>

          {error && (
            <p role="alert" className="sm:col-span-2 text-sm text-red-700">{error}</p>
          )}

          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-principal w-full">Crear cuenta</button>
          </div>
        </form>

        <p className="text-center text-sm mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="font-semibold underline">Iniciar sesión</Link>
        </p>

      </section>
    </Layout>
  )
}

export default Registro
