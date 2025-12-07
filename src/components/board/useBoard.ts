import { useEffect } from 'react';
import { useAppStore } from '../../store/store';
import { getAllowedSymbols } from '../../helpers/symbolHelpers';

export const useBoard = () => {
    const {
        symbolCount,
        symbolVariance,
        currentGuess,
        addLetter,
        removeLetter,
        addToHistory,
    } = useAppStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const allowedSymbols = getAllowedSymbols(symbolVariance);
            const key = e.key.toLowerCase();

            if (allowedSymbols.includes(key)) {
                console.log('Pressed key:', key);
                addLetter(key);
            }

            if (e.key === 'Backspace' || e.key === 'Delete') {
                console.log('Pressed Backspace or Delete');
                removeLetter();
            }

            if (e.key === 'Enter') {
                console.log('Pressed Enter');
                if (currentGuess.length === symbolCount) {
                    addToHistory(currentGuess);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        symbolVariance,
        currentGuess,
        symbolCount,
        addLetter,
        removeLetter,
        addToHistory,
    ]);

    return {
        symbolCount,
        currentGuess,
    };
};
