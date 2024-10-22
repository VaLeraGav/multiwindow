import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: 'localhost',
        port: 3000,
        https: false,
        cors: true,
        watch: {
            usePolling: true
        }
    },
});
