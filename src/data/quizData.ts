import { ConsonantInfo, QuizItem, PictureOption, StageId } from '../types';

export const CONSONANTS_DATA: ConsonantInfo[] = [
  { letter: 'ㄱ', name: '기역', sound: '그', sampleWord: '기린', emoji: '🦒', color: 'from-amber-400 to-orange-500' },
  { letter: 'ㄴ', name: '니은', sound: '느', sampleWord: '나비', emoji: '🦋', color: 'from-emerald-400 to-teal-500' },
  { letter: 'ㄷ', name: '디귿', sound: '드', sampleWord: '당근', emoji: '🥕', color: 'from-orange-400 to-amber-600' },
  { letter: 'ㄹ', name: '리을', sound: '르', sampleWord: '라디오', emoji: '📻', color: 'from-sky-400 to-blue-500' },
  { letter: 'ㅁ', name: '미음', sound: '므', sampleWord: '모자', emoji: '🧢', color: 'from-pink-400 to-rose-500' },
  { letter: 'ㅂ', name: '비읍', sound: '브', sampleWord: '바나나', emoji: '🍌', color: 'from-yellow-400 to-amber-500' },
  { letter: 'ㅅ', name: '시옷', sound: '스', sampleWord: '사과', emoji: '🍎', color: 'from-red-400 to-rose-600' },
  { letter: 'ㅇ', name: '이응', sound: '으', sampleWord: '오리', emoji: '🦆', color: 'from-indigo-400 to-violet-500' },
  { letter: 'ㅈ', name: '지읒', sound: '즈', sampleWord: '자동차', emoji: '🚗', color: 'from-cyan-400 to-teal-600' },
  { letter: 'ㅊ', name: '치읓', sound: '츠', sampleWord: '치타', emoji: '🐆', color: 'from-lime-400 to-green-600' },
  { letter: 'ㅋ', name: '키읔', sound: '크', sampleWord: '코끼리', emoji: '🐘', color: 'from-blue-400 to-indigo-600' },
  { letter: 'ㅌ', name: '티읕', sound: '트', sampleWord: '토끼', emoji: '🐰', color: 'from-fuchsia-400 to-pink-600' },
  { letter: 'ㅍ', name: '피읖', sound: '프', sampleWord: '포도', emoji: '🍇', color: 'from-purple-400 to-violet-600' },
  { letter: 'ㅎ', name: '히읗', sound: '흐', sampleWord: '호랑이', emoji: '🐯', color: 'from-amber-500 to-red-500' },
];

export interface WordEntry {
  word: string;
  emoji: string;
}

