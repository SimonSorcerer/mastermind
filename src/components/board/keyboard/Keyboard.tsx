import { getAllowedSymbols } from '../../../helpers/symbolHelpers';
import { useAppStore } from '../../../store/store';
import { BoardRow } from '../BoardRow';

interface KeyboardProps {}

export const Keyboard = ({}: KeyboardProps) => {
    const { symbolVariance } = useAppStore();
    const allowedSymbols = getAllowedSymbols(symbolVariance);

    return (
        <div className='mt-8'>
            <BoardRow guess={allowedSymbols} showResult={false} />
        </div>
    );
};
