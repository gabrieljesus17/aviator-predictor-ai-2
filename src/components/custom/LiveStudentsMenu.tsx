"use client";

import { useEffect, useState } from "react";
import { getLiveUsersFeed, LiveCard } from "@/lib/session";

export default function LiveStudentsMenu() {
  const [sourceCards, setSourceCards] = useState<LiveCard[]>([]);
  const [visibleCards, setVisibleCards] = useState<LiveCard[]>([]);
  const [usedRecently, setUsedRecently] = useState<string[]>([]);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  // Carregar lista fixa do localStorage
  useEffect(() => {
    const feed = getLiveUsersFeed();
    setSourceCards(feed);
  }, []);

  // Função para formatar valor com separador de milhar usando ponto
  const formatAmount = (amount: number): string => {
    return `${amount.toLocaleString('en-US').replace(/,/g, '.')} ZMW`;
  };

  // Gerar 1 card por vez com delay aleatório
  useEffect(() => {
    if (sourceCards.length === 0) return;

    const scheduleNextCard = () => {
      const randomInterval = Math.floor(Math.random() * (14000 - 8000 + 1)) + 8000;

      setTimeout(() => {
        // Pegar próximo card da lista
        const nextCard = sourceCards[currentSourceIndex % sourceCards.length];
        const cardKey = `${nextCard.username}-${nextCard.amount}`;

        // Verificar se não foi usado recentemente
        if (!usedRecently.includes(cardKey)) {
          setVisibleCards((prev) => {
            const newCards = [...prev, nextCard];
            // Manter apenas os últimos 10 cards
            return newCards.slice(-10);
          });

          // Adicionar à lista de usados recentemente (manter últimos 5)
          setUsedRecently((prev) => {
            const newUsed = [...prev, cardKey];
            return newUsed.slice(-5);
          });
        }

        setCurrentSourceIndex((prev) => prev + 1);
        scheduleNextCard();
      }, randomInterval);
    };

    scheduleNextCard();
  }, [sourceCards, currentSourceIndex, usedRecently]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <h2 className="text-base font-medium text-white">MY STUDENTS</h2>
        <span className="bg-[#eb0f0f] text-white text-xs px-2 py-0.5 rounded-full font-medium">
          LIVE
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
