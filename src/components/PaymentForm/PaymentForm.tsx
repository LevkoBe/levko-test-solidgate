import { useState } from "react";
import PaymentButton from "../PaymentButton/PaymentButton";
import styles from "./styles.module.css";
import InfoUrl from "../../assets/Info.svg";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
    setCardNumber(formattedValue);
    setErrors((prev) => ({
      ...prev,
      cardNumber:
        formattedValue.length === 16 + 3
          ? ""
          : "Card number should have 16 digits",
    }));
  };

  const handleExpirationDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formattedValue =
      raw.length >= 3 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw;

    setExpirationDate(formattedValue);

    let errorMessage = "";
    const MMandYY = formattedValue.split("/").map((v) => parseInt(v, 10));
    console.log(MMandYY);
    if (MMandYY.length !== 2) {
      errorMessage = "Expiration date should have 4 digits";
    } else if (MMandYY[0] > 12 || MMandYY[0] < 1) {
      errorMessage = "Month must be between 01 and 12";
    } else if (MMandYY[1] < 25) {
      errorMessage = "Expiration date expired";
    }
    setErrors((prev) => ({
      ...prev,
      expirationDate: errorMessage,
    }));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvc(formattedValue);
    setErrors((prev) => ({
      ...prev,
      cvc: formattedValue.length === 3 ? "" : "CVC should have 3 digits",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.cardNumber || errors.expirationDate || errors.cvc) {
      alert("An error occurred");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTimeout(() => {
        alert("Payment successful!");
      }, 120);
    }, 1200);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.record}>
          <label className={styles.label}>Card Number</label>
          <input
            type="text"
            onChange={handleCardNumberChange}
            className={`${styles.input} ${
              errors.cardNumber ? styles.invalid : ""
            }`}
            placeholder="1234 1234 1234 1234"
            value={cardNumber}
          />
          {errors.cardNumber && (
            <span className={styles.error}>{errors.cardNumber}</span>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.record}>
            <label className={styles.label}>Expiration Date</label>
            <input
              type="text"
              onChange={handleExpirationDateChange}
              className={`${styles.input} ${
                errors.cardNumber ? styles.invalid : ""
              }`}
              placeholder="MM/YY"
              value={expirationDate}
            />
            {errors.expirationDate && (
              <span className={styles.error}>{errors.expirationDate}</span>
            )}
          </div>

          <div className={styles.record}>
            <label className={styles.label}>CVC</label>
            <div className={styles.inputWithIcon}>
              <input
                type="password"
                onChange={handleCvcChange}
                className={`${styles.input} ${
                  errors.cvc ? styles.invalid : ""
                }`}
                placeholder="•••"
                value={cvc}
              />
              <img
                src={InfoUrl}
                className={styles.infoIcon}
                alt="CVC info"
                title="3 digits found on the back of your card"
              />
            </div>

            {errors.cvc && <span className={styles.error}>{errors.cvc}</span>}
          </div>
        </div>
        <PaymentButton isProcessing={isProcessing} onClick={handleSubmit}>
          {"Start Trial"}
        </PaymentButton>
      </form>
    </div>
  );
};

export default PaymentForm;
