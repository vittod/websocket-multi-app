import { socket } from './socket-client';

const socketSendTest = value => {
    socket.emit('socketSendTest', value);
};

export const soc = { socketSendTest };
