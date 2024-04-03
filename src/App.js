import './App.css';
import {useTelegram} from "./hooks/useTelegram";



function App() {
    const {toggleMainButton, toggleBackButton} = useTelegram();


    return (
        <div className="App">
            <button onClick={toggleMainButton}>toggle MainButton</button>
            <button onClick={toggleBackButton}>toggle BackButton</button>

        </div>
    );
}

export default App;
