import { getAllowedSymbols } from '../../../helpers/symbolHelpers';
import { config } from '../../../store/config';
import { useAppStore } from '../../../store/store';
import { BoardRow } from '../BoardRow';
import { Cell } from '../Cell';

interface KeyboardProps {}

export const Keyboard = ({}: KeyboardProps) => {
    const { symbolVariance, activeKeys } = useAppStore();
    const allowedSymbols = getAllowedSymbols(symbolVariance);
    const allSymbols = getAllowedSymbols(config.MAX_SYMBOL_VARIANCE);

    const firstRow = allSymbols.filter(
        (_, i) => i < config.MAX_SYMBOL_VARIANCE / 2
    );
    const secondRow = allSymbols.filter(
        (_, i) => i >= config.MAX_SYMBOL_VARIANCE / 2
    );

    return (
        <div className='mt-8'>
            <div className='flex gap-1'>
                {firstRow.map((symbol) => (
                    <Cell
                        key={symbol}
                        val={symbol}
                        size='small'
                        disabled={!allowedSymbols.includes(symbol)}
                        pressed={activeKeys.includes(symbol)}
                    />
                ))}
            </div>
            <div className='pl-5 flex gap-1'>
                {secondRow.map((symbol) => (
                    <Cell
                        key={symbol}
                        val={symbol}
                        size='small'
                        disabled={!allowedSymbols.includes(symbol)}
                        pressed={activeKeys.includes(symbol)}
                    />
                ))}
            </div>
        </div>
    );
};
