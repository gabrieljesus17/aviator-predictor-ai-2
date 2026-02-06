"use client";

import { useEffect, useState, useRef, memo } from "react";
import { LiveCard } from "@/lib/session";
import { useCountry } from "@/contexts/CountryContext";
import { useTranslation } from "@/hooks/useTranslation";

function LiveStudentsMenu() {
  const [visibleCards, setVisibleCards] = useState<LiveCard[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { selectedCountry } = useCountry();
  const { t } = useTranslation();

  // Função para gerar valor aleatório com distribuição específica baseada no país
  const generateRandomAmount = (): number => {
    // Usar país selecionado ou fallback para Zambia
    const config = selectedCountry || {
      valueDistribution: {
        range1: { percent: 25, min: 800, max: 5000 },
        range2: { percent: 30, min: 5001, max: 20000 },
        range3: { percent: 30, min: 20001, max: 45000 },
        range4: { percent: 15, min: 45001, max: 60000 },
      }
    };

    const rand = Math.random() * 100;
    const dist = config.valueDistribution;

    if (rand < dist.range1.percent) {
      return Math.floor(Math.random() * (dist.range1.max - dist.range1.min + 1)) + dist.range1.min;
    } else if (rand < (dist.range1.percent + dist.range2.percent)) {
      return Math.floor(Math.random() * (dist.range2.max - dist.range2.min + 1)) + dist.range2.min;
    } else if (rand < (dist.range1.percent + dist.range2.percent + dist.range3.percent)) {
      return Math.floor(Math.random() * (dist.range3.max - dist.range3.min + 1)) + dist.range3.min;
    } else {
      return Math.floor(Math.random() * (dist.range4.max - dist.range4.min + 1)) + dist.range4.min;
    }
  };

  // Função para gerar username aleatório
  const generateUsername = (): string => {
    const digits = Math.random() < 0.5 ? 3 : 4;
    const randomNum = Math.floor(Math.random() * Math.pow(10, digits));
    return `username${randomNum.toString().padStart(digits, '0')}`;
  };

  // Função para criar um novo card aleatório
  const createRandomCard = (): LiveCard => {
    return {
      id: Date.now() + Math.random(),
      username: generateUsername(),
      amount: generateRandomAmount(),
    };
  };

  // Função para formatar valor com separador de milhar usando ponto
  const formatAmount = (amount: number): string => {
    const currencySymbol = selectedCountry?.currencySymbol || 'ZMW';

    // Para moedas com casas decimais (USD em OTHER)
    if (selectedCountry?.currencyCode === 'USD') {
      return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbol}`;
    }

    // Para outras moedas inteiras
    return `${amount.toLocaleString('en-US').replace(/,/g, '.')} ${currencySymbol}`;
  };

  // Função para agendar próxima geração
  const scheduleNextCard = () => {
    // Limpar timer anterior se existir
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Calcular intervalo aleatório entre 8 e 14 segundos
    const randomInterval = Math.floor(Math.random() * (14000 - 8000 + 1)) + 8000;

    timerRef.current = setTimeout(() => {
      // Gerar novo card
      const newCard = createRandomCard();

      setVisibleCards((prev) => {
        const newCards = [...prev, newCard];
        // Manter apenas os últimos 10 cards
        return newCards.slice(-10);
      });

      // Agendar próximo card
      scheduleNextCard();
    }, randomInterval);
  };

  // Inicialização: gerar 2 cards iniciais e iniciar ciclo
  useEffect(() => {
    // Gerar 2 cards iniciais
    const initialCards: LiveCard[] = [
      createRandomCard(),
      createRandomCard(),
    ];
    setVisibleCards(initialCards);

    // Aguardar um momento e iniciar ciclo de geração
    const startDelay = setTimeout(() => {
      scheduleNextCard();
    }, 1000);

    // Cleanup: limpar timers ao desmontar
    return () => {
      clearTimeout(startDelay);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <h2 className="text-base font-medium text-white">{t('my_students')}</h2>
        <span className="bg-[#eb0f0f] text-white text-xs px-2 py-0.5 rounded-full font-medium">
          {t('live')}
        </span>
      </div>

      {/* Cards roláveis horizontalmente - ordem reversa (mais recente primeiro) */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-2">
          {visibleCards.slice().reverse().map((card, idx) => (
            <div
              key={`${card.id}-${Date.now()}-${idx}`}
              className="flex-shrink-0 bg-[#1a1a1a] rounded-lg p-3 flex items-center gap-3 min-w-[200px] animate-slideIn"
            >
              {/* Avatar com imagem */}
              <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden bg-[#1a1a1a]">
                <img
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/018d5f5f-061f-4940-a806-d5600e0b78b5.png"
                  alt="Aviator"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informações à direita */}
              <div className="flex flex-col">
                <span
                  className="text-white text-sm font-medium"
                  style={{
                    textShadow: '0 0 8px rgba(175, 247, 23, 0.5)'
                  }}
                >
                  {card.username}
                </span>
                <span
                  className="text-[#aff717] text-xs font-semibold"
                  style={{
                    textShadow: '0 0 8px rgba(175, 247, 23, 0.6)'
                  }}
                >
                  {formatAmount(card.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Exportar com memo para evitar re-renders desnecessários
export default memo(LiveStudentsMenu);
