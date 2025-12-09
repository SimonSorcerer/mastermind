import { useSettingsStore } from '../../store/settingsStore';
import { Cell } from './Cell';
import { RowResult } from './RowResult';

interface BoardRowProps {
    guess: string[];
    showResult?: boolean;
}

export const BoardRow = ({ guess, showResult = false }: BoardRowProps) => {
    const { symbolCount } = useSettingsStore();

    return (
        <div className='flex gap-4'>
            <div className='flex gap-1'>
                {Array.from({ length: symbolCount }, (_, i) => (
                    <Cell key={i} val={guess[i]} />
                ))}
            </div>
            {showResult && <RowResult guess={guess} />}
        </div>
    );
};
