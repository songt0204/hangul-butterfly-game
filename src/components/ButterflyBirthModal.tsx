import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Butterfly } from '../types';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';
import { ButterflyRenderer } from './ButterflyRenderer';
import { Sparkles, Heart, RotateCcw, BookOpen } from 'lucide-react';

interface ButterflyBirthModalProps {
  butterfly: Butterfly;
  isFirstDiscovery: boolean;
  onOpenCollection: () => void;
  onRestartGame: () => void;
}

export const ButterflyBirthModal: React.FC<ButterflyBirthModalProps> = ({
  butterfly,
  isFirstDiscovery,
  onOpenCollection,
  onRestartGame,
}) => {
  useEffect(() => {
    // Grand fanfare sound
    sound.playButterflyBirth();

    // Multi-shot celebration confetti
    try {
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // Confetti fallback
    }

    // Voice announcement after a short delay
    const timer = setTimeout(() => {
      speech.speak(`축하해요! ${butterfly.name}가 알과 번데기를 지나 마침내 날아올랐어요!`, 0.95, 1.15);
      setTimeout(() => {
        speech.speak(butterfly.soundGreeting, 0.95, 1.2);
      }, 3500);
    }, 600);

    return () => clearTimeout(timer);
  }, [butterfly]);

  const handleButterflyTap = () => {
    sound.playFlutter();
    speech.speak(butterfly.soundGreeting, 1.0, 1.2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-4 border-amber-400 shadow-2xl text-center relative overflow-hidden">
        {/* Sky Ambient Background Glow */}
        <div className="absolute inset-0 bg-linear-to-b from-sky-50 via-amber-50 to-emerald-50 pointer-events-none -z-10" />

        {/* Discovery Ribbon */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500 text-white font-black text-xs sm:text-sm shadow-md mb-3 animate-pulse">
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>{isFirstDiscovery ? '🎉 새로운 나비 발견!' : '✨ 나비 탄생 축하!'}</span>
        </div>

        {/* Grand Title */}
        <h2 className="text-2xl sm:text-4xl font-black text-amber-950 mb-1">
          {butterfly.name} 탄생!
        </h2>
        <p className="text-xs sm:text-sm font-bold text-amber-700 mb-4">
          알에서 번데기를 거쳐 30문제를 모두 완벽하게 맞혔어요!
        </p>

        {/* Butterfly Floating Showcase */}
        <div
          onClick={handleButterflyTap}
          className="my-3 py-4 flex flex-col items-center justify-center cursor-pointer group"
          title="나비를 톡 건드려보세요!"
        >
          <div className="transform group-hover:scale-110 transition-transform">
            <ButterflyRenderer butterfly={butterfly} size="lg" isFluttering={true} />
          </div>
          <span className="mt-2 text-xs font-bold text-amber-800 bg-white/90 px-3 py-1 rounded-full shadow-xs border border-amber-200 flex items-center gap-1">
            <span>👆 톡 터치하면 나비가 인사해요!</span>
          </span>
        </div>

        {/* Butterfly Description Card */}
        <div className="bg-white/90 rounded-2xl p-3.5 border-2 border-amber-200/80 mb-6 text-center shadow-xs">
          <p className="text-sm sm:text-base font-bold text-stone-700 leading-relaxed">
            "{butterfly.description}"
          </p>
          <div className="mt-2 flex items-center justify-center gap-1 text-yellow-500 text-sm">
            {Array.from({ length: butterfly.rarityStars }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
            <span className="text-xs font-black text-stone-500 ml-1">희귀 나비</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              sound.playPop();
              onOpenCollection();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-md shadow-amber-500/30 flex items-center justify-center gap-2 transform active:scale-95 transition-transform cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>나비 보관함 보러가기</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onRestartGame();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base shadow-md shadow-emerald-500/30 flex items-center justify-center gap-2 transform active:scale-95 transition-transform cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>또 다른 나비 키우기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
