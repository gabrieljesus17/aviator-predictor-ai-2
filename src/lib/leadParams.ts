/**
 * Utilitário para transportar parâmetros de origem do lead (ex: ?origem=video_v1)
 * vindos de páginas/campanhas anteriores até o botão final da step-2.
 *
 * Os links base (Telegram / SendPulse) já existem por país em country-config.ts
 * e NÃO são alterados aqui — apenas anexamos os parâmetros ao final deles.
 *
 * Funciona para todas as variantes de país, pois a anexação ocorre sobre o
 * link final já selecionado (seja do country-config ou do override da África).
 */

const STORAGE_KEY = "lead_params";

/** Lê os params persistidos como um objeto (chave -> valor). */
function readStoredParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Grava o objeto de params no localStorage. */
function writeStoredParams(params: Record<string, string>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // ignora se o localStorage estiver indisponível (modo privado etc.)
  }
}

/**
 * Captura os query params atuais da URL e os mescla (merge) com os já
 * persistidos — params da URL sobrescrevem chaves iguais, mas chaves antigas
 * sem conflito são preservadas. Assim várias origens podem ser transportadas
 * ao longo do funil.
 *
 * Deve ser chamado no mount das páginas relevantes (step-1 e step-2).
 */
export function captureLeadParams(): void {
  if (typeof window === "undefined") return;
  const search = window.location.search;
  if (!search) return; // sem params na URL agora — mantém os persistidos

  const merged = readStoredParams();
  const searchParams = new URLSearchParams(search);
  searchParams.forEach((value, key) => {
    merged[key] = value;
  });
  writeStoredParams(merged);
}

/**
 * Retorna os params persistidos como query string SEM o '?' inicial
 * (ex.: "origem=video_v1&utm_source=fb"). String vazia se não houver.
 */
export function getLeadParamsString(): string {
  const params = readStoredParams();
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (key) sp.set(key, value);
  });
  const str = sp.toString();
  return str; // já vem sem '?'
}

/**
 * Retorna os params persistidos para anexar a uma rota interna,
 * com o '?' incluso (ex.: "?origem=video_v1"). Vazio se não houver.
 * Usado em router.push("/step-2" + getLeadParamsForRoute()).
 */
export function getLeadParamsForRoute(): string {
  const str = getLeadParamsString();
  return str ? `?${str}` : "";
}

/**
 * Anexa os params persistidos ao final de uma URL de destino.
 * - Sem params: retorna a baseUrl inalterada (link padrão direto).
 * - Base com '?': anexa com '&' (ex.: t.me/bot?start=xyz&origem=video_v1).
 * - Base sem '?': anexa com '?' (ex.: aviatorpredictor.world/chat-zm?origem=video_v1).
 */
export function appendLeadParamsToUrl(baseUrl: string | null | undefined): string | null | undefined {
  if (!baseUrl) return baseUrl;
  const paramsStr = getLeadParamsString();
  if (!paramsStr) return baseUrl; // nada a anexar → link inalterado
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}${paramsStr}`;
}
