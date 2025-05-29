import { useState } from "react";
import PaymentButton from "../PaymentButton/PaymentButton";
import styles from "./styles.module.css";

const PaymentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTimeout(() => {
        const mockSuccess = Math.random() > 0.5;
        if (mockSuccess) {
          alert("Payment successful!");
        } else {
          alert("An error occurred");
        }
      }, 120);
    }, 3000);
  };

  return (
    <form className={styles.form}>
      <PaymentButton isProcessing={isProcessing} onClick={handleSubmit}>
        {"Start Trial"}
      </PaymentButton>
    </form>
  );
};

export default PaymentForm;
