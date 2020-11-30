import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import redis from 'redis';
import chalk from 'chalk';

// register redis
const redisClient = redis.createClient();
redisClient.on('error', function (error) {
    console.error(error);
});

// instantiate server
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// rest test route
app.get('/test-route', (req, res, next) => {
    console.log(req.baseUrl, 'got req');
    res.send('hello');
    next();
});

// websocket routing
io.on('connection', socket => {
    const searchId = socket.handshake.query.searchId;
    const targetApp = socket.handshake.query.app;
    console.log(
        chalk.green(
            `socket with id ${chalk.cyan(socket.id)} is now connected as ${chalk.cyan(
                targetApp
            )} for search id: ${chalk.cyan(searchId)})`
        )
    );
    if (searchId && socket.id && targetApp) {
        registerClient(searchId, targetApp, socket.id);

        // if schlo registers, look for pending query  and trigger the search
        if (targetApp === 'schlo') {
            const query = getTargetSocketIdOrQuery(searchId, 'query');
            if (query) getResultAndSendReply(socket, searchId, query, true);
        }
    }

    socket.on('socketSendTest', mess => console.log(mess, socket?.handshake?.headers));

    socket.on('openSchloTest', () => openSchloInMother(socket, searchId));

    socket.on('processSearchRequest', query => {
        // receive
        console.log('received query', query);
        // validate – here it's valid if truthy
        const isValidQuery = !!query;
        // decide to open result display app
        if (isValidQuery) {
            // check if schlo is open
            if (getTargetSocketIdOrQuery(searchId, 'schlo')) {
                console.log('seems not init');
                getResultAndSendReply(socket, searchId, query);
            } else {
                // open schlo in mutter
                openSchloInMother(socket, searchId);
                cacheQuery(searchId, query);
                console.log('seems init', searchId);
            }
        } else {
            // if validation fails send error back to schli
            io.to(socket.id).emit('validationFail', 'dit jeht nich!');
        }
    });

    socket.on('disconnect', () => {
        console.log(chalk.yellow(`socket ${socket.id} is disconnected`));
        unregisterClient(searchId, targetApp);
    });
});

// launch server
server.listen(3005, () => console.log('listening on localhost:3005'));

// *****************************************************************************************
////////////////////
// service functions

async function getResultAndSendReply(socket, searchId, query, isInitial) {
    // determine socket target. initial means query from cache triggered by schlo register.
    const socketTarget = isInitial ? socket.id : getTargetSocketIdOrQuery(searchId, 'schlo');

    try {
        // fetch result from pseudoapi
        const result = await waitAndFetch(query);
        // send result back to schlo
        console.log(chalk.greenBright('sending result', result));
        io.sockets.to(socketTarget).emit('displaySearchResult', result);
        // clear query cache if initial query
        if (isInitial) cacheQuery(searchId, undefined);
    } catch (err) {
        io.sockets.to(socketTarget).emit('errorMsg', 'something went wrong');
    }
}

// fetch results from pseudoapi
async function waitAndFetch(query) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            query === 'wrong question' ? reject('no match') : resolve('gory damn result');
        }, 0);
    });
}

function registerClient(searchId, targetApp, socketId) {
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

function openSchloInMother(socket, searchId) {
    const mutter = getTargetSocketIdOrQuery(searchId, 'mutter');
    console.log('found mutter for schlo', mutter, 'search', searchId);
    if (mutter) {
        io.to(mutter).emit('openSchlo', searchId);
    }
}

function getTargetSocketIdOrQuery(searchId, key) {
    redisClient.get(searchId, (err, reply) => {
        if (reply) {
            console.log(chalk.blue('found target entry to open schlo in mother', reply));
            const entry = JSON.parse(reply);
            return entry[key];
        } else {
            return null;
        }
    });
}

function cacheQuery(searchId, query) {
    redisClient.get(searchId, (err, reply) => {
        if (reply) {
            console.log(chalk.greenBright('stashing query in register', reply));
            const alteredEntry = { ...JSON.parse(reply), query: query };
            redisClient.set(searchId, JSON.stringify(alteredEntry));
        }
    });
}
