/**
 * Web Speech API TTS helper for Korean preschool Hangul pronunciation.
 */

class SpeechEngine {
  private isEnabled: boolean = true;
  private koreanVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Find Korean voice if available
    const krVoice = voices.find((v) => v.lang.startsWith('ko') || v.lang.includes('KR'));
    if (krVoice) {
      this.koreanVoice = krVoice;
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public toggle(): boolean {
    this.setEnabled(!this.isEnabled);
    return this.isEnabled;
  }

  public speak(text: string, rate: number = 0.9, pitch: number = 1.1) {
    if (!this.isEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = rate; // Slightly slower for 4-year-old clarity
      utterance.pitch = pitch; // Slightly friendly cheerful tone

      if (this.koreanVoice) {
        utterance.voice = this.koreanVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis fallback without crash
    }
  }

  public speakConsonant(letter: string, name: string) {
    this.speak(`${name}! ${letter}`);
  }

  public speakPraise() {
    const praises = [
      '참 잘했어요!',
      '와! 최고예요!',
      '맞았어요! 멋져요!',
      '대단해요! 짝짝짝!',
      '정말 잘 찾았어요!',
    ];
    const praise = praises[Math.floor(Math.random() * praises.length)];
    this.speak(praise, 1.0, 1.2);
  }

  public speakEncourage() {
    const encourages = [
      '괜찮아요! 한 번 더 찾아볼까요?',
      '다시 해봐요! 할 수 있어요!',
      '어떤 글자일까? 한 번 더 골라봐요!',
    ];
    const encourage = encourages[Math.floor(Math.random() * encourages.length)];
    this.speak(encourage, 0.95, 1.1);
  }
}

export const speech = new SpeechEngine();
