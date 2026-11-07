import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  limit,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { LeaderboardEntry } from '../types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass databaseId from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const LEADERBOARD_COLLECTION = 'leaderboard';

/**
 * Real-time listener for leaderboard collection
 */
export function subscribeToLeaderboard(
  onUpdate: (entries: LeaderboardEntry[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  try {
    const q = query(
      collection(db, LEADERBOARD_COLLECTION),
      orderBy('score', 'desc'),
      limit(25)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const items: LeaderboardEntry[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          items.push({
            id: docSnap.id,
            name: data.name || '꼬마 탐험가',
            avatar: data.avatar || '🦋',
            score: Number(data.score) || 0,
            butterfliesCount: Number(data.butterfliesCount) || 0,
            date: data.createdAt ? String(data.createdAt).split('T')[0] : '2026-11-06',
          });
        });
        onUpdate(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, LEADERBOARD_COLLECTION);
        if (onError) onError(error);
      }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, LEADERBOARD_COLLECTION);
    return () => {};
  }
}

/**
 * Save player score to Firestore in real-time
 */
export async function savePlayerScoreToFirestore(entry: {
  id: string;
  name: string;
  avatar: string;
  score: number;
  butterfliesCount: number;
}): Promise<void> {
  const docRef = doc(db, LEADERBOARD_COLLECTION, entry.id);
  const payload = {
    name: entry.name.slice(0, 20),
    avatar: entry.avatar.slice(0, 10),
    score: Math.max(0, Math.floor(entry.score)),
    butterfliesCount: Math.max(0, Math.floor(entry.butterfliesCount)),
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${LEADERBOARD_COLLECTION}/${entry.id}`);
  }
}
