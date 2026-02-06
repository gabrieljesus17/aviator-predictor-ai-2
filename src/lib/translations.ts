// Sistema de traduções multi-idioma

export type Language = 'en' | 'bn' | 'tr' | 'pt' | 'id';

// Mapeamento de país para idioma
export const COUNTRY_TO_LANGUAGE: Record<string, Language> = {
  KE: 'en', // Kenya
  GH: 'en', // Ghana
  ZM: 'en', // Zambia
  NG: 'en', // Nigeria
  ZA: 'en', // South Africa
  TZ: 'en', // Tanzania
  PH: 'en', // Philippines
  IN: 'en', // India
  BD: 'bn', // Bangladesh
  TR: 'tr', // Turkey
  AO: 'pt', // Angola
  ID: 'id', // Indonesia
  OTHER: 'en', // Other
};

// Tipo para as chaves de tradução
export type TranslationKey =
  // Step-1
  | 'get_ai_signals'
  // Step-2
  | 'unlock_ai_access'
  | 'enter_access_code'
  | 'access_code'
  | 'validate'
  | 'high_demand_message'
  | 'access_code_info'
  | 'get_my_access_code'
  | 'decrypting'
  | 'access_granted'
  // Step-3
  | 'logout'
  | 'my_students'
  | 'live'
  | 'ai_signals'
  | 'activate'
  | 'support'
  // Step-4
  | 'back'
  | 'find_aviator_game'
  | 'how_to_find_aviator'
  | 'i_found_game'
  // Step-5
  | 'how_to_use_predictor'
  | 'get_bet_size'
  | 'get_signal'
  | 'analyzing_data'
  | 'get_another_signal';

