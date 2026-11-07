import React from 'react';
import { StageId } from '../types';
import { Check } from 'lucide-react';

interface StageProgressBarProps {
  currentStage: StageId;
  questionIndex: number; // 0 ~ 9
  totalQuestions: number; // 10
  score: number;
}

export const StageProgressBar: React.FC<StageProgressBarProps> = ({
  currentStage,
  questionIndex,
  totalQuestions = 10,
}) => {
  const stageMeta = [
    { id: 1, name: '1단계: 알', emoji: '🥚', desc: '초록 잎 위의 알' },
    { id: 2, name: '2단계: 번데기', emoji: '🌿', desc: '나무에 매달린 번데기' },
    { id: 3, name: '3단계: 나비', emoji: '🦋', desc: '날아오를 준비하는 나비' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-2">
      {/* 3 Major Stages Stepper */}
      <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-3 sm:p-4 border-2 border-amber-200/80 shadow-sm mb-3">
        <div className="grid grid-cols-3 gap-2 relative">
          {/* Connector Track */}
          <div className="absolute top-5 sm:top-6 left-12 right-12 h-2 bg-stone-200 rounded-full z-0 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-400 via-emerald-400 to-sky-400 transition-all duration-500 ease-out"
              style={{
                width:
                  currentStage === 1
                    ? `${(questionIndex / totalQuestions) * 33}%`
                    : currentStage === 2
                    ? `${33 + (questionIndex / totalQuestions) * 33}%`
                    : `${66 + (questionIndex / totalQuestions) * 34}%`,
              }}
            />
          </div>

          {stageMeta.map((s) => {
            const isCompleted = s.id < currentStage;
            const isCurrent = s.id === currentStage;
            const isLocked = s.id > currentStage;

            return (
              <div
                key={s.id}
                className={`relative z-10 flex flex-col items-center transition-all ${
                  isCurrent ? 'scale-105' : 'opacity-80'
                }`}
              >
                <div
                  className={`w-10 h-10 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-md transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                      : isCurrent
                      ? 'bg-amber-400 text-white ring-4 ring-amber-200 animate-pulse'
                      : 'bg-stone-100 text-stone-400 ring-2 ring-stone-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-6 h-6 stroke-[3]" /> : s.emoji}
                </div>
                <span
                  className={`mt-1.5 text-xs sm:text-sm font-black whitespace-nowrap ${
                    isCurrent ? 'text-amber-950 font-extrabold' : isCompleted ? 'text-emerald-800' : 'text-stone-400'
                  }`}
                >
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* 10-Question Sticker Dots for Current Stage */}
        <div className="mt-3 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
              <span>🌱 이번 단계 문제</span>
            </span>
            <span className="text-xs font-extrabold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full font-mono">
              {questionIndex + 1} / {totalQuestions}
            </span>
          </div>

          <div className="grid grid-cols-10 gap-1 sm:gap-2">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const isSolved = idx < questionIndex;
              const isCur = idx === questionIndex;

              return (
                <div
                  key={idx}
                  className={`h-7 sm:h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    isSolved
                      ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 shadow-xs scale-100'
                      : isCur
                      ? 'bg-amber-500 text-white ring-2 ring-amber-300 ring-offset-1 scale-110 shadow-sm animate-bounce'
                      : 'bg-stone-100 text-stone-300'
                  }`}
                  title={`${idx + 1}번 문제`}
                >
                  {isSolved ? '⭐' : isCur ? '🎯' : idx + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
