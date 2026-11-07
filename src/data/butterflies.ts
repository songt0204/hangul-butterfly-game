import { Butterfly } from '../types';

export const BUTTERFLIES: Butterfly[] = [
  {
    id: 'tiger_swallowtail',
    name: '호랑나비',
    englishName: 'Tiger Swallowtail',
    wingsColor: {
      primary: '#FBBF24', // Amber/Yellow
      secondary: '#18181B', // Black tiger stripes
      accent: '#3B82F6', // Blue spot on tail
      glow: 'rgba(251, 191, 36, 0.4)',
    },
    pattern: 'tiger',
    description: '노란 날개에 멋진 호랑이 줄무늬가 있는 씩씩한 호랑나비예요!',
    soundGreeting: '안녕! 나는 줄무늬가 멋진 호랑나비야!',
    rarityStars: 1,
  },
  {
    id: 'cabbage_white',
    name: '배추흰나비',
    englishName: 'Cabbage White',
    wingsColor: {
      primary: '#F8FAFC', // Crisp white
      secondary: '#86EFAC', // Soft light green hue
      accent: '#334155', // Charcoal wing spots
      glow: 'rgba(240, 253, 244, 0.5)',
    },
    pattern: 'pure',
    description: '하늘하늘 눈꽃송이처럼 하얗고 순수한 배추흰나비예요!',
    soundGreeting: '안녕! 나는 눈처럼 하얀 배추흰나비야!',
    rarityStars: 1,
  },
  {
    id: 'blue_morpho',
    name: '남색모르포나비',
    englishName: 'Blue Morpho',
    wingsColor: {
      primary: '#0284C7', // Deep vivid sky blue
      secondary: '#0369A1', // Ocean blue
      accent: '#E0F2FE', // Shimmering light highlight
      glow: 'rgba(14, 165, 233, 0.5)',
    },
    pattern: 'dots',
    description: '보석 사파이어처럼 파란빛으로 반짝이는 신비한 나비예요!',
    soundGreeting: '안녕! 나는 푸른 바다처럼 반짝이는 모르포나비야!',
    rarityStars: 2,
  },
  {
    id: 'cherry_blossom',
    name: '분홍꽃잎나비',
    englishName: 'Cherry Blossom Butterfly',
    wingsColor: {
      primary: '#F472B6', // Warm Rose pink
      secondary: '#FDA4AF', // Soft petal pink
      accent: '#BE185D', // Magenta edges
      glow: 'rgba(244, 114, 182, 0.45)',
    },
    pattern: 'blossom',
    description: '봄날의 벚꽃잎을 닮아 달콤한 꽃향기를 솔솔 풍기는 나비예요!',
    soundGreeting: '안녕! 나는 달콤한 봄꽃을 닮은 분홍꽃잎나비야!',
    rarityStars: 2,
  },
  {
    id: 'rainbow_prism',
    name: '알록달록 무지개나비',
    englishName: 'Rainbow Prism Butterfly',
    wingsColor: {
      primary: '#EF4444', // Red to violet spectrum
      secondary: '#3B82F6',
      accent: '#10B981',
      glow: 'rgba(236, 72, 153, 0.45)',
    },
    pattern: 'rainbow',
    description: '비 온 뒤 하늘에 뜬 일곱 빛깔 무지개를 날개에 담았어요!',
    soundGreeting: '안녕! 나는 일곱 빛깔로 빛나는 신기한 무지개나비야!',
    rarityStars: 3,
  },
  {
    id: 'golden_star',
    name: '황금별빛나비',
    englishName: 'Golden Star Butterfly',
    wingsColor: {
      primary: '#F59E0B', // Rich Gold
      secondary: '#FEF08A', // Shimmering Star Yellow
      accent: '#B45309', // Warm bronze outline
      glow: 'rgba(245, 158, 11, 0.55)',
    },
    pattern: 'stars',
    description: '밤하늘의 가장 밝은 별처럼 반짝반짝 빛나는 황금 나비예요!',
    soundGreeting: '안녕! 나는 별빛 가루를 뿌리는 황금별빛나비야!',
    rarityStars: 3,
  },
  {
    id: 'emerald_fairy',
    name: '초록요정나비',
    englishName: 'Emerald Fairy Butterfly',
    wingsColor: {
      primary: '#10B981', // Emerald green
      secondary: '#6EE7B7', // Mint glow
      accent: '#064E3B', // Deep forest outline
      glow: 'rgba(16, 185, 129, 0.4)',
    },
    pattern: 'emerald',
    description: '초록 숲속에서 요정들과 함께 숨바꼭질을 하는 나비예요!',
    soundGreeting: '안녕! 나는 숲속의 요정 초록요정나비야!',
    rarityStars: 2,
  },
  {
    id: 'black_swallowtail',
    name: '우아한 제비나비',
    englishName: 'Black Swallowtail',
    wingsColor: {
      primary: '#1E1B4B', // Midnight indigo
      secondary: '#06B6D4', // Cyan gradient tail
      accent: '#F43F5E', // Red eye-spot
      glow: 'rgba(6, 182, 212, 0.4)',
    },
    pattern: 'swallow',
    description: '멋진 제비 꼬리를 달고 밤하늘을 우아하게 날아다녀요!',
    soundGreeting: '안녕! 나는 우아하게 춤추는 제비나비야!',
    rarityStars: 2,
  },
  {
    id: 'aurora_borealis',
    name: '신비의 오로라나비',
    englishName: 'Aurora Butterfly',
    wingsColor: {
      primary: '#8B5CF6', // Purple aurora
      secondary: '#06B6D4', // Teal aurora
      accent: '#EC4899', // Pink stardust
      glow: 'rgba(139, 92, 246, 0.5)',
    },
    pattern: 'aurora',
    description: '북극 하늘의 춤추는 오로라 빛을 날개에 머금은 환상적인 나비예요!',
    soundGreeting: '안녕! 나는 환상적인 오로라 빛을 뿜는 오로라나비야!',
    rarityStars: 3,
  },
  {
    id: 'solar_flame',
    name: '따뜻한 태양나비',
    englishName: 'Solar Flame Butterfly',
    wingsColor: {
      primary: '#EA580C', // Flame orange
      secondary: '#FBBF24', // Sun yellow
      accent: '#DC2626', // Warm crimson
      glow: 'rgba(234, 88, 12, 0.5)',
    },
    pattern: 'sun',
    description: '따뜻한 햇살을 듬뿍 받아 활짝 웃고 있는 태양나비예요!',
    soundGreeting: '안녕! 나는 온 세상을 따뜻하게 비추는 태양나비야!',
    rarityStars: 3,
  },
];
