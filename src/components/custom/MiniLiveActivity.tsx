"use client";

import { useEffect, useState, useRef, memo } from "react";

interface MiniCard {
  id: number;
  username: string;
  amount: number;
}

function MiniLiveActivity() {
  const [visibleCards, setVisibleCards] = useState<MiniCard[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Função para gerar valor aleatório com distribuição específica
  const generateRandomAmount = (): number => {
    const rand = Math.random();

    if (rand < 0.25) {
      return Math.floor(Math.random() * (5000 - 800 + 1)) + 800;
    } else if (rand < 0.55) {
      return Math.floor(Math.random() * (20000 - 5001 + 1)) + 5001;
    } else if (rand < 0.85) {
      return Math.floor(Math.random() * (45000 - 20001 + 1)) + 20001;
    } else {
      return Math.floor(Math.random() * (60000 - 45001 + 1)) + 45001;
    }
  };

  // Função para gerar username aleatório
  const generateUsername = (): string => {
    const digits = Math.random() < 0.5 ? 3 : 4;
    const randomNum = Math.floor(Math.random() * Math.pow(10, digits));
    return `username${randomNum.toString().padStart(digits, '0')}`;
  };

  // Função para criar um novo card aleatório
  const createRandomCard = (): MiniCard => {
    return {
      id: Date.now() + Math.random(),
      username: generateUsername(),
      amount: generateRandomAmount(),
    };
  };

  // Função para formatar valor com separador de milhar usando ponto
  const formatAmount = (amount: number): string => {
    return `${amount.toLocaleString('en-US').replace(/,/g, '.')} ZMW`;
  };

  // Função para agendar próxima geração
  const scheduleNextCard = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Intervalo mais rápido: entre 4 e 7 segundos para manter 2-3 cards visíveis
    const randomInterval = Math.floor(Math.random() * (7000 - 4000 + 1)) + 4000;

    timerRef.current = setTimeout(() => {
      const newCard = createRandomCard();

      setVisibleCards((prev) => {
        const newCards = [...prev, newCard];
        // Manter apenas os últimos 3 cards para mostrar 2-3 visíveis
        return newCards.slice(-3);
      });

      scheduleNextCard();
    }, randomInterval);
  };

  // Inicialização: gerar 2 cards iniciais e iniciar ciclo
  useEffect(() => {
    const initialCards: MiniCard[] = [
      createRandomCard(),
      createRandomCard(),
    ];
    setVisibleCards(initialCards);

    const startDelay = setTimeout(() => {
      scheduleNextCard();
    }, 1000);

    return () => {
      clearTimeout(startDelay);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full mb-4">
      {/* Cards roláveis horizontalmente - versão mini e passiva */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-1 justify-center">
          {visibleCards.slice().reverse().map((card, idx) => (
            <div
              key={`${card.id}-${Date.now()}-${idx}`}
              className="flex-shrink-0 bg-[#1a1a1a] rounded-lg p-2.5 flex items-center gap-2.5 min-w-[180px] animate-slideIn pointer-events-none"
            >
              {/* Avatar com imagem - versão mini */}
              <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden bg-[#1a1a1a]">
                <img
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/018d5f5f-061f-4940-a806-d5600e0b78b5.png"
                  alt="Aviator"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informações à direita - versão mini */}
              <div className="flex flex-col">
                <span
                  className="text-white text-xs font-medium"
                  style={{
                    textShadow: '0 0 6px rgba(175, 247, 23, 0.4)'
                  }}
                >
                  {card.username}
                </span>
                <span
                  className="text-[#aff717] text-[11px] font-semibold"
                  style={{
                    textShadow: '0 0 6px rgba(175, 247, 23, 0.5)'
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
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default memo(MiniLiveActivity);
