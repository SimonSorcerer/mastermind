import { describe, it, expect } from 'bun:test';

import {
    getAllowedSymbols,
    isValidSymbol,
    generateSecret,
    evaluateGuess,
} from './symbolHelpers';

describe('getAllowedSymbols', () => {
    it('should return correct symbols for variance 1', () => {
        expect(getAllowedSymbols(1)).toEqual(['a']);
    });

    it('should return correct symbols for variance 5', () => {
        expect(getAllowedSymbols(5)).toEqual(['a', 'b', 'c', 'd', 'e']);
    });

    it('should return correct symbols for variance 10', () => {
        expect(getAllowedSymbols(10)).toEqual([
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
        ]);
    });

    it('should return empty array for variance 0', () => {
        expect(getAllowedSymbols(0)).toEqual([]);
    });
});

describe('isValidSymbol', () => {
    it('should return true for valid lowercase symbol', () => {
        expect(isValidSymbol('a', 5)).toBe(true);
        expect(isValidSymbol('e', 5)).toBe(true);
    });

    it('should return true for valid uppercase symbol', () => {
        expect(isValidSymbol('A', 5)).toBe(true);
        expect(isValidSymbol('E', 5)).toBe(true);
    });

    it('should return false for symbol outside variance', () => {
        expect(isValidSymbol('f', 5)).toBe(false);
        expect(isValidSymbol('z', 5)).toBe(false);
    });

    it('should return false for non-letter characters', () => {
        expect(isValidSymbol('1', 5)).toBe(false);
        expect(isValidSymbol('!', 5)).toBe(false);
    });
});

describe('generateSecret', () => {
    it('should generate secret with correct length', () => {
        const secret = generateSecret(5, 10, true);
        expect(secret).toHaveLength(5);
    });

    it('should only use allowed symbols', () => {
        const secret = generateSecret(5, 5, true);
        const allowedSymbols = getAllowedSymbols(5);
        secret.forEach((symbol) => {
            expect(allowedSymbols).toContain(symbol);
        });
    });

    it('should allow repeats when allowRepeats is true', () => {
        const secret = generateSecret(10, 3, true);
        expect(secret).toHaveLength(10);
        // With only 3 symbols and 10 positions, repeats must occur
        const uniqueSymbols = new Set(secret);
        expect(uniqueSymbols.size).toBeLessThanOrEqual(3);
    });

    it('should not have repeats when allowRepeats is false', () => {
        const secret = generateSecret(5, 10, false);
        const uniqueSymbols = new Set(secret);
        expect(uniqueSymbols.size).toBe(5);
    });

    it('should handle edge case: symbolCount equals variance without repeats', () => {
        const secret = generateSecret(5, 5, false);
        expect(secret).toHaveLength(5);
        const uniqueSymbols = new Set(secret);
        expect(uniqueSymbols.size).toBe(5);
    });
});

describe('evaluateGuess', () => {
    it('should return all correct positions for exact match', () => {
        const secret = ['a', 'b', 'c', 'd', 'e'];
        const guess = ['a', 'b', 'c', 'd', 'e'];
        const result = evaluateGuess(guess, secret);
        expect(result.correctPosition).toBe(5);
        expect(result.correctSymbol).toBe(0);
    });

    it('should return 0 for completely wrong guess', () => {
        const secret = ['a', 'b', 'c', 'd', 'e'];
        const guess = ['f', 'g', 'h', 'i', 'j'];
        const result = evaluateGuess(guess, secret);
        expect(result.correctPosition).toBe(0);
        expect(result.correctSymbol).toBe(0);
    });

    it('should detect correct symbols in wrong positions', () => {
        const secret = ['a', 'b', 'c', 'd', 'e'];
        const guess = ['e', 'd', 'c', 'b', 'a'];
        const result = evaluateGuess(guess, secret);
        expect(result.correctPosition).toBe(1); // 'c' in middle
        expect(result.correctSymbol).toBe(4); // a, b, d, e
    });

    it('should handle partial matches correctly', () => {
        const secret = ['a', 'b', 'c', 'd', 'e'];
        const guess = ['a', 'c', 'e', 'f', 'g'];
        const result = evaluateGuess(guess, secret);
        expect(result.correctPosition).toBe(1); // 'a' at position 0
        expect(result.correctSymbol).toBe(2); // 'c' and 'e'
    });

    it('should handle duplicates in guess correctly', () => {
        const secret = ['a', 'b', 'c', 'd', 'e'];
        const guess = ['a', 'a', 'a', 'a', 'a'];
        const result = evaluateGuess(guess, secret);
        expect(result.correctPosition).toBe(1); // only first 'a'
        expect(result.correctSymbol).toBe(0);
    });

    it('should handle duplicates in secret correctly', () => {
        const secret = ['a', 'a', 'b', 'b', 'c'];
        const guess = ['a', 'b', 'a', 'b', 'c'];
        const result = evaluateGuess(guess, secret);
        expect(result.correctPosition).toBe(3); // 'a' at 0, 'b' at 3, 'c' at 4
        expect(result.correctSymbol).toBe(2); // second 'a' and first 'b'
    });

    it('should not count same symbol twice', () => {
        const secret = ['a', 'b', 'c', 'd', 'e'];
        const guess = ['b', 'a', 'f', 'g', 'h'];
        const result = evaluateGuess(guess, secret);
        expect(result.correctPosition).toBe(0);
        expect(result.correctSymbol).toBe(2); // 'a' and 'b'
    });

    it('should handle complex case with repeats', () => {
        const secret = ['a', 'a', 'b', 'c', 'd'];
        const guess = ['a', 'c', 'a', 'b', 'd'];
        const result = evaluateGuess(guess, secret);
        expect(result.correctPosition).toBe(2); // first 'a' and last 'd'
        expect(result.correctSymbol).toBe(3); // second 'a', 'b', 'c'
    });
});
