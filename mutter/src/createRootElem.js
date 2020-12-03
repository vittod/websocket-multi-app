export const createRootElem = (attributes, port, target) => {
    const rootDiv = document.createElement('div');

    attributes.forEach(({ name, value }) => {
        console.log(name, value);
        rootDiv.setAttribute(name, value);
    });

    const scriptsPort = process.env.NODE_ENV !== 'production' ? port : 3005;
    const path =
        process.env.NODE_ENV !== 'production' ? 'static' : attributes[0].value.substring(5, attributes[0].value.length);

    const scripOne = document.createElement('script');
    scripOne.setAttribute('src', `http://localhost:${scriptsPort}/${path}/js/bundle.js`);
    const scripTwo = document.createElement('script');
    scripTwo.setAttribute('src', `http://localhost:${scriptsPort}/${path}/js/0.chunk.js`);
    const scripThree = document.createElement('script');
    scripThree.setAttribute('src', `http://localhost:${scriptsPort}/${path}/js/main.chunk.js`);

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
