"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { grantAccess, updateActivity, isSessionActive } from "@/lib/session";
import { Unlock } from "lucide-react";

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
    
    if (accessCode === "1898") {
      setError("");
      setShowPopup(true);
      setPopupText("Decrypting...");
      
      // Após 2.5s mudar texto e redirecionar
      setTimeout(() => {
        setPopupText("ACCESS GRANTED");
        setTimeout(() => {
          grantAccess();
          router.push("/step-3");
        }, 800);
      }, 2500);
    } else {
      setError("Invalid access code");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0b0b0b] relative">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center tracking-wide">
          UNLOCK AI ACCESS
        </h1>
        
        {/* Texto de instrução */}
        <p className="text-gray-400 text-base sm:text-lg text-center">
          Enter your access code to continue
        </p>

        {/* Campo de input responsivo */}
        <div className="w-full flex flex-col gap-2">
          <input
            type="text"
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
          className="w-full py-4 bg-[#2dff57] text-black text-lg font-bold rounded-lg hover:bg-[#20c64e] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Unlock className="w-5 h-5" />
          VALIDATE
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
