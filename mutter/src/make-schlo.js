import { createRootElemForProd } from './createRootElemForProd';
import { createChildCssForProd } from './createChildCssForProd';

export const makeSchlo = searchId => {
    createChildCssForProd('schlo');
    const appTwoAttr = [
        { name: 'id', value: 'root-schlo' },
        { name: 'data-search-id', value: searchId },
    ];
    createRootElemForProd(appTwoAttr, 'home-of-schlo');
};
