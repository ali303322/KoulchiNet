import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build', // Outputs React build to a separate folder
        emptyOutDir: true,
        base: '/KoulchiNet/',
    },
    server: {
        port: 3000, // React development server port
        // proxy: {
        //     '/api': 'http://back.koulchinet.com/', // Proxy Laravel API requests
        // },
    },
})
