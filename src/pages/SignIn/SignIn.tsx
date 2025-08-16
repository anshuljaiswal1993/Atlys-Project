import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./SignIn.module.css";

interface SignInProps {
  setIsAuthenticated: (auth: boolean) => void;
}

function SignIn({ setIsAuthenticated }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // fake login
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
        <Link to="/signup" className={styles.link}>
          Don’t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
