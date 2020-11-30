import React, { useCallback } from 'react';
import { createRootElem } from './createRootElem';

export const makeSchlo = searchId => {
    const appTwoAttr = [
        { name: 'id', value: 'root-schlo' },
        { name: 'data-search-id', value: searchId },
    ];
    createRootElem(appTwoAttr, 3002);
};
export const AddButton = ({ searchId }) => {
    const schloMaker = useCallback(() => makeSchlo(searchId), [searchId]);

    return <button onClick={schloMaker}>add my schlo</button>;
};
