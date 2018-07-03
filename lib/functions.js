const curl = require('axios')
const opts = require('./opts')
var _emitter = null

module.exports = {

    initialize: function (config) {
        curl.defaults.baseURL = opts.url
        curl.defaults.headers.post['Content-Type'] = 'application/json'
        curl.defaults.headers.common['x-api-key'] = config.apikey;
        delete curl.defaults.headers.common["Authorization"];
        _emitter = config._emitter
    },

    getSocketChannel: async function () {
        try {
            return (await curl.get(`/api/v1/utils/claimchannel`)).data
        } catch (error) {
            // console.error('error',error.response)
            if (error.response.status == 401) {
                _emitter.emit('invalid_apikey', error.response.data)
                return undefined
            }
        }
    },

    /**
     * 
     */
    request: async function(to, amount,websocket_channel,firstname, lastname,email){
        try {
            return await curl.post('/api/v1/payments/request',{
                phoneNumber : to,
                amount: amount,
                firstname: firstname || '',
                lastname: lastname || '',
                email: email || '',
                contact: websocket_channel
            })
        } catch (error) { console.log(error.response)}
    }

}