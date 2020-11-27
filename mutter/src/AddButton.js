import React from 'react';

const schloMaker = () => {
    const schloDiv = document.createElement('div');
    schloDiv.setAttribute('id', 'root-schlo');

    const scripOne = document.createElement('script');
    scripOne.setAttribute('src', 'http://localhost:3002/static/js/bundle.js');
    const scripTwo = document.createElement('script');
    scripTwo.setAttribute('src', 'http://localhost:3002/static/js/0.chunk.js');
    const scripThree = document.createElement('script');
    scripThree.setAttribute('src', 'http://localhost:3002/static/js/main.chunk.js');

    const [body] = document.getElementsByTagName('body');
    body.appendChild(schloDiv);
    body.appendChild(scripOne);
    body.appendChild(scripTwo);
    body.appendChild(scripThree);
};

export const AddButton = () => {
    return <button onClick={schloMaker}>add my schlo</button>;
};
