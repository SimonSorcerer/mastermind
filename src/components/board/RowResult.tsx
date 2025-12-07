import { evaluateGuess } from '../../helpers/symbolHelpers';
import { useAppStore } from '../../store/store';

interface RowResultProps {
    guess: string[];
}

export const RowResult = ({ guess }: RowResultProps) => {
    const { symbolCount, secret } = useAppStore();

    if (guess.length !== symbolCount) {
        return null;
    }

    const results = evaluateGuess(guess, secret);

    return (
        <div className='max-w-20 flex gap-1'>
            {Array.from({ length: results.correctPosition }, (_, i) => (
                <div key={i}>X</div>
            ))}
            {Array.from({ length: results.correctSymbol }, (_, i) => (
                <div key={i}>O</div>
            ))}
        </div>
    );
};
