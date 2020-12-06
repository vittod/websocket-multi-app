import { createRootElemForProd } from './createRootElemForProd';

export const makeSchlo = searchId => {
    const appTwoAttr = [
        { name: 'id', value: 'root-schlo' },
        { name: 'data-search-id', value: searchId },
    ];
    createRootElemForProd(appTwoAttr, 3002, 'home-of-schlo');
};
