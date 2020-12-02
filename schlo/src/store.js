import { createStore } from 'react-use-sub';

const initialState = { displayResult: { result: null, query: null } };

export const [useSub, Store] = createStore(initialState);
