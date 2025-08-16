import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import styles from "./AuthModal.module.css";

type Props = { onClose: () => void };

export default function AuthModal({ onClose }: Props) {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // pretend success
    login();
    onClose();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={submit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
          />
          <button type="submit">{isSignUp ? "Create Account" : "Sign In"}</button>
        </form>
        <p className={styles.switch}>
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span onClick={() => setIsSignUp((v) => !v)}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
