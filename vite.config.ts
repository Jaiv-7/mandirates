import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'mandi-api-mock',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.startsWith('/api/v1/mandi')) {
              try {
                const url = new URL(req.url, 'http://localhost:3000');
                if (url.searchParams.get('error') === 'true') {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Simulated API failure' }));
                  return;
                }

                const filePath = path.resolve(__dirname, 'src/data/marketPrices.json');
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const parsed = JSON.parse(fileContent);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  timestamp: new Date().toISOString(),
                  source: 'Vadodara APMC Live Data Feed',
                  isDemoData: true,
                  disclaimer: parsed.disclaimer,
                  disclaimerGu: parsed.disclaimerGu,
                  data: parsed.prices
                }));
                return;
              } catch (e: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: e.message }));
                return;
              }
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
