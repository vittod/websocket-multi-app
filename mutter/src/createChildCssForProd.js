export const createChildCssForProd = appName => {
    const [head] = document.getElementsByTagName('head');
    const scriptsPort = 3005;
    const baseUri = `http://localhost:${scriptsPort}/${appName}`;

    fetch(baseUri + '/css/css-manifest.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(style => {
                const cssRef = baseUri + '/css/' + style;
                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', cssRef);
                head.appendChild(link);
                console.log(`appended css ${cssRef}`);
            });
        })
        .catch(e => console.log(e.message));
};
