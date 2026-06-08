import { BoardRow } from './BoardRow';
import { History } from './History';
import { Keyboard } from './keyboard/Keyboard';
import { useBoard } from './useBoard';
import { useAppStore } from '../../store/store';

interface BoardProps {}

export const Board = ({}: BoardProps) => {
    const { currentGuess, isWon } = useBoard();
    const { history } = useAppStore();

    return (
        <div className='grow'>
            {isWon ? (
                <p className='mb-4 font-bold'>
                    You cracked it in {history.length}{' '}
                    {history.length === 1 ? 'guess' : 'guesses'}!
                </p>
            ) : (
                <BoardRow guess={currentGuess} />
            )}
            <History />
            <Keyboard />
        </div>
    );
};
