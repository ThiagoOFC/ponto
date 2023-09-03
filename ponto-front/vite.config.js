import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Isso faz o servidor ouvir em todas as interfaces
    port: 5173, // Porta do projeto Vite
  },
})
