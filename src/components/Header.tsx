import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Mic, MicOff, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  collectedCount: number;
  totalButterflies: number;
  onOpenCollection: () => void;
  onOpenConsonantChart: () => void;
  onRestartCurrentGame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isTtsEnabled: boolean;
  onToggleTts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  collectedCount,
  totalButterflies,
  onOpenCollection,
  onOpenConsonantChart,
  onRestartCurrentGame,
  isMuted,
  onToggleMute,
  isTtsEnabled,
  onToggleTts,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center shadow-md shadow-amber-300/40 text-xl sm:text-2xl transform hover:rotate-6 transition-transform">
            🦋
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-amber-950 flex items-center gap-1.5">
              <span>꼬물이 한글놀이</span>
            </h1>
            <p className="text-[11px] sm:text-xs font-semibold text-amber-700/80 -mt-0.5">
              알에서 나비까지 자음 찾기
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Restart from Egg */}
          <button
            onClick={() => {
              sound.playPop();
              setShowConfirm(true);
            }}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs sm:text-sm border border-stone-200 shadow-xs transition-transform active:scale-95 cursor-pointer"
            title="1단계 알부터 새로하기"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-500" />
            <span className="hidden sm:inline">새로하기</span>
          </button>

          {/* Consonant Sound Playground */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenConsonantChart();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200/70 font-bold text-xs sm:text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
            title="자음 소리 마당 (ㄱ~ㅎ 듣기)"
          >
            <BookOpen className="w-4 h-4 text-orange-600" />
            <span className="hidden xs:inline">자음 마당</span>
          </button>

          {/* Butterfly Collection */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenCollection();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-500/30 transition-transform active:scale-95 cursor-pointer"
            title="내 나비 보관함 열기"
          >
            <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
            <span>나비 보관함</span>
            <span className="bg-amber-700/50 text-white px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono ml-0.5">
              {collectedCount}/{totalButterflies}
            </span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              sound.playPop();
              onToggleMute();
            }}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all active:scale-90 cursor-pointer ${
              isMuted
                ? 'bg-stone-100 text-stone-400 border-stone-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
            title={isMuted ? '효과음 켜기' : '효과음 끄기'}
            aria-label="효과음 토글"
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Voice Speech (TTS) Toggle */}
          <button
            onClick={() => {
              sound.playPop();
              onToggleTts();
            }}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all active:scale-90 cursor-pointer ${
              !isTtsEnabled
                ? 'bg-stone-100 text-stone-400 border-stone-200'
                : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
            }`}
            title={isTtsEnabled ? '목소리 끄기' : '목소리 켜기'}
            aria-label="목소리 토글"
          >
            {isTtsEnabled ? <Mic className="w-4 h-4 sm:w-5 sm:h-5" /> : <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Quick Restart Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-amber-300 shadow-xl text-center">
            <span className="text-4xl mb-2 inline-block">🥚</span>
            <h3 className="text-xl font-black text-amber-950 mb-2">
              1단계 알부터 다시 시작할까요?
            </h3>
            <p className="text-xs font-bold text-stone-500 mb-5 leading-relaxed">
              지금 진행 중인 퀴즈를 1단계 알부터 새로운 기분으로 다시 풀 수 있어요!
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm cursor-pointer"
              >
                계속할래요
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  onRestartCurrentGame();
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md cursor-pointer"
              >
                새로 시작
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
