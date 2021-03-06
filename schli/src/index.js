import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { connectSocket } from './services/socket-client';

const root = document.getElementById('root-schli');
const searchId = root.attributes[1]?.value;
if (searchId) connectSocket(searchId);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
