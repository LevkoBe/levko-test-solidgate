import PaymentButton from "../PaymentButton/PaymentButton";
import styles from "./styles.module.css";

const PaymentForm = () => {
  return (
    <form className={styles.form}>
      <PaymentButton isLoading={false}>{"Start Trial"}</PaymentButton>
    </form>
  );
};

export default PaymentForm;
