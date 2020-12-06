export const createRootElemForProd = (attributes, target) => {
    const rootDiv = document.createElement('div');

    attributes.forEach(({ name, value }) => {
        console.log(name, value);
        rootDiv.setAttribute(name, value);
    });

    const scriptsPort = 3005;
    const appName = attributes[0].value.substring(5, attributes[0].value.length);
    const browserPath = `http://localhost:${scriptsPort}/${appName}`;
    console.log(browserPath);

    fetch(browserPath + '/js/js-manifest.json')
        .then(response => response.json())
        .then(data => {
            console.log(`received ${appName} manifest ${data};`);

            const scriptElements = data.map(script => {
                const scriptElem = document.createElement('script');
                scriptElem.setAttribute('src', `${browserPath}/js/${script}`);
                return scriptElem;
            });

            const rootWrapper = document.getElementById(target);
            rootWrapper.appendChild(rootDiv);

            const [body] = document.getElementsByTagName('body');

            scriptElements.forEach(elem => body.appendChild(elem));
        })
        .catch(e => console.log(e.message));
};
