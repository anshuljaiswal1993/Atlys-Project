import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./SignUp.module.css";

interface SignUpProps {
  setIsAuthenticated: (auth: boolean) => void;
}

function SignUp({ setIsAuthenticated }: SignUpProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // fake sign up
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Sign Up</h2>
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
            Sign Up
          </button>
        </form>
        <Link to="/signin" className={styles.link}>
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
