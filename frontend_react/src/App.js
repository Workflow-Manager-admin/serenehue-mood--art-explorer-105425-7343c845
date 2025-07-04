import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ColorMoodExplorerPage from "./pages/ColorMoodExplorer";

const COLORS = {
  primary: '#abd3df',
  secondary: '#fcf6f5',
  accent: '#e7a7c1'
};

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
   * Main app SPA: routes: "/", "/explore" (no auth, no sign-in)
   * /
   */
  return (
    <Router>
      <div className="App" style={{ background: "var(--bg-secondary)" }}>
        <AppNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ColorMoodExplorerPage />} />
          {/* fallback route: redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
