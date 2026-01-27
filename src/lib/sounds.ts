// Sistema de sons UI usando Web Audio API
// Garante que cada som toque apenas uma vez por ação, sem loops ou duplicações

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;
  private masterVolume = 0.3; // Volume geral controlado

  // Inicializar AudioContext após primeira interação do usuário
  private initAudioContext() {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API não suportada');
    }
  }

  // Som de Click - leve e neutro (para todos os botões)
  playClick() {
    this.initAudioContext();
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Frequência média-alta, som limpo
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.type = 'sine';

    // Envelope ADSR curto e suave
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.4, now + 0.01); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08); // Release

    oscillator.start(now);
    oscillator.stop(now + 0.08);
  }

  // Success A - Access Code validado (confirmação/desbloqueio)
  playSuccessA() {
    this.initAudioContext();
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Tom limpo e positivo
    oscillator.frequency.setValueAtTime(600, now);
    oscillator.frequency.linearRampToValueAtTime(900, now + 0.15); // Leve subida
    oscillator.type = 'sine';

    // Envelope suave
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.5, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }

  // Success B - Sinal gerado (dopaminérgico/reward)
  playSuccessB() {
    this.initAudioContext();
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;

    // Tom 1 - base
    const osc1 = this.audioContext.createOscillator();
    const gain1 = this.audioContext.createGain();
    osc1.connect(gain1);
    gain1.connect(this.audioContext.destination);

    osc1.frequency.setValueAtTime(400, now);
    osc1.frequency.linearRampToValueAtTime(800, now + 0.25); // Progressão dopaminérgica
    osc1.type = 'sine';

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(this.masterVolume * 0.4, now + 0.03);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    // Tom 2 - harmônico (adiciona riqueza)
    const osc2 = this.audioContext.createOscillator();
    const gain2 = this.audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(this.audioContext.destination);

    osc2.frequency.setValueAtTime(600, now + 0.05);
    osc2.frequency.linearRampToValueAtTime(1200, now + 0.3);
    osc2.type = 'sine';

    gain2.gain.setValueAtTime(0, now + 0.05);
    gain2.gain.linearRampToValueAtTime(this.masterVolume * 0.3, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.start(now);
    osc1.stop(now + 0.3);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.35);
  }

  // Error Sound - Código incorreto
  playError() {
    this.initAudioContext();
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Frequência mais baixa e dissonante
    oscillator.frequency.setValueAtTime(300, now);
    oscillator.frequency.linearRampToValueAtTime(200, now + 0.12); // Descida = erro
    oscillator.type = 'square'; // Mais seco

    // Envelope curto e direto
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.5, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    oscillator.start(now);
    oscillator.stop(now + 0.12);
  }
}

// Instância única global
export const soundManager = new SoundManager();
