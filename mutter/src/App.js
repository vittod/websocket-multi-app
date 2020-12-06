import logo from './logo.svg';
import './App.css';
import { AddButton } from './AddButton';
import { uid } from 'uid/secure';
import { useEffect, useState } from 'react';
import { connectSocket } from './services/socket-client';
import { createRootElemForProd } from './createRootElemForProd';
import { createChildCssForProd } from './createChildCssForProd';

function App() {
    const [searchInstances, setSearchInstances] = useState({ mainSearch: uid() });
    const { mainSearch } = searchInstances;

    useEffect(() => {
        createChildCssForProd('schli');
        connectSocket(mainSearch);
        const appOneAttr = [
            { name: 'id', value: 'root-schli' },
            { name: 'data-search-id', value: mainSearch },
        ];
        createRootElemForProd(appOneAttr, 'home-of-schli');
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>I am Mother and I generated search id {mainSearch} for my main search!</p>
                <br />
                <AddButton searchId={mainSearch} />
            </header>
            <div className="mutter-space-for-child-apps">
                <section className="child-app" id="home-of-schli" />
                <section className="child-app" id="home-of-schlo" />
            </div>
        </div>
    );
}

export default App;
