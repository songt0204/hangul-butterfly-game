import React, { useState } from 'react';
import { QuizItem, PictureOption } from '../types';
import { Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';

interface QuizCardProps {
  quiz: QuizItem;
  onAnswerCorrect: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onAnswerCorrect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedPictureWord, setSelectedPictureWord] = useState<string | null>(null);
  const [isWrongAttempt, setIsWrongAttempt] = useState<string | null>(null);
  const [showHintGuide, setShowHintGuide] = useState(false);
  const [isSuccessAnimating, setIsSuccessAnimating] = useState(false);

  // Play audio prompt
  const handleHearPrompt = () => {
    sound.playPop();
    speech.speak(quiz.audioPrompt, 0.9, 1.15);
  };

  // Stage 1 & Stage 2 Text Option Selection
  const handleSelectTextOption = (option: string) => {
    if (isSuccessAnimating) return;

    setSelectedOption(option);
    sound.playPop();

    if (option === quiz.targetConsonant) {
      // Correct!
      setIsSuccessAnimating(true);
      sound.playCorrect();
      speech.speakPraise();

      setTimeout(() => {
        setIsSuccessAnimating(false);
        setSelectedOption(null);
        setIsWrongAttempt(null);
        setShowHintGuide(false);
        onAnswerCorrect();
      }, 950);
    } else {
      // Gentle encouragement
      setIsWrongAttempt(option);
      sound.playEncourage();
      speech.speakEncourage();
      setShowHintGuide(true);

      setTimeout(() => {
        setIsWrongAttempt(null);
      }, 600);
    }
  };

  // Stage 3 Picture Option Selection
  const handleSelectPictureOption = (item: PictureOption) => {
    if (isSuccessAnimating) return;

    setSelectedPictureWord(item.word);
    sound.playPop();

    if (item.consonant === quiz.targetConsonant) {
      // Correct!
      setIsSuccessAnimating(true);
      sound.playCorrect();
      speech.speak(`${item.word}! 맞았어요! 참 잘했어요!`, 0.95, 1.2);

      setTimeout(() => {
        setIsSuccessAnimating(false);
        setSelectedPictureWord(null);
        setIsWrongAttempt(null);
        setShowHintGuide(false);
        onAnswerCorrect();
      }, 1000);
    } else {
      // Gentle encouragement
      setIsWrongAttempt(item.word);
      sound.playEncourage();
      speech.speak(`${item.word}는 '${item.consonantName}' 소리예요. 다시 찾아볼까요?`, 0.95, 1.15);
      setShowHintGuide(true);

      setTimeout(() => {
        setIsWrongAttempt(null);
      }, 600);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-2">
      <div className="bg-white rounded-3xl p-4 sm:p-7 border-3 border-amber-300/80 shadow-lg relative overflow-hidden">
        {/* Game Mode Pill Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] sm:text-xs font-black px-3 py-1 rounded-full bg-linear-to-r from-amber-400 to-orange-400 text-white shadow-xs">
            {quiz.stage === 1
              ? '🥚 1단계: 그림과 첫 글자 자음 찾기'
              : quiz.stage === 2
              ? '🌿 2단계: 빈칸 첫소리 쏙 넣기'
              : '🦋 3단계: 소리 듣고 꽃송이 그림 찾기'}
          </span>

          <button
            onClick={handleHearPrompt}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-transform active:scale-90 shrink-0 cursor-pointer"
            title="소리 다시 듣기"
          >
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>소리 듣기</span>
          </button>
        </div>

        {/* Instruction Banner */}
        <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200/60 mb-4 text-center">
          <p className="text-base sm:text-xl font-black text-amber-950 leading-snug">
            {quiz.instruction}
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 1단계 (FIND_EGG): 그림 + 단어(첫글자 색상 강조) + 3개 보기 */}
        {/* ---------------------------------------------------- */}
        {quiz.gameType === 'FIND_EGG' && (
          <div className="flex flex-col items-center my-3 sm:my-4">
            {/* Picture Card */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-linear-to-b from-amber-100 to-yellow-200 border-4 border-amber-300 flex items-center justify-center text-5xl sm:text-6xl shadow-md mb-2 transform hover:scale-105 transition-transform">
              {quiz.emoji}
            </div>

            {/* Word Display with 1st syllable highlighted in a distinct bright color */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 my-2">
              {quiz.wordParts?.map((part, idx) => (
                <span
                  key={idx}
                  className={`text-3xl sm:text-5xl font-black px-3 sm:px-4 py-1.5 rounded-2xl transition-transform ${
                    part.isTarget
                      ? 'bg-amber-400 text-white ring-4 ring-amber-200 shadow-md scale-105'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {part.text}
                </span>
              ))}
            </div>

            {/* Consonant Hint Text */}
            <div className="mb-3 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800">
              <span>첫 글자:</span>
              <span className="text-base sm:text-lg font-black text-orange-600 underline">
                {quiz.targetConsonant} ({quiz.consonantName})
              </span>
            </div>

            <p className="text-xs sm:text-sm font-extrabold text-stone-500 mb-2 flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>3개의 글자 중 맞는 첫 글자를 콕 눌러보세요!</span>
            </p>

            {/* Exactly 3 Consonant Option Buttons */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full">
              {quiz.options.map((option) => {
                const isTarget = option === quiz.targetConsonant;
                const isWrong = isWrongAttempt === option;
                const isSelected = selectedOption === option;

                return (
                  <button
                    key={option}
                    onClick={() => handleSelectTextOption(option)}
                    disabled={isSuccessAnimating}
                    className={`relative h-22 sm:h-28 rounded-3xl border-3 flex flex-col items-center justify-center transition-all active:scale-95 duration-150 cursor-pointer ${
                      isSelected && isTarget
                        ? 'bg-emerald-400 border-emerald-500 text-white shadow-xl ring-4 ring-emerald-200 scale-105'
                        : isWrong
                        ? 'bg-rose-100 border-rose-400 text-rose-600 animate-shake'
                        : showHintGuide && isTarget
                        ? 'bg-amber-300 border-amber-500 text-amber-950 ring-4 ring-amber-200 animate-bounce'
                        : 'bg-stone-50 hover:bg-amber-50 border-amber-200 hover:border-amber-400 text-stone-800 shadow-sm'
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl font-black leading-none mb-1">
                      {option}
                    </span>
                    <span className="text-[11px] font-bold text-stone-400">
                      {isTarget ? quiz.consonantName : '자음'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* 2단계 (FILL_WORD): 빈칸 첫소리 쏙 넣기 */}
        {/* ---------------------------------------------------- */}
        {quiz.gameType === 'FILL_WORD' && (
          <div className="flex flex-col items-center my-3 sm:my-4">
            {/* Center Picture + Word Slot */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-linear-to-b from-amber-100 to-amber-200 border-4 border-amber-300 flex items-center justify-center text-5xl sm:text-6xl shadow-md mb-3 transform hover:scale-105 transition-transform">
                {quiz.emoji}
              </div>

              {/* Blank Word Slot */}
              <div className="flex items-center gap-2 text-2xl sm:text-4xl font-black">
                {/* Blank Slot */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-3 flex items-center justify-center text-3xl sm:text-4xl transition-all ${
                    isSuccessAnimating
                      ? 'bg-emerald-500 border-emerald-600 text-white scale-110 shadow-md ring-4 ring-emerald-200'
                      : 'bg-amber-100/80 border-dashed border-amber-500 text-amber-800 animate-pulse'
                  }`}
                >
                  {isSuccessAnimating ? quiz.targetConsonant : '?'}
                </div>

                {/* Rest of the word */}
                {quiz.word.length > 1 && (
                  <span className="bg-stone-100 px-4 py-2.5 rounded-2xl text-stone-800 border border-stone-200">
                    {quiz.word.slice(1)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm font-extrabold text-stone-500 mb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>빈칸에 들어갈 첫소리 자음을 골라보세요!</span>
            </p>

            {/* Exactly 3 Consonant Blocks */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full">
              {quiz.options.map((option) => {
                const isTarget = option === quiz.targetConsonant;
                const isWrong = isWrongAttempt === option;
                const isSelected = selectedOption === option;

                return (
                  <button
                    key={option}
                    onClick={() => handleSelectTextOption(option)}
                    disabled={isSuccessAnimating}
                    className={`relative h-20 sm:h-26 rounded-2xl border-3 flex flex-col items-center justify-center font-black transition-all active:scale-95 cursor-pointer ${
                      isSelected && isTarget
                        ? 'bg-emerald-500 border-emerald-600 text-white shadow-xl scale-105'
                        : isWrong
                        ? 'bg-rose-100 border-rose-400 text-rose-600 animate-shake'
                        : showHintGuide && isTarget
                        ? 'bg-amber-400 border-amber-500 text-white ring-4 ring-amber-300 animate-bounce'
                        : 'bg-stone-50 hover:bg-amber-50 border-stone-200 hover:border-amber-400 text-stone-800 shadow-sm'
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl leading-none mb-1">{option}</span>
                    <span className="text-[11px] font-bold text-stone-400">
                      {isTarget ? quiz.consonantName : '자음'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* 3단계 (FLOWER_MATCH): 3개 보기의 색상을 완전히 동일하게 유지! */}
        {/* ---------------------------------------------------- */}
        {quiz.gameType === 'FLOWER_MATCH' && (
          <div className="flex flex-col items-center my-3 sm:my-4">
            {/* Target Sound Highlight Badge */}
            <div className="mb-4 flex items-center gap-2 bg-linear-to-r from-sky-100 via-amber-100 to-emerald-100 px-5 py-2.5 rounded-2xl border-2 border-amber-300 shadow-xs">
              <span className="text-2xl animate-gentle-float">🦋</span>
              <span className="text-sm sm:text-base font-black text-amber-950">
                찾는 첫소리:
              </span>
              <span className="text-3xl sm:text-4xl font-black text-orange-600 px-2 py-0.5 rounded-xl bg-white shadow-xs">
                {quiz.targetConsonant}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-600">
                ({quiz.consonantName})
              </span>
            </div>

            <p className="text-xs sm:text-sm font-extrabold text-stone-500 mb-3 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>'{quiz.targetConsonant}' 소리로 시작하는 그림을 콕 눌러보세요!</span>
            </p>

            {/* Exactly 3 Picture Cards with IDENTICAL neutral styling before click! */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              {quiz.pictureOptions?.map((item) => {
                const isTarget = item.consonant === quiz.targetConsonant;
                const isSelected = selectedPictureWord === item.word;
                const isWrong = isWrongAttempt === item.word;

                return (
                  <button
                    key={item.word}
                    onClick={() => handleSelectPictureOption(item)}
                    disabled={isSuccessAnimating}
                    className={`relative p-4 rounded-3xl border-3 flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${
                      isSelected && isTarget
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300 shadow-xl scale-105'
                        : isWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-800 animate-shake'
                        : showHintGuide && isTarget
                        ? 'bg-amber-100 border-amber-500 text-amber-950 ring-4 ring-amber-300 animate-bounce'
                        : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-amber-300 text-stone-800 shadow-xs'
                    }`}
                  >
                    {/* Picture emoji container */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-4xl sm:text-5xl shadow-xs mb-2">
                      {item.emoji}
                    </div>

                    {/* Word Name */}
                    <span className="text-xl sm:text-2xl font-black text-stone-900 mb-1">
                      {item.word}
                    </span>

                    {/* Uniform neutral tag for all 3 cards: SAME color, no answer giveaway! */}
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                      첫소리: {item.consonant}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Child Friendly Hint Banner when retrying */}
        {showHintGuide && (
          <div className="mt-3 text-center text-xs sm:text-sm font-bold text-amber-700 bg-amber-100/70 py-1.5 px-3 rounded-xl animate-pulse">
            💡 힌트: 콩콩 뛰는 글자나 그림을 콕 눌러보세요!
          </div>
        )}
      </div>
    </div>
  );
};
