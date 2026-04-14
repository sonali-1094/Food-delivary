import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Placeorder from './pages/Placeorder';
import Footer from './components/Footer';
import MoodChatbot from './components/MoodChatbot';
import './pages/AuthShell.css';

const RequireSignIn = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;
  return children;
};

const AuthPageOnly = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (isSignedIn) return <Navigate to="/" replace />;
  return children;
};

const AuthShell = ({ title, children }) => (
  <section className="auth-shell">
    <div className="auth-shell__card">
      <p className="auth-shell__eyebrow">Welcome</p>
      <h2>{title}</h2>
      {children}
      <Link to="/" className="auth-shell__link">Back to Home</Link>
    </div>
  </section>
);

const App = () => {
  return (
    <>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<RequireSignIn><Cart /></RequireSignIn>} />
        <Route path='/order' element={<RequireSignIn><Placeorder /></RequireSignIn>} />
        <Route
          path='/sign-in/*'
          element={
            <AuthPageOnly>
              <AuthShell title="Sign in to continue">
                <SignIn routing='path' path='/sign-in' signUpUrl='/sign-up' />
              </AuthShell>
            </AuthPageOnly>
          }
        />
        <Route
          path='/sign-up/*'
          element={
            <AuthPageOnly>
              <AuthShell title="Create your account">
                <SignUp routing='path' path='/sign-up' signInUrl='/sign-in' />
              </AuthShell>
            </AuthPageOnly>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
    <MoodChatbot />
    <Footer />
    </>
    
    
  );
};

export default App;
