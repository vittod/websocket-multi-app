import { socket } from './socket-client';

const socketSendTest = value => {
    socket.emit('socketSendTest', value);
};
const openSchloTest = () => {
    socket.emit('openSchloTest');
};
const sendSearchRequest = () => {
    socket.emit('processSearchRequest', 'bolo');
};

export const soc = { socketSendTest, openSchloTest, sendSearchRequest };
