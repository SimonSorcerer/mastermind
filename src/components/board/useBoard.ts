import { useEffect } from 'react';
import { useAppStore } from '../../store/store';
import { getAllowedSymbols } from '../../helpers/symbolHelpers';
import { useSettingsStore } from '../../store/settingsStore';

export const useBoard = () => {
    const { symbolVariance, symbolCount } = useSettingsStore();
    const {
        currentGuess,
        isWon,
        addLetter,
        removeLetter,
        addToHistory,
        resetGame,
        setActiveKeys,
        activeKeys,
    } = useAppStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isWon) {
                if (e.key === 'Enter') resetGame();
                return;
            }

            const allowedSymbols = getAllowedSymbols(symbolVariance);
            const key = e.key.toLowerCase();

            if (allowedSymbols.includes(key)) {
                addLetter(key);
            }

            if (e.key === 'Backspace' || e.key === 'Delete') {
                removeLetter();
            }

            if (e.key === 'Enter') {
                if (currentGuess.length === symbolCount) {
                    addToHistory(currentGuess);
                }
            }

            setActiveKeys([key]);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        symbolVariance,
        currentGuess,
        symbolCount,
        isWon,
        addLetter,
        removeLetter,
        addToHistory,
        resetGame,
    ]);

    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            setActiveKeys([...activeKeys.filter((k) => k !== e.key)]);
        };
        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, [symbolVariance, activeKeys, setActiveKeys]);

    return {
        symbolCount,
        currentGuess,
        isWon,
    };
};
