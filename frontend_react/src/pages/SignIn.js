import React, { useState, useRef } from "react";

// Simple email format regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * PUBLIC_INTERFACE
 * SignIn page with ability to accept onSignIn callback, used by App for routing after authentication.
 * If onSignIn is provided and sign-in succeeds, calls it; else, sets own success state as before.
 */
function SignIn({ onSignIn }) {
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState("idle"); // idle | submitting | success | error
  const [msg, setMsg] = useState("");
  const emailRef = useRef(null);
  const pwRef = useRef(null);

  function validateFields() {
    let valid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
      emailRef.current && emailRef.current.focus();
    } else if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Enter a valid email address");
      valid = false;
      emailRef.current && emailRef.current.focus();
    } else {
      setEmailError("");
    }
    if (!password) {
      setPwError("Password is required");
      if (valid && pwRef.current) pwRef.current.focus();
      valid = false;
    } else if (password.length < 4) {
      setPwError("Password must be at least 4 characters");
      if (valid && pwRef.current) pwRef.current.focus();
      valid = false;
    } else {
      setPwError("");
    }
    return valid;
  }

  function mockAuthenticate(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === "demo123") {
          resolve({ status: "success", user: { email } });
        } else {
          reject({ status: "fail", message: "Invalid credentials (hint: try password 'demo123')" });
        }
      }, 1200);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setFormState("idle");
    setLoading(false);
    setPwError(""); setEmailError("");

    if (!validateFields()) {
      setFormState("error");
      setMsg("");
      return;
    }

    setLoading(true);
    setFormState("submitting");
    try {
      await mockAuthenticate(email, password);
      setFormState("success");
      setMsg("Welcome! You signed in successfully. (This is a demo.)");
      // Call onSignIn after "auth", if supplied
      if (typeof onSignIn === "function") {
        setTimeout(onSignIn, 400); // slight delay for UX, can remove if instant preferred
      }
    } catch (err) {
      setFormState("error");
      setMsg(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  // Accessibility: show aria-live feedback on msg, and per-error aria-describedby
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "3.5rem auto 0",
        background: "var(--info-card-bg)",
        borderRadius: "22px",
        padding: "36px 24px 32px 24px",
        boxShadow: "0 4px 32px 0 rgba(231,167,193,0.13)",
        textAlign: "center"
      }}
      aria-label="Sign In Form Section"
    >
      <h2 style={{
        color: "var(--app-primary)",
        marginTop: 0,
        marginBottom: "16px",
        fontWeight: 700
      }}>
        Sign In
      </h2>
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        aria-describedby="signin-desc"
      >
        <input
          ref={emailRef}
          type="email"
          value={email}
          autoComplete="username"
          placeholder="Email"
          style={{
            margin: "8px 0 6px 0",
            fontSize: "1.06em",
            background: "#f6fafe",
            borderRadius: "12px",
            padding: "11px 16px",
            border: `2px solid ${emailError ? "var(--app-accent)" : "var(--app-primary)"}`,
            width: "90%",
            outline: emailError ? "2.5px solid var(--app-accent)" : "none",
            boxShadow: emailError ? "0 2px 10px 0 rgba(231,167,193,0.09)" : "none",
            transition: "border .19s"
          }}
          aria-label="Email address"
          aria-required="true"
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "email-err" : undefined}
          onChange={e => { setEmail(e.target.value); setEmailError(""); }}
          disabled={loading}
        />
        {emailError && (
          <div id="email-err" role="alert" style={{
            color: "var(--app-accent)",
            marginBottom: 4,
            fontSize: ".98em"
          }}>
            {emailError}
          </div>
        )}
        <input
          ref={pwRef}
          type="password"
          value={password}
          autoComplete="current-password"
          placeholder="Password"
          style={{
            margin: "8px 0 6px 0",
            fontSize: "1.06em",
            background: "#f6fafe",
            borderRadius: "12px",
            padding: "11px 16px",
            border: `2px solid ${pwError ? "var(--app-accent)" : "var(--app-primary)"}`,
            width: "90%",
            outline: pwError ? "2.5px solid var(--app-accent)" : "none",
            boxShadow: pwError ? "0 2px 10px 0 rgba(231,167,193,0.09)" : "none",
            transition: "border .19s"
          }}
          aria-label="Password"
          aria-required="true"
          aria-invalid={!!pwError}
          aria-describedby={pwError ? "pw-err" : undefined}
          onChange={e => { setPassword(e.target.value); setPwError(""); }}
          disabled={loading}
        />
        {pwError && (
          <div id="pw-err" role="alert" style={{
            color: "var(--app-accent)",
            marginBottom: 5,
            fontSize: ".98em"
          }}>
            {pwError}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-accent"
          style={{
            width: "100%",
            margin: "10px 0 2px 0",
            letterSpacing: ".01em",
            fontSize: "1.11em",
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
            pointerEvents: loading ? "none" : "auto"
          }}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      {/* General user feedback (aria-live for accessibility) */}
      <div
        style={{
          marginTop: "19px",
          minHeight: "29px",
          color:
            formState === "success"
              ? "var(--app-primary)"
              : formState === "error"
              ? "var(--app-accent)"
              : "var(--text-secondary)",
          fontWeight: 500,
          fontSize: "1.02em",
          letterSpacing: ".006em"
        }}
        aria-live="assertive"
      >
        {msg && (
          <span>
            {msg}
          </span>
        )}
      </div>
      {formState === "success" && (
        <div
          style={{
            marginTop: "24px",
            color: "var(--app-primary)",
            background: "rgba(171,211,223,0.11)",
            borderRadius: "12px",
            padding: "12px",
            fontSize: ".99em",
            boxShadow: "0 1px 4px 0 rgba(173,211,223,0.04)"
          }}
          role="status"
          aria-live="polite"
        >
          💡 Sign-in is not wired to any real backend.
        </div>
      )}
      <div style={{
        marginTop: "32px",
        fontSize: "0.96em",
        color: "var(--text-secondary)"
      }}
      id="signin-desc"
      >
        No account? Moodboard sharing works without registration.<br />
        <span style={{ fontSize: ".96em", color: "var(--app-accent)" }}>
          Hint for demo: password is <strong>demo123</strong>
        </span>
      </div>
    </div>
  );
}

export default SignIn;
