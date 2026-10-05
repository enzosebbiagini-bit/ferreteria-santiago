import Header from "./Header"
import Footer from "./Footer"
import Aviso from "./Aviso"

// Estructura común de las páginas públicas y del área cliente.
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Aviso />
    </div>
  )
}
