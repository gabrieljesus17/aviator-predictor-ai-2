"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSessionActive, updateActivity } from "@/lib/session";
import { useCountry } from "@/contexts/CountryContext";
import CountrySelector from "@/components/custom/CountrySelector";

export default function Home() {
  const router = useRouter();
  const { isCountrySelected } = useCountry();
  const [showCountrySelector, setShowCountrySelector] = useState(false);

  // Verificar se já tem sessão ativa e redirecionar para step-3
  useEffect(() => {
    if (isSessionActive()) {
      router.push("/step-3");
    }
  }, [router]);

  const handleGetSignals = () => {
    updateActivity();

    // Abrir modal de seleção de país
    setShowCountrySelector(true);
  };

  const handleCountrySelected = () => {
    setShowCountrySelector(false);
    // Após selecionar país, navegar para step-2
    router.push("/step-2");
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
          GET AI SIGNALS
        </button>
      </div>

      {/* Modal de Seleção de País */}
      <CountrySelector
        isOpen={showCountrySelector}
        onClose={handleCountrySelected}
      />
    </div>
  );
}
