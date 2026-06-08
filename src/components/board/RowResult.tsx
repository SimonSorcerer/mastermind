import { evaluateGuess } from '../../helpers/symbolHelpers';
import { useSettingsStore } from '../../store/settingsStore';
import { useAppStore } from '../../store/store';

interface RowResultProps {
    guess: string[];
}

export const RowResult = ({ guess }: RowResultProps) => {
    const { symbolCount } = useSettingsStore();
    const { secret } = useAppStore();

    if (guess.length !== symbolCount) {
        return null;
    }

    const results = evaluateGuess(guess, secret);

    return (
        <div className='flex flex-wrap gap-1 content-start max-w-12'>
            {Array.from({ length: results.correctPosition }, (_, i) => (
                <div key={`pos-${i}`} className='w-4 h-4 rounded-sm bg-white' />
            ))}
            {Array.from({ length: results.correctSymbol }, (_, i) => (
                <div key={`sym-${i}`} className='w-4 h-4 rounded-sm bg-zinc-500' />
            ))}
        </div>
    );
};
