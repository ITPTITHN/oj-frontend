import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enLocales from './en.json';
import viLocales from './vi.json';

const defaultLanguage = 'en';
let lng = defaultLanguage;

if (typeof localStorage !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || defaultLanguage;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      vi: { translations: viLocales },
    },
    lng,
    fallbackLng: defaultLanguage,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  })
  .catch();

export default i18n;
