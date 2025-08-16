import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testUsers } from "../../data/users";
import styles from "./SignIn.module.css";


interface SignInProps {
  setIsAuthenticated: (auth: boolean) => void;
}

function SignIn({ setIsAuthenticated }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = testUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError("Invalid credentials");
      return;
    }
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
