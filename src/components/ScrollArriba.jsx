import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Al cambiar de página vuelve al inicio del scroll.
function ScrollArriba() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
export default ScrollArriba
