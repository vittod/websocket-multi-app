import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import redis from 'redis';
import chalk from 'chalk';

const redisClient = redis.createClient();
redisClient.on('error', function (error) {
    console.error(error);
});

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
    const searchId = socket.handshake.query.searchId;
    const targetApp = socket.handshake.query.app;
    console.log(chalk.green(`socket with id ${socket.id} is now connected for search id: ${searchId}`));
    if (searchId && socket.id && targetApp) {
        registerClient(searchId, targetApp, socket.id);
    }

    socket.on('socketSendTest', mess => console.log(mess, socket?.handshake?.headers));

    socket.on('validateSearchRequest', query => {
        // receive
        console.log('received query', query);
        // validate
        const isValidQuery = !!query;
        // decide to open display app
        io.sockets.to(socket.id).emit('openSchlo', { valid: isValidQuery, query, id: socket.id });
        // answer
        if (isValidQuery) generateResult(socket, query);
    });

    socket.on('disconnect', () => {
        console.log(chalk.yellow(`socket ${socket.id} is disconnected`));
        unregisterClient(searchId, targetApp);
    });
});

server.listen(3005, () => console.log('listening on localhost:3005'));

async function generateResult(socket, query) {
    try {
        const result = await waitAndFetch(query);
        io.sockets.to(socket.id).emit('getOrderDates', result);
    } catch (err) {
        io.sockets.to(socket.id).emit('errorMsg', {
            about: 'orders',
            msg: 'some porblems getting recent orders',
        });
    }
}

async function waitAndFetch(query) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            query === 'wrong question' ? reject('no match') : resolve('gory damn result');
        });
    });
}

function initRedis() {
    // fs.writeJsonSync(process.cwd() + '/redis-mock.json', '{}');
}

function registerClient(searchId, targetApp, socketId) {
    const entry = {};
    redisClient.get(searchId, (err, reply) => {
        console.log(chalk.blue('found entry on register', reply));
        if (!reply) {
            const nuEntry = { [targetApp]: socketId };
            console.log(nuEntry);
            redisClient.set(searchId, JSON.stringify(nuEntry));
        } else {
            const alteredEntry = { ...JSON.parse(reply), [targetApp]: socketId };
            redisClient.set(searchId, JSON.stringify(alteredEntry));
        }
    });
}

function unregisterClient(searchId, targetApp) {
    if (targetApp === 'mutter') {
        redisClient.del(searchId);
    } else {
        redisClient.get(searchId, (err, reply) => {
            const alteredEntry = { ...JSON.parse(reply), [targetApp]: undefined };
            redisClient.set(searchId, JSON.stringify(alteredEntry));
        });
    }
}
