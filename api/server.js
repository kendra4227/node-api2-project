const express = require('express');

const server = express();

const postsRouter = require('./api/posts/posts-router');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Endpoint is working');
});

server.use('./api/posts', postsRouter);

module.exports = server;