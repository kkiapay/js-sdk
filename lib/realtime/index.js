const io = require('socket.io-client');
const opts = require('../opts.js')


module.exports = {
    socket: null,
    init: function (options) {
        this.socket = io(opts.url, {
            path: '/websocket',
            query: {
                apikey: options.apikey,
                contact: options.contact
            }
        })

        this.socket.on('connect', (msg) => {
            console.log('socket is connected')
        })

        this.socket.on('safety', (msg) => {
            console.log('socket server respond', msg)
        })

        this.socket.on('disconnect', () => {
            console.log('Disconnected from socket server')
            this.socket.open();
        });
    }
}