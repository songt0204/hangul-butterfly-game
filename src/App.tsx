import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StageId, QuizItem, Butterfly, CollectedButterfly, LeaderboardEntry } from './types';
import { BUTTERFLIES } from './data/butterflies';
import { getQuizzesForStage } from './data/quizData';
import { sound } from './utils/audio';
import { speech } from './utils/speech';
import { subscribeToLeaderboard, savePlayerScoreToFirestore } from './utils/firebase';

import { Header } from './components/Header';
import { StageProgressBar } from './components/StageProgressBar';
import { StageVisual } from './components/StageVisual';
import { QuizCard } from './components/QuizCard';
import { LevelUpModal } from './components/LevelUpModal';
import { ButterflyBirthModal } from './components/ButterflyBirthModal';
import { ButterflyCollectionModal } from './components/ButterflyCollectionModal';
import { ConsonantChartModal } from './components/ConsonantChartModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { Trophy, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'hangul_butterflies_v1';
const LEADERBOARD_KEY = 'hangul_leaderboard_v1';

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'lb-1', name: '나비박사 다람이', avatar: '🐿️', score: 30, butterfliesCount: 10, date: '2026-11-01' },
  { id: 'lb-2', name: '씩씩한 호랑이', avatar: '🐯', score: 26, butterfliesCount: 8, date: '2026-11-02' },
  { id: 'lb-3', name: '방긋방긋 토끼', avatar: '🐰', score: 22, butterfliesCount: 7, date: '2026-11-03' },
  { id: 'lb-4', name: '삐약이 꼬물이', avatar: '🐥', score: 18, butterfliesCount: 5, date: '2026-11-04' },
  { id: 'lb-5', name: '꿀벌 곰돌이', avatar: '🐻', score: 14, butterfliesCount: 3, date: '2026-11-05' },
  { id: 'lb-6', name: '야옹이 친구', avatar: '🐱', score: 10, butterfliesCount: 2, date: '2026-11-06' },
];

export default function App() {
  const [stage, setStage] = useState<StageId>(1);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameCycleCount, setGameCycleCount] = useState<number>(0);

  // Sound and Voice Settings
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState<boolean>(true);

  // Modals
  const [showLevelUpModal, setShowLevelUpModal] = useState<boolean>(false);
  const [showBirthModal, setShowBirthModal] = useState<boolean>(false);
  const [showCollectionModal, setShowCollectionModal] = useState<boolean>(false);
  const [showConsonantChartModal, setShowConsonantChartModal] = useState<boolean>(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);

  // Collected Butterflies State
  const [collectedButterflies, setCollectedButterflies] = useState<CollectedButterfly[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return [{ butterflyId: 'tiger_swallowtail', collectedAt: new Date().toISOString() }];
  });

  // Leaderboard State (Synchronized with Google Firebase Firestore in real-time)
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>(() => {
    try {
      const stored = localStorage.getItem(LEADERBOARD_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_LEADERBOARD;
  });

  // Subscribe to Firebase Firestore real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((cloudEntries) => {
      if (cloudEntries && cloudEntries.length > 0) {
        const myLocalPlayerId = localStorage.getItem('hangul_player_id');
        const formatted: LeaderboardEntry[] = cloudEntries.map((e) => ({
          ...e,
          isCurrentPlayer: myLocalPlayerId ? e.id === myLocalPlayerId : false,
        }));

        // Merge with preset champions so the board always looks populated and fun
        const combined: LeaderboardEntry[] = [...formatted];
        DEFAULT_LEADERBOARD.forEach((preset) => {
          if (!combined.some((c) => c.name === preset.name)) {
            combined.push({ ...preset, isCurrentPlayer: false });
          }
        });
        setLeaderboardEntries(combined);
      }
    });

    return () => unsubscribe();
  }, []);

  // Pick target butterfly to hatch for this journey
  const selectNextTargetButterfly = useCallback((currentCollected: CollectedButterfly[]): Butterfly => {
    const collectedIds = new Set(currentCollected.map((c) => c.butterflyId));
    const uncollected = BUTTERFLIES.filter((b) => !collectedIds.has(b.id));

    if (uncollected.length > 0) {
      return uncollected[0];
    }
    const randomIndex = Math.floor(Math.random() * BUTTERFLIES.length);
    return BUTTERFLIES[randomIndex];
  }, []);

  const [targetButterfly, setTargetButterfly] = useState<Butterfly>(() => {
    return selectNextTargetButterfly(collectedButterflies);
  });

  // Current quizzes for current stage with randomly shuffled options
  const currentStageQuizzes = useMemo(() => {
    return getQuizzesForStage(stage);
  }, [stage, gameCycleCount]);

  const currentQuiz: QuizItem = currentStageQuizzes[questionIndex] || currentStageQuizzes[0];

  // Auto-speak question on new quiz arrival if TTS is active
  useEffect(() => {
    if (isTtsEnabled && !showLevelUpModal && !showBirthModal && !showLeaderboardModal) {
      const timer = setTimeout(() => {
        speech.speak(currentQuiz.audioPrompt, 0.9, 1.15);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [stage, questionIndex, isTtsEnabled, currentQuiz?.audioPrompt, showLevelUpModal, showBirthModal, showLeaderboardModal]);

  // Handle Correct Answer
  const handleAnswerCorrect = () => {
    const newScore = score + 1;
    setScore(newScore);

    // Auto sync to Firestore if user already registered a player id
    const existingPlayerId = localStorage.getItem('hangul_player_id');
    const existingPlayerName = localStorage.getItem('hangul_player_name');
    const existingAvatar = localStorage.getItem('hangul_player_avatar') || '🦋';
    if (existingPlayerId && existingPlayerName) {
      savePlayerScoreToFirestore({
        id: existingPlayerId,
        name: existingPlayerName,
        avatar: existingAvatar,
        score: newScore,
        butterfliesCount: collectedButterflies.length,
      }).catch(() => {});
    }

    if (questionIndex < 9) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Completed 10 questions in this stage!
      if (stage === 1) {
        setShowLevelUpModal(true);
      } else if (stage === 2) {
        setShowLevelUpModal(true);
      } else if (stage === 3) {
        // Register in collection
        const updated = [...collectedButterflies];
        const isAlreadyCollected = updated.some((c) => c.butterflyId === targetButterfly.id);
        if (!isAlreadyCollected) {
          updated.push({
            butterflyId: targetButterfly.id,
            collectedAt: new Date().toISOString(),
          });
          setCollectedButterflies(updated);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          } catch {
            // Storage error fallback
          }
        }
        setShowBirthModal(true);
      }
    }
  };

  // Move from LevelUpModal to next stage
  const handleProceedToNextStage = () => {
    setShowLevelUpModal(false);
    if (stage === 1) {
      setStage(2);
      setQuestionIndex(0);
    } else if (stage === 2) {
      setStage(3);
      setQuestionIndex(0);
    }
  };

  // Restart current game from 1st stage
  const handleRestartCurrentGame = () => {
    setStage(1);
    setQuestionIndex(0);
    setGameCycleCount((c) => c + 1);
    const nextButterfly = selectNextTargetButterfly(collectedButterflies);
    setTargetButterfly(nextButterfly);
  };

  // Restart new game cycle from birth modal
  const handleRestartFromBirth = () => {
    setShowBirthModal(false);
    handleRestartCurrentGame();
  };

  // Reset entire collection and start fresh
  const handleResetCollection = () => {
    const initialList = [{ butterflyId: 'tiger_swallowtail', collectedAt: new Date().toISOString() }];
    setCollectedButterflies(initialList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialList));
    } catch {
      // Storage error fallback
    }
    setStage(1);
    setQuestionIndex(0);
    setGameCycleCount((c) => c + 1);
    const next = BUTTERFLIES[1];
    setTargetButterfly(next);
  };

  // Save or update player's record on Firebase & Leaderboard
  const handleSaveLeaderboardRecord = async (name: string, avatar: string) => {
    let playerId = localStorage.getItem('hangul_player_id');
    if (!playerId) {
      playerId = 'player_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('hangul_player_id', playerId);
    }
    localStorage.setItem('hangul_player_name', name);
    localStorage.setItem('hangul_player_avatar', avatar);

    const newEntry: LeaderboardEntry = {
      id: playerId,
      name,
      avatar,
      score,
      butterfliesCount: collectedButterflies.length,
      date: new Date().toISOString().split('T')[0],
      isCurrentPlayer: true,
    };

    // Update local state immediately
    const filtered = leaderboardEntries.filter((e) => e.id !== playerId);
    const updated = [newEntry, ...filtered];
    setLeaderboardEntries(updated);

    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    } catch {
      // Storage fallback
    }

    // Real-time synchronization to Google Firebase Firestore!
    try {
      await savePlayerScoreToFirestore(newEntry);
    } catch (err) {
      console.error('Firebase save error:', err);
    }
  };

  // Toggle Sound
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Toggle Voice TTS
  const handleToggleTts = () => {
    const enabled = speech.toggle();
    setIsTtsEnabled(enabled);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/70 via-emerald-50/30 to-amber-100/40 text-stone-800 flex flex-col font-sans pb-10">
      {/* 1. Header Bar with Leaderboard Trophy */}
      <Header
        collectedCount={collectedButterflies.length}
        totalButterflies={BUTTERFLIES.length}
        onOpenCollection={() => setShowCollectionModal(true)}
        onOpenConsonantChart={() => setShowConsonantChartModal(true)}
        onOpenLeaderboard={() => setShowLeaderboardModal(true)}
        onRestartCurrentGame={handleRestartCurrentGame}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isTtsEnabled={isTtsEnabled}
        onToggleTts={handleToggleTts}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-start pt-2 sm:pt-4">
        {/* 2. Front Screen Link to Leaderboard */}
        <div className="w-full max-w-2xl px-4 mb-2">
          <button
            onClick={() => {
              sound.playPop();
              setShowLeaderboardModal(true);
            }}
            className="w-full group rounded-2xl bg-linear-to-r from-amber-100/90 via-yellow-100 to-orange-100/80 border-2 border-amber-300 hover:border-amber-400 p-2.5 sm:p-3 flex items-center justify-between shadow-xs transition-all hover:shadow-md active:scale-98 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-amber-300 flex items-center justify-center text-xl sm:text-2xl shadow-2xs group-hover:rotate-6 transition-transform">
                <Trophy className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-black text-amber-950">
                    실시간 명예의 전당 (리더보드)
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 font-bold">
                  내 실시간 점수와 다른 친구들의 랭킹 확인하기 ➔
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-black text-amber-900 bg-white/90 px-3 py-1.5 rounded-xl border border-amber-200 group-hover:bg-amber-400 group-hover:text-amber-950 transition-colors shrink-0">
              <span>순위 보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* 3. 3-Stage Progress Bar & 10 Questions Dots */}
        <StageProgressBar
          currentStage={stage}
          questionIndex={questionIndex}
          totalQuestions={10}
          score={score}
        />

        {/* 4. Stage Growth Visual (Egg / Pupa / Butterfly) */}
        <StageVisual
          stage={stage}
          questionIndex={questionIndex}
          nextButterfly={targetButterfly}
        />

        {/* 5. Active Question Card (3 Distinct Progressive Game Types) */}
        <QuizCard
          key={`${stage}-${questionIndex}-${gameCycleCount}`}
          quiz={currentQuiz}
          onAnswerCorrect={handleAnswerCorrect}
        />
      </main>

      {/* MODALS */}
      {/* Level Up Modal (Stage 1->2 and Stage 2->3) */}
      {showLevelUpModal && (
        <LevelUpModal
          currentStage={stage}
          onProceedToNextStage={handleProceedToNextStage}
        />
      )}

      {/* Grand Butterfly Birth Modal (Stage 3 Finish) */}
      {showBirthModal && (
        <ButterflyBirthModal
          butterfly={targetButterfly}
          isFirstDiscovery={!collectedButterflies.some((c) => c.butterflyId === targetButterfly.id)}
          onOpenCollection={() => {
            setShowBirthModal(false);
            setShowCollectionModal(true);
          }}
          onRestartGame={handleRestartFromBirth}
        />
      )}

      {/* Butterfly Collection / Illustrated Book Modal */}
      {showCollectionModal && (
        <ButterflyCollectionModal
          collectedList={collectedButterflies}
          onClose={() => setShowCollectionModal(false)}
          onResetCollection={handleResetCollection}
        />
      )}

      {/* Consonant Sound Playground (ㄱ~ㅎ 14개) */}
      {showConsonantChartModal && (
        <ConsonantChartModal onClose={() => setShowConsonantChartModal(false)} />
      )}

      {/* 🏆 Leaderboard Modal (명예의 전당) with Firebase Real-time sync */}
      {showLeaderboardModal && (
        <LeaderboardModal
          entries={leaderboardEntries}
          currentScore={score}
          collectedCount={collectedButterflies.length}
          onSaveRecord={handleSaveLeaderboardRecord}
          onClose={() => setShowLeaderboardModal(false)}
        />
      )}
    </div>
  );
}
