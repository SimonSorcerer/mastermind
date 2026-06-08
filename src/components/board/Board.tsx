import { BoardRow } from './BoardRow';
import { History } from './History';
import { Keyboard } from './keyboard/Keyboard';
import { useBoard } from './useBoard';
import { useAppStore } from '../../store/store';

interface BoardProps {}

export const Board = ({}: BoardProps) => {
    const { currentGuess, isWon } = useBoard();
    const { history, resetGame } = useAppStore();

    return (
        <div className='grow'>
            {isWon ? (
                <div className='mb-4'>
                    <p className='font-bold'>
                        You cracked it in {history.length}{' '}
                        {history.length === 1 ? 'guess' : 'guesses'}!
                    </p>
                    <button
                        type='button'
                        className='mt-2 border-zinc-400 border rounded-md px-4 py-2'
                        onClick={resetGame}
                    >
                        New Game
                    </button>
                </div>
            ) : (
                <BoardRow guess={currentGuess} />
            )}
            <History />
            <Keyboard />
        </div>
    );
};
