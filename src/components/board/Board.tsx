import { BoardRow } from './BoardRow';
import { History } from './History';
import { Keyboard } from './keyboard/Keyboard';
import { WinBanner } from './WinBanner';
import { useBoard } from './useBoard';
import { useAppStore } from '../../store/store';

export const Board = () => {
    const { currentGuess, isWon } = useBoard();
    const { history, resetGame } = useAppStore();

    return (
        <div className='grow'>
            {isWon ? (
                <WinBanner guessCount={history.length} onNewGame={resetGame} />
            ) : (
                <BoardRow guess={currentGuess} />
            )}
            <History />
            <Keyboard />
        </div>
    );
};
