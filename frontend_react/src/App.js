import React, { useState, useEffect, useCallback } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ColorMoodExplorerPage from "./pages/ColorMoodExplorer";

const COLORS = {
  primary: '#abd3df',
  secondary: '#fcf6f5',
  accent: '#e7a7c1'
};

// Key for session storage and context value
const AUTH_KEY = "cmx_signed_in";

// Simple AuthContext for child components to access login state and set it
const AuthContext = React.createContext({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
});

function AppNav() {
  // Use window.location for nav highlight (simple/static)
  const location = window.location.pathname;
  return (
    <nav className="app-nav">
      <span className="nav-title" style={{marginRight: "2rem"}}>🎨 Color Mood Explorer</span>
      <Link to="/" className="btn" style={{
        background: location === "/" ? "var(--app-accent)" : "var(--button-bg)",
        color: location === "/" ? "#fff" : "var(--button-text)",
        marginLeft: 0,
        marginRight: "10px"
      }}>Home</Link>
      <Link to="/explore" className="btn" style={{
        background: location === "/explore" ? "var(--app-accent)" : "var(--button-bg)",
        color: location === "/explore" ? "#fff" : "var(--button-text)",
        marginRight: "10px"
      }}>Explore</Link>
      {/* Sign In button removed for seamless, distraction-free experience */}
    </nav>
  );
}

function AppFooter() {
  return (
    <footer className="app-footer">
      <span>Made with <span style={{color: COLORS.accent}}>♥</span> to bring color and calm to your world.</span>
    </footer>
  );
}

// Helper: get session from storage (mock; in real apps, context from backend)
function getSession() {
  return !!window.sessionStorage.getItem(AUTH_KEY);
}

// Contexted SignIn page: handles redirect on success.
function SignInWithRedirect() {
  const { isSignedIn, signIn } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // If already signed in, go to explorer!
  useEffect(() => {
    if (isSignedIn) {
      // If redirectTo param specified, go there; else, /explore
      const params = new URLSearchParams(location.search);
      const dest = params.get("redirectTo") || "/explore";
      navigate(dest, { replace: true });
    }
    // eslint-disable-next-line
  }, [isSignedIn, navigate]);

  // Pass signIn callback to component
  return <SignIn onSignIn={signIn} />;
}

// Gated route for /explore: redirects to Sign In if not "signed in"
function ProtectedRoute({ element: Component }) {
  const { isSignedIn } = React.useContext(AuthContext);
  const location = useLocation();

  // Already signed in, render component
  if (isSignedIn) {
    return <Component />;
  } else {
    // Redirect to sign in, preserve the path
    return (
      <Navigate
        to={`/signin?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
        state={{ from: location }}
      />
    );
  }
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main app SPA: routes: "/", "/signin", "/explore" (with fallback and auth gating)
   * Uses AuthContext for mock session; /explore is protected, /signin redirects if already signed in.
   */
  const [isSignedIn, setIsSignedIn] = useState(getSession());
  // Call to set session and trigger rerender
  const signIn = useCallback(() => {
    window.sessionStorage.setItem(AUTH_KEY, "1");
    setIsSignedIn(true);
  }, []);
  const signOut = useCallback(() => {
    window.sessionStorage.removeItem(AUTH_KEY);
    setIsSignedIn(false);
  }, []);

  // sessionStorage->state sync on first mount (in case tab was reloaded)
  useEffect(() => {
    setIsSignedIn(getSession());
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      <Router>
        <div className="App" style={{ background: "var(--bg-secondary)" }}>
          <AppNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInWithRedirect />} />
            <Route path="/explore" element={<ProtectedRoute element={ColorMoodExplorerPage} />} />
            {/* fallback route: redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <AppFooter />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
