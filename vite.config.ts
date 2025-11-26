import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Get API Key from Vercel System Env (process.env) or .env file (env)
  const apiKey = process.env.API_KEY || env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // Create a bridge: Inject the server-side API_KEY into the client-side VITE_API_KEY
      'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey),
      // Fallback for older code style
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});