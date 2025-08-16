import { useState } from "react";
import { testUsers } from "../../data/users";
import styles from "./AuthModal.module.css";

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
    <div className={styles.overlay}>
      <div className={styles.modal}>
         <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h2>{mode === "signin" ? "Sign In" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.button} type="submit">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className={styles.switch}>
          {mode === "signin" ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setMode("signup")}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("signin")}>Sign In</span>
            </>
          )}
        </p>
       
      </div>
    </div>
  );
}

export default AuthModal;
