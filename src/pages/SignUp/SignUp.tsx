import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testUsers } from "../../data/users";

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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
