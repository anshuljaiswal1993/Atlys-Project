import { useEffect } from "react";
import styles from "./Snackbar.module.css";

interface SnackbarProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Snackbar({ message, onClose, duration = 3000 }: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={styles.snackbar}>
      {message}
    </div>
  );
}
