import { useState } from "react";
import PaymentButton from "../PaymentButton/PaymentButton";
import styles from "./styles.module.css";
import InfoUrl from "../../assets/Info.svg";
import Popup from "../Popup/Popup";

const useValidator = <T,>(validationFn: (newValue: T) => string) => {
  const [errorMessage, setErrorMessage] = useState("");
  return {
    update: (newValue: T) => {
      setErrorMessage(validationFn(newValue));
    },
    getErrorMessage: () => errorMessage,
  };
};

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const validators = {
    cardNumber: useValidator<string>((val) =>
      val.length === 16 + 3 ? "" : "Card number should have 16 digits"
    ),
    expirationDate: useValidator<string>((val) => {
      const MMandYY = val.split("/").map((v) => parseInt(v, 10));
      if (MMandYY.length !== 2) return "Expiration date should have 4 digits";
      if (MMandYY[0] > 12 || MMandYY[0] < 1)
        return "Month must be between 1 and 12";
      if (MMandYY[1] < 25) return "Expiration date expired";
      return "";
    }),
    cvc: useValidator<string>((val) =>
      val.length === 3 ? "" : "CVC should have 3 digits"
    ),
  };
  const [isProcessing, setIsProcessing] = useState(false);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
    setCardNumber(formattedValue);
    validators.cardNumber.update(formattedValue);
  };

  const handleExpirationDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formattedValue =
      raw.length >= 3 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw;

    setExpirationDate(formattedValue);
    validators.expirationDate.update(formattedValue);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvc(formattedValue);
    validators.cvc.update(formattedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      validators.cardNumber.getErrorMessage() ||
      validators.expirationDate.getErrorMessage() ||
      validators.cvc.getErrorMessage() ||
      !cardNumber ||
      !expirationDate ||
      !cvc
    ) {
      setPopup({
        message: "Please, enter valid data",
        type: "error",
      });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const success = Math.random() > 0.5;
      setTimeout(() => {
        setPopup({
          message: success
            ? "Payment successful!"
            : "Payment failed. Try again or use another card.",
          type: success ? "success" : "error",
        });
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
              validators.cardNumber.getErrorMessage() ? styles.invalid : ""
            }`}
            placeholder="1234 1234 1234 1234"
            value={cardNumber}
          />
          {validators.cardNumber.getErrorMessage() && (
            <span className={styles.error}>
              {validators.cardNumber.getErrorMessage()}
            </span>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.record}>
            <label className={styles.label}>Expiration Date</label>
            <input
              type="text"
              onChange={handleExpirationDateChange}
              className={`${styles.input} ${
                validators.expirationDate.getErrorMessage()
                  ? styles.invalid
                  : ""
              }`}
              placeholder="MM/YY"
              value={expirationDate}
            />
            {validators.expirationDate.getErrorMessage() && (
              <span className={styles.error}>
                {validators.expirationDate.getErrorMessage()}
              </span>
            )}
          </div>

          <div className={styles.record}>
            <label className={styles.label}>CVC</label>
            <div className={styles.inputWithIcon}>
              <input
                type="password"
                onChange={handleCvcChange}
                className={`${styles.input} ${
                  validators.cvc.getErrorMessage() ? styles.invalid : ""
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

            {validators.cvc.getErrorMessage() && (
              <span className={styles.error}>
                {validators.cvc.getErrorMessage()}
              </span>
            )}
          </div>
        </div>
        <PaymentButton isProcessing={isProcessing} onClick={handleSubmit}>
          {"Start Trial"}
        </PaymentButton>
      </form>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
};

export default PaymentForm;
