import { io } from 'socket.io-client';

export let socket;

export const connectSocket = () => {
    if (!socket) {
        socket = io('http://localhost:3005');
        console.log('socket connected..', socket.connected);

        socket.on('testCliRec', testCliRec => console.log('received test:', testCliRec));
    }
};
