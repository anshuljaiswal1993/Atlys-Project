import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testUsers } from "../../data/users";
import styles from "../SignIn/SignIn.module.css"; // ✅ reuse the same CSS

interface SignUpProps {
  setIsAuthenticated: (auth: boolean) => void;
}

function SignUp({ setIsAuthenticated }: SignUpProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exists = testUsers.find((u) => u.email === email);
    if (exists) {
      setError("User already exists");
      return;
    }
    testUsers.push({ email, password });
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </form>
        <a href="/signin" className={styles.link}>
          Already have an account? Sign In
        </a>
      </div>
    </div>
  );
}

export default SignUp;
