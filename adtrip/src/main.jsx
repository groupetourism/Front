// main.tsx (or index.tsx, depending on your setup)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider }from "./context/AuthContext";

// Create the root and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Wrap App with UserProvider */}
      <App />
    </UserProvider>
  </StrictMode>,
);