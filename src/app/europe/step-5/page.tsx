"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { isSessionActive, updateActivity, clearSession } from "@/lib/session";
import LiveStudentsMenu from "@/components/custom/LiveStudentsMenu";
import { soundManager } from "@/lib/sounds";
import { useCountry } from "@/contexts/CountryContext";
import { useTranslation } from "@/hooks/useTranslation";

type PredictorState = "idle" | "analyzing-bet" | "bet-ready" | "analyzing-signal" | "signal-ready" | "loop" | "cooldown";

class GradualMetrics {
  private signalsValue: number = 2.5;
  private accuracyValue: number = 92.8;
  private usersValue: number = 450;
  private batchValue: number = 38;
  private cachedMessages: { [key: number]: string } = {};
  private lastUpdatedIndex: number = -1;

  private updateSignalsValue(): void {
    const variation = (Math.random() - 0.5) * 0.8;
    this.signalsValue += variation;
    if (this.signalsValue < 1.5) this.signalsValue = 1.5 + 0.1;
    if (this.signalsValue > 3.8) this.signalsValue = 3.8 - 0.1;
  }

  private updateAccuracyValue(): void {
    if (Math.random() < 0.5) return;
    const variation = (Math.random() - 0.5) * 0.4;
    this.accuracyValue += variation;
    if (this.accuracyValue < 90.0) this.accuracyValue = 90.0;
    if (this.accuracyValue > 95.7) this.accuracyValue = 95.7;
  }

  private updateUsersValue(): void {
    const variation = Math.floor((Math.random() - 0.5) * 20);
    this.usersValue += variation;
    if (this.usersValue < 38) this.usersValue = 38;
    if (this.usersValue > 850) this.usersValue = 850;
  }

  private updateBatchValue(): void {
    const variation = Math.floor((Math.random() - 0.5) * 16);
    this.batchValue += variation;
    if (this.batchValue < 15) this.batchValue = 15;
    if (this.batchValue > 60) this.batchValue = 60;
  }

  getMessage(index: number): string {
    if (this.lastUpdatedIndex === index && this.cachedMessages[index]) {
      return this.cachedMessages[index];
    }
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

const metricsManager = new GradualMetrics();
const getTechMessage = (index: number): string => metricsManager.getMessage(index);

export default function EuropeStep5() {
  const router = useRouter();
  const { selectedCountry } = useCountry();
  const { t } = useTranslation();

  const [state, setState] = useState<PredictorState>("idle");
  const [multiplier, setMultiplier] = useState(1.00);
  const [statusText, setStatusText] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHowToUseModal, setShowHowToUseModal] = useState(false);

  const [systemVersion] = useState("v3.4.2");
  const [systemUptime, setSystemUptime] = useState("00:00");
  const [lastSync, setLastSync] = useState("synced");

  const [sessionId] = useState(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  });

