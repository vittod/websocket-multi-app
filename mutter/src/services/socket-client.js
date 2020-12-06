import { io } from 'socket.io-client';
import { makeSchlo } from '../make-schlo';

export let socket;

export const connectSocket = searchId => {
    if (!socket) {
        socket = io('http://localhost:3005', {
            query: {
                searchId: searchId,
                app: 'mutter',
            },
        });

        socket.on('connect', () => console.log('socket connected'));

        socket.on('openSchlo', searchId => makeSchlo(searchId));

        socket.on('testCliRec', testCliRec => console.log('received test:', testCliRec));
    }
};
