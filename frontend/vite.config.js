import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
  port: 5173
}
})


