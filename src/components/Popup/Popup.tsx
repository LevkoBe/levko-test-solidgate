import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type PopupProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
};

const Popup = ({ message, type = "info", onClose }: PopupProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`${styles.popup} ${styles[type]} ${
        visible ? styles.slideDown : styles.slideUp
      }`}
    >
      <span>{message}</span>
      <button className={styles.close} onClick={() => setVisible(false)}>
        ×
      </button>
    </div>
  );
};

export default Popup;
