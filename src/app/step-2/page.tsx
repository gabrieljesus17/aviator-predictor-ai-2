"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { grantAccess, updateActivity, isSessionActive } from "@/lib/session";
import { Unlock } from "lucide-react";
import { soundManager } from "@/lib/sounds";

export default function Step2() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("Decrypting...");

  // Verificar se já tem acesso e redirecionar
  useEffect(() => {
    if (isSessionActive()) {
      router.push("/step-3");
    }
  }, [router]);

  const handleUnlock = () => {
    updateActivity();

    // Som de click ao clicar no botão
    soundManager.playClick();

    if (accessCode === "1898") {
      setError("");
      setShowPopup(true);
      setPopupText("Decrypting...");

      // Após 2.5s mudar texto e redirecionar
      setTimeout(() => {
        setPopupText("ACCESS GRANTED");
        // Som de sucesso A quando ACCESS GRANTED aparece
        soundManager.playSuccessA();
        setTimeout(() => {
          grantAccess();
          router.push("/step-3");
        }, 800);
      }, 2500);
    } else {
      setError("Invalid access code");
      // Som de erro para código incorreto
      soundManager.playError();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0b0b0b] relative">
      {/* Container responsivo com max-width para desktop */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">

        {/* Borda envolvendo área de validação */}
        <div
          className="w-full rounded-2xl p-6 flex flex-col items-center gap-5"
          style={{
            background: 'linear-gradient(180deg, rgba(45, 255, 87, 0.08) 0%, rgba(255, 215, 0, 0.08) 50%, rgba(255, 140, 0, 0.08) 100%)',
            border: '1px solid transparent',
            backgroundClip: 'padding-box',
            position: 'relative',
          }}
        >
          {/* Borda gradiente */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(180deg, #2dff57 0%, #ffd700 50%, #ff8c00 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
              pointerEvents: 'none',
              boxShadow: '0 0 12px rgba(45, 255, 87, 0.2), 0 0 12px rgba(255, 140, 0, 0.15)',
            }}
          />

          {/* Conteúdo interno */}
          <div className="relative z-10 w-full flex flex-col items-center gap-5">
            {/* Título */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center tracking-wide">
              UNLOCK AI ACCESS
            </h1>

            {/* Texto de instrução */}
            <p className="text-gray-400 text-base sm:text-lg text-center">
              Enter your access code to continue
            </p>

            {/* Campo de input responsivo com teclado numérico */}
            <div className="w-full flex flex-col gap-2">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Access Code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-[50%] mx-auto px-4 py-3 bg-[#1a1a1a] text-white text-center text-lg rounded-lg border border-[#2dff57] focus:border-[#2dff57] focus:outline-none transition-colors"
              />

              {/* Mensagem de erro */}
              {error && (
                <p className="text-red-500 text-sm text-center">
                  {error}
                </p>
              )}
            </div>

            {/* Botão de validação com ícone */}
            <button
              onClick={handleUnlock}
              className="w-full py-[14.08px] bg-[#2dff57] text-black text-lg font-bold rounded-lg hover:bg-[#20c64e] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5" />
              VALIDATE
            </button>
          </div>
        </div>

        {/* Texto informativo - aumentado 1px */}
        <p className="text-gray-400 text-[15px] text-center mt-2">
          If you haven't gotten your access code yet, click the button below.
        </p>

        {/* Botão GET MY ACCESS CODE - largura reduzida 30% */}
        <button
          className="w-[70%] py-3 bg-black text-[#ff8c00] border border-[#ff8c00] text-base font-semibold rounded-lg hover:bg-[#0a0a0a] transition-all flex items-center justify-center animate-pulse"
        >
          GET MY ACCESS CODE
        </button>
      </div>

      {/* Pop-up de transição */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] border border-[#2dff57] rounded-xl p-12 sm:p-16 md:p-20 backdrop-blur-md shadow-2xl">
            <p 
              className={`text-[#2dff57] text-2xl sm:text-3xl font-bold text-center ${
                popupText === "Decrypting..." ? "animate-pulse" : ""
              }`}
            >
              {popupText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
