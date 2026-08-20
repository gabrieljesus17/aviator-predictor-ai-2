"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { grantAccess, updateActivity, isSessionActive } from "@/lib/session";
import { Unlock } from "lucide-react";
import { soundManager } from "@/lib/sounds";
import MiniLiveActivity from "@/components/custom/MiniLiveActivity";
import { useCountry } from "@/contexts/CountryContext";
import { useTranslation } from "@/hooks/useTranslation";
import { captureLeadParams, appendLeadParamsToUrl } from "@/lib/leadParams";

export default function EuropeStep2() {
  const router = useRouter();
  const { selectedCountry } = useCountry();
  const { t } = useTranslation();

  const accessCodeLink = selectedCountry?.accessCodeLink;
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  // Link final do botão = link base do país (country-config) + params de origem (?origem=...) anexados.
  const [finalAccessCodeLink, setFinalAccessCodeLink] = useState<string | null | undefined>(
    () => (typeof window !== "undefined" ? appendLeadParamsToUrl(accessCodeLink) : null)
  );

  useEffect(() => {
    // Captura params de origem da URL (chegada direta ou vindos da landing do continente)
    captureLeadParams();
    if (isSessionActive()) {
      router.push("/europe/step-3");
    }
  }, [router]);

  // Recalcula o link final quando o link base do país muda ou novos params chegam
  useEffect(() => {
    setFinalAccessCodeLink(appendLeadParamsToUrl(accessCodeLink));
  }, [accessCodeLink]);

  const handleUnlock = () => {
    updateActivity();
    soundManager.playClick();

    if (accessCode === "1898") {
      setError("");
      setShowPopup(true);
      setPopupText(t('decrypting'));

      setTimeout(() => {
        setPopupText(t('access_granted'));
        soundManager.playSuccessA();
        setTimeout(() => {
          grantAccess();
          router.push("/europe/step-3");
        }, 800);
      }, 2500);
    } else {
      setError("Invalid access code");
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
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">

        <div
          className="w-full rounded-2xl p-6 flex flex-col items-center gap-5"
          style={{
            background: 'linear-gradient(180deg, rgba(45, 255, 87, 0.08) 0%, rgba(255, 215, 0, 0.08) 50%, rgba(255, 140, 0, 0.08) 100%)',
            border: '1px solid transparent',
            backgroundClip: 'padding-box',
            position: 'relative',
          }}
        >
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

          <div className="relative z-10 w-full flex flex-col items-center gap-5">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center tracking-wide">
              {t('unlock_ai_access')}
            </h1>

            <p className="text-gray-400 text-base sm:text-lg text-center">
              {t('enter_access_code')}
            </p>

            <div className="w-full flex flex-col gap-2">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={t('access_code')}
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-[50%] mx-auto px-4 py-3 bg-[#1a1a1a] text-white text-center text-lg rounded-lg border border-[#2dff57] focus:border-[#2dff57] focus:outline-none transition-colors"
              />

              {error && (
                <p className="text-red-500 text-sm text-center">
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={handleUnlock}
              className="w-full py-[14.08px] bg-[#2dff57] text-black text-lg font-bold rounded-lg hover:bg-[#20c64e] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5" />
              {t('validate')}
            </button>

            <p className="text-gray-400/70 text-xs text-center mt-3">
              {t('high_demand_message')}
            </p>
          </div>
        </div>

        <MiniLiveActivity />

        <div className="w-full h-[1px] bg-[#2dff57]/20 my-4"></div>

        <p className="text-gray-400 text-[15px] text-center">
          {t('access_code_info')}
        </p>

        {accessCodeLink ? (
          <a
            href={finalAccessCodeLink ?? accessCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[70%] py-3 bg-black text-[#ff8c00] border border-[#ff8c00] text-base font-semibold rounded-lg hover:bg-[#0a0a0a] transition-all flex items-center justify-center animate-pulse"
          >
            {t('get_my_access_code')}
          </a>
        ) : (
          <button
            disabled
            className="w-[70%] py-3 bg-black text-[#ff8c00]/50 border border-[#ff8c00]/50 text-base font-semibold rounded-lg cursor-not-allowed flex items-center justify-center opacity-60"
          >
            {t('get_my_access_code')}
          </button>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] border border-[#2dff57] rounded-xl p-12 sm:p-16 md:p-20 backdrop-blur-md shadow-2xl">
            <p
              className={`text-[#2dff57] text-2xl sm:text-3xl font-bold text-center ${
                popupText === t('decrypting') ? "animate-pulse" : ""
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
