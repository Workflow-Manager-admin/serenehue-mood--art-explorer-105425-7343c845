import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ColorMoodExplorerPage from "./pages/ColorMoodExplorer";

const COLORS = {
  primary: '#abd3df',
  secondary: '#fcf6f5',
  accent: '#e7a7c1'
};

function AppNav() {
  // Use a React hook for pathname in real app, but for simplicity use window.location for active button styles
  const path = window.location.pathname;
  return (
    <nav className="app-nav">
      <span className="nav-title" style={{marginRight: "2rem"}}>🎨 Color Mood Explorer</span>
      <Link to="/" className="btn" style={{
        background: path === "/" ? "var(--app-accent)" : "var(--button-bg)",
        color: path === "/" ? "#fff" : "var(--button-text)",
        marginLeft: 0,
        marginRight: "10px"
      }}>Home</Link>
      <Link to="/explore" className="btn" style={{
        background: path === "/explore" ? "var(--app-accent)" : "var(--button-bg)",
        color: path === "/explore" ? "#fff" : "var(--button-text)",
        marginRight: "10px"
      }}>Explore</Link>
      <Link to="/signin" className="btn" style={{
        background: path === "/signin" ? "var(--app-accent)" : "var(--button-bg)",
        color: path === "/signin" ? "#fff" : "var(--button-text)"
      }}>Sign In</Link>
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

// PUBLIC_INTERFACE
function App() {
  /**
   * Main app SPA: routes: "/", "/signin", "/explore" (with fallback)
   */
  return (
    <Router>
      <div className="App" style={{ background: "var(--bg-secondary)" }}>
        <AppNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/explore" element={<ColorMoodExplorerPage />} />
          {/* fallback route: redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
