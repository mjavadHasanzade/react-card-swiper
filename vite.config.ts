import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/lib/index.ts'),
      name: 'React Card Swiper',
      fileName: 'react-card-swiper',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        intro: 'require("./style.css");',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    minify: true,
    emptyOutDir: true,
    outDir: 'dist',
  },
  plugins: [react(), dts()],
})
