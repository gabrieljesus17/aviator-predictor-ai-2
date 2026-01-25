"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Star } from "lucide-react";
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
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => updateActivity()}
            className="flex items-center gap-2 text-white text-sm bg-transparent"
          >
            <Star className="w-4 h-4" />
            <span>Lottery</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="text-white text-sm bg-transparent hover:text-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Menu Global */}
        <LiveStudentsMenu />

        {/* Linha de separação */}
        <div className="h-px bg-[#2a2a2a] my-8"></div>

        {/* Botão Voltar */}
        <div className="mb-8">
          <button
            onClick={handleVoltar}
            className="bg-black border border-[#ffd400] text-[#ffd400] px-6 py-2 rounded-lg hover:bg-[#ffd400] hover:text-black transition-colors"
          >
            Voltar
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex flex-col items-center">
          {/* Título Principal */}
          <h1 className="text-white text-xl font-medium text-center mb-4 mt-6">
            Primeiro, encontre o jogo 'Aviator'
          </h1>

          {/* Subtítulo */}
          <p className="text-[#b0b0b0] text-sm text-center mb-6">
            Como encontrar o Aviator dentro da plataforma
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
            className="w-full bg-[#2dff57] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#26e04d] transition-colors"
          >
            ENCONTREI O JOGO
          </button>
        </div>

      </div>
    </div>
  );
}
