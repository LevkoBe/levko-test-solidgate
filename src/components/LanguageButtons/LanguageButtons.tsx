import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";

const LanguageButtons = () => {
  const { i18n } = useTranslation();

  const LANGUAGES = {
    uk: { label: "Укр", code: "uk" },
    en: { label: "Eng", code: "en" },
  };

  const currentLanguage = i18n.language;
  const availableLanguages = Object.values(LANGUAGES);
  const inactiveLangConfig = availableLanguages.find(
    (lang) => lang.code !== currentLanguage
  );

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  type LangConfig = { label: string; code: string };

  const renderLanguageButton = (langConfig: LangConfig, isActive = false) => (
    <button
      key={langConfig.code}
      className={`${styles.langButton} ${
        isActive ? styles.active : styles.inactive
      }`}
      onClick={() => handleLanguageChange(langConfig.code)}
    >
      {langConfig.label}
    </button>
  );

  return (
    <>
      <div className={styles.langMobile}>
        {inactiveLangConfig && renderLanguageButton(inactiveLangConfig)}
      </div>

      <div className={styles.langDesktop}>
        {availableLanguages.map((langConfig) =>
          renderLanguageButton(langConfig, langConfig.code === currentLanguage)
        )}
      </div>
    </>
  );
};

export default LanguageButtons;
