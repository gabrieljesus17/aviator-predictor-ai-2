"use client";

import { useCountry } from '@/contexts/CountryContext';
import { COUNTRY_CONFIGS, COUNTRY_LIST } from '@/lib/country-config';

interface CountrySelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CountrySelector({ isOpen, onClose }: CountrySelectorProps) {
  const { setCountry } = useCountry();

  if (!isOpen) return null;

  const handleSelectCountry = (countryCode: string) => {
    setCountry(countryCode);
    onClose();
  };

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
        <h2 className="text-white text-2xl font-semibold text-center mb-2">
          Set your operating region
        </h2>

        {/* Lista de países */}
        <div className="mt-6 space-y-2 max-h-[60vh] overflow-y-auto">
          {COUNTRY_LIST.map((countryCode, index) => {
            const country = COUNTRY_CONFIGS[countryCode];
            const isOther = countryCode === 'OTHER';

            return (
              <div key={countryCode}>
                {/* Separador antes de "Other" */}
                {isOther && (
                  <div className="my-4 flex items-center gap-3">
                    <div className="flex-1 h-[1px] bg-[#2dff57]/20"></div>
                    <span className="text-gray-500 text-xs">OR</span>
                    <div className="flex-1 h-[1px] bg-[#2dff57]/20"></div>
                  </div>
                )}

                <button
                  onClick={() => handleSelectCountry(countryCode)}
                  className="w-full bg-[#0f0f0f] hover:bg-[#1f1f1f] border border-[#2dff57]/20 hover:border-[#2dff57]/50 rounded-lg p-4 flex items-center gap-4 transition-all group"
                >
                  {/* Bandeira */}
                  <span className="text-3xl">{country.flag}</span>

                  {/* Nome do país */}
                  <span className="text-white text-lg font-medium group-hover:text-[#2dff57] transition-colors">
                    {country.name}
                  </span>
                </button>
              </div>
            );
          })}
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
