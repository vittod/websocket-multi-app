import { socket } from './socket-client';

const socketSendTest = value => {
    socket.emit('socketSendTest', value);
};
const openSchloTest = () => {
    socket.emit('openSchloTest');
};
const sendSearchRequest = req => {
    console.log('emitting search req from schli', req);
    socket.emit('processSearchRequest', req || 'bolo');
};

export const soc = { socketSendTest, openSchloTest, sendSearchRequest };
