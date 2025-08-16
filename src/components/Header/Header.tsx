import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

function Header({ isAuthenticated, setIsAuthenticated }: HeaderProps) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Mini Feed</h1>
      <nav className={styles.nav}>
        {isAuthenticated ? (
          <button className={styles.signoutBtn} onClick={handleSignOut}>Sign Out</button>
        ) : (
          <>
            <Link className={styles.link} to="/signin">Sign In</Link>
            <Link className={styles.link} to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
