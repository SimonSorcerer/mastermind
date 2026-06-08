import { Board } from './components/board/Board';
import { Debug } from './components/debug/Debug';
import { Settings } from './components/settings/Settings';
import { useSettingsStore } from './store/settingsStore';

function App() {
    const { showDebug } = useSettingsStore();

    return (
        <div className='max-w-7xl m-auto pt-24 pb-12 px-4'>
            <h1 className='pb-8'>Mastermind</h1>
            <div className='flex'>
                <Board />
                <Settings className='mt-4 max-w-1/3' />
            </div>
            {showDebug && <Debug />}
        </div>
    );
}

export default App;
