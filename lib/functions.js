const axios = require('axios')
var _emitter = null
const setBaseUrl=require('./setBaseUrl')


const curl = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
})

module.exports = {
    http:curl,
    initialize: function (config) {
        console.log('------initialize', config)
        curl.defaults.headers.common['x-api-key'] = config.apikey;
        curl.defaults.baseURL=setBaseUrl(config.Test)
        console.log(curl)
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
        request: async function (to, amount, websocket_channel, firstname, lastname, email,direct) {
            try {
                return await curl.post('/api/v1/payments/request', {
                    phoneNumber: to,
                    amount: amount,
                    firstname: firstname || '',
                    lastname: lastname || '',
                    email: email || '',
                    contact: websocket_channel,
                    direct : direct || ''
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