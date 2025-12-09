import { getAllowedSymbols } from '../../helpers/symbolHelpers';
import { useSettingsStore } from '../../store/settingsStore';
import { useAppStore } from '../../store/store';

export const Debug = () => {
    const { currentGuess, secret, activeKeys } = useAppStore();
    const { symbolVariance } = useSettingsStore();

    return (
        <div className='mt-12 text-xl'>
            <p>GUESS: {currentGuess.join('')}</p>
            <p>SECRET: {secret}</p>
            <p>ALLOWED: [ {getAllowedSymbols(symbolVariance).join(' ')} ]</p>
            <p>ACTIVE KEYS: {activeKeys.join(', ')}</p>
        </div>
    );
};
