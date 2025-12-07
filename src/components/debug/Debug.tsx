import { getAllowedSymbols } from '../../helpers/symbolHelpers';
import { useAppStore } from '../../store/store';

export const Debug = () => {
    const { symbolVariance, currentGuess, secret } = useAppStore();

    return (
        <div>
            <p>GUESS: {currentGuess.join('')}</p>
            <p>SECRET: {secret}</p>
            <p>ALLOWED: [ {getAllowedSymbols(symbolVariance).join(' ')} ]</p>
        </div>
    );
};
