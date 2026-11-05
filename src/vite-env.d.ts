/// <reference types="vite/client" />

// Only browser-safe values may use the VITE_ prefix. See .env.example.
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
