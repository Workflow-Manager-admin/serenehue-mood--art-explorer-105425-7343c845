import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * SignIn page/component for user authentication (demo only).
 * Contains basic email and password fields with no actual auth logic.
 * Accessible at route /signin via routing.
 */
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setStatus("Please enter both email and password.");
    } else {
      // Demo (no actual auth logic)
      setStatus("Signed in (demo — no real authentication).");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 650);
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "3rem auto 0",
        background: "var(--info-card-bg)",
        borderRadius: "22px",
        padding: "40px 28px",
        boxShadow: "0 4px 32px 0 rgba(173,211,223,0.13)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "var(--app-primary)",
          fontWeight: 700,
          fontSize: "2rem",
          marginBottom: "16px",
        }}
      >
        Sign In
      </h1>
      <form style={{ display: "flex", flexDirection: "column", gap: 18 }} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email address"
          style={{
            padding: "9px 12px",
            fontSize: "1.07em",
            borderRadius: "10px",
            border: "2.5px solid var(--app-primary)",
            marginBottom: 2,
          }}
          onChange={e => setEmail(e.target.value)}
          autoFocus
          aria-label="Email"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          style={{
            padding: "9px 12px",
            fontSize: "1.07em",
            borderRadius: "10px",
            border: "2.5px solid var(--app-accent)",
            marginBottom: 4,
          }}
          onChange={e => setPassword(e.target.value)}
          aria-label="Password"
        />
        <button
          type="submit"
          className="btn btn-accent"
          style={{ marginTop: 5, fontSize: "1.13em", fontWeight: 600, width: "100%" }}
        >
          Sign In
        </button>
      </form>
      {status && <div style={{ marginTop: 18, color: "var(--app-accent)", minHeight: 24 }}>{status}</div>}
      <div style={{ marginTop: 36, fontSize: "0.98em", color: "var(--text-secondary)" }}>
        For demo purposes only.
      </div>
    </div>
  );
}

export default SignIn;
