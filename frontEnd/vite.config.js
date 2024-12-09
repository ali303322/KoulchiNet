import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../public', // Outputs React build to Laravel's public directory
        emptyOutDir: true,
        base : '/KoulshiNet/',
    },
    server: {
        port: 3000, // React development server port
        proxy: {
            '/api': 'http://127.0.0.1:8000', // Proxy Laravel API requests
        },
    },
})
