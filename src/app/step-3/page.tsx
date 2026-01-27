"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isSessionActive, updateActivity, clearSession } from "@/lib/session";
import { LogOut } from "lucide-react";
import LiveStudentsMenu from "@/components/custom/LiveStudentsMenu";

export default function Step3() {
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

  const handleActivate = () => {
    updateActivity();
    router.push("/step-4");
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

        {/* Linha de separação mais fina */}
        <div className="h-[0.5px] bg-[#1d8b33] my-8"></div>

        {/* Seção AI SIGNALS - título maior */}
        <div>
          <h2 className="text-[1.7rem] font-medium text-[#2dff57] text-center mb-6">
            / /   AI SIGNALS   / /
          </h2>

          {/* Card Principal do Jogo com borda gradiente */}
          <div
            className="bg-[#121212] rounded-2xl overflow-hidden relative"
            style={{
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(#121212, #121212), linear-gradient(to bottom, #2dff57, #5ec87c, #e8e8e8)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            {/* Parte superior - imagem do Aviator AI */}
            <div className="w-full h-48 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
              <img
                src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_32bsobektMxVyp4lNjf7TryrISo/202be2e9-a812-43fe-94f7-894ccffcb00f.png"
                alt="Aviator AI Predictor"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Parte inferior - conteúdo */}
            <div className="p-6 flex flex-col items-center gap-3">
              <h3 
                className="text-[#2dff57] text-[1.4rem] font-medium text-center"
                style={{
                  backdropFilter: 'blur(2px)'
                }}
              >
                Aviator AI PREDICTOR
              </h3>

              <p className="text-gray-400 text-sm text-center">
                Signals/sec: <span className="text-[#2dff57]">552</span>
              </p>

              <p className="text-gray-400 text-sm text-center mb-2">
                Success rate: <span className="text-[#aff717]">96.2%</span>
              </p>

              <button
                onClick={handleActivate}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors"
              >
                ACTIVATE
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
