// Configuração global de países

export interface CountryValueDistribution {
  // Porcentagem e faixa de valores
  range1: { percent: number; min: number; max: number }; // 38%
  range2: { percent: number; min: number; max: number }; // 38%
  range3: { percent: number; min: number; max: number }; // 16%
  range4: { percent: number; min: number; max: number }; // 8%
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  valueDistribution: CountryValueDistribution;
  betAmountRange: {
    min: number;
    max: number;
  };
  accessCodeLink: string | null; // null = não ativo ainda
  videoLinks: {
    step4: string | null; // null = não ativo ainda
    step5: string | null; // null = não ativo ainda
  };
}

// Mapa único de configuração por país
export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  ZM: {
    code: 'ZM',
    name: 'Zambia',
    flag: '🇿🇲',
    currencyCode: 'ZMW',
    currencySymbol: 'ZMW',
    valueDistribution: {
      range1: { percent: 38, min: 180, max: 1800 },
      range2: { percent: 38, min: 1801, max: 4300 },
      range3: { percent: 16, min: 4301, max: 9000 },
      range4: { percent: 8, min: 9001, max: 18000 },
    },
    betAmountRange: {
      min: 10,
      max: 100,
    },
    accessCodeLink: 'https://chat.whatsapp.com/Ck2k9k41NCO2JAdiXPabmA',
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  KE: {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    currencyCode: 'KES',
    currencySymbol: 'KES',
    valueDistribution: {
      range1: { percent: 38, min: 1200, max: 12300 },
      range2: { percent: 38, min: 12301, max: 29600 },
      range3: { percent: 16, min: 29601, max: 61800 },
      range4: { percent: 8, min: 60801, max: 123500 },
    },
    betAmountRange: {
      min: 50,
      max: 700,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: 'https://t.me/predictormanager_bot?start=698cedbb33b8fbb4f602151f',
      step5: null,
    },
  },
  GH: {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    currencyCode: 'GHS',
    currencySymbol: 'GHS',
    valueDistribution: {
      range1: { percent: 38, min: 100, max: 1000 },
      range2: { percent: 38, min: 1001, max: 2500 },
      range3: { percent: 16, min: 2501, max: 5200 },
      range4: { percent: 8, min: 5201, max: 10500 },
    },
    betAmountRange: {
      min: 4,
      max: 60,
    },
    accessCodeLink: 'https://t.me/predictormanager_bot?start=698cedbb33b8fbb4f602151f',
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  NG: {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    currencyCode: 'NGN',
    currencySymbol: 'NGN',
    valueDistribution: {
      range1: { percent: 38, min: 13700, max: 137000 },
      range2: { percent: 38, min: 137001, max: 329000 },
      range3: { percent: 16, min: 329001, max: 685000 },
      range4: { percent: 8, min: 685001, max: 1370000 },
    },
    betAmountRange: {
      min: 500,
      max: 8000,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  ZA: {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    currencyCode: 'ZAR',
    currencySymbol: 'ZAR',
    valueDistribution: {
      range1: { percent: 38, min: 150, max: 1500 },
      range2: { percent: 38, min: 1501, max: 3600 },
      range3: { percent: 16, min: 3601, max: 7600 },
      range4: { percent: 8, min: 7601, max: 15300 },
    },
    betAmountRange: {
      min: 6,
      max: 90,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  TZ: {
    code: 'TZ',
    name: 'Tanzania',
    flag: '🇹🇿',
    currencyCode: 'TZS',
    currencySymbol: 'TZS',
    valueDistribution: {
      range1: { percent: 38, min: 24000, max: 240000 },
      range2: { percent: 38, min: 240001, max: 580000 },
      range3: { percent: 16, min: 580001, max: 1220000 },
      range4: { percent: 8, min: 1220001, max: 2400000 },
    },
    betAmountRange: {
      min: 900,
      max: 14000,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  PH: {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    currencyCode: 'PHP',
    currencySymbol: 'PHP',
    valueDistribution: {
      range1: { percent: 38, min: 560, max: 5600 },
      range2: { percent: 38, min: 5601, max: 13400 },
      range3: { percent: 16, min: 13401, max: 28000 },
      range4: { percent: 8, min: 28001, max: 56000 },
    },
    betAmountRange: {
      min: 22,
      max: 350,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  IN: {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currencyCode: 'INR',
    currencySymbol: 'INR',
    valueDistribution: {
      range1: { percent: 38, min: 870, max: 8700 },
      range2: { percent: 38, min: 8701, max: 20800 },
      range3: { percent: 16, min: 20801, max: 43000 },
      range4: { percent: 8, min: 43001, max: 87000 },
    },
    betAmountRange: {
      min: 30,
      max: 500,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  BD: {
    code: 'BD',
    name: 'Bangladesh',
    flag: '🇧🇩',
    currencyCode: 'BDT',
    currencySymbol: 'BDT',
    valueDistribution: {
      range1: { percent: 38, min: 1170, max: 11700 },
      range2: { percent: 38, min: 11701, max: 28000 },
      range3: { percent: 16, min: 28001, max: 58000 },
      range4: { percent: 8, min: 58001, max: 117000 },
    },
    betAmountRange: {
      min: 40,
      max: 700,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  TR: {
    code: 'TR',
    name: 'Turkey',
    flag: '🇹🇷',
    currencyCode: 'TRY',
    currencySymbol: 'TRY',
    valueDistribution: {
      range1: { percent: 38, min: 410, max: 4100 },
      range2: { percent: 38, min: 4101, max: 10000 },
      range3: { percent: 16, min: 10001, max: 20900 },
      range4: { percent: 8, min: 20901, max: 41000 },
    },
    betAmountRange: {
      min: 16,
      max: 250,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  AO: {
    code: 'AO',
    name: 'Angola',
    flag: '🇦🇴',
    currencyCode: 'AOA',
    currencySymbol: 'AOA',
    valueDistribution: {
      range1: { percent: 38, min: 8800, max: 88000 },
      range2: { percent: 38, min: 88001, max: 213000 },
      range3: { percent: 16, min: 213001, max: 444000 },
      range4: { percent: 8, min: 444001, max: 888000 },
    },
    betAmountRange: {
      min: 350,
      max: 5000,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  ID: {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    currencyCode: 'IDR',
    currencySymbol: 'IDR',
    valueDistribution: {
      range1: { percent: 38, min: 160000, max: 1600000 },
      range2: { percent: 38, min: 1600001, max: 3840000 },
      range3: { percent: 16, min: 3840001, max: 8000000 },
      range4: { percent: 8, min: 8000001, max: 16000000 },
    },
    betAmountRange: {
      min: 6000,
      max: 95000,
    },
    accessCodeLink: null,
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
  OTHER: {
    code: 'OTHER',
    name: 'Other',
    flag: '🌍',
    currencyCode: 'USD',
    currencySymbol: 'USD',
    valueDistribution: {
      range1: { percent: 38, min: 9.6, max: 96 },
      range2: { percent: 38, min: 96.1, max: 230 },
      range3: { percent: 16, min: 230.1, max: 480 },
      range4: { percent: 8, min: 480.01, max: 960 },
    },
    betAmountRange: {
      min: 1,
      max: 5,
    },
    accessCodeLink: 'https://t.me/predictormanager_bot?start=698148aa63db28fcd50eae88',
    videoLinks: {
      step4: null,
      step5: null,
    },
  },
};

// Lista ordenada de países para exibição (Other por último)
export const COUNTRY_LIST = [
  'KE', 'GH', 'ZM', 'NG', 'ZA', 'TZ', 'PH', 'IN', 'BD', 'TR', 'AO', 'ID', 'OTHER'
];