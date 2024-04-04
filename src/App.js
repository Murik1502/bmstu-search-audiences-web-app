import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./components/pages";
import List from "./components/pages/list";



function App() {
   const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Index/>}/>
                <Route path={"list"} element={<List/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
