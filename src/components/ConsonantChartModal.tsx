import React, { useState } from 'react';
import { CONSONANTS_DATA } from '../data/quizData';
import { ConsonantInfo } from '../types';
import { X, Volume2, Sparkles, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';

interface ConsonantChartModalProps {
  onClose: () => void;
}

export const ConsonantChartModal: React.FC<ConsonantChartModalProps> = ({ onClose }) => {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const handlePlayLetter = (item: ConsonantInfo) => {
    setActiveLetter(item.letter);
    sound.playPop();
    speech.speak(`${item.name}! ${item.sound}! ${item.sampleWord}!`, 0.9, 1.15);

    setTimeout(() => {
      setActiveLetter(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-4xl w-full border-4 border-amber-300 shadow-2xl relative my-auto">
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

        {/* Title */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-100 text-orange-900 font-black text-xs sm:text-sm mb-2">
            <BookOpen className="w-4 h-4 text-orange-600" />
            <span>자음 소리 마당</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
            글자를 콕 누르고 소리를 들어요! 🔤
          </h2>
          <p className="text-xs sm:text-sm font-bold text-stone-600 mt-1">
            기역부터 히읗까지 14개 자음 친구들을 만나보세요.
          </p>
        </div>

        {/* 14 Consonants Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5 sm:gap-3 max-h-[60vh] overflow-y-auto p-1">
          {CONSONANTS_DATA.map((item) => {
            const isActive = activeLetter === item.letter;

            return (
              <button
                key={item.letter}
                onClick={() => handlePlayLetter(item)}
                className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-white ring-4 ring-amber-300 shadow-lg scale-105'
                    : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-2 border-stone-200 hover:border-amber-400 shadow-xs active:scale-95'
                }`}
              >
                {/* Big Letter */}
                <span className="text-3xl sm:text-4xl font-black leading-none mb-1">
                  {item.letter}
                </span>

                {/* Name & Sound */}
                <span className={`text-xs font-black ${isActive ? 'text-amber-950' : 'text-amber-800'}`}>
                  {item.name}
                </span>

                {/* Word & Emoji */}
                <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-stone-600">
                  <span className="text-base">{item.emoji}</span>
                  <span className="truncate">{item.sampleWord}</span>
                </div>

                {/* Sound icon hint */}
                <div className="mt-1 opacity-70">
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Hint banner */}
        <div className="mt-5 pt-3 border-t border-stone-200/80 text-center">
          <p className="text-xs sm:text-sm font-bold text-amber-800 flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>원하는 글자를 누르면 또박또박 소리로 읽어줘요!</span>
          </p>
        </div>
      </div>
    </div>
  );
};
