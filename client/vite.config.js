import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  //to link frontend with express backend on 'http://localhost:3000'=>to automatically forward fetch req to backend
  server: {
    proxy: { 
      '/api': 'http://localhost:3000'
    }
  }
})
