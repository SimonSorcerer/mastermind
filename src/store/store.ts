import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { generateSecret } from '../helpers/symbolHelpers';
import { useSettingsStore } from './settingsStore';

interface AppState {
    secret: string[];
    currentGuess: string[];
    history: string[][];
    activeKeys: string[];
}

interface AppActions {
    addLetter: (guess: string) => void;
    removeLetter: () => void;
    addToHistory: (guess: string[]) => void;
    getAllowedSymbols: () => string[];
    resetGame: () => void;
    setActiveKeys: (keys: string[]) => void;
}

interface AppStore extends AppState, AppActions {}

// Helper to get current settings
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
            addToHistory: (guess) =>
                set((state) => ({
                    history: [guess, ...state.history],
                    currentGuess: [],
                })),
            getAllowedSymbols: () => {
                const symbols: string[] = [];
                const variance = getSettings().symbolVariance;

                for (let i = 0; i < variance; i++) {
                    symbols.push(String.fromCharCode(97 + i)); // 'a' is 97 in ASCII
                }
                return symbols;
            },
            resetGame: () =>
                set({
                    currentGuess: [],
                    history: [],
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
