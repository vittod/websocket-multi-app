import React, { useCallback } from 'react';
import { makeSchlo } from './make-schlo';

export const AddButton = ({ searchId }) => {
    const schloMaker = useCallback(() => makeSchlo(searchId), [searchId]);

    return <button onClick={schloMaker}>add my schlo</button>;
};
