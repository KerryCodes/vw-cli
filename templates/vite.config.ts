import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    // {
    //   babel: {
    //     plugins: [
    //       ["@babel/plugin-proposal-decorators", { legacy: true }],
    //       ["@babel/plugin-proposal-class-properties", { loose: true }],
    //     ],
    //   },
    // }
  )],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        // target: 'https://bire.vdvdvs1.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
