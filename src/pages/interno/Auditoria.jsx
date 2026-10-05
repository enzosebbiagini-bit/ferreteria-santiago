import LayoutInterno from "../../components/LayoutInterno"
import { useTienda } from "../../context/TiendaContext"

function Auditoria() {
  const { auditoria } = useTienda()

  return (
    <LayoutInterno
      titulo="Actividad reciente"
      descripcion="Bitácora de operaciones críticas: cambios de precio, ajustes de stock y anulaciones."
    >

      <div className="tabla-contenedor bg-white">
        <table className="tabla">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Módulo</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {auditoria.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.fecha}</td>
                <td>{registro.usuario}</td>
                <td className="font-medium">{registro.accion}</td>
                <td>{registro.modulo}</td>
                <td>{registro.detalle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="texto-suave text-xs mt-4">
        Los registros se crean solos al cambiar un precio, ajustar el stock o
        anular un pedido. No se pueden editar ni eliminar.
      </p>

    </LayoutInterno>
  )
}

export default Auditoria
