import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted variable fonts: no third-party requests, better privacy and speed.
import '@fontsource/young-serif'; // headings
import '@fontsource-variable/figtree'; // body
import '@fontsource/caveat'; // handwritten notes

import './styles/tokens.css';
import './styles/index.css';

import App from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root was not found in index.html');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
