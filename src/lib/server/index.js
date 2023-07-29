'use strict';
var _a;
exports.__esModule = true;
var express_1 = require('express');
var cors_1 = require('cors');
var http_1 = require('http');
var socket_io_1 = require('socket.io');
var handler_js_1 = require('../../../build/handler.js');
var host = (_a = process.env.HOST) !== null && _a !== void 0 ? _a : 'localhost';
var port = process.env.PORT ? Number(process.env.PORT) : 3000;
var app = (0, express_1['default'])();
var server = (0, http_1.createServer)(app);
app.use((0, cors_1['default'])());
var io = new socket_io_1.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', function (socket) {
  console.log('socket '.concat(socket.id, ' connected! Hello, World \uD83D\uDC4B'));
  socket.on('order:add', function (payload) {
    socket.broadcast.emit('order:add', payload);
  });
  socket.on('order:delete', function (payload) {
    socket.broadcast.emit('order:delete', payload);
  });
  socket.on('order:change', function (payload) {
    socket.broadcast.emit('order:change', payload);
  });
});
app.get('/ping', function (_req, res) {
  return res.send({ message: 'pong 🏓' });
});
// SvelteKit should handle everything else, including serving prerendered pages and static assets, using Express middleware
// https://kit.svelte.dev/docs/adapter-node#custom-server
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler_js_1.handler);
server.listen(port, host, function () {
  console.log('[ ready ] http://'.concat(host, ':').concat(port));
});
