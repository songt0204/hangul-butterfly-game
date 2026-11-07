import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StageId } from '../types';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LevelUpModalProps {
  currentStage: StageId;
  onProceedToNextStage: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  currentStage,
  onProceedToNextStage,
}) => {
  useEffect(() => {
    sound.playLevelUp();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }

    if (currentStage === 1) {
      speech.speak('와아! 10문제를 모두 맞혔어요! 알이 깨어나 튼튼한 번데기가 되었어요!', 0.95, 1.2);
    } else if (currentStage === 2) {
      speech.speak('멋져요! 2단계를 완료했어요! 이제 나비 날개가 돋아나요!', 0.95, 1.2);
    }
  }, [currentStage]);

  const isStage1To2 = currentStage === 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-amber-300 shadow-2xl text-center transform animate-scale-up">
        {/* Celebration Badge */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-linear-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-4xl sm:text-5xl shadow-lg ring-4 ring-amber-200 mb-4 animate-bounce">
          {isStage1To2 ? '🌿' : '✨'}
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-amber-950 mb-2">
          {isStage1To2 ? '레벨 업! 번데기로 변신!' : '레벨 업! 나비 날개 준비!'}
        </h3>

        <p className="text-sm sm:text-base font-bold text-amber-800 leading-relaxed mb-6">
          {isStage1To2
            ? '알 속 꼬물이가 10문제를 맞히고 쑥쑥 자라 튼튼한 번데기가 되었어요!'
            : '번데기가 반짝반짝 빛나요! 이제 아름다운 나비로 날아오를 시간이에요!'}
        </p>

        {/* Growth visual indicator */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-6 flex items-center justify-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-3xl">{isStage1To2 ? '🥚' : '🌿'}</span>
            <span className="text-xs font-bold text-stone-500 mt-1">
              {isStage1To2 ? '1단계 알' : '2단계 번데기'}
            </span>
          </div>
          <ArrowRight className="w-6 h-6 text-amber-600 animate-pulse" />
          <div className="flex flex-col items-center scale-110">
            <span className="text-4xl">{isStage1To2 ? '🌿' : '🦋'}</span>
            <span className="text-xs font-black text-amber-900 mt-1">
              {isStage1To2 ? '2단계 번데기!' : '3단계 나비!'}
            </span>
          </div>
        </div>

        {/* Big Start Next Stage Button */}
        <button
          onClick={() => {
            sound.playPop();
            onProceedToNextStage();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg sm:text-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transform active:scale-95 transition-transform cursor-pointer"
        >
          <Sparkles className="w-6 h-6 text-yellow-200" />
          <span>{isStage1To2 ? '2단계(번데기) 시작하기' : '3단계(나비) 시작하기'}</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
