import './App.css';
import React from 'react';
import { soc } from './services/socket-service';

const onClick = () => {
    soc.socketSendTest('testServerReceive');
};
const onClickOpenSchlo = () => {
    soc.openSchloTest('testServerReceive');
};
const onClickSearch = () => {
    soc.sendSearchRequest('testServerReceive');
};

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Yo this is shli app takin'</p>
                <button onClick={onClick}>send soc test</button>
                <button onClick={onClickOpenSchlo}>open Schlo from schli test</button>
                <button onClick={onClickSearch}>send pseudo search request and open schlo</button>
            </header>
        </div>
    );
}

export default App;
