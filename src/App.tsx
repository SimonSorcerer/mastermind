import { Board } from './components/board/Board';
import { Debug } from './components/debug/Debug';
import { Settings } from './components/settings/Settings';

function App() {
    return (
        <div className='max-w-7xl m-auto pt-24 pb-12 px-4'>
            <h1 className='pb-8'>Mastermind</h1>
            <div className='flex'>
                <Board />
                <Settings className='mt-4 max-w-1/3' expanded={true} />
            </div>
            <Debug />
        </div>
    );
}

export default App;
