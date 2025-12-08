import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { generateSecret } from '../helpers/symbolHelpers';
import { config } from './config';

interface AppState {
    symbolCount: number;
    symbolVariance: number;
    repeatedSymbols: boolean;
    secret: string[];
    currentGuess: string[];
    history: string[][];
}

interface AppActions {
    setSymbolCount: (symbolCount: number) => void;
    setSymbolVariance: (symbolVariance: number) => void;
    setRepeatedSymbols: (repeatedSymbols: boolean) => void;
    addLetter: (guess: string) => void;
    removeLetter: () => void;
    addToHistory: (guess: string[]) => void;
    getAllowedSymbols: () => string[];
    resetGame: () => void;
}

interface AppStore extends AppState, AppActions {}

export const useAppStore = create<AppStore>()(
    devtools(
        (set, get) => ({
            symbolCount: config.STARTING_SYMBOL_COUNT,
            symbolVariance: config.STARTING_SYMBOL_VARIANCE,
            repeatedSymbols: false,
            secret: generateSecret(
                config.STARTING_SYMBOL_COUNT,
                config.STARTING_SYMBOL_VARIANCE,
                config.STARTING_REPEATED_SYMBOLS
            ),
            currentGuess: [],
            history: [],

            setRepeatedSymbols: (repeatedSymbols) => {
                if (!repeatedSymbols) {
                    const symbolCount = get().symbolCount;
                    const symbolVariance = get().symbolVariance;

                    if (symbolCount > symbolVariance) {
                        set({
                            symbolVariance: symbolCount,
                        });
                    }
                }
                set({ repeatedSymbols, currentGuess: [] });
            },
            setSymbolCount: (symbolCount) => {
                const symbolVariance = get().symbolVariance;
                const updatedVarince =
                    !get().repeatedSymbols && symbolCount > symbolVariance
                        ? symbolCount
                        : symbolVariance;

                set({
                    symbolCount,
                    symbolVariance: updatedVarince,
                    currentGuess: [],
                });
            },
            setSymbolVariance: (symbolVariance) => {
                const symbolCount = get().symbolCount;
                const updatedCount =
                    !get().repeatedSymbols && symbolVariance < symbolCount
                        ? symbolVariance
                        : symbolCount;

                set({
                    symbolVariance,
                    symbolCount: updatedCount,
                    currentGuess: [],
                });
            },
            addLetter: (guess) => {
                if (get().currentGuess.length >= get().symbolCount) {
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
                const variance = get().symbolVariance;

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
                        get().symbolCount,
                        get().symbolVariance,
                        get().repeatedSymbols
                    ),
                }),
        }),
        { name: 'MastermindStore' }
    )
);
