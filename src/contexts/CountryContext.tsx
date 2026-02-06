"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { COUNTRY_CONFIGS, CountryConfig } from '@/lib/country-config';

interface CountryContextType {
  selectedCountry: CountryConfig | null;
  setCountry: (countryCode: string) => void;
  clearCountry: () => void;
  isCountrySelected: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

const COUNTRY_STORAGE_KEY = 'selected_country_code';
const COUNTRY_TIMESTAMP_KEY = 'country_selection_timestamp';
const SESSION_TIMEOUT = 40 * 60 * 1000; // 40 minutos (mesmo TTL da sessão)

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig | null>(null);

  // Carregar país do localStorage ao montar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedCountryCode = localStorage.getItem(COUNTRY_STORAGE_KEY);
    const storedTimestamp = localStorage.getItem(COUNTRY_TIMESTAMP_KEY);

    if (storedCountryCode && storedTimestamp) {
      const now = Date.now();
      const timestamp = parseInt(storedTimestamp, 10);

      // Verificar se expirou
      if (now - timestamp > SESSION_TIMEOUT) {
        // Expirou - limpar
        localStorage.removeItem(COUNTRY_STORAGE_KEY);
        localStorage.removeItem(COUNTRY_TIMESTAMP_KEY);
        setSelectedCountry(null);
      } else {
        // Ainda válido - carregar
        const countryConfig = COUNTRY_CONFIGS[storedCountryCode];
        if (countryConfig) {
          setSelectedCountry(countryConfig);
        }
      }
    }
  }, []);

  // Função para definir país
  const setCountry = (countryCode: string) => {
    if (typeof window === 'undefined') return;

    const countryConfig = COUNTRY_CONFIGS[countryCode];
    if (countryConfig) {
      setSelectedCountry(countryConfig);
      localStorage.setItem(COUNTRY_STORAGE_KEY, countryCode);
      localStorage.setItem(COUNTRY_TIMESTAMP_KEY, Date.now().toString());
    }
  };

  // Função para limpar país
  const clearCountry = () => {
    if (typeof window === 'undefined') return;

    setSelectedCountry(null);
    localStorage.removeItem(COUNTRY_STORAGE_KEY);
    localStorage.removeItem(COUNTRY_TIMESTAMP_KEY);
  };

  const value: CountryContextType = {
    selectedCountry,
    setCountry,
    clearCountry,
    isCountrySelected: selectedCountry !== null,
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}

// Hook para usar o contexto
export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}
