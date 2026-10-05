import { useState } from "react"
import LayoutInterno from "../../components/LayoutInterno"
import Estado from "../../components/Estado"
import { roles } from "../../data/administracion"
import { useTienda } from "../../context/TiendaContext"

function Usuarios() {
  const { sesion, usuarios, crearUsuario, cambiarTipoUsuario, cambiarEstadoUsuario, mostrarAviso } = useTienda()

  const [abierto, setAbierto] = useState(false)
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")
  const [tipo, setTipo] = useState("Vendedor")
  const [error, setError] = useState("")

  // Solo el administrador puede crear cuentas y cambiar perfiles.
  // El vendedor ve únicamente a los clientes.
  const esAdministrador = sesion && sesion.tipo === "Administrador"
  const visibles = esAdministrador ? usuarios : usuarios.filter((usuario) => usuario.tipo === "Cliente")

  function enviar(evento) {
    evento.preventDefault()

    // El segundo valor (false) crea la cuenta sin cambiar la sesión actual
    const mensaje = crearUsuario({ nombre: nombre, correo: correo, clave: clave, tipo: tipo }, false)
    if (mensaje) {
      setError(mensaje)
      return
    }

    setNombre("")
    setCorreo("")
    setClave("")
    setError("")
    setAbierto(false)
    mostrarAviso("Usuario creado.")
  }

  return (
    <LayoutInterno
      titulo="Clientes y usuarios"
      descripcion="Cuentas registradas y el perfil que define sus permisos."
    >

      {esAdministrador && !abierto && (
        <button type="button" onClick={() => setAbierto(true)} className="btn btn-principal mb-6">
          + Agregar usuario
        </button>
      )}

      {abierto && (
        <form onSubmit={enviar} className="tarjeta mb-6 grid gap-4 sm:grid-cols-2">
          <label className="campo">
            Nombre
            <input type="text" className="input" required value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
          </label>
          <label className="campo">
            Correo
            <input type="email" className="input" required value={correo} onChange={(evento) => setCorreo(evento.target.value)} />
          </label>
          <label className="campo">
            Contraseña inicial
            <input type="text" className="input" minLength="8" required value={clave} onChange={(evento) => setClave(evento.target.value)} />
          </label>
          <label className="campo">
            Tipo
            <select className="input" value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
              {roles.map((rol) => (
                <option key={rol.nombre}>{rol.nombre}</option>
              ))}
            </select>
          </label>
          {error && (
            <p role="alert" className="sm:col-span-2 text-sm text-red-700">{error}</p>
          )}
          <div className="sm:col-span-2 flex gap-2">
            <button type="submit" className="btn btn-oscuro">Guardar usuario</button>
            <button type="button" onClick={() => setAbierto(false)} className="btn btn-claro">Cancelar</button>
          </div>
        </form>
      )}

      <div className="tabla-contenedor bg-white">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Estado</th>
              {esAdministrador && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {visibles.map((usuario) => (
              <tr key={usuario.id}>
                <td className="font-medium">{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>
                  {/* No se puede cambiar el perfil propio, para no quedar sin acceso */}
                  {esAdministrador && usuario.id !== sesion.id ? (
                    <>
                      <label className="sr-only" htmlFor={"tipo-" + usuario.id}>
                        Tipo de {usuario.nombre}
                      </label>
                      <select
                        id={"tipo-" + usuario.id}
                        className="input py-1"
                        value={usuario.tipo}
                        onChange={(evento) => cambiarTipoUsuario(usuario.id, evento.target.value)}
                      >
                        {roles.map((rol) => (
                          <option key={rol.nombre}>{rol.nombre}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    usuario.tipo
                  )}
                </td>
                <td><Estado texto={usuario.estado} /></td>
                {esAdministrador && (
                  <td>
                    {usuario.id !== sesion.id && (
                      <button type="button" onClick={() => cambiarEstadoUsuario(usuario.id)} className="btn btn-claro btn-chico">
                        {usuario.estado === "Activo" ? "Desactivar" : "Activar"}
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="texto-suave text-xs mt-4">
        El tipo de usuario define a qué módulos puede entrar cada persona.
        Una cuenta desactivada no puede iniciar sesión.
      </p>

    </LayoutInterno>
  )
}

export default Usuarios
