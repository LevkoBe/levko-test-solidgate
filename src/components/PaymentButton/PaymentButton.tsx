import styles from "./styles.module.css";
import React from "react";
import LoaderUrl from "../../assets/Loader.svg";

type PaymentButtonProps = {
  children: React.ReactNode;
  isProcessing: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaymentButton: React.FC<PaymentButtonProps> = ({
  children,
  isProcessing,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${isProcessing ? styles.processing : ""}`}
    >
      <span className={styles.mainText}>{children}</span>
      <span className={styles.processingText}>
        <img
          src={LoaderUrl}
          alt="Processing payment"
          className={styles.spinner}
        />
        {"Processing payment"}
      </span>
    </button>
  );
};

export default PaymentButton;
