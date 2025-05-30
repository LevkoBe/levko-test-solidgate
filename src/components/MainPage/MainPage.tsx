import PaymentPage from "../PaymentPage/PaymentPage";
import LanguageButtons from "../LanguageButtons/LanguageButtons";
import styles from "./styles.module.css";
import BackIconUrl from "../../assets/Back.svg";
import SolidLogoUrl from "../../assets/Solid.svg";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.mainPage}>
      <div className={styles.relative}>
        <LanguageButtons />

        <div className={styles.relative}>
          <button className={styles.backIcon}>
            <img src={BackIconUrl} alt={t("back")} />
          </button>
          <PaymentPage />
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.footerText}>{t("powered_by")}</span>
        <img src={SolidLogoUrl} alt="Solid" />
      </div>
    </div>
  );
};

export default MainPage;