// Rich word bank per consonant so games never feel repetitive!
export const WORD_BANK: Record<string, WordEntry[]> = {
  'ㄱ': [
    { word: '가지', emoji: '🍆' },
    { word: '기린', emoji: '🦒' },
    { word: '고구마', emoji: '🍠' },
    { word: '가방', emoji: '🎒' },
    { word: '개구리', emoji: '🐸' },
    { word: '거북이', emoji: '🐢' },
    { word: '고양이', emoji: '🐱' },
    { word: '경찰차', emoji: '🚓' },
  ],
  'ㄴ': [
    { word: '나비', emoji: '🦋' },
    { word: '나무', emoji: '🌲' },
    { word: '눈사람', emoji: '⛄' },
    { word: '낙타', emoji: '🐫' },
    { word: '노루', emoji: '🦌' },
    { word: '냄비', emoji: '🍲' },
  ],
  'ㄷ': [
    { word: '당근', emoji: '🥕' },
    { word: '다람쥐', emoji: '🐿️' },
    { word: '딸기', emoji: '🍓' },
    { word: '도토리', emoji: '🌰' },
    { word: '달팽이', emoji: '🐌' },
    { word: '돼지', emoji: '🐷' },
  ],
  'ㄹ': [
    { word: '라디오', emoji: '📻' },
    { word: '레몬', emoji: '🍋' },
    { word: '로봇', emoji: '🤖' },
    { word: '리본', emoji: '🎀' },
    { word: '라면', emoji: '🍜' },
  ],
  'ㅁ': [
    { word: '모자', emoji: '🧢' },
    { word: '물고기', emoji: '🐟' },
    { word: '무지개', emoji: '🌈' },
    { word: '마늘', emoji: '🧄' },
    { word: '문어', emoji: '🐙' },
    { word: '만두', emoji: '🥟' },
  ],
  'ㅂ': [
    { word: '바나나', emoji: '🍌' },
    { word: '비행기', emoji: '✈️' },
    { word: '버스', emoji: '🚌' },
    { word: '별', emoji: '⭐' },
    { word: '방울', emoji: '🔔' },
    { word: '복숭아', emoji: '🍑' },
  ],
  'ㅅ': [
    { word: '사자', emoji: '🦁' },
    { word: '사과', emoji: '🍎' },
    { word: '수박', emoji: '🍉' },
    { word: '시계', emoji: '⏰' },
    { word: '상어', emoji: '🦈' },
    { word: '소', emoji: '🐮' },
  ],
  'ㅇ': [
    { word: '오리', emoji: '🦆' },
    { word: '안경', emoji: '👓' },
    { word: '우산', emoji: '☂️' },
    { word: '오이', emoji: '🥒' },
    { word: '양말', emoji: '🧦' },
    { word: '아이스크림', emoji: '🍦' },
  ],
  'ㅈ': [
    { word: '자동차', emoji: '🚗' },
    { word: '자전거', emoji: '🚲' },
    { word: '장미', emoji: '🌹' },
    { word: '주스', emoji: '🧃' },
    { word: '조개', emoji: '🦪' },
    { word: '지우개', emoji: '✏️' },
  ],
  'ㅊ': [
    { word: '치타', emoji: '🐆' },
    { word: '치즈', emoji: '🧀' },
    { word: '칫솔', emoji: '🪥' },
    { word: '초콜릿', emoji: '🍫' },
    { word: '촛불', emoji: '🕯️' },
    { word: '참외', emoji: '🍈' },
  ],
  'ㅋ': [
    { word: '코끼리', emoji: '🐘' },
    { word: '카메라', emoji: '📷' },
    { word: '케이크', emoji: '🎂' },
    { word: '캥거루', emoji: '🦘' },
    { word: '컵', emoji: '🥛' },
    { word: '코알라', emoji: '🐨' },
  ],
  'ㅌ': [
    { word: '토끼', emoji: '🐰' },
    { word: '트럭', emoji: '🚚' },
    { word: '토마토', emoji: '🍅' },
    { word: '타조', emoji: '🦤' },
    { word: '탬버린', emoji: '🪘' },
  ],
  'ㅍ': [
    { word: '포도', emoji: '🍇' },
    { word: '피아노', emoji: '🎹' },
    { word: '풍선', emoji: '🎈' },
    { word: '파인애플', emoji: '🍍' },
    { word: '판다', emoji: '🐼' },
    { word: '팽이', emoji: '🪀' },
  ],
  'ㅎ': [
    { word: '호랑이', emoji: '🐯' },
    { word: '하마', emoji: '🦛' },
    { word: '해님', emoji: '☀️' },
    { word: '헬리콥터', emoji: '🚁' },
    { word: '호박', emoji: '🎃' },
    { word: '햄버거', emoji: '🍔' },
  ],
};

const ALL_CONSONANTS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const CONSONANT_NAMES: Record<string, string> = {
  'ㄱ': '기역',
  'ㄴ': '니은',
  'ㄷ': '디귿',
  'ㄹ': '리을',
  'ㅁ': '미음',
  'ㅂ': '비읍',
  'ㅅ': '시옷',
  'ㅇ': '이응',
  'ㅈ': '지읒',
  'ㅊ': '치읓',
  'ㅋ': '키읔',
  'ㅌ': '티읕',
  'ㅍ': '피읖',
  'ㅎ': '히읗',
};

/**
 * Fisher-Yates array shuffler
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Dynamically generates 10 fresh, randomized quiz items for each stage.
 * When a child restarts or plays again, words like ㄱ 가지 -> ㄱ 고구마 -> ㄱ 기린 will change dynamically!
 */
