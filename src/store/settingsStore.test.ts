import { describe, it, expect, beforeEach } from 'bun:test';
import { useSettingsStore } from './settingsStore';

beforeEach(() => {
    useSettingsStore.getState().resetSettings();
});

describe('setSymbolCount', () => {
    it('bumps symbolVariance up when symbolCount would exceed it (no repeats)', () => {
        useSettingsStore.getState().setSymbolCount(6);

        const { symbolCount, symbolVariance } = useSettingsStore.getState();
        expect(symbolCount).toBe(6);
        expect(symbolVariance).toBe(6);
    });

    it('leaves symbolVariance unchanged when symbolCount stays within it', () => {
        useSettingsStore.setState({ symbolVariance: 8 });
        useSettingsStore.getState().setSymbolCount(5);

        const { symbolCount, symbolVariance } = useSettingsStore.getState();
        expect(symbolCount).toBe(5);
        expect(symbolVariance).toBe(8);
    });

    it('does not bump symbolVariance when repeats are allowed', () => {
        useSettingsStore.setState({ repeatedSymbols: true, symbolVariance: 3 });
        useSettingsStore.getState().setSymbolCount(6);

        const { symbolCount, symbolVariance } = useSettingsStore.getState();
        expect(symbolCount).toBe(6);
        expect(symbolVariance).toBe(3);
    });
});

describe('setSymbolVariance', () => {
    it('clamps symbolCount down when symbolVariance drops below it (no repeats)', () => {
        useSettingsStore.setState({ symbolCount: 6, symbolVariance: 8 });
        useSettingsStore.getState().setSymbolVariance(4);

        const { symbolCount, symbolVariance } = useSettingsStore.getState();
        expect(symbolVariance).toBe(4);
        expect(symbolCount).toBe(4);
    });

    it('leaves symbolCount unchanged when symbolVariance stays above it', () => {
        useSettingsStore.setState({ symbolCount: 4, symbolVariance: 6 });
        useSettingsStore.getState().setSymbolVariance(5);

        const { symbolCount, symbolVariance } = useSettingsStore.getState();
        expect(symbolVariance).toBe(5);
        expect(symbolCount).toBe(4);
    });

    it('does not clamp symbolCount when repeats are allowed', () => {
        useSettingsStore.setState({ symbolCount: 6, symbolVariance: 8, repeatedSymbols: true });
        useSettingsStore.getState().setSymbolVariance(3);

        const { symbolCount, symbolVariance } = useSettingsStore.getState();
        expect(symbolVariance).toBe(3);
        expect(symbolCount).toBe(6);
    });
});

describe('setRepeatedSymbols', () => {
    it('bumps symbolVariance up when disabling repeats with symbolCount > symbolVariance', () => {
        useSettingsStore.setState({ symbolCount: 6, symbolVariance: 4, repeatedSymbols: true });
        useSettingsStore.getState().setRepeatedSymbols(false);

        const { symbolVariance, repeatedSymbols } = useSettingsStore.getState();
        expect(repeatedSymbols).toBe(false);
        expect(symbolVariance).toBe(6);
    });

    it('leaves symbolVariance unchanged when disabling repeats with symbolCount <= symbolVariance', () => {
        useSettingsStore.setState({ symbolCount: 4, symbolVariance: 6, repeatedSymbols: true });
        useSettingsStore.getState().setRepeatedSymbols(false);

        const { symbolCount, symbolVariance, repeatedSymbols } = useSettingsStore.getState();
        expect(repeatedSymbols).toBe(false);
        expect(symbolCount).toBe(4);
        expect(symbolVariance).toBe(6);
    });

    it('does not change symbolCount or symbolVariance when enabling repeats', () => {
        useSettingsStore.setState({ symbolCount: 4, symbolVariance: 4, repeatedSymbols: false });
        useSettingsStore.getState().setRepeatedSymbols(true);

        const { symbolCount, symbolVariance, repeatedSymbols } = useSettingsStore.getState();
        expect(repeatedSymbols).toBe(true);
        expect(symbolCount).toBe(4);
        expect(symbolVariance).toBe(4);
    });
});