// Objeto de traduções
export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    // Step-1
    get_ai_signals: 'GET AI SIGNALS',
    // Step-2
    unlock_ai_access: 'UNLOCK AI ACCESS',
    enter_access_code: 'Enter your access code to continue',
    access_code: 'Access Code',
    validate: 'VALIDATE',
    high_demand_message: 'Due to high demand, access codes are rate-limited to 50 new users per hour.',
    access_code_info: "If you haven't gotten your access code yet, request it to unlock full access.",
    get_my_access_code: 'GET MY ACCESS CODE',
    decrypting: 'Decrypting...',
    access_granted: 'ACCESS GRANTED',
    // Step-3
    logout: 'Logout',
    my_students: 'MY STUDENTS',
    live: 'LIVE',
    ai_signals: 'AI SIGNALS',
    activate: 'ACTIVATE',
    support: 'Support',
    // Step-4
    back: 'Back',
    find_aviator_game: 'First, find the "Aviator" game',
    how_to_find_aviator: 'HOW TO FIND AVIATOR ON THE WEBSITE',
    i_found_game: 'I FOUND THE GAME',
    // Step-5
    how_to_use_predictor: 'HOW TO USE PREDICTOR',
    get_bet_size: 'Get Bet Size',
    get_signal: 'Get Signal',
    analyzing_data: 'Analyzing data…',
    get_another_signal: 'Get another Signal',
  },
  bn: {
    // Step-1
    get_ai_signals: 'এআই সিগন্যাল পান',
    // Step-2
    unlock_ai_access: 'এআই অ্যাক্সেস আনলক করুন',
    enter_access_code: 'চালিয়ে যেতে আপনার অ্যাক্সেস কোড লিখুন',
    access_code: 'অ্যাক্সেস কোড',
    validate: 'যাচাই করুন',
    high_demand_message: 'উচ্চ চাহিদার কারণে, প্রতি ঘণ্টায় ৫০ জন নতুন ব্যবহারকারীর জন্য অ্যাক্সেস কোড সীমিত।',
    access_code_info: 'যদি আপনি এখনও আপনার অ্যাক্সেস কোড না পেয়ে থাকেন, সম্পূর্ণ অ্যাক্সেসের জন্য অনুরোধ করুন।',
    get_my_access_code: 'আমার অ্যাক্সেস কোড পান',
    decrypting: 'ডিক্রিপ্ট করা হচ্ছে...',
    access_granted: 'অ্যাক্সেস অনুমোদিত',
    // Step-3
    logout: 'লগআউট',
    my_students: 'আমার ছাত্রছাত্রীরা',
    live: 'লাইভ',
    ai_signals: 'এআই সিগন্যাল',
    activate: 'সক্রিয় করুন',
    support: 'সহায়তা',
    // Step-4
    back: 'পিছনে',
    find_aviator_game: 'প্রথমে, "Aviator" গেমটি খুঁজুন',
    how_to_find_aviator: 'ওয়েবসাইটে AVIATOR কীভাবে খুঁজবেন',
    i_found_game: 'আমি গেমটি খুঁজে পেয়েছি',
    // Step-5
    how_to_use_predictor: 'প্রেডিক্টর কীভাবে ব্যবহার করবেন',
    get_bet_size: 'বেট সাইজ পান',
    get_signal: 'সিগন্যাল পান',
    analyzing_data: 'ডেটা বিশ্লেষণ করা হচ্ছে…',
    get_another_signal: 'আরেকটি সিগন্যাল পান',
  },
  tr: {
    // Step-1
    get_ai_signals: 'YAPAY ZEKA SİNYALLERİ AL',
    // Step-2
    unlock_ai_access: 'YAPAY ZEKA ERİŞİMİNİ AÇ',
    enter_access_code: 'Devam etmek için erişim kodunuzu girin',
    access_code: 'Erişim Kodu',
    validate: 'DOĞRULA',
    high_demand_message: 'Yoğun talep nedeniyle, erişim kodları saatte 50 yeni kullanıcı ile sınırlandırılmıştır.',
    access_code_info: 'Henüz erişim kodunuzu almadıysanız, tam erişim için talep edin.',
    get_my_access_code: 'ERİŞİM KODUMU AL',
    decrypting: 'Şifre çözülüyor...',
    access_granted: 'ERİŞİM ONAYLANDI',
    // Step-3
    logout: 'Çıkış',
    my_students: 'ÖĞRENCİLERİM',
    live: 'CANLI',
    ai_signals: 'YAPAY ZEKA SİNYALLERİ',
    activate: 'AKTİF ET',
    support: 'Destek',
    // Step-4
    back: 'Geri',
    find_aviator_game: 'Önce "Aviator" oyununu bulun',
    how_to_find_aviator: 'WEB SİTESİNDE AVIATOR NASIL BULUNUR',
    i_found_game: 'OYUNU BULDUM',
    // Step-5
    how_to_use_predictor: 'TAHMİNCİ NASIL KULLANILIR',
    get_bet_size: 'Bahis Miktarını Al',
    get_signal: 'Sinyal Al',
    analyzing_data: 'Veriler analiz ediliyor…',
    get_another_signal: 'Başka Bir Sinyal Al',
  },
  pt: {
    // Step-1
    get_ai_signals: 'OBTER SINAIS IA',
    // Step-2
    unlock_ai_access: 'DESBLOQUEAR ACESSO IA',
    enter_access_code: 'Insira o seu código de acesso para continuar',
    access_code: 'Código de Acesso',
    validate: 'VALIDAR',
    high_demand_message: 'Devido à alta procura, os códigos de acesso estão limitados a 50 novos utilizadores por hora.',
    access_code_info: 'Se ainda não obteve o seu código de acesso, solicite-o para desbloquear o acesso completo.',
    get_my_access_code: 'OBTER O MEU CÓDIGO',
    decrypting: 'A desencriptar...',
    access_granted: 'ACESSO CONCEDIDO',
    // Step-3
    logout: 'Sair',
    my_students: 'OS MEUS ALUNOS',
    live: 'AO VIVO',
    ai_signals: 'SINAIS IA',
    activate: 'ATIVAR',
    support: 'Apoio',
    // Step-4
    back: 'Voltar',
    find_aviator_game: 'Primeiro, encontre o jogo "Aviator"',
    how_to_find_aviator: 'COMO ENCONTRAR AVIATOR NO WEBSITE',
    i_found_game: 'ENCONTREI O JOGO',
    // Step-5
    how_to_use_predictor: 'COMO USAR O PREVISOR',
    get_bet_size: 'Obter Valor da Aposta',
    get_signal: 'Obter Sinal',
    analyzing_data: 'A analisar dados…',
    get_another_signal: 'Obter Outro Sinal',
  },
  id: {
    // Step-1
    get_ai_signals: 'DAPATKAN SINYAL AI',
    // Step-2
    unlock_ai_access: 'BUKA AKSES AI',
    enter_access_code: 'Masukkan kode akses Anda untuk melanjutkan',
    access_code: 'Kode Akses',
    validate: 'VALIDASI',
    high_demand_message: 'Karena permintaan tinggi, kode akses dibatasi hingga 50 pengguna baru per jam.',
    access_code_info: 'Jika Anda belum mendapatkan kode akses, minta untuk membuka akses penuh.',
    get_my_access_code: 'DAPATKAN KODE AKSES SAYA',
    decrypting: 'Mendekripsi...',
    access_granted: 'AKSES DIBERIKAN',
    // Step-3
    logout: 'Keluar',
    my_students: 'SISWA SAYA',
    live: 'LANGSUNG',
    ai_signals: 'SINYAL AI',
    activate: 'AKTIFKAN',
    support: 'Dukungan',
    // Step-4
    back: 'Kembali',
    find_aviator_game: 'Pertama, temukan game "Aviator"',
    how_to_find_aviator: 'CARA MENEMUKAN AVIATOR DI WEBSITE',
    i_found_game: 'SAYA MENEMUKAN GAME',
    // Step-5
    how_to_use_predictor: 'CARA MENGGUNAKAN PREDIKTOR',
    get_bet_size: 'Dapatkan Ukuran Taruhan',
    get_signal: 'Dapatkan Sinyal',
    analyzing_data: 'Menganalisis data…',
    get_another_signal: 'Dapatkan Sinyal Lain',
  },
};