  const [currentTechMsg, setCurrentTechMsg] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    if (!isSessionActive()) {
      router.push("/");
      return;
    }
    updateActivity();
  }, [router]);

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

  useEffect(() => {
    const syncInterval = setInterval(() => {
      setLastSync("syncing...");
      setTimeout(() => setLastSync("synced"), 800);
    }, Math.random() * 120000 + 60000);
    return () => clearInterval(syncInterval);
  }, []);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setCurrentTechMsg((prev) => (prev + 1) % 4);
    }, 8000);
    return () => clearInterval(msgInterval);
  }, []);

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
    router.push("/europe/step-3");
  };

  const addLogsSequentially = async (logMessages: string[], delay: number) => {
    setLogs([]);
    for (let i = 0; i < logMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setLogs(prev => [...prev, logMessages[i]]);
    }
  };

  const generateMultiplier = (): number => {
    const random = Math.random() * 100;
    if (random < 90) {
      return parseFloat((1.00 + Math.random() * 0.50).toFixed(2));
    } else {
      return parseFloat((1.51 + Math.random() * 0.49).toFixed(2));
    }
  };

  const animateMultiplier = (targetValue: number) => {
    setIsAnimating(true);
    const duration = 600;
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
        if (targetValue >= 4.61) {
          soundManager.playSuccessB();
          setTimeout(() => soundManager.playSuccessB(), 200);
        } else if (targetValue >= 2.61) {
          soundManager.playSuccessB();
        }
      } else {
        setMultiplier(parseFloat(newValue.toFixed(2)));
      }
    }, duration / steps);
  };

  const handleGetBetSize = async () => {
    if (state !== "idle") return;
    updateActivity();
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

    const betMin = selectedCountry?.betAmountRange.min || 10;
    const betMax = selectedCountry?.betAmountRange.max || 50;
    const currency = selectedCountry?.currencySymbol || 'UGX';
    setStatusText(`Bet an amount from ${betMin} ${currency} to ${betMax} ${currency}`);
    setState("bet-ready");
  };

  const handleGetSignal = async () => {
    if (state !== "bet-ready") return;
    updateActivity();
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

    const targetMultiplier = generateMultiplier();
    animateMultiplier(targetMultiplier);
    await new Promise(resolve => setTimeout(resolve, 700));
    soundManager.playSuccessB();
    setStatusText("");
    setState("loop");
  };

  const handleGetAnotherSignal = () => {
    updateActivity();
    soundManager.playClick();
    const shouldCooldown = Math.random() < 0.35;
    if (shouldCooldown) {
      setState("cooldown");
      const cooldownTime = Math.floor(Math.random() * 8) + 8;
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

        <div className="flex justify-between items-center mb-8">
          <a
            href="https://wa.link/nbyrnx"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1d8b33] text-white text-sm px-3 py-2 rounded-md hover:bg-[#176e28] transition-colors"
          >
            {t('support')}
          </a>

          <button
            onClick={handleLogout}
            className="bg-[#eb0f0f] text-white text-sm px-4 py-2 rounded-md hover:bg-[#d00d0d] transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>

        <LiveStudentsMenu />

        <div className="h-[0.5px] bg-[#1d8b33] my-8"></div>

        <div className="flex justify-center mb-3">
          <div
            className="font-mono text-[9px] text-[#1d8b33]"
            style={{ textShadow: '0 0 4px rgba(29, 139, 51, 0.4)' }}
          >
            SESSION {sessionId}
          </div>
        </div>

        <div
          className="bg-[#111111] rounded-2xl p-6 mb-8 relative"
          style={{
            border: '0.5px solid #1d8b33',
            boxShadow: '0 0 8px rgba(29, 139, 51, 0.3)'
          }}
        >

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

          <h1 className="text-white text-2xl font-medium text-center mb-8">
            Aviator AI PREDICTOR
          </h1>

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

          <div className="text-center mb-6 h-6 mt-6">
            {statusText && (
              <p
                className="text-[#dbdd1c] text-[15.4px] font-medium"
                style={{ textShadow: '0 0 8px currentColor' }}
              >
                {statusText}
              </p>
            )}
          </div>

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

          <div className="w-full bg-[#0a0a0a] rounded-lg p-4 h-[9.6rem] overflow-y-auto">
            <div className="font-mono text-xs space-y-1">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`animate-fade-in ${
                    log.includes("SUCCESS") ? "text-[#2dff57]" : "text-[#a4cbc8]"
                  }`}
                  style={{ animationDuration: '0.3s', animationFillMode: 'both' }}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <p
              className="text-[#1d8b33] text-[10px] font-mono opacity-60 transition-opacity duration-500"
              style={{ textShadow: '0 0 4px rgba(29, 139, 51, 0.3)' }}
            >
              {getTechMessage(currentTechMsg)}
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="text-right font-mono text-[9px] text-[#1d8b33] opacity-50 space-y-0.5">
              <div>SYS {systemVersion}</div>
              <div>UPTIME {systemUptime}</div>
              <div>SYNC {lastSync}</div>
            </div>
          </div>

        </div>

      </div>

      {showHowToUseModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowHowToUseModal(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

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
            <button
              onClick={() => setShowHowToUseModal(false)}
              className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full h-full">
              {selectedCountry?.videoLinks.step5 ? (
                <a
                  href={selectedCountry.videoLinks.step5}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_32bsobektMxVyp4lNjf7TryrISo/6e6751ee-2019-4c01-a249-ea626e7e2bf9.png"
                    alt="How to use Predictor"
                    className="w-full h-full object-cover"
                  />
                </a>
              ) : (
                <div className="w-full h-full bg-[#1a1a1a]" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
