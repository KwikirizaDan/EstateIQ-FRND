import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css';
import App from './App.jsx';
import { createHead, UnheadProvider } from '@unhead/react';

const head = createHead();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <App />
    </UnheadProvider>
  </StrictMode>,
);