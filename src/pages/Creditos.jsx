import Layout from "../components/Layout"
import { creditos } from "../data/creditos"

function Creditos() {
  return (
    <Layout>
      <section className="contenedor py-14">
        <h1 className="titulo-pagina">Créditos de imágenes</h1>
        <p className="texto-suave mt-2 mb-8">
          Las fotografías son de Wikimedia Commons. Se redimensionaron y
          recomprimieron para este prototipo.
        </p>

        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Autor</th>
                <th>Licencia</th>
                <th>Original</th>
              </tr>
            </thead>
            <tbody>
              {creditos.map((credito) => (
                <tr key={credito.url}>
                  <td>{credito.producto}</td>
                  <td>{credito.autor}</td>
                  <td>{credito.licencia}</td>
                  <td>
                    <a href={credito.url} target="_blank" rel="noreferrer" className="underline">
                      Ver en Commons
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  )
}

export default Creditos
