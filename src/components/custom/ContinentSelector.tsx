"use client";

export interface ContinentOption {
  code: string;
  name: string;
  icon: string;
}

export const CONTINENT_LIST: ContinentOption[] = [
  { code: 'africa', name: 'Africa', icon: '/africa-logo.png' },
  { code: 'centralandsouthamerica', name: 'Central and South America', icon: '/america-central-e-sul.png' },
  { code: 'northamerica', name: 'North America', icon: '/america-do-norte.png' },
  { code: 'europe', name: 'Europe', icon: '/europa.png' },
  { code: 'asia', name: 'Asia', icon: '/asia.png' },
];

interface ContinentSelectorProps {
  isOpen: boolean;
  onSelect: (continentCode: string) => void;
  onClose: () => void;
}

export default function ContinentSelector({ isOpen, onSelect, onClose }: ContinentSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop com blur */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div
        className="relative w-full max-w-md bg-[#1a1a1a] rounded-2xl p-6 border border-[#2dff57]/30 shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Título */}
        <h2 className="text-white text-2xl font-semibold text-center mb-1">
          Set your continent
        </h2>
        <div className="mt-1 flex flex-col items-center gap-0.5">
          <p className="text-gray-400 text-sm text-center">
            Selecciona tu continente
          </p>
          <p className="text-[#2dff57]/60 text-xs text-center tracking-wide">
            Choisissez votre continent
          </p>
        </div>

        {/* Lista de continentes */}
        <div className="mt-6 space-y-2 max-h-[60vh] overflow-y-auto">
          {CONTINENT_LIST.map((continent) => (
            <button
              key={continent.code}
              onClick={() => onSelect(continent.code)}
              className="w-full bg-[#0f0f0f] hover:bg-[#1f1f1f] border border-[#2dff57]/20 hover:border-[#2dff57]/50 rounded-lg p-4 flex items-center gap-4 transition-all group"
            >
              {/* Símbolo do continente */}
              <img
                src={continent.icon}
                alt={continent.name}
                className="w-9 h-9 object-contain flex-shrink-0"
              />

              {/* Nome do continente */}
              <span className="text-white text-lg font-medium group-hover:text-[#2dff57] transition-colors">
                {continent.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
