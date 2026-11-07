import React, { useState } from 'react';
import { Butterfly, CollectedButterfly } from '../types';
import { BUTTERFLIES } from '../data/butterflies';
import { ButterflyRenderer } from './ButterflyRenderer';
import { X, Sparkles, Volume2, Lock, RotateCcw, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';

interface ButterflyCollectionModalProps {
  collectedList: CollectedButterfly[];
  onClose: () => void;
  onResetCollection: () => void;
}

export const ButterflyCollectionModal: React.FC<ButterflyCollectionModalProps> = ({
  collectedList,
  onClose,
  onResetCollection,
}) => {
  const [activeButterfly, setActiveButterfly] = useState<Butterfly | null>(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const collectedIds = new Set(collectedList.map((c) => c.butterflyId));
  const isAllCollected = collectedIds.size >= BUTTERFLIES.length;

  const handleSelectButterfly = (b: Butterfly) => {
    if (!collectedIds.has(b.id)) {
      sound.playEncourage();
      speech.speak('아직 만나지 못한 나비예요. 3단계까지 한글 퀴즈를 풀면 만날 수 있어요!', 0.95, 1.15);
      return;
    }

    setActiveButterfly(b);
    sound.playFlutter();
    speech.speak(b.soundGreeting, 0.95, 1.2);
  };

  const handleConfirmReset = () => {
    sound.playPop();
    speech.speak('보관함을 새로 비우고 알부터 다시 키워요!', 0.95, 1.15);
    onResetCollection();
    setShowConfirmReset(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-3xl w-full border-4 border-amber-300 shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center font-bold transition-all active:scale-90 cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-black text-xs sm:text-sm mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>내 나비 보관함</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
            아름다운 나비 도감 🦋
          </h2>
          <p className="text-xs sm:text-sm font-bold text-stone-600 mt-1">
            모은 나비: <span className="text-amber-600 font-extrabold text-base">{collectedIds.size}</span> / {BUTTERFLIES.length} 마리
          </p>

          {isAllCollected && (
            <div className="mt-2 inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-300 animate-pulse">
              🎉 축하해요! 10마리 나비를 모두 모았어요!
            </div>
          )}
        </div>

        {/* Selected Butterfly Spotlight View (if child tapped one) */}
        {activeButterfly && (
          <div className="mb-6 p-4 rounded-3xl bg-linear-to-b from-amber-50 to-orange-50/60 border-2 border-amber-300 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-scale-up">
            <div className="shrink-0 animate-gentle-float">
              <ButterflyRenderer butterfly={activeButterfly} size="md" isFluttering={true} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-amber-950">
                  {activeButterfly.name}
                </h3>
                <span className="text-xs font-mono text-stone-400">({activeButterfly.englishName})</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-700 mt-1">
                {activeButterfly.description}
              </p>
              <div className="mt-2.5 flex items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={() => {
                    sound.playFlutter();
                    speech.speak(activeButterfly.soundGreeting, 1.0, 1.2);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>인사 소리 듣기</span>
                </button>
                <div className="text-yellow-500 text-xs">
                  {Array.from({ length: activeButterfly.rarityStars }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of 10 Butterflies */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-h-[48vh] overflow-y-auto p-1">
          {BUTTERFLIES.map((b) => {
            const isCollected = collectedIds.has(b.id);
            const isCurrentActive = activeButterfly?.id === b.id;

            return (
              <div
                key={b.id}
                onClick={() => handleSelectButterfly(b)}
                className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  isCollected
                    ? isCurrentActive
                      ? 'bg-amber-100/90 border-3 border-amber-400 shadow-md scale-105'
                      : 'bg-stone-50 hover:bg-amber-50 border-2 border-amber-200 hover:border-amber-300 shadow-xs hover:shadow-md'
                    : 'bg-stone-100/80 border-2 border-dashed border-stone-300 opacity-60 hover:opacity-80'
                }`}
                title={isCollected ? b.name : '아직 미발견'}
              >
                {/* Visual */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center">
                  {isCollected ? (
                    <ButterflyRenderer
                      butterfly={b}
                      size="sm"
                      isFluttering={isCurrentActive}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-stone-400">
                      <Lock className="w-6 h-6 mb-1 text-stone-400" />
                      <span className="text-xs font-black">? ? ?</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <span
                  className={`mt-1 text-xs font-black truncate max-w-full ${
                    isCollected ? 'text-amber-950' : 'text-stone-400'
                  }`}
                >
                  {isCollected ? b.name : '신비의 나비'}
                </span>

                {/* Star rating */}
                {isCollected && (
                  <span className="text-[10px] text-yellow-500 font-mono">
                    {'⭐'.repeat(b.rarityStars)}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions: Info & Reset Button */}
        <div className="mt-5 pt-3 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm font-bold text-amber-800 text-center sm:text-left">
            💡 알(1단계) ➔ 번데기(2단계) ➔ 나비(3단계)를 깨면 새 나비가 날아와요!
          </p>

          <button
            onClick={() => {
              sound.playPop();
              setShowConfirmReset(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-600 font-bold text-xs flex items-center gap-1.5 border border-stone-200 transition-colors cursor-pointer shrink-0"
            title="나비를 처음부터 다시 키우기"
          >
            <RotateCcw className="w-4 h-4 text-rose-500" />
            <span>처음부터 다시 키우기</span>
          </button>
        </div>

        {/* Confirmation Modal for Reset */}
        {showConfirmReset && (
          <div className="absolute inset-0 bg-white/95 rounded-3xl p-6 flex flex-col items-center justify-center text-center z-20 animate-fade-in">
            <AlertCircle className="w-12 h-12 text-amber-500 mb-2 animate-bounce" />
            <h3 className="text-xl sm:text-2xl font-black text-amber-950 mb-2">
              나비를 처음부터 다시 키워볼까요?
            </h3>
            <p className="text-xs sm:text-sm font-bold text-stone-600 mb-5 max-w-xs leading-relaxed">
              보관함을 비우고 1단계 알부터 새로운 나비들을 다시 만날 수 있어요!
            </p>
            <div className="flex items-center gap-3 w-full max-w-xs">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm cursor-pointer"
              >
                그대로 둘래요
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm shadow-md shadow-rose-500/30 cursor-pointer"
              >
                네! 다시 키울래요
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
