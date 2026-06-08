import { evaluateGuess } from '../../helpers/symbolHelpers';
import { useSettingsStore } from '../../store/settingsStore';
import { useAppStore } from '../../store/store';
import { Cell } from './Cell';
import { RowResult } from './RowResult';

interface BoardRowProps {
    guess: string[];
    showResult?: boolean;
}

export const BoardRow = ({ guess, showResult = false }: BoardRowProps) => {
    const { symbolCount, wordleMode } = useSettingsStore();
    const { secret } = useAppStore();

    const positions =
        showResult && wordleMode && guess.length === symbolCount
            ? evaluateGuess(guess, secret).positions
            : undefined;

    return (
        <div className='flex gap-4'>
            <div className='flex gap-1'>
                {Array.from({ length: symbolCount }, (_, i) => (
                    <Cell key={i} val={guess[i]} result={positions?.[i]} />
                ))}
            </div>
            {showResult && !wordleMode && <RowResult guess={guess} />}
        </div>
    );
};
