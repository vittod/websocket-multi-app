export const createRootElem = (attributes, scriptsPort, target) => {
    const rootDiv = document.createElement('div');

    attributes.forEach(({ name, value }) => {
        console.log(name, value);
        rootDiv.setAttribute(name, value);
    });

    const scripOne = document.createElement('script');
    scripOne.setAttribute('src', `http://localhost:${scriptsPort}/static/js/bundle.js`);
    const scripTwo = document.createElement('script');
    scripTwo.setAttribute('src', `http://localhost:${scriptsPort}/static/js/0.chunk.js`);
    const scripThree = document.createElement('script');
    scripThree.setAttribute('src', `http://localhost:${scriptsPort}/static/js/main.chunk.js`);

    const [body] = document.getElementsByTagName('body');

    if (target) {
        const elem = document.getElementById(target);
        elem.appendChild(rootDiv);
    } else {
        body.appendChild(rootDiv);
    }

    body.appendChild(scripOne);
    body.appendChild(scripTwo);
    body.appendChild(scripThree);
};
