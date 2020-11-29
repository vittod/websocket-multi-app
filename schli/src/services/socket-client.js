import { io } from 'socket.io-client';

export let socket;

export const connectSocket = searchId => {
    if (!socket) {
        socket = io('http://localhost:3005', {
            query: {
                searchId: searchId,
                app: 'schli',
            },
        });

        socket.on('connect', () => console.log('socket connected on'));

        socket.on('testCliRec', testCliRec => console.log('received test:', testCliRec));
    }
};