export function getQuizzesForStage(stage: StageId): QuizItem[] {
  // Pick 10 unique consonants for this 10-problem run
  const shuffledConsonants = shuffleArray(ALL_CONSONANTS).slice(0, 10);

  return shuffledConsonants.map((consonant, idx) => {
    const cName = CONSONANT_NAMES[consonant] || consonant;
    const wordList = WORD_BANK[consonant] || [{ word: '나비', emoji: '🦋' }];
    // Pick random word from bank
    const chosen = wordList[Math.floor(Math.random() * wordList.length)];

    // Break word into parts, highlighting the 1st syllable
    const wordParts = chosen.word.split('').map((char, charIdx) => ({
      text: char,
      isTarget: charIdx === 0,
    }));

    // Pick 2 other random distractors for 3-option consistency
    const otherConsonants = shuffleArray(ALL_CONSONANTS.filter((c) => c !== consonant)).slice(0, 2);
    const threeConsonantOptions = shuffleArray([consonant, ...otherConsonants]);

    if (stage === 1) {
      // 1단계: 그림과 단어(첫 글자 색상 강조)를 보고 3개 보기 중 첫 자음 찾기
      return {
        id: 1000 + idx,
        stage: 1,
        gameType: 'FIND_EGG',
        questionNumber: idx + 1,
        targetConsonant: consonant,
        consonantName: cName,
        word: chosen.word,
        wordParts: wordParts,
        emoji: chosen.emoji,
        options: threeConsonantOptions, // Exactly 3 options, shuffled!
        instruction: `'${chosen.word}'의 첫 글자 '${consonant}(${cName})'을 찾아보세요!`,
        audioPrompt: `${chosen.word}의 ${cName}을 찾아보세요!`,
      };
    } else if (stage === 2) {
      // 2단계: 그림과 빈칸 단어 [ ? ] 에 첫소리 자음 쏙 넣기
      const restOfWord = chosen.word.length > 1 ? chosen.word.slice(1) : '';
      return {
        id: 2000 + idx,
        stage: 2,
        gameType: 'FILL_WORD',
        questionNumber: idx + 1,
        targetConsonant: consonant,
        consonantName: cName,
        word: chosen.word,
        blankWordDisplay: `[ ? ] ${restOfWord}`,
        emoji: chosen.emoji,
        options: threeConsonantOptions, // Exactly 3 options, shuffled!
        instruction: `'[ ? ] ${restOfWord}'의 빈칸에 쏙 들어갈 첫소리 자음은?`,
        audioPrompt: `${chosen.word}의 첫소리 ${cName}을 넣어주세요!`,
      };
    } else {
      // 3단계: 소리 듣고 3개의 그림 중 맞는 꽃송이 그림 찾기
      // Target picture option
      const targetPic: PictureOption = {
        word: chosen.word,
        emoji: chosen.emoji,
        consonant: consonant,
        consonantName: cName,
      };

      // 2 Distractor picture options from different consonants
      const distractorPics: PictureOption[] = otherConsonants.map((dc) => {
        const dWords = WORD_BANK[dc] || [{ word: '과일', emoji: '🍎' }];
        const dChosen = dWords[Math.floor(Math.random() * dWords.length)];
        return {
          word: dChosen.word,
          emoji: dChosen.emoji,
          consonant: dc,
          consonantName: CONSONANT_NAMES[dc] || dc,
        };
      });

      const pictureOptions = shuffleArray([targetPic, ...distractorPics]);

      return {
        id: 3000 + idx,
        stage: 3,
        gameType: 'FLOWER_MATCH',
        questionNumber: idx + 1,
        targetConsonant: consonant,
        consonantName: cName,
        word: chosen.word,
        emoji: chosen.emoji,
        options: [],
        pictureOptions: pictureOptions, // Exactly 3 picture options, shuffled!
        instruction: `나비가 '${consonant}(${cName})' 소리로 시작하는 친구를 찾고 있어요!`,
        audioPrompt: `${cName} 소리로 시작하는 친구는 누구일까요?`,
      };
    }
  });
}
