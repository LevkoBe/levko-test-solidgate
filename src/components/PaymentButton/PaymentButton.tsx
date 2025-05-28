import styles from "./styles.module.css";
import React from "react";

interface PaymentButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <button {...props} className={styles.button}>
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default PaymentButton;
