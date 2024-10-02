import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Define un alias para evitar el uso de "../" y resolver conflictos de rutas
      '@controller': path.resolve(__dirname, './src/js/controller')
    }
  },
  server: {
    // Configuración del servidor (puedes ajustar el puerto si es necesario)
    port: 3000,
    open: true,
  }
});