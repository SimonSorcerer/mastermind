interface CellProps {
    val: string | undefined;
}

export const Cell = ({ val }: CellProps) => {
    const letter = val?.toUpperCase() || '';

    return (
        <div className='w-14 h-14 border border-zinc-300 rounded-sm mb-2 text-center flex items-center justify-center text-3xl font-bold'>
            {letter}
        </div>
    );
};
