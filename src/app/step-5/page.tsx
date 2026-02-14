"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { isSessionActive, updateActivity, clearSession } from "@/lib/session";
import LiveStudentsMenu from "@/components/custom/LiveStudentsMenu";
import { soundManager } from "@/lib/sounds";
import { useCountry } from "@/contexts/CountryContext";
import { useTranslation } from "@/hooks/useTranslation";

// Estados da máquina
type PredictorState = "idle" | "analyzing-bet" | "bet-ready" | "analyzing-signal" | "signal-ready" | "loop" | "cooldown";

// Sistema de variação gradual para mensagens técnicas
class GradualMetrics {
  private signalsValue: number = 2.5; // Inicia no meio do range (1.5-3.8)
  private accuracyValue: number = 92.8; // Inicia no meio do range (90.0-95.7)
  private usersValue: number = 450; // Inicia no meio do range (38-850)
  private batchValue: number = 38; // Inicia no meio do range (15-60)

  // Cache de mensagens (valores congelados durante exibição)
  private cachedMessages: { [key: number]: string } = {};
  private lastUpdatedIndex: number = -1;

  // Signals: 1.5k a 3.8k, variação ±0.1k a ±0.4k
  private updateSignalsValue(): void {
    const variation = (Math.random() - 0.5) * 0.8; // -0.4 a +0.4
    this.signalsValue += variation;

    // Força suave de retorno ao centro
    if (this.signalsValue < 1.5) this.signalsValue = 1.5 + 0.1;
    if (this.signalsValue > 3.8) this.signalsValue = 3.8 - 0.1;
  }

  // Model accuracy: 90.0% a 95.7%, variação ±0.1% a ±0.2%
  private updateAccuracyValue(): void {
    // 50% de chance de não mudar nada (estabilidade)
    if (Math.random() < 0.5) {
      return;
    }

    const variation = (Math.random() - 0.5) * 0.4; // -0.2 a +0.2
    this.accuracyValue += variation;

    // Limites rígidos
    if (this.accuracyValue < 90.0) this.accuracyValue = 90.0;
    if (this.accuracyValue > 95.7) this.accuracyValue = 95.7;
  }

  // Active users: 38 a 850, variação ±2 a ±10
  private updateUsersValue(): void {
    const variation = Math.floor((Math.random() - 0.5) * 20); // -10 a +10
    this.usersValue += variation;

    // Limites
    if (this.usersValue < 38) this.usersValue = 38;
    if (this.usersValue > 850) this.usersValue = 850;
  }

  // Last batch: 15 a 60, variação ±3 a ±8
  private updateBatchValue(): void {
    const variation = Math.floor((Math.random() - 0.5) * 16); // -8 a +8
    this.batchValue += variation;

    // Limites
    if (this.batchValue < 15) this.batchValue = 15;
    if (this.batchValue > 60) this.batchValue = 60;
  }

  // Método público: obter mensagem (atualiza SOMENTE quando reentrar no ciclo)
  getMessage(index: number): string {
    // Se é a mesma mensagem sendo renderizada, retornar cache
    if (this.lastUpdatedIndex === index && this.cachedMessages[index]) {
      return this.cachedMessages[index];
    }

    // Nova mensagem no ciclo - atualizar valores
    this.lastUpdatedIndex = index;

    switch (index) {
      case 0:
        this.updateSignalsValue();
        this.cachedMessages[0] = `⚡ ${this.signalsValue.toFixed(1)}k signals processed in last 60min`;
        break;
      case 1:
        this.updateAccuracyValue();
        this.cachedMessages[1] = `📊 Model accuracy: ${this.accuracyValue.toFixed(1)}% (live tracking)`;
        break;
      case 2:
        this.updateUsersValue();
        this.cachedMessages[2] = `🔄 ${Math.floor(this.usersValue)} active users analyzing right now`;
        break;
      case 3:
        this.updateBatchValue();
        this.cachedMessages[3] = `🎯 Last batch: ${Math.floor(this.batchValue)} wins detected`;
        break;
      default:
        return "";
    }

    return this.cachedMessages[index];
  }
}

