import { useEffect } from 'react';
import { useAppStore } from '../../store/store';
import { getAllowedSymbols } from '../../helpers/symbolHelpers';
import { useSettingsStore } from '../../store/settingsStore';

export const useBoard = () => {
    const { symbolVariance, symbolCount } = useSettingsStore();
    const {
        currentGuess,
        addLetter,
        removeLetter,
        addToHistory,
        setActiveKeys,
        activeKeys,
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

            setActiveKeys([key]);
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

    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            console.log('Released key:', e.key);
            setActiveKeys([...activeKeys.filter((k) => k !== e.key)]);
        };
        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, [symbolVariance, activeKeys, setActiveKeys]);

    return {
        symbolCount,
        currentGuess,
    };
};
