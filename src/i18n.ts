import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import englishTranslation from "./locales/en/translation.json";
import ukrainianTranslation from "./locales/ua/translation.json";

const resources = {
  en: { translation: englishTranslation },
  ua: { translation: ukrainianTranslation },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18next;
