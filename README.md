# Ferretería Santiago — Sistema de ventas on-line (prototipo frontend)

Prototipo del Caso 6 hecho con **React + Vite + React Router + Tailwind CSS**.

No tiene servidor ni base de datos. Los datos parten de `src/data/` y todo lo
que se hace en la página (iniciar sesión, carrito, pedidos, cotizaciones,
cambios del área interna) se guarda en el `localStorage` del navegador, así
que sigue ahí al recargar. Cada navegador tiene su propia copia.

## Cómo ejecutarlo

Se necesita Node.js instalado.

```bash
npm install
npm run dev
```

Luego abrir http://localhost:5174

## Cuentas de demostración

En la página de inicio de sesión, el cuadro "Cuentas de demostración" rellena
el formulario con una cuenta de cada perfil (cliente, vendedor, almacenista,
administrador y propietario). Están definidas en `src/data/administracion.js`.

Para volver a los datos de ejemplo: entrar como administrador y usar
"Restablecer datos de ejemplo" al final del panel interno.

## Cómo subirlo

```bash
npm run build
```

Genera la carpeta `dist/`, que es lo que se sube al hosting. El proyecto ya
trae `vercel.json` (Vercel) y `public/_redirects` (Netlify) para que las rutas
como `/productos` funcionen al recargar.

## Estructura

```
ferreteria-santiago/
├── index.html            Página base, aquí se monta React
├── public/images/        Fotografías de productos
└── src/
    ├── main.jsx          Punto de entrada
    ├── App.jsx           Rutas de la aplicación
    ├── index.css         Tailwind + estilos propios (botones, inputs, tablas)
    ├── utils.js          Formato de precio y estado de stock
    ├── components/       Piezas reutilizables (Header, Footer, ProductoCard...)
    ├── context/          TiendaContext: datos compartidos y funciones que los cambian
    ├── data/             Datos iniciales
    └── pages/            Una página por ruta
        └── interno/      Páginas del área interna
```

## Áreas del sitio

| Área | Rutas |
|---|---|
| Página pública | `/`, `/productos`, `/producto/:id`, `/categorias`, `/ofertas`, `/cotizaciones`, `/nosotros`, `/contacto`, `/login`, `/registro` |
| Área cliente | `/carrito`, `/pedido`, `/pago`, `/mi-cuenta` |
| Área interna | `/interno` y sus módulos (pide una cuenta del personal) |

## Requerimientos funcionales

| RF | Dónde se ve |
|---|---|
| RF1 Registro y autenticación por perfil | `/login`, `/registro`, `/interno` (cada perfil ve solo sus módulos) |
| RF2 Catálogo por categoría, marca, precio y disponibilidad | `/productos` (los filtros funcionan con `useState`) |
| RF3 Carro de compra y pedido web | `/carrito`, `/pedido` |
| RF4 Solicitar cotización | `/cotizaciones` |
| RF5 Aprobar, rechazar o modificar cotizaciones | `/interno/cotizaciones` |
| RF6 Pagos o reservas | `/pago` |
| RF7 Actualizar stock | `/interno/inventario` |
| RF8 Órdenes de retiro o despacho | `/interno/despachos` |
| RF9 Administrar productos, categorías, marcas, proveedores, usuarios y clientes | `/interno/productos`, `/interno/categorias`, `/interno/proveedores`, `/interno/usuarios` |
| RF10 Reportes | `/interno/reportes` |
| RF11 Comprobantes y notificaciones | `/mi-cuenta` |
| RF12 Auditoría | `/interno/auditoria` |

## Qué funciona y qué es simulado

Funciona de verdad (guardado en el navegador): registro e inicio de sesión,
permisos por perfil, filtros del catálogo, carrito, pedidos con descuento de
stock, pago o reserva, cotizaciones y su gestión, inventario, despachos,
administración de productos, categorías, marcas, proveedores y usuarios,
reportes calculados y auditoría automática.

Es simulado: el pago (no hay pasarela ni se piden datos de tarjeta), el envío
de correos (las notificaciones solo se ven en "Mi cuenta") y la seguridad
(las contraseñas se guardan sin cifrar en el navegador; no usar claves reales).

## Imágenes

Las fotografías son de Wikimedia Commons. Autores y licencias en `/creditos`
(`src/data/creditos.js`).
