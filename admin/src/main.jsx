import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.jsx";
import "./styles.css";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));

if (!clerkPublishableKey) {
  root.render(
    <main className="setup-card">
      <h1>Admin setup needed</h1>
      <p>Add <strong>VITE_CLERK_PUBLISHABLE_KEY</strong> to the admin app environment before starting the admin panel.</p>
    </main>
  );
} else {
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </React.StrictMode>
  );
}
