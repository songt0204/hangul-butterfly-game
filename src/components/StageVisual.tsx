import React, { useState } from 'react';
import { StageId, Butterfly } from '../types';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';
import { ButterflyRenderer } from './ButterflyRenderer';

interface StageVisualProps {
  stage: StageId;
  questionIndex: number; // 0 ~ 9
  nextButterfly: Butterfly;
}

export const StageVisual: React.FC<StageVisualProps> = ({
  stage,
  questionIndex,
  nextButterfly,
}) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const handleEggOrPupaClick = () => {
    setIsWiggling(true);
    sound.playPop();

    if (stage === 1) {
      speech.speak('꼬물꼬물 알 속에서 친구가 자라고 있어요!', 1.0, 1.2);
    } else if (stage === 2) {
      speech.speak('반짝반짝 번데기가 날개 돋을 준비를 해요!', 1.0, 1.2);
    } else {
      speech.speak(nextButterfly.soundGreeting, 1.0, 1.2);
    }

    setTimeout(() => setIsWiggling(false), 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-2 flex flex-col items-center">
      <div className="relative w-full h-44 sm:h-52 rounded-3xl bg-linear-to-b from-sky-100/70 via-emerald-50/50 to-amber-50/60 border-2 border-amber-200/60 flex items-center justify-center overflow-hidden shadow-inner">
        {/* Sky / Nature Ambient Clouds & Sun */}
        <div className="absolute top-3 left-4 text-2xl sm:text-3xl opacity-80 animate-gentle-float">
          ☁️
        </div>
        <div className="absolute top-2 right-5 text-2xl sm:text-3xl opacity-90 animate-spin" style={{ animationDuration: '30s' }}>
          ☀️
        </div>
        <div className="absolute bottom-2 left-6 text-xl opacity-75">
          🌸
        </div>
        <div className="absolute bottom-2 right-8 text-xl opacity-75">
          🌼
        </div>

        {/* STAGE 1: EGG ON LEAF */}
        {stage === 1 && (
          <div
            onClick={handleEggOrPupaClick}
            className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
              isWiggling ? 'scale-115 rotate-6' : 'hover:scale-105'
            }`}
            title="알을 톡톡 건드려보세요!"
          >
            {/* Big Green Leaf */}
            <svg viewBox="0 0 200 90" className="w-52 sm:w-64 h-24 sm:h-28 -mb-10 text-emerald-500 fill-current drop-shadow-md">
              <path d="M 10 70 Q 100 0 190 60 Q 100 110 10 70 Z" />
              <path d="M 20 68 Q 100 45 180 62" stroke="#047857" strokeWidth="2.5" fill="none" opacity="0.6" />
              <circle cx="70" cy="50" r="4" fill="#A7F3D0" />
              <circle cx="130" cy="60" r="3" fill="#A7F3D0" />
            </svg>

            {/* The Egg */}
            <div className="relative animate-egg-wobble">
              <svg viewBox="0 0 100 130" className="w-20 sm:w-24 h-26 sm:h-30 drop-shadow-xl overflow-visible">
                {/* Egg Body */}
                <path
                  d="M 50 10 C 25 10, 10 50, 10 85 C 10 115, 28 125, 50 125 C 72 125, 90 115, 90 85 C 90 50, 75 10, 50 10 Z"
                  fill="url(#egg-gradient)"
                  stroke="#FDE68A"
                  strokeWidth="3"
                />
                <defs>
                  <radialGradient id="egg-gradient" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#FEF9C3" />
                    <stop offset="100%" stopColor="#FDE047" />
                  </radialGradient>
                </defs>

                {/* Cute Eyes peeking or cracks based on questionIndex */}
                {questionIndex >= 3 && (
                  <path
                    d="M 45 45 L 55 52 L 48 60 L 58 68"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
                {questionIndex >= 6 && (
                  <path
                    d="M 30 75 L 38 82 L 32 90"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
                {questionIndex >= 8 && (
                  <g className="animate-pulse">
                    {/* Tiny cute peeking eyes */}
                    <circle cx="43" cy="70" r="3.5" fill="#1E293B" />
                    <circle cx="44" cy="69" r="1.2" fill="#FFFFFF" />
                    <circle cx="57" cy="70" r="3.5" fill="#1E293B" />
                    <circle cx="58" cy="69" r="1.2" fill="#FFFFFF" />
                    {/* Cute blush */}
                    <circle cx="37" cy="74" r="2.5" fill="#FDA4AF" />
                    <circle cx="63" cy="74" r="2.5" fill="#FDA4AF" />
                  </g>
                )}
              </svg>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-800 bg-white/90 px-3 py-1 rounded-full shadow-xs -mt-1 border border-emerald-200">
              {questionIndex < 8 ? '알을 톡톡 건드려봐요!' : '곧 깨어날 것 같아요! 🐣'}
            </span>
          </div>
        )}

        {/* STAGE 2: PUPA ON BRANCH */}
        {stage === 2 && (
          <div
            onClick={handleEggOrPupaClick}
            className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
              isWiggling ? 'scale-115 rotate-8' : 'hover:scale-105'
            }`}
            title="번데기를 톡톡 건드려보세요!"
          >
            {/* Tree Branch */}
            <svg viewBox="0 0 240 40" className="w-60 sm:w-72 h-10 text-amber-900 fill-current drop-shadow-md">
              <path d="M 0 15 Q 120 22 240 10 L 240 18 Q 120 30 0 23 Z" />
              {/* Little green leaves on branch */}
              <path d="M 60 18 Q 50 2 35 15 Z" fill="#10B981" />
              <path d="M 180 14 Q 195 2 205 16 Z" fill="#10B981" />
            </svg>

            {/* Chrysalis / Pupa hanging */}
            <div className="relative animate-pupa-breathe -mt-2">
              <svg viewBox="0 0 90 120" className="w-20 sm:w-24 h-26 sm:h-30 drop-shadow-xl overflow-visible">
                {/* Silk thread */}
                <line x1="45" y1="0" x2="45" y2="20" stroke="#78716C" strokeWidth="2.5" />

                {/* Chrysalis Body */}
                <path
                  d="M 45 20 C 30 35, 20 65, 30 95 C 38 115, 45 120, 45 120 C 45 120, 52 115, 60 95 C 70 65, 60 35, 45 20 Z"
                  fill="url(#pupa-gradient)"
                  stroke="#059669"
                  strokeWidth="2.5"
                />
                <defs>
                  <linearGradient id="pupa-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>

                {/* Golden bands */}
                <path d="M 32 50 Q 45 56 58 50" stroke="#FDE047" strokeWidth="2.5" fill="none" />
                <path d="M 30 70 Q 45 78 60 70" stroke="#FDE047" strokeWidth="2.5" fill="none" />
                <path d="M 33 90 Q 45 96 57 90" stroke="#FDE047" strokeWidth="2.5" fill="none" />

                {/* Golden sparkles */}
                <circle cx="45" cy="60" r="3" fill="#FEF08A" className="animate-ping" />
              </svg>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-amber-900 bg-white/90 px-3 py-1 rounded-full shadow-xs mt-1 border border-amber-200">
              {questionIndex < 8 ? '번데기가 반짝여요!' : '곧 날개가 나와요! ✨'}
            </span>
          </div>
        )}

        {/* STAGE 3: BUTTERFLY READY TO FLY */}
        {stage === 3 && (
          <div
            onClick={handleEggOrPupaClick}
            className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
              isWiggling ? 'scale-115' : 'hover:scale-105'
            }`}
            title="탄생할 나비를 만나보세요!"
          >
            {/* The Upcoming Butterfly */}
            <div className="relative animate-gentle-float">
              <ButterflyRenderer
                butterfly={nextButterfly}
                size="md"
                isFluttering={true}
              />
            </div>
            <span className="text-[11px] sm:text-xs font-black text-amber-950 bg-white/90 px-3.5 py-1 rounded-full shadow-xs mt-1 border border-amber-300 flex items-center gap-1">
              <span>탄생 예정:</span>
              <span className="text-amber-700 underline">{nextButterfly.name}</span>
              <span>✨</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
