import cx from 'classnames';

interface CellProps {
    val: string | undefined;
    size?: 'small' | 'large';
    disabled?: boolean;
    pressed?: boolean;
}

export const Cell = ({
    val,
    size = 'large',
    disabled = false,
    pressed = false,
}: CellProps) => {
    const letter = val?.toUpperCase() || '';

    const className = cx(
        { 'w-14 h-14': size === 'large' },
        { 'text-3xl': size === 'large' },
        { 'w-8 h-8': size === 'small' },
        { 'text-lg': size === 'small' },
        { 'text-zinc-400': disabled },
        { 'bg-zinc-300': pressed && !disabled },
        'border-zinc-300 border rounded-sm',
        'mb-2 text-center flex items-center justify-center font-bold'
    );

    return <div className={className}>{letter}</div>;
};