// Instância global do gerenciador de métricas
const metricsManager = new GradualMetrics();

// Função para gerar mensagens técnicas com valores dinâmicos
const getTechMessage = (index: number): string => {
  return metricsManager.getMessage(index);
};

export default function Step5() {
  const router = useRouter();
  const { selectedCountry } = useCountry();
  const { t } = useTranslation();

  // Estados do Predictor
  const [state, setState] = useState<PredictorState>("idle");
  const [multiplier, setMultiplier] = useState(1.00);
  const [statusText, setStatusText] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHowToUseModal, setShowHowToUseModal] = useState(false);

  // System Status
  const [systemVersion] = useState("v3.4.2");
  const [systemUptime, setSystemUptime] = useState("00:00");
  const [lastSync, setLastSync] = useState("synced");

  // Session Identity
  const [sessionId] = useState(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  });

  // Mensagens técnicas rotativas
  const [currentTechMsg, setCurrentTechMsg] = useState(0);

  // Cooldown
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // Verificar sessão ao carregar
  useEffect(() => {
    if (!isSessionActive()) {
      router.push("/");
      return;
    }

    updateActivity();
  }, [router]);

  // Atualizar System Status - Uptime
  useEffect(() => {
    const startTime = Date.now();
    const uptimeInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      setSystemUptime(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(uptimeInterval);
  }, []);

  // Atualizar System Status - Last Sync
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setLastSync("syncing...");
      setTimeout(() => setLastSync("synced"), 800);
    }, Math.random() * 120000 + 60000); // Entre 1-3 minutos

    return () => clearInterval(syncInterval);
  }, []);

  // Rotacionar mensagens técnicas
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setCurrentTechMsg((prev) => (prev + 1) % 4); // 4 mensagens diferentes
    }, 8000); // Troca a cada 8 segundos

    return () => clearInterval(msgInterval);
  }, []);

  // Cooldown countdown
  useEffect(() => {
    if (cooldownRemaining > 0) {
      const countdownInterval = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            setState("idle");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [cooldownRemaining]);

  const handleLogout = () => {
    updateActivity();
    clearSession();
    router.push("/");
  };

  const handleVoltar = () => {
    updateActivity();
    router.push("/step-3");
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

  // Animar multiplicador com reforço sensorial proporcional
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

        // Reforço sensorial proporcional ao multiplicador
        if (targetValue >= 4.61) {
          // Alto multiplicador: som mais longo e intenso
          soundManager.playSuccessB();
          setTimeout(() => soundManager.playSuccessB(), 200);
        } else if (targetValue >= 2.61) {
          // Médio multiplicador: som médio
          soundManager.playSuccessB();
        } else {
          // Baixo multiplicador: som padrão (já tocado no handleGetSignal)
        }
      } else {
        setMultiplier(parseFloat(newValue.toFixed(2)));
      }
    }, duration / steps);
  };

  // Handler: Get Bet Size
  const handleGetBetSize = async () => {
    if (state !== "idle") return;

    updateActivity();
    // Som de click ao clicar
    soundManager.playClick();
    setState("analyzing-bet");
    setStatusText(t('analyzing_data'));

    const betLogs = [
      "> Connecting to data stream...",
      "> Analyzing market volatility...",
      "> Calculating risk-to-reward ratio...",
      "> Running predictive model v3.4...",
      "> Finalizing bet size...",
      "> SUCCESS: Bet parameters calculated."
    ];

    await addLogsSequentially(betLogs, 500);

    // Após última linha, mudar status e desbloquear Get Signal
    // Texto dinâmico com valores do país selecionado
    const betMin = selectedCountry?.betAmountRange.min || 10;
    const betMax = selectedCountry?.betAmountRange.max || 50;
    const currency = selectedCountry?.currencySymbol || 'ZMW';
    setStatusText(`Bet an amount from ${betMin} ${currency} to ${betMax} ${currency}`);
    setState("bet-ready");
  };

  // Handler: Get Signal
  const handleGetSignal = async () => {
    if (state !== "bet-ready") return;

    updateActivity();
    // Som de click ao clicar
    soundManager.playClick();
    setState("analyzing-signal");
    setStatusText(t('analyzing_data'));
    setLogs([]);

    const signalLogs = [
      "> Initiating flight path analysis...",
      "> Processing real-time exit vectors...",
      "> Calibrating for atmospheric variance...",
      "> Cross-referencing historical data...",
      "> LOCKING SIGNAL...",
      "> SUCCESS: Multiplier signal acquired."
    ];

    await addLogsSequentially(signalLogs, 300);

    // Após última linha, animar multiplicador
    const targetMultiplier = generateMultiplier();
    animateMultiplier(targetMultiplier);

    // Aguardar animação terminar
    await new Promise(resolve => setTimeout(resolve, 700));

    // Som dopaminérgico básico (reforço proporcional já está em animateMultiplier)
    soundManager.playSuccessB();

    setStatusText("");
    setState("loop");
  };

  // Handler: Get Another Signal com Cooldown Inteligente
  const handleGetAnotherSignal = () => {
    updateActivity();
    // Som de click ao clicar
    soundManager.playClick();

    // Cooldown inteligente: 30-40% de probabilidade
    const shouldCooldown = Math.random() < 0.35; // 35% de chance

    if (shouldCooldown) {
      setState("cooldown");
      const cooldownTime = Math.floor(Math.random() * 8) + 8; // 8-15 segundos
      setCooldownRemaining(cooldownTime);
      setStatusText(t('recalibrating_ai'));
      setLogs(["> Model recalibration in progress..."]);
    } else {
      setState("idle");
      setMultiplier(1.00);
      setStatusText("");
      setLogs([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white overflow-y-auto">
      <div className="w-full max-w-md mx-auto px-4 py-6">
        
        {/* Barra Superior */}
        <div className="flex justify-between items-center mb-8">
          {/* Botão Support */}
          <a
            href="https://wa.link/nbyrnx"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1d8b33] text-white text-sm px-3 py-2 rounded-md hover:bg-[#176e28] transition-colors"
          >
            {t('support')}
          </a>

          {/* Botão Logout */}
          <button
            onClick={handleLogout}
            className="bg-[#eb0f0f] text-white text-sm px-4 py-2 rounded-md hover:bg-[#d00d0d] transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>

        {/* Menu Global */}
        <LiveStudentsMenu />

        {/* Linha de separação */}
        <div className="h-[0.5px] bg-[#1d8b33] my-8"></div>

        {/* Session Identity - posicionado entre a linha de separação e o Card */}
        <div className="flex justify-center mb-3">
          <div
            className="font-mono text-[9px] text-[#1d8b33]"
            style={{
              textShadow: '0 0 4px rgba(29, 139, 51, 0.4)'
            }}
          >
            SESSION {sessionId}
          </div>
        </div>

        {/* CARD PRINCIPAL DO PREDICTOR - com borda verde e glow sutil */}
        <div
          className="bg-[#111111] rounded-2xl p-6 mb-8 relative"
          style={{
            border: '0.5px solid #1d8b33',
            boxShadow: '0 0 8px rgba(29, 139, 51, 0.3)'
          }}
        >
          
          {/* Cabeçalho do Card */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleVoltar}
              className="bg-black border border-[#ffd400] text-[#ffd400] px-4 py-[7.52px] rounded-lg text-sm hover:bg-[#ffd400] hover:text-black transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('back')}
            </button>

            <button
              onClick={() => {
                updateActivity();
                setShowHowToUseModal(true);
              }}
              className="bg-black border border-[#ff8c00] text-[#ff8c00] px-[14.4px] py-[7.2px] rounded-lg text-[12.94px] font-medium hover:bg-[#ff8c00] hover:text-black transition-colors"
            >
              {t('how_to_use_predictor')}
            </button>
          </div>

          {/* Título - aumentado 20% e peso 500 */}
          <h1 className="text-white text-2xl font-medium text-center mb-8">
            Aviator AI PREDICTOR
          </h1>

          {/* Multiplicador - aumentado mais 18% (total 48%) e peso 500 */}
          <div className="text-center mb-6">
            <div
              className="text-white text-[5.52rem] font-medium transition-all duration-300"
              style={{
                textShadow:
                  multiplier >= 4.61
                    ? '0 0 20px rgba(45, 255, 87, 0.6), 0 0 40px rgba(45, 255, 87, 0.4)'
                    : multiplier >= 2.61
                    ? '0 0 12px rgba(45, 255, 87, 0.4)'
                    : '0 0 6px rgba(45, 255, 87, 0.2)'
              }}
            >
              x{multiplier.toFixed(2)}
            </div>
          </div>

          {/* Texto de Status - aumentado 10% e espaçamento de 1 linha acima */}
          <div className="text-center mb-6 h-6 mt-6">
            {statusText && (
              <p
                className="text-[#dbdd1c] text-[15.4px] font-medium"
                style={{
                  textShadow: '0 0 8px currentColor'
                }}
              >
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
                {t('get_bet_size')}
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
                {t('get_signal')}
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
                {t('get_another_signal')}
              </button>
            </div>
          )}

          {/* Cooldown State */}
          {state === "cooldown" && (
            <div className="mb-6">
              <button
                disabled
                className="w-full bg-gray-600 text-gray-300 font-medium py-[9.96px] px-6 rounded-lg cursor-not-allowed opacity-70"
              >
                {t('processing')} ({cooldownRemaining}s)
              </button>
            </div>
          )}

          {/* Campo de Logs - altura reduzida ~20% */}
          <div className="w-full bg-[#0a0a0a] rounded-lg p-4 h-[9.6rem] overflow-y-auto">
            <div className="font-mono text-xs space-y-1">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`animate-fade-in ${
                    log.includes("SUCCESS")
                      ? "text-[#2dff57]"
                      : "text-[#a4cbc8]"
                  }`}
                  style={{
                    animationDuration: '0.3s',
                    animationFillMode: 'both'
                  }}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Mensagens Técnicas Rotativas */}
          <div className="mt-4 text-center">
            <p
              className="text-[#1d8b33] text-[10px] font-mono opacity-60 transition-opacity duration-500"
              style={{
                textShadow: '0 0 4px rgba(29, 139, 51, 0.3)'
              }}
            >
              {getTechMessage(currentTechMsg)}
            </p>
          </div>

          {/* System Status - canto inferior direito do card */}
          <div className="mt-6 flex justify-end">
            <div className="text-right font-mono text-[9px] text-[#1d8b33] opacity-50 space-y-0.5">
              <div>SYS {systemVersion}</div>
              <div>UPTIME {systemUptime}</div>
              <div>SYNC {lastSync}</div>
            </div>
          </div>

        </div>

      </div>

      {/* Pop-up Modal - How to Use Predictor */}
      {showHowToUseModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowHowToUseModal(false)}
        >
          {/* Backdrop com blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal Card */}
          <div
            className="relative w-full max-w-4xl bg-[#111111] rounded-2xl overflow-hidden"
            style={{
              aspectRatio: '16 / 9',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 40px rgba(45, 255, 87, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setShowHowToUseModal(false)}
              className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Conteúdo do Modal */}
            <div className="w-full h-full flex items-center justify-center p-8">
              {selectedCountry?.videoLinks.step5 ? (
                <iframe
                  src={selectedCountry.videoLinks.step5}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-white/40 text-sm font-mono">
                    Video preview space
                  </div>
                  <div className="text-white/60 text-xs font-mono">
                    (Video link will be added here)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
