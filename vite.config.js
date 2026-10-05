import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Sin plugins de PostCSS: Tailwind ya se carga con su plugin de Vite.
  css: { postcss: { plugins: [] } },
  server: { port: 5174 },
})
