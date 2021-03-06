const io = require('socket.io-client');
const setBaseUrl = require('../setBaseUrl')


module.exports = {
    socket: null,
    init: function (options) {
        this.socket = io(setBaseUrl(options.Test || options.sandbox), {
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
            if(!this._isLocal){
                this.socket.open();
            }
        });
    },
    disconnect(){
        this._isLocal = true
        this.socket.close()
        setInterval(() => {
            this._isLocal = false
        }, 100);
    }
}
