import PaymentForm from "../PaymentForm/PaymentForm";
import styles from "./styles.module.css";
import ApplePayLogoUrl from "../../assets/ApplePayLogo.svg";
import PaymentButton from "../PaymentButton/PaymentButton";
import { useState } from "react";
import Popup from "../Popup/Popup";
import { useTranslation } from "react-i18next";

const PaymentPage = () => {
  const { t } = useTranslation();

  const [applePayProcessing, setApplePayProcessing] = useState(false);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);

  const handleApplePayClick = (e: React.FormEvent) => {
    e.preventDefault();

    setApplePayProcessing(true);
    setTimeout(() => {
      setApplePayProcessing(false);
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
    <div className={styles.paymentPageContainer}>
      <div className={styles.paymentPageFirst}>
        <div className={styles.paymentActionContainer}>
          <div className={styles.paymentHeaders}>
            <h1 className={styles.pageTitle}>{t("checkout")}</h1>
            <div className={styles.priceInfo}>
              <p className={styles.priceMain}>{t("trial_offer")}</p>
              <p className={styles.priceSecondary}>{t("subscription_price")}</p>
            </div>
          </div>
          <PaymentButton
            isProcessing={applePayProcessing}
            onClick={handleApplePayClick}
            style={{ backgroundColor: "#000", borderRadius: "3px" }}
          >
            <img src={ApplePayLogoUrl} alt="Apple Pay" />
          </PaymentButton>
          <PaymentForm />
        </div>

        <p className={styles.legalInfo}>
          {t("plan_description_1")}{" "}
          <strong>{t("plan_description_strong_1")}</strong>.{" "}
          {t("plan_description_2")}{" "}
          <strong>{t("plan_description_strong_2")}</strong>{" "}
          {t("plan_description_3")}
        </p>
      </div>

      <div className={styles.orderInfo}>
        <h2 className={styles.orderTitle}>{t("order_info_limit")}</h2>
        <p className={styles.orderDescription}>{t("description_limit")}</p>

        <hr className={styles.hr} />

        <div className={styles.item}>
          <p className={styles.itemTitle}>{t("product_name")}</p>
          <p className={styles.itemSubtitle}>{t("product_description")}</p>
        </div>

        <hr className={styles.hr} />

        <div className={styles.orderPrice}>
          <p className={styles.orderPriceMain}>{t("trial_offer")}</p>
          <p className={styles.orderPriceSecondary}>
            {t("subscription_price")}
          </p>
        </div>
      </div>

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

export default PaymentPage;
