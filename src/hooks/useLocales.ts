import { useTranslation } from 'react-i18next';
import { enUS, viVN } from '@mui/material/locale';

// ----------------------------------------------------------------------

const LANGUAGES = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/us.svg',
  },
  {
    label: 'Việt Nam',
    value: 'vi',
    systemValue: viVN,
    icon: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/vn.svg',
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGUAGES.find((_lang) => _lang.value === langStorage) || LANGUAGES[1];

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGUAGES,
  };
}
