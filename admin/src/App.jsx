import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const App = () => {
  return (
    <div className="admin-shell">
      <SignedOut>
        <section className="auth-panel">
          <p className="eyebrow">GharSeBite Admin</p>
          <h1>Sign in to manage food and orders</h1>
          <SignIn routing="hash" />
        </section>
      </SignedOut>

      <SignedIn>
        <header className="topbar">
          <a className="brand" href="/">
            <span>GharSe</span>Bite Admin
          </a>
          <UserButton afterSignOutUrl="/" />
        </header>
        <AdminDashboard />
      </SignedIn>
    </div>
  );
};

export default App;
