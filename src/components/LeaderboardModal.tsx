import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { X, Trophy, Sparkles, Medal, Award, User, Check, Edit2 } from 'lucide-react';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';

interface LeaderboardModalProps {
  entries: LeaderboardEntry[];
  currentScore: number;
  collectedCount: number;
  onSaveRecord: (name: string, avatar: string) => void;
  onClose: () => void;
}

const AVATAR_OPTIONS = ['🦋', '🦁', '🐰', '🐥', '🐻', '🐱', '🐶', '🦄'];
const NICKNAME_PRESETS = ['씩씩한 호랑이', '방긋 토끼', '나비 탐험가', '꼬물이 대장', '한글 천재'];

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  entries,
  currentScore,
  collectedCount,
  onSaveRecord,
  onClose,
}) => {
  const [playerName, setPlayerName] = useState('나비 탐험가');
  const [selectedAvatar, setSelectedAvatar] = useState('🦋');
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!playerName.trim()) return;

    sound.playCorrect();
    speech.speak(`${playerName} 꼬마 탐험가의 기록이 명예의 전당에 등록되었어요!`, 0.95, 1.2);
    onSaveRecord(playerName.trim(), selectedAvatar);
    setIsSaved(true);
    setIsEditing(false);

    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  // Sort entries: score desc, then butterflies desc
  const sortedEntries = [...entries].sort((a, b) => {
    const aTotal = a.score * 10 + a.butterfliesCount * 5;
    const bTotal = b.score * 10 + b.butterfliesCount * 5;
    return bTotal - aTotal;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-2xl w-full border-4 border-yellow-400 shadow-2xl relative my-auto">
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
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-linear-to-r from-amber-400 to-yellow-300 text-amber-950 font-black text-xs sm:text-sm mb-2 shadow-xs">
            <Trophy className="w-4 h-4 text-amber-800" />
            <span>명예의 전당</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
            꼬마 한글 챔피언 🏆
          </h2>
          <p className="text-xs sm:text-sm font-bold text-stone-600 mt-1">
            문제를 맞히고 나비를 모을수록 순위가 쑥쑥 올라가요!
          </p>
        </div>

        {/* Current Player Record Card */}
        <div className="mb-5 p-3.5 sm:p-4 rounded-3xl bg-linear-to-r from-amber-100/90 via-yellow-100 to-orange-100/80 border-2 border-amber-300 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-amber-300 flex items-center justify-center text-3xl sm:text-4xl shadow-xs">
                {selectedAvatar}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black text-amber-950">
                    {playerName}
                  </span>
                  <button
                    onClick={() => {
                      sound.playPop();
                      setIsEditing(!isEditing);
                    }}
                    className="p-1 rounded-lg hover:bg-white/60 text-amber-800 transition-colors cursor-pointer"
                    title="이름 바꾸기"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mt-0.5">
                  <span>⭐ 맞힌 문제: <strong className="text-sm font-mono">{currentScore}</strong>개</span>
                  <span>·</span>
                  <span>🦋 모은 나비: <strong className="text-sm font-mono">{collectedCount}</strong>마리</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-500/30 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shrink-0"
            >
              {isSaved ? <Check className="w-4 h-4 text-white" /> : <Award className="w-4 h-4 text-yellow-200" />}
              <span>{isSaved ? '등록 완료!' : '내 순위 올리기'}</span>
            </button>
          </div>

          {/* Quick Edit Panel */}
          {isEditing && (
            <div className="mt-3 pt-3 border-t border-amber-200/80 animate-fade-in">
              <p className="text-xs font-black text-amber-900 mb-2">
                나만의 캐릭터와 이름을 골라보세요:
              </p>
              {/* Avatar Selector */}
              <div className="flex items-center gap-2 mb-2.5 overflow-x-auto pb-1">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av}
                    onClick={() => {
                      sound.playPop();
                      setSelectedAvatar(av);
                    }}
                    className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-transform cursor-pointer ${
                      selectedAvatar === av
                        ? 'bg-amber-400 ring-2 ring-amber-500 scale-110 shadow-xs'
                        : 'bg-white hover:bg-amber-50'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>

              {/* Name Presets and Input */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {NICKNAME_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      sound.playPop();
                      setPlayerName(preset);
                    }}
                    className="text-[11px] font-bold px-2 py-1 rounded-lg bg-white/80 hover:bg-white text-amber-950 border border-amber-200 shadow-2xs transition-colors cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={10}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="아이 이름이나 별명 (최대 10자)"
                  className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-xs sm:text-sm font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer"
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="max-h-[46vh] overflow-y-auto space-y-2 pr-1">
          {sortedEntries.map((entry, index) => {
            const rank = index + 1;
            const isTop1 = rank === 1;
            const isTop2 = rank === 2;
            const isTop3 = rank === 3;

            return (
              <div
                key={entry.id}
                className={`p-3 rounded-2xl flex items-center justify-between gap-2.5 transition-all ${
                  entry.isCurrentPlayer
                    ? 'bg-amber-100/90 border-2 border-amber-400 ring-2 ring-amber-300 shadow-sm'
                    : isTop1
                    ? 'bg-linear-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-xs'
                    : isTop2
                    ? 'bg-linear-to-r from-slate-50 to-stone-100 border border-slate-300 shadow-xs'
                    : isTop3
                    ? 'bg-linear-to-r from-amber-50/60 to-orange-50/40 border border-amber-200 shadow-xs'
                    : 'bg-stone-50 border border-stone-100'
                }`}
              >
                {/* Rank & Avatar & Name */}
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-black text-sm sm:text-base shrink-0">
                    {isTop1 ? (
                      <span className="text-xl sm:text-2xl animate-bounce">👑</span>
                    ) : isTop2 ? (
                      <span className="text-lg sm:text-xl">🥈</span>
                    ) : isTop3 ? (
                      <span className="text-lg sm:text-xl">🥉</span>
                    ) : (
                      <span className="text-stone-400 font-mono text-xs sm:text-sm">{rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-xl sm:text-2xl shadow-2xs shrink-0">
                    {entry.avatar}
                  </div>

                  {/* Name and Tag */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs sm:text-sm font-black truncate max-w-[110px] sm:max-w-[160px] ${
                        entry.isCurrentPlayer ? 'text-amber-950 font-extrabold' : 'text-stone-800'
                      }`}
                    >
                      {entry.name}
                    </span>
                    {entry.isCurrentPlayer && (
                      <span className="text-[10px] font-extrabold bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full">
                        나
                      </span>
                    )}
                  </div>
                </div>

                {/* Score & Butterflies */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-xs sm:text-sm font-black text-amber-600 font-mono">
                      ⭐ {entry.score}점
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-stone-500">
                      🦋 {entry.butterfliesCount}마리
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-stone-200/80 text-center">
          <p className="text-xs font-bold text-amber-800 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>나비를 탄생시키고 문제를 풀면 점수가 계속 쌓여요!</span>
          </p>
        </div>
      </div>
    </div>
  );
};
