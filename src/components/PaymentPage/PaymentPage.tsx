import PaymentForm from "../PaymentForm/PaymentForm";
import styles from "./styles.module.css";

const PaymentPage = () => {
  return (
    <div className={styles.paymentPageContainer}>
      <PaymentForm />
    </div>
  );
};

export default PaymentPage;
