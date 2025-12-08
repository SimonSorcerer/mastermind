import { useAppStore } from '../../store/store';
import { BoardRow } from './BoardRow';

interface HistoryProps {}

export const History = ({}: HistoryProps) => {
    const { history } = useAppStore();

    return (
        <div className='mt-6'>
            {history.map((guess: string[], index: number) => (
                <BoardRow key={index} guess={guess} showResult={true} />
            ))}
        </div>
    );
};
