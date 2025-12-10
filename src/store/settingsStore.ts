import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { config } from './config';

interface SettingsState {
    symbolCount: number;
    symbolVariance: number;
    repeatedSymbols: boolean;
    wordleMode: boolean;
}

interface SettingsActions {
    setSymbolCount: (symbolCount: number) => void;
    setSymbolVariance: (symbolVariance: number) => void;
    setRepeatedSymbols: (repeatedSymbols: boolean) => void;
    setWordleMode: (wordleMode: boolean) => void;
    resetSettings: () => void;
}

interface SettingsStore extends SettingsState, SettingsActions {}

const initialState: SettingsState = {
    symbolCount: config.STARTING_SYMBOL_COUNT,
    symbolVariance: config.STARTING_SYMBOL_VARIANCE,
    repeatedSymbols: config.STARTING_REPEATED_SYMBOLS,
    wordleMode: config.STARTING_WORDLE_MODE,
};

export const useSettingsStore = create<SettingsStore>()(
    devtools(
        (set, get) => ({
            ...initialState,

            setSymbolCount: (symbolCount) => {
                const symbolVariance = get().symbolVariance;
                const updatedVarince =
                    !get().repeatedSymbols && symbolCount > symbolVariance
                        ? symbolCount
                        : symbolVariance;

                set({
                    symbolCount,
                    symbolVariance: updatedVarince,
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
                });
            },

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
                set({ repeatedSymbols });
            },

            setWordleMode: (wordleMode) => {
                set({ wordleMode });
            },

            resetSettings: () => set(initialState),
        }),
        { name: 'SettingsStore' }
    )
);
