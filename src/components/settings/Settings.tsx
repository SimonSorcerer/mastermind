import { useAppStore } from '../../store/store';
import { config } from '../../store/config';
import { useSettingsStore } from '../../store/settingsStore';

interface SettingsProps {
    className?: string;
    expanded?: boolean;
}

export const Settings = ({ className, expanded = false }: SettingsProps) => {
    const { MIN_SYMBOL_COUNT, MAX_SYMBOL_COUNT } = config;
    const {
        symbolCount,
        symbolVariance,
        repeatedSymbols,
        wordleMode,
        setSymbolCount,
        setSymbolVariance,
        setRepeatedSymbols,
        setWordleMode,
    } = useSettingsStore();
    const { resetGame } = useAppStore();

    const handleSymbolCountChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSymbolCount(Number(e.target.value));
    };

    const handleSymbolVarianceChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSymbolVariance(Number(e.target.value));
    };

    const handleRepeatedSymbolsChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRepeatedSymbols(e.target.checked);
    };

    const handleWordleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWordleMode(e.target.checked);
    };

    const handleResetGame = () => {
        resetGame();
    };

    return (
        <div className={className}>
            <h2 className='pb-4'>Settings</h2>
            {expanded && (
                <div className='flex flex-col gap-2 max-w-lg'>
                    <label htmlFor='symbolCount'>
                        Symbol count: {symbolCount}
                    </label>
                    <input
                        type='range'
                        id='symbolCount'
                        name='symbolCount'
                        min={MIN_SYMBOL_COUNT}
                        max={MAX_SYMBOL_COUNT}
                        value={symbolCount}
                        onChange={handleSymbolCountChange}
                    />

                    <label htmlFor='symbolVariance'>
                        Symbol variance: {symbolVariance}
                    </label>
                    <input
                        type='range'
                        id='symbolVariance'
                        name='symbolVariance'
                        min={MIN_SYMBOL_COUNT}
                        max={MAX_SYMBOL_COUNT}
                        value={symbolVariance}
                        onChange={handleSymbolVarianceChange}
                    />

                    <label htmlFor='repeatedSymbols' className='mt-2'>
                        <input
                            type='checkbox'
                            id='repeatedSymbols'
                            name='repeatedSymbols'
                            checked={repeatedSymbols}
                            className='mr-2'
                            onChange={handleRepeatedSymbolsChange}
                        />
                        Allow repeated symbols
                    </label>

                    <label htmlFor='wordleMode'>
                        <input
                            type='checkbox'
                            id='wordleMode'
                            name='wordleMode'
                            checked={wordleMode}
                            className='mr-2'
                            onChange={handleWordleModeChange}
                        />
                        Enable Wordle mode (direct feedback - easier)
                    </label>

                    <p className='mt-4 opacity-60'>
                        Changing settings will re-generate the secret and
                        restart your current game.
                    </p>
                    <button
                        type='button'
                        className='mt-4 border-zinc-400 border rounded-md p-2'
                        onClick={handleResetGame}
                    >
                        Reset Game
                    </button>
                </div>
            )}
        </div>
    );
};
