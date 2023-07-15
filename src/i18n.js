import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './translations/en.json'
import frTranslation from './translations/fr.json'

const resources = {
    en: {
        translation: enTranslation
    },
    fr: {
        translation: frTranslation
    }
}

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources

    keySeparator: false,

    resources,

  });

export default i18n;