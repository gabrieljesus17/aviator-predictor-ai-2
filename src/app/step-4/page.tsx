"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { isSessionActive, updateActivity, clearSession } from "@/lib/session";
import LiveStudentsMenu from "@/components/custom/LiveStudentsMenu";

export default function Step4() {
  const router = useRouter();

  // Verificar sessão ao carregar
  useEffect(() => {
    if (!isSessionActive()) {
      router.push("/");
      return;
    }
  }, [router]);

  const handleLogout = () => {
    updateActivity();
    clearSession();
    router.push("/");
  };

  const handleVoltar = () => {
    updateActivity();
    router.push("/step-3");
  };

  const handleEncontreiJogo = () => {
    updateActivity();
    router.push("/step-5");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white overflow-y-auto">
      <div className="w-full max-w-md mx-auto px-4 py-6">
        
        {/* Barra Superior */}
        <div className="flex justify-end items-center mb-8">
          <button
            onClick={handleLogout}
            className="bg-[#eb0f0f] text-white text-sm px-4 py-2 rounded-md hover:bg-[#d00d0d] transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Menu Global */}
        <LiveStudentsMenu />

        {/* Linha de separação */}
        <div className="h-[0.5px] bg-[#1d8b33] my-8"></div>

        {/* Botão Voltar - reduzido 18% na altura */}
        <div className="mb-8">
          <button
            onClick={handleVoltar}
            className="bg-black border border-[#ffd400] text-[#ffd400] px-6 py-[6.16px] rounded-lg hover:bg-[#ffd400] hover:text-black transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex flex-col items-center">
          {/* Título Principal */}
          <h1 className="text-white text-[23.52px] font-medium text-center mb-4 mt-6">
            First, find the "Aviator" game
          </h1>

          {/* Subtítulo */}
          <p className="text-[#b0b0b0] text-sm text-center mb-6">
            HOW TO FIND AVIATOR ON <span className="text-white" style={{ textShadow: '0 0 12px rgba(255, 255, 255, 0.6)' }}>BETWINNER</span>
          </p>

          {/* Card Central */}
          <div className="w-full bg-[#121212] rounded-2xl overflow-hidden mb-6">
            {/* Espaço reservado para vídeo futuro */}
            <div className="w-full h-64 bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-[#4a4a4a] text-sm">Espaço reservado para vídeo</span>
            </div>
          </div>

          {/* Botão de Confirmação */}
          <button
            onClick={handleEncontreiJogo}
            className="w-full bg-[#2dff57] text-black font-medium py-3 px-6 rounded-lg hover:bg-[#26e04d] transition-colors"
          >
            I FOUND THE GAME
          </button>
        </div>

      </div>
    </div>
  );
}
