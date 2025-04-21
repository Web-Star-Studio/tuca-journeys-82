
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Content-Security-Policy": [
        "default-src 'self'",
        // Add 'unsafe-inline' and 'unsafe-eval' for development mode
        mode === 'development' 
          ? "script-src 'self' https://cdn.gpteng.co 'unsafe-inline' 'unsafe-eval'" 
          : "script-src 'self' https://cdn.gpteng.co",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https://api.mapbox.com https://*.tiles.mapbox.com https://res.cloudinary.com",
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.mapbox.com",
      ].join("; "),
    },
  },
  plugins: [
    react({
      // Explicitly configure fast refresh for development
      fastRefresh: mode === 'development',
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mapbox: ['mapbox-gl'],
        },
      },
    },
  },
}));
