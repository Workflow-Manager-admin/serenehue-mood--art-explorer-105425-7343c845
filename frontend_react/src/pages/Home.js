import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function Home() {
  /**
   * Home page: Project intro, main CTA, and navigation
   * Adds a prominent Sign In button linking to /signin.
   */
  return (
    <div
      style={{
        maxWidth: "460px",
        margin: "3rem auto 0",
        background: "var(--info-card-bg)",
        borderRadius: "22px",
        padding: "40px 28px",
        boxShadow: "0 4px 32px 0 rgba(173,211,223,0.16)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "var(--app-primary)",
          fontWeight: 700,
          fontSize: "2.25rem",
          marginBottom: "16px",
        }}
      >
        🎨 Color Mood Explorer
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1.15rem",
          marginBottom: "32px",
        }}
      >
        Discover the moods, music, art, and meaning behind every color.<br /> Enter your mood through color or explore the{" "}
        <span style={{ color: "var(--app-accent)" }}>color of the day</span>.
      </p>
      {/* Client-side routing to /explore (no sign-in required) */}
      <Link to="/explore" className="btn btn-accent" style={{ display: "inline-block", margin: "10px" }}>
        Explore Colors
      </Link>
      {/* Prominent Sign In button */}
      <Link to="/signin" className="btn" style={{
        display: "inline-block",
        margin: "10px",
        background: "var(--button-bg)",
        color: "var(--button-text)",
        border: "2px solid var(--app-accent)",
        fontWeight: 600
      }}>
        Sign In
      </Link>
      <div style={{ marginTop: "40px", fontSize: "0.97em", color: "var(--text-secondary)" }}>
        <em>Peaceful, introspective, and artistic journeys for everyone.</em>
      </div>
    </div>
  );
}

export default Home;
