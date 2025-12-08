import { BoardRow } from './BoardRow';
import { History } from './History';
import { Keyboard } from './keyboard/Keyboard';
import { useBoard } from './useBoard';

interface BoardProps {}

export const Board = ({}: BoardProps) => {
    const { currentGuess } = useBoard();

    return (
        <div className='grow'>
            <BoardRow guess={currentGuess} />
            <History />
            <Keyboard />
        </div>
    );
};
