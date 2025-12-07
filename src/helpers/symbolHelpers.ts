export const getAllowedSymbols = (variance: number) => {
    const symbols: string[] = [];

    for (let i = 0; i < variance; i++) {
        symbols.push(String.fromCharCode(97 + i)); // 'a' is 97 in ASCII
    }
    return symbols;
};

export const isValidSymbol = (symbol: string, variance: number) => {
    const allowedSymbols = getAllowedSymbols(variance);
    return allowedSymbols.includes(symbol.toLowerCase());
};

export const generateSecret = (
    symbolCount: number,
    variance: number,
    allowRepeats: boolean
) => {
    const allowedSymbols = getAllowedSymbols(variance);

    if (allowRepeats) {
        return Array.from({ length: symbolCount }, () => {
            const randomIndex = Math.floor(
                Math.random() * allowedSymbols.length
            );
            return allowedSymbols[randomIndex];
        });
    } else {
        const shuffled = [...allowedSymbols].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, symbolCount);
    }
};

export const evaluateGuess = (guess: string[], secret: string[]) => {
    const correctPositions = new Set<number>();
    const correctSymbols = new Set<number>();
    const symbolCache: Record<string, number> = {};

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            correctPositions.add(i);
        } else {
            symbolCache[secret[i]] = (symbolCache[secret[i]] || 0) + 1;
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (!correctPositions.has(i) && symbolCache[guess[i]]) {
            symbolCache[guess[i]]--;
            correctSymbols.add(i);
        }
    }

    return {
        correctPosition: correctPositions.size,
        correctSymbol: correctSymbols.size,
    };
};
