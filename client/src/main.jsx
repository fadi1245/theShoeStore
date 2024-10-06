import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './context/context.jsx'; // Use named import


document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter>
          <Context>
            <App />
          </Context>
        </BrowserRouter>
      </StrictMode>
    );
  } else {
    console.error('Element with id "root" not found');
  }
});
