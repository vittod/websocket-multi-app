import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

app.get('/test-route', (req, res, next) => {
    console.log(req.baseUrl, 'got req');
    res.send('hello');
    next();
});

io.on('connection', socket => {
    console.log(`socket with id ${socket.id} is now connected`);
    console.log(socket.request.session);

    socket.on('socketSendTest', mess => console.log(mess, socket.url));

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} is disconnected`);
    });
});

server.listen(3005, () => console.log('listening on localhost:3005'));

// async function getOrderDates(socket) {
//     try {
//         const { rows } = await db.getOrderDates();
//         console.log('order dates', rows);
//         io.sockets.to(socket.id).emit('getOrderDates', rows);
//     } catch (err) {
//         console.log('err getting last orders', err.message);
//         io.sockets.to(socket.id).emit('errorMsg', {
//             about: 'orders',
//             msg: 'some porblems getting recent orders'
//         });
//     }
// }
