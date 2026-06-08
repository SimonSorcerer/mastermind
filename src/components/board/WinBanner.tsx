interface WinBannerProps {
    guessCount: number;
    onNewGame: () => void;
}

export const WinBanner = ({ guessCount, onNewGame }: WinBannerProps) => (
    <div className='mb-4'>
        <p className='font-bold'>
            You cracked it in {guessCount}{' '}
            {guessCount === 1 ? 'guess' : 'guesses'}!
        </p>
        <button
            type='button'
            className='mt-2 border-zinc-400 border rounded-md px-4 py-2'
            onClick={onNewGame}
        >
            New Game
        </button>
    </div>
);
