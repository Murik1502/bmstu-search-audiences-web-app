import './App.css';
import Slider from "./components/slider/slider";
//import {useTelegram} from "./hooks/useTelegram";



function App() {
   // const {toggleMainButton, toggleBackButton} = useTelegram();


    return (
        <div className="App">
            <h1 className={"header"}>Найти свободную аудиторию</h1>
            <Slider/>
            {/*<button onClick={toggleMainButton}>toggle MainButton</button>*/}
            {/*<button onClick={toggleBackButton}>toggle BackButton</button>*/}
        </div>
    );
}

export default App;
