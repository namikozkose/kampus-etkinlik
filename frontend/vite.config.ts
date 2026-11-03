import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // CSS sıkıştırıcı --no: 2416501021 değerini 2416500000'e yuvarlıyor, renk bozuluyordu
  build: { cssMinify: false },
})
