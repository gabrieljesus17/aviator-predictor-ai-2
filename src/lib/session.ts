// Gerenciamento de sessão e persistência

const SESSION_TIMEOUT = 40 * 60 * 1000; // 40 minutos em milissegundos

export interface LiveCard {
  id: number;
  username: string;
  amount: number;
}

// Verificar se a sessão está ativa
export const isSessionActive = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const accessGranted = localStorage.getItem('access_granted');
  const lastActivity = localStorage.getItem('last_activity_timestamp');
  
  if (accessGranted !== 'true' || !lastActivity) {
    return false;
  }
  
  const now = Date.now();
  const lastActivityTime = parseInt(lastActivity, 10);
  
  // Verificar se passou de 40 minutos
  if (now - lastActivityTime > SESSION_TIMEOUT) {
    clearSession();
    return false;
  }
  
  return true;
};

// Atualizar timestamp de atividade
export const updateActivity = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('last_activity_timestamp', Date.now().toString());
};

// Conceder acesso
export const grantAccess = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_granted', 'true');
  updateActivity();
};

// Limpar sessão
export const clearSession = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_granted');
  localStorage.removeItem('last_activity_timestamp');
};

// Gerar valor aleatório entre 800 e 60.000 ZMW com distribuição específica
const generateRandomAmount = (): number => {
  const rand = Math.random();
  
  // 25% → valores entre 800 e 5.000
  if (rand < 0.25) {
    return Math.floor(Math.random() * (5000 - 800 + 1)) + 800;
  } 
  // 30% → valores entre 5.001 e 20.000
  else if (rand < 0.55) {
    return Math.floor(Math.random() * (20000 - 5001 + 1)) + 5001;
  } 
  // 30% → valores entre 20.001 e 45.000
  else if (rand < 0.85) {
    return Math.floor(Math.random() * (45000 - 20001 + 1)) + 20001;
  } 
  // 15% → valores entre 45.001 e 60.000
  else {
    return Math.floor(Math.random() * (60000 - 45001 + 1)) + 45001;
  }
};

// Gerar username aleatório
const generateUsername = (): string => {
  const digits = Math.random() < 0.5 ? 3 : 4;
  const randomNum = Math.floor(Math.random() * Math.pow(10, digits));
  return `username${randomNum.toString().padStart(digits, '0')}`;
};

// Obter ou criar lista de cards fixos
export const getLiveUsersFeed = (): LiveCard[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('live_users_feed');
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Gerar lista inicial de 10 a 15 items
  const count = Math.floor(Math.random() * 6) + 10; // 10 a 15
  const feed: LiveCard[] = [];
  
  for (let i = 0; i < count; i++) {
    feed.push({
      id: Date.now() + i,
      username: generateUsername(),
      amount: generateRandomAmount(),
    });
  }
  
  localStorage.setItem('live_users_feed', JSON.stringify(feed));
  return feed;
};
