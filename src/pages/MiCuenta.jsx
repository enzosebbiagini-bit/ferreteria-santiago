import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import Estado from "../components/Estado"
import PedirSesion from "../components/PedirSesion"
import { useTienda } from "../context/TiendaContext"
import { formatoPrecio, sumar } from "../utils"

function MiCuenta() {
  const { sesion, pedidos, cotizaciones, notificaciones, cerrarSesion } = useTienda()
  const navegar = useNavigate()

  if (!sesion) {
    return (
      <Layout>
        <PedirSesion texto="Aquí verás tus pedidos, cotizaciones y notificaciones." volver="/mi-cuenta" />
      </Layout>
    )
  }

  // Solo lo que pertenece al usuario que inició sesión
  const misPedidos = pedidos.filter((pedido) => pedido.correo === sesion.correo)
  const misCotizaciones = cotizaciones.filter((cotizacion) => cotizacion.correo === sesion.correo)
  const misAvisos = notificaciones.filter((aviso) => aviso.correo === sesion.correo)
  const pagados = misPedidos.filter((pedido) => pedido.pago === "Pagado")

  function salir() {
    cerrarSesion()
    navegar("/")
  }

  return (
    <Layout>
      <section className="contenedor py-14">

        <p className="etiqueta">Área cliente</p>
        <h1 className="titulo-pagina mt-3">Hola, {sesion.nombre.split(" ")[0]}</h1>

        <nav aria-label="Área cliente" className="mt-6 flex flex-wrap gap-2 text-sm">
          <Link to="/carrito" className="btn btn-claro btn-chico">Carrito</Link>
          <a href="#pedidos" className="btn btn-claro btn-chico">Pedidos</a>
          <a href="#cotizaciones" className="btn btn-claro btn-chico">Cotizaciones</a>
          <a href="#perfil" className="btn btn-claro btn-chico">Perfil</a>
        </nav>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">

          <div className="space-y-12 min-w-0">

            {/* Pedidos */}
            <section id="pedidos" className="scroll-mt-32">
              <h2 className="titulo-seccion">Mis pedidos</h2>
              {misPedidos.length === 0 ? (
                <p className="tarjeta mt-4 texto-suave text-sm">
                  Todavía no tienes pedidos.{" "}
                  <Link to="/productos" className="underline text-black">Ver productos</Link>
                </p>
              ) : (
                <div className="tabla-contenedor mt-4">
                  <table className="tabla">
                    <thead>
                      <tr>
                        <th>Pedido</th>
                        <th>Fecha</th>
                        <th>Entrega</th>
                        <th>Estado</th>
                        <th>Pago</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {misPedidos.map((pedido) => (
                        <tr key={pedido.id}>
                          <td>#{pedido.id}</td>
                          <td>{pedido.fecha}</td>
                          <td>{pedido.tipo}</td>
                          <td><Estado texto={pedido.estado} /></td>
                          <td>
                            {/* Si falta pagar, se ofrece ir a la página de pago */}
                            {pedido.pago === "Pendiente" && pedido.estado !== "Anulado" ? (
                              <Link to={"/pago?pedido=" + pedido.id} className="btn btn-principal btn-chico">
                                Pagar o reservar
                              </Link>
                            ) : (
                              <Estado texto={pedido.pago} />
                            )}
                          </td>
                          <td>{formatoPrecio(sumar(pedido.items))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Cotizaciones */}
            <section id="cotizaciones" className="scroll-mt-32">
              <h2 className="titulo-seccion">Mis cotizaciones</h2>
              {misCotizaciones.length === 0 ? (
                <p className="tarjeta mt-4 texto-suave text-sm">Todavía no has solicitado cotizaciones.</p>
              ) : (
                <div className="tabla-contenedor mt-4">
                  <table className="tabla">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {misCotizaciones.map((cotizacion) => (
                        <tr key={cotizacion.id}>
                          <td>{cotizacion.id}</td>
                          <td>{cotizacion.fecha}</td>
                          <td><Estado texto={cotizacion.estado} /></td>
                          <td>{formatoPrecio(sumar(cotizacion.items))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <Link to="/cotizaciones" className="btn btn-claro btn-chico mt-4">Nueva cotización</Link>
            </section>

            {/* Comprobantes de los pedidos pagados */}
            <section>
              <h2 className="titulo-seccion">Comprobantes</h2>
              {pagados.length === 0 && (
                <p className="tarjeta mt-4 texto-suave text-sm">
                  Aquí aparecerán los comprobantes de tus pedidos pagados.
                </p>
              )}
              <div className="mt-4 grid gap-3">
                {pagados.map((pedido) => (
                  <details key={pedido.id} className="tarjeta">
                    <summary className="cursor-pointer font-medium">
                      Comprobante de compra · Pedido #{pedido.id}
                    </summary>
                    <div className="mt-5 text-sm">
                      <p className="font-semibold">Ferretería Santiago</p>
                      <p className="texto-suave">Fecha: {pedido.fecha} · Cliente: {pedido.cliente}</p>
                      <ul className="mt-4 space-y-2">
                        {pedido.items.map((item) => (
                          <li key={item.id} className="flex justify-between gap-4">
                            <span>{item.cantidad} × {item.nombre}</span>
                            <span>{formatoPrecio(item.cantidad * item.precio)}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="flex justify-between font-semibold border-t border-neutral-200 mt-4 pt-4">
                        <span>Total pagado ({pedido.metodo.toLowerCase()})</span>
                        <span>{formatoPrecio(sumar(pedido.items))}</span>
                      </p>
                      <p className="texto-suave text-xs mt-4">
                        Comprobante de ejemplo, sin validez tributaria.
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </div>

          <aside className="grid gap-8 h-fit">

            {/* Notificaciones */}
            <section>
              <h2 className="etiqueta">Notificaciones</h2>
              {misAvisos.length === 0 && (
                <p className="tarjeta mt-3 texto-suave text-sm">No tienes notificaciones.</p>
              )}
              <ul className="mt-3 grid gap-3">
                {misAvisos.map((aviso) => (
                  <li key={aviso.id} className="tarjeta text-sm border-l-4 border-l-acento">
                    <p>{aviso.texto}</p>
                    <p className="texto-suave text-xs mt-2">{aviso.fecha}</p>
                  </li>
                ))}
              </ul>
              <p className="texto-suave text-xs mt-3">
                En el sistema final estos avisos también se envían por correo.
              </p>
            </section>

            {/* Perfil */}
            <section id="perfil" className="scroll-mt-32">
              <h2 className="etiqueta">Perfil</h2>
              <dl className="tarjeta mt-3 text-sm space-y-3">
                <div>
                  <dt className="texto-suave">Nombre</dt>
                  <dd>{sesion.nombre}</dd>
                </div>
                <div>
                  <dt className="texto-suave">Correo</dt>
                  <dd>{sesion.correo}</dd>
                </div>
                <div>
                  <dt className="texto-suave">Tipo de usuario</dt>
                  <dd>{sesion.tipo}</dd>
                </div>
              </dl>
              <button type="button" onClick={salir} className="text-sm underline mt-3 cursor-pointer">
                Cerrar sesión
              </button>
            </section>

          </aside>
        </div>

      </section>
    </Layout>
  )
}

export default MiCuenta
