import { useState } from "react";
import { testUsers } from "../../data/users";

interface AuthModalProps {
  onClose: () => void;
  setIsAuthenticated: (auth: boolean) => void;
}

function AuthModal({ onClose, setIsAuthenticated }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signin") {
      const user = testUsers.find((u) => u.email === email && u.password === password);
      if (!user) {
        setError("Invalid credentials");
        return;
      }
      setIsAuthenticated(true);
      onClose();
    } else {
      const exists = testUsers.find((u) => u.email === email);
      if (exists) {
        setError("User already exists");
        return;
      }
      testUsers.push({ email, password });
      setIsAuthenticated(true);
      onClose();
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)" }}>
      <div style={{ background: "#fff", padding: "1rem", maxWidth: "400px", margin: "10% auto" }}>
        <h2>{mode === "signin" ? "Sign In" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">{mode === "signin" ? "Sign In" : "Sign Up"}</button>
        </form>
        <p>
          {mode === "signin" ? (
            <>
              Don’t have an account?{" "}
              <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setMode("signup")}>
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setMode("signin")}>
                Sign In
              </span>
            </>
          )}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AuthModal;
