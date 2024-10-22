import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: 'localhost', // Укажите хост
    port: 3000, // Укажите порт
    https: false, // Установите true для HTTPS
    cors: true, // Включить CORS
    watch: {
      usePolling: true
    }
  },
});