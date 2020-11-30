import { io } from 'socket.io-client';

export let socket;

export const connectSocket = searchId => {
    if (!socket) {
        socket = io('http://localhost:3005', {
            query: {
                searchId: searchId,
                app: 'schlo',
            },
        });

        socket.on('connect', () => console.log('socket connected'));

        socket.on('testCliRec', testCliRec => console.log('received test:', testCliRec));

        socket.on('displaySearchResult', result => console.log('received search result in schlo:', result));
    }
};
