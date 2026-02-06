// Hook para usar traduções no app

import { useCountry } from '@/contexts/CountryContext';
import { translations, TranslationKey, COUNTRY_TO_LANGUAGE, Language } from '@/lib/translations';

export function useTranslation() {
  const { selectedCountry } = useCountry();

  // Determinar idioma baseado no país selecionado
  const language: Language = selectedCountry
    ? COUNTRY_TO_LANGUAGE[selectedCountry.code] || 'en'
    : 'en';

  // Função para obter tradução
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return { t, language };
}
