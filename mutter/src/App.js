import logo from './logo.svg';
import './App.css';
import { AddButton } from './AddButton';
import { uid } from 'uid/secure';
import { useEffect, useState } from 'react';
import { connectSocket } from './services/socket-client';
import { createRootElemForProd } from './createRootElemForProd';

function App() {
    const [searchInstances, setSearchInstances] = useState({ mainSearch: uid() });
    const { mainSearch } = searchInstances;

    useEffect(() => {
        connectSocket(mainSearch);
        const appOneAttr = [
            { name: 'id', value: 'root-schli' },
            { name: 'data-search-id', value: mainSearch },
        ];
        createRootElemForProd(appOneAttr, 3001, 'home-of-schli');
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>I am Mother and I generated search id {mainSearch} for my main search!</p>
                <br />
                <AddButton searchId={mainSearch} />
            </header>

            <section id="home-of-schli" />
            <section id="home-of-schlo" />
        </div>
    );
}

export default App;
