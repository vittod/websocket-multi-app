import './App.css';
import React, { useCallback, useState } from 'react';
import { soc } from './services/socket-service';

const onClick = () => {
    soc.socketSendTest('testServerReceive');
};
const onClickOpenSchlo = () => {
    soc.openSchloTest('testServerReceive');
};
const onClickSearch = req => {
    soc.sendSearchRequest(req);
};

function App() {
    const [val, setVal] = useState('');
    const onChange = useCallback(e => setVal(e.target.value), []);
    return (
        <div className="schli-app">
            <header className="schli-header">
                <p>Yo this is shli app takin'</p>
                <button onClick={onClick}>send soc test</button>
                <button onClick={onClickOpenSchlo}>open Schlo from schli test</button>
                <div>
                    <input onChange={onChange} type="text" />
                    <button onClick={() => onClickSearch(val)}>submit</button>
                </div>
            </header>
        </div>
    );
}

export default App;
