import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';
import StoreContextProvider from './context/StoreContextProvider';

const clerkPublishableKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_ZXRoaWNhbC1kb2ctNDkuY2xlcmsuYWNjb3VudHMuZGV2JA";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
