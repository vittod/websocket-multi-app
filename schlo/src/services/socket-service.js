import { socket } from './socket-client';

const socketSendTest = (value) => {
    console.log('gettin here')
    socket.emit('socketSendTest', value)
};

export const soc = {socketSendTest};
