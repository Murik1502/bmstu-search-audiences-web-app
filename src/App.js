import './App.css';
import {useEffect} from "react";

const tg = window.Telegram.WebApp;


function App() {

    useEffect(() => {
        tg.Ready();
    }, []);

    const onClose = () => {
        tg.colse();
    }

    return (
    <div className="App">
      work
        <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
