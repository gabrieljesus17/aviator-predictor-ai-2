"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { isSessionActive, updateActivity, clearSession } from "@/lib/session";
import LiveStudentsMenu from "@/components/custom/LiveStudentsMenu";

// Estados da máquina
type PredictorState = "idle" | "analyzing-bet" | "bet-ready" | "analyzing-signal" | "signal-ready" | "loop";

export default function Step5() {
  const router = useRouter();
  
  // Estados do Predictor
  const [state, setState] = useState<PredictorState>("idle");
  const [multiplier, setMultiplier] = useState(1.00);
  const [statusText, setStatusText] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Verificar sessão ao carregar
  useEffect(() => {
    if (!isSessionActive()) {
      router.push("/");
      return;
    }
    
    updateActivity();
  }, [router]);

  const handleLogout = () => {
    updateActivity();
    clearSession();
    router.push("/");
  };

  const handleVoltar = () => {
    updateActivity();
    router.push("/step-4");
  };

  // Função para adicionar logs sequencialmente
  const addLogsSequentially = async (logMessages: string[], delay: number, successColor: boolean = true) => {
    setLogs([]);
    
    for (let i = 0; i < logMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setLogs(prev => [...prev, logMessages[i]]);
    }
  };

  // Gerar multiplicador aleatório com distribuição controlada
  const generateMultiplier = (): number => {
    const random = Math.random() * 100;
    
    if (random < 63) {
      // 63% -> até 2.60x
      return parseFloat((1.10 + Math.random() * 1.50).toFixed(2));
    } else if (random < 87) {
      // 24% -> entre 2.61x e 4.60x
      return parseFloat((2.61 + Math.random() * 1.99).toFixed(2));
    } else {
      // 13% -> até 13.50x
      return parseFloat((4.61 + Math.random() * 8.89).toFixed(2));
    }
  };

  // Animar multiplicador
  const animateMultiplier = (targetValue: number) => {
    setIsAnimating(true);
    const duration = 600; // 0.6 segundos
    const steps = 30;
    const increment = (targetValue - 1.00) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newValue = 1.00 + (increment * currentStep);
      
      if (currentStep >= steps) {
        setMultiplier(targetValue);
        setIsAnimating(false);
        clearInterval(interval);
      } else {
        setMultiplier(parseFloat(newValue.toFixed(2)));
      }
    }, duration / steps);
  };

  // Handler: Get Bet Size
  const handleGetBetSize = async () => {
    if (state !== "idle") return;
    
    updateActivity();
    setState("analyzing-bet");
    setStatusText("Analyzing data…");
    
    const betLogs = [
      "> Connecting to data stream...",
      "> Analyzing market volatility...",
      "> Calculating risk-to-reward ratio...",
      "> Running predictive model v3.4...",
      "> Finalizing bet size...",
      "> SUCCESS: Bet parameters calculated."
    ];
    
    await addLogsSequentially(betLogs, 800);
    
    // Após última linha, mudar status e desbloquear Get Signal
    setStatusText("Aposte um valor entre 10 U$ até 30 U$");
    setState("bet-ready");
  };

  // Handler: Get Signal
  const handleGetSignal = async () => {
    if (state !== "bet-ready") return;
    
    updateActivity();
    setState("analyzing-signal");
    setStatusText("Analyzing data…");
    setLogs([]);
    
    const signalLogs = [
      "> Initiating flight path analysis...",
      "> Processing real-time exit vectors...",
      "> Calibrating for atmospheric variance...",
      "> Cross-referencing historical data...",
      "> LOCKING SIGNAL...",
      "> SUCCESS: Multiplier signal acquired."
    ];
    
    await addLogsSequentially(signalLogs, 500);
    
    // Após última linha, animar multiplicador
    const targetMultiplier = generateMultiplier();
    animateMultiplier(targetMultiplier);
    
    // Aguardar animação terminar
    await new Promise(resolve => setTimeout(resolve, 700));
    
    setStatusText("");
    setState("loop");
  };

  // Handler: Get Another Signal
  const handleGetAnotherSignal = () => {
    updateActivity();
    setState("idle");
    setMultiplier(1.00);
    setStatusText("");
    setLogs([]);
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

        {/* CARD PRINCIPAL DO PREDICTOR - com borda verde e glow sutil */}
        <div
          className="bg-[#111111] rounded-2xl p-6 mb-8"
          style={{
            border: '0.5px solid #1d8b33',
            boxShadow: '0 0 8px rgba(29, 139, 51, 0.3)'
          }}
        >
          
          {/* Cabeçalho do Card */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleVoltar}
              className="bg-black border border-[#ffd400] text-[#ffd400] px-4 py-2 rounded-lg text-sm hover:bg-[#ffd400] hover:text-black transition-colors"
            >
              Voltar
            </button>

            <button
              onClick={() => updateActivity()}
              className="bg-black border border-[#ffd400] text-[#ffd400] px-3 py-[6px] rounded-lg text-[10.78px] font-medium hover:bg-[#ffd400] hover:text-black transition-colors"
            >
              Como usar o predictor
            </button>
          </div>

          {/* Título - aumentado 20% e peso 500 */}
          <h1 className="text-white text-2xl font-medium text-center mb-8">
            Aviator AI PREDICTOR
          </h1>

          {/* Multiplicador - aumentado 30% e peso 500 */}
          <div className="text-center mb-6">
            <div className="text-white text-[4.68rem] font-medium">
              x{multiplier.toFixed(2)}
            </div>
          </div>

          {/* Texto de Status - aumentado 10% e espaçamento de 1 linha acima */}
          <div className="text-center mb-6 h-6 mt-6">
            {statusText && (
              <p className="text-[#dbdd1c] text-[15.4px] font-medium">
                {statusText}
              </p>
            )}
          </div>

          {/* Botões Principais - altura reduzida 17% e peso 500 */}
          {state !== "loop" && (
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={handleGetBetSize}
                disabled={state !== "idle"}
                className={`w-full py-[9.96px] px-6 rounded-lg font-medium transition-colors ${
                  state === "idle"
                    ? "bg-[#2dff57] text-black hover:bg-[#26e04d]"
                    : "bg-[#2dff57] text-black opacity-60 cursor-not-allowed"
                }`}
              >
                Get Bet Size
              </button>

              <button
                onClick={handleGetSignal}
                disabled={state !== "bet-ready"}
                className={`w-full py-[9.96px] px-6 rounded-lg font-medium transition-colors ${
                  state === "bet-ready"
                    ? "bg-[#2dff57] text-black hover:bg-[#26e04d]"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
              >
                Get Signal
              </button>
            </div>
          )}

          {/* Botão Loop - altura reduzida 17% e peso 500 */}
          {state === "loop" && (
            <div className="mb-6">
              <button
                onClick={handleGetAnotherSignal}
                className="w-full bg-[#ffd400] text-black font-medium py-[9.96px] px-6 rounded-lg hover:bg-[#ffcc00] transition-colors"
              >
                Get another Signal
              </button>
            </div>
          )}

          {/* Campo de Logs - altura reduzida ~20% */}
          <div className="w-full bg-[#0a0a0a] rounded-lg p-4 h-[9.6rem] overflow-y-auto">
            <div className="font-mono text-xs space-y-1">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={
                    log.includes("SUCCESS")
                      ? "text-[#2dff57]"
                      : "text-[#a4cbc8]"
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
