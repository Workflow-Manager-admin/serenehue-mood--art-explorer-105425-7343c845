import React, { useState } from "react";

// PUBLIC_INTERFACE
function SignIn() {
  /**
   * Minimal Sign In page: username/email and password fields
   */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Dummy demo of login (no backend yet)
    if (!email || !password) {
      setMsg("Please enter both fields.");
      return;
    }
    setMsg("Sign-in feature coming soon. Stay tuned!");
  }

  return (
    <div style={{
      maxWidth: "400px",
      margin: "3.5rem auto 0",
      background: "var(--info-card-bg)",
      borderRadius: "22px",
      padding: "36px 24px 32px 24px",
      boxShadow: "0 4px 32px 0 rgba(231,167,193,0.13)",
      textAlign: "center"
    }}>
      <h2 style={{color: "var(--app-primary)", marginTop: 0, marginBottom: "16px", fontWeight: 700}}>Sign In</h2>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <input
          type="email"
          value={email}
          autoComplete="username"
          placeholder="Email"
          style={{
            margin: "8px 0 18px 0",
            fontSize: "1.06em",
            background: "#f6fafe",
            borderRadius: "12px",
            padding: "11px 16px",
            border: "2px solid var(--app-primary)",
            width: "90%"
          }}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          autoComplete="current-password"
          placeholder="Password"
          style={{
            margin: "8px 0 22px 0",
            fontSize: "1.06em",
            background: "#f6fafe",
            borderRadius: "12px",
            padding: "11px 16px",
            border: "2px solid var(--app-primary)",
            width: "90%"
          }}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-accent" style={{width: "100%", margin: "8px 0"}}>
          Sign In
        </button>
      </form>
      {msg && <div style={{marginTop: "20px", color: "var(--app-accent)", fontWeight: 500, fontSize: "1em"}}>{msg}</div>}
      <div style={{marginTop: "32px", fontSize: "0.96em", color: "var(--text-secondary)"}}>
        No account? Moodboard sharing works without registration.
      </div>
    </div>
  );
}

export default SignIn;
