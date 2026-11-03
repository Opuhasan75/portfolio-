import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import portfolio from "./src/data/portfolio.json";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Fills the <title> and meta tags in index.html from portfolio.json
const portfolioMeta = () => ({
  name: "portfolio-meta",
  transformIndexHtml: (html: string) =>
    html
      .replace(/%SITE_TITLE%/g, escapeHtml(portfolio.site.title))
      .replace(/%SITE_DESCRIPTION%/g, escapeHtml(portfolio.site.description))
      .replace(/%SITE_THEME%/g, escapeHtml(portfolio.site.theme.backgroundColor)),
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), portfolioMeta()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', 'three-stdlib'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          'gsap': ['gsap'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'gsap', 'lenis']
  }
});
