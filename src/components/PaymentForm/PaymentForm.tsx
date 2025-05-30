import { useState } from "react";
import PaymentButton from "../PaymentButton/PaymentButton";
import styles from "./styles.module.css";
import InfoUrl from "../../assets/Info.svg";
import Popup from "../Popup/Popup";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const validators = {
    cardNumber: useValidator<string>((val) =>
      val.length === 16 + 3 ? "" : t("card_number_error")
    ),
    expirationDate: useValidator<string>((val) => {
      const MMandYY = val.split("/").map((v) => parseInt(v, 10));
      if (MMandYY.length !== 2) return t("expiration_format_error");
      if (MMandYY[0] > 12 || MMandYY[0] < 1) return t("month_range_error");
      if (MMandYY[1] < 25) return t("expiration_expired_error");
      return "";
    }),
    cvc: useValidator<string>((val) =>
      val.length === 3 ? "" : t("cvc_error")
    ),
  };

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
        message: t("invalid_data_error"),
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
          message: success ? t("payment_successful") : t("payment_failed"),
          type: success ? "success" : "error",
        });
      }, 120);
    }, 1200);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.divider}>
          <hr className={styles.hr} />
          <span className={styles.dividerText}>{t("pay_with_card")}</span>
          <hr className={styles.hr} />
        </div>
        <div className={styles.records}>
          <div className={styles.record}>
            <label className={styles.label}>{t("card_number")}</label>
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
              <label className={styles.label}>{t("expiration_date")}</label>
              <input
                type="text"
                onChange={handleExpirationDateChange}
                className={`${styles.input} ${
                  validators.expirationDate.getErrorMessage()
                    ? styles.invalid
                    : ""
                }`}
                placeholder={t("mm_yy")}
                value={expirationDate}
              />
              {validators.expirationDate.getErrorMessage() && (
                <span className={styles.error}>
                  {validators.expirationDate.getErrorMessage()}
                </span>
              )}
            </div>

            <div className={styles.record}>
              <label className={styles.label}>{t("cvc")}</label>
              <div className={styles.inputWithIcon}>
                <input
                  type="password"
                  onChange={handleCvcChange}
                  className={`${styles.input} ${
                    validators.cvc.getErrorMessage() ? styles.invalid : ""
                  }`}
                  placeholder={t("cvc_placeholder")}
                  value={cvc}
                />
                <img
                  src={InfoUrl}
                  className={styles.infoIcon}
                  alt={t("cvc_info_alt")}
                  title={t("cvc_info_title")}
                />
              </div>
              {validators.cvc.getErrorMessage() && (
                <span className={styles.error}>
                  {validators.cvc.getErrorMessage()}
                </span>
              )}
            </div>
          </div>
        </div>
        <PaymentButton isProcessing={isProcessing} onClick={handleSubmit}>
          {t("start_trial")}
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
