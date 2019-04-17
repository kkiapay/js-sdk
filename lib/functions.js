const axios = require('axios')
const opts = require('./opts')
var _emitter = null

const curl = axios.create({
    baseURL: opts.url,
    headers: {
        'Content-Type': 'application/json'
    }
})

module.exports = {
    http:curl,
    initialize: function (config) {
        console.log('------initialize', config)
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
        request: async function (to, amount, websocket_channel, firstname, lastname, email) {
            try {
                return await curl.post('/api/v1/payments/request', {
                    phoneNumber: to,
                    amount: amount,
                    firstname: firstname || '',
                    lastname: lastname || '',
                    email: email || '',
                    contact: websocket_channel
                })
            } catch (error) {
                return error
                // console.log(error.response)
            }
        },
        async debitVerify(apikey,transactionId) {
            // todo implementation of verify 
            try {
                return await curl.post('', {
                    phoneNumber: to,
                    amount: amount,
                    firstname: firstname || '',
                    lastname: lastname || '',
                    email: email || '',
                    contact: websocket_channel
                })
            } catch (error) {
                console.log(error.response)
            }finally{
                return false
            }
        }

}