import styles from "./styles.module.css";
import React from "react";
import LoaderUrl from "../../assets/Loader.svg";
import { useTranslation } from "react-i18next";

type PaymentButtonProps = {
  children: React.ReactNode;
  isProcessing: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaymentButton: React.FC<PaymentButtonProps> = ({
  children,
  isProcessing,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <button
      {...props}
      className={`${styles.button} ${isProcessing ? styles.processing : ""}`}
    >
      <span className={styles.mainText}>{children}</span>
      <span className={styles.processingText}>
        <img
          src={LoaderUrl}
          alt={t("processing_payment")}
          className={styles.spinner}
        />
        {t("processing_payment")}
      </span>
    </button>
  );
};

export default PaymentButton;
