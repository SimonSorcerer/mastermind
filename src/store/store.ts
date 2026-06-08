import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { generateSecret, evaluateGuess } from '../helpers/symbolHelpers';
import { useSettingsStore } from './settingsStore';

interface AppState {
    secret: string[];
    currentGuess: string[];
    history: string[][];
    activeKeys: string[];
    isWon: boolean;
}

interface AppActions {
    addLetter: (guess: string) => void;
    removeLetter: () => void;
    addToHistory: (guess: string[]) => void;
    resetGame: () => void;
    setActiveKeys: (keys: string[]) => void;
}

interface AppStore extends AppState, AppActions {}

const getSettings = () => useSettingsStore.getState();

export const useAppStore = create<AppStore>()(
    devtools(
        (set, get) => ({
            secret: generateSecret(
                getSettings().symbolCount,
                getSettings().symbolVariance,
                getSettings().repeatedSymbols
            ),
            currentGuess: [],
            history: [],
            activeKeys: [],
            isWon: false,

            addLetter: (guess) => {
                if (get().currentGuess.length >= getSettings().symbolCount) {
                    return;
                }
                set((state) => ({
                    currentGuess: [...state.currentGuess, guess],
                }));
            },
            removeLetter: () =>
                set((state) => ({
                    currentGuess: state.currentGuess.slice(0, -1),
                })),
            addToHistory: (guess) => {
                const { correctPosition } = evaluateGuess(guess, get().secret);
                const won = correctPosition === getSettings().symbolCount;
                set((state) => ({
                    history: [guess, ...state.history],
                    currentGuess: [],
                    isWon: won,
                }));
            },
            resetGame: () =>
                set({
                    currentGuess: [],
                    history: [],
                    isWon: false,
                    secret: generateSecret(
                        getSettings().symbolCount,
                        getSettings().symbolVariance,
                        getSettings().repeatedSymbols
                    ),
                }),
            setActiveKeys: (keys) =>
                set({
                    activeKeys: keys,
                }),
        }),
        { name: 'MastermindStore' }
    )
);
