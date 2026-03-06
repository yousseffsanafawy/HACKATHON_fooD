import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Disable framer-motion temporarily to fix crash
// Mock motion to prevent errors
window.motion = {
  div: 'div',
  span: 'span',
  button: 'button',
  AnimatePresence: ({ children }) => children,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
