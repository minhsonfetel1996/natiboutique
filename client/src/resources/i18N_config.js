import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./i18N";

export const configI18n = (lang) => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: lang,
      fallbackLng: "vn", // use en if detected lng is not available
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
};
