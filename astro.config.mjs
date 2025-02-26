// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://superiordeluxe.com",
  output: "static", // Cambiado a static para simplificar el despliegue
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    react(),
  ],
  // Configuración de imágenes - works with Cloudflare Pages
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp' // Will work for build-time processing
    },
    // Permitir imágenes remotas
    domains: ['source.unsplash.com'],
  },
  // Configuración de compilación
  build: {
    inlineStylesheets: 'auto',
  },
  // Configuración de servidor de desarrollo
  server: {
    port: 3000,
    host: true,
  },
});
