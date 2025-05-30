import PaymentForm from "../PaymentForm/PaymentForm";
import styles from "./styles.module.css";
import ApplePayLogoUrl from "../../assets/ApplePayLogo.svg";
import PaymentButton from "../PaymentButton/PaymentButton";
import { useState } from "react";
import Popup from "../Popup/Popup";

const PaymentPage = () => {
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
          message: success
            ? "Payment successful!"
            : "Payment failed. Try again or use another card.",
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
            <h1 className={styles.pageTitle}>Checkout</h1>
            <div className={styles.priceInfo}>
              <p className={styles.priceMain}>5 days free</p>
              <p className={styles.priceSecondary}>
                then 299.99 UAH per 14 days
              </p>
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
          You'll have your <strong>Plan Pro during 1 year</strong>. After this
          period of time, your plan will be
          <strong> automatically renewed </strong>
          with its original price without any discounts applied.
        </p>
      </div>
      <div className={styles.orderInfo}>
        <h2 className={styles.orderTitle}>{"Order info <= 100 char."}</h2>
        <p className={styles.orderDescription}>{"Description <= 400 char."}</p>

        <hr className={styles.hr} />

        <div className={styles.item}>
          <p className={styles.itemTitle}>
            Lamel Professional Smart Skin Compact Powder
          </p>
          <p className={styles.itemSubtitle}>Пудра для лица</p>
        </div>

        <hr className={styles.hr} />

        <div className={styles.orderPrice}>
          <p className={styles.orderPriceMain}>5 days free</p>
          <p className={styles.orderPriceSecondary}>
            then 299.99 UAH per 14 days
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
