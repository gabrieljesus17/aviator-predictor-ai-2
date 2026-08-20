"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSessionActive, updateActivity } from "@/lib/session";
import CountrySelector from "@/components/custom/CountrySelector";
import ContinentSelector from "@/components/custom/ContinentSelector";
import { useTranslation } from "@/hooks/useTranslation";
import { captureLeadParams, getLeadParamsForRoute } from "@/lib/leadParams";
import {
  COUNTRY_LIST_AFRICA,
  COUNTRY_LIST_CENTRAL_SOUTH_AMERICA,
  COUNTRY_LIST_NORTH_AMERICA,
  COUNTRY_LIST_EUROPE,
  COUNTRY_LIST_ASIA,
} from "@/lib/country-config";

const CONTINENT_COUNTRY_LISTS: Record<string, string[]> = {
  africa: COUNTRY_LIST_AFRICA,
  centralandsouthamerica: COUNTRY_LIST_CENTRAL_SOUTH_AMERICA,
  northamerica: COUNTRY_LIST_NORTH_AMERICA,
  europe: COUNTRY_LIST_EUROPE,
  asia: COUNTRY_LIST_ASIA,
};

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const [showContinentSelector, setShowContinentSelector] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  useEffect(() => {
    captureLeadParams();
    if (isSessionActive()) {
      router.push("/step-3");
    }
  }, [router]);

  const handleGetSignals = () => {
    updateActivity();
    setShowContinentSelector(true);
  };

  const handleContinentSelected = (continentCode: string) => {
    updateActivity();
    setSelectedContinent(continentCode);
  };

  const handleBackToContinent = () => {
    updateActivity();
    setSelectedContinent(null);
  };

  const handleCountrySelected = () => {
    const continent = selectedContinent;
    setShowContinentSelector(false);
    setSelectedContinent(null);
    router.push(`/${continent}/step-2${getLeadParamsForRoute()}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0a0a]">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Título com gradiente customizado */}
        <h1
          className="text-[12vw] sm:text-7xl md:text-8xl font-normal text-center tracking-wider w-[95%] leading-tight whitespace-nowrap"
          style={{
            background: 'linear-gradient(to bottom, #2dff57, #20c64e, #b4b4b4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          AI PREDICTOR
        </h1>

        {/* Botão principal responsivo */}
        <button
          onClick={handleGetSignals}
          className="w-[50%] aspect-[4/1] bg-black text-[#2dff57] text-base sm:text-lg font-semibold rounded-lg border border-[#2dff57] hover:bg-[#0a0a0a] transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-sm"
        >
          {t('get_ai_signals')}
        </button>
      </div>

      {/* Modal de Seleção de Continente */}
      <ContinentSelector
        isOpen={showContinentSelector && !selectedContinent}
        onSelect={handleContinentSelected}
        onClose={() => setShowContinentSelector(false)}
      />

      {/* Modal de Seleção de País (do continente escolhido) */}
      {selectedContinent && (
        <CountrySelector
          isOpen={true}
          onClose={handleCountrySelected}
          onBack={handleBackToContinent}
          countryList={CONTINENT_COUNTRY_LISTS[selectedContinent]}
          transitionIn
        />
      )}
    </div>
  );
}
