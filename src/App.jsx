import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollArriba from "./components/ScrollArriba"
import { TiendaProvider } from "./context/TiendaContext"

// Página pública
import Inicio from "./pages/Inicio"
import Productos from "./pages/Productos"
import DetalleProducto from "./pages/DetalleProducto"
import Categorias from "./pages/Categorias"
import Ofertas from "./pages/Ofertas"
import Cotizaciones from "./pages/Cotizaciones"
import Nosotros from "./pages/Nosotros"
import Contacto from "./pages/Contacto"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Creditos from "./pages/Creditos"

// Área cliente
import Carrito from "./pages/Carrito"
import Pedido from "./pages/Pedido"
import Pago from "./pages/Pago"
import MiCuenta from "./pages/MiCuenta"

// Área interna
import PanelInterno from "./pages/interno/PanelInterno"
import AdminProductos from "./pages/interno/AdminProductos"
import AdminCategorias from "./pages/interno/AdminCategorias"
import Proveedores from "./pages/interno/Proveedores"
import Usuarios from "./pages/interno/Usuarios"
import Inventario from "./pages/interno/Inventario"
import GestionCotizaciones from "./pages/interno/GestionCotizaciones"
import Despachos from "./pages/interno/Despachos"
import Reportes from "./pages/interno/Reportes"
import Auditoria from "./pages/interno/Auditoria"

function App() {
  return (
    <TiendaProvider>
      <BrowserRouter>
        <ScrollArriba />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/producto/:id' element={<DetalleProducto />} />
          <Route path='/categorias' element={<Categorias />} />
          <Route path='/ofertas' element={<Ofertas />} />
          <Route path='/cotizaciones' element={<Cotizaciones />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/creditos' element={<Creditos />} />

          <Route path='/carrito' element={<Carrito />} />
          <Route path='/pedido' element={<Pedido />} />
          <Route path='/pago' element={<Pago />} />
          <Route path='/mi-cuenta' element={<MiCuenta />} />

          <Route path='/interno' element={<PanelInterno />} />
          <Route path='/interno/productos' element={<AdminProductos />} />
          <Route path='/interno/categorias' element={<AdminCategorias />} />
          <Route path='/interno/proveedores' element={<Proveedores />} />
          <Route path='/interno/usuarios' element={<Usuarios />} />
          <Route path='/interno/inventario' element={<Inventario />} />
          <Route path='/interno/cotizaciones' element={<GestionCotizaciones />} />
          <Route path='/interno/despachos' element={<Despachos />} />
          <Route path='/interno/reportes' element={<Reportes />} />
          <Route path='/interno/auditoria' element={<Auditoria />} />
        </Routes>
      </BrowserRouter>
    </TiendaProvider>
  )
}
export default App
