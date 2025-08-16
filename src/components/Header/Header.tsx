import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/"); // back to Feed (locked again)
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Mini Feed App</h1>
      <nav className={styles.nav}>
        {isAuthenticated ? (
          <button onClick={handleSignOut} className={styles.signoutBtn}>Sign Out</button>
        ) : (
          <>
            <Link to="/signin" className={styles.link}>Sign In</Link>
            <Link to="/signup" className={styles.link}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
