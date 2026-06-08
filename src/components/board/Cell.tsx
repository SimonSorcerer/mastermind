import cx from 'classnames';

interface CellProps {
    val: string | undefined;
    size?: 'small' | 'large';
    disabled?: boolean;
    pressed?: boolean;
    result?: 'correct' | 'misplaced' | 'absent';
}

export const Cell = ({
    val,
    size = 'large',
    disabled = false,
    pressed = false,
    result,
}: CellProps) => {
    const letter = val?.toUpperCase() || '';

    const className = cx(
        { 'w-14 h-14': size === 'large' },
        { 'text-3xl': size === 'large' },
        { 'w-8 h-8': size === 'small' },
        { 'text-lg': size === 'small' },
        { 'text-zinc-400': disabled },
        { 'opacity-70': disabled },
        { 'bg-zinc-300': pressed && !disabled },
        { 'bg-green-500 !border-green-500 text-white': result === 'correct' },
        { 'bg-yellow-400 !border-yellow-400 text-white': result === 'misplaced' },
        'border-zinc-300 border rounded-sm',
        'mb-2 text-center flex items-center justify-center font-bold'
    );

    return <div className={className}>{letter}</div>;
};
