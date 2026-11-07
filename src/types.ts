export type StageId = 1 | 2 | 3;

export type GameType = 'FIND_EGG' | 'FILL_WORD' | 'FLOWER_MATCH';

export interface ConsonantInfo {
  letter: string;
  name: string; // 예: 기역
  sound: string; // 예: 그-
  sampleWord: string; // 예: 기린
  emoji: string; // 예: 🦒
  color: string;
}

export interface PictureOption {
  word: string;
  emoji: string;
  consonant: string;
  consonantName: string;
}

export interface QuizItem {
  id: number;
  stage: StageId;
  gameType: GameType;
  questionNumber: number; // 1 ~ 10
  targetConsonant: string; // 예: "ㄱ"
  consonantName: string; // 예: "기역"
  word: string; // 예: "기린"
  wordParts?: { text: string; isTarget: boolean }[]; // [ { text: "기", isTarget: true }, { text: "린", isTarget: false } ]
  blankWordDisplay?: string; // 예: "[ ? ] 린"
  emoji: string; // "🦒"
  options: string[]; // [ "ㄱ", "ㄴ", "ㄷ" ] for Stage 1 & 2
  pictureOptions?: PictureOption[]; // For Stage 3
  instruction: string; // 친근한 지시문
  audioPrompt: string; // TTS로 읽어줄 대사
}

export interface Butterfly {
  id: string;
  name: string; // 예: "호랑나비"
  englishName: string;
  wingsColor: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
  pattern: 'tiger' | 'swallow' | 'dots' | 'rainbow' | 'blossom' | 'stars' | 'aurora' | 'emerald' | 'pure' | 'sun';
  description: string;
  soundGreeting: string; // 예: "안녕! 나는 멋진 줄무늬 호랑나비야!"
  rarityStars: number;
}

export interface CollectedButterfly {
  butterflyId: string;
  collectedAt: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string; // 꼬마 탐험가 닉네임 (예: "씩씩한 호랑이", "지우")
  avatar: string; // 캐릭터 이모지 (예: 🦁, 🐰, 🦋, 🐥, 🐻)
  score: number; // 퀴즈 정답 수 / 별점
  butterfliesCount: number; // 모은 나비 마리 수
  date: string;
  isCurrentPlayer?: boolean;
}
