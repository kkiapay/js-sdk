const axios = require('axios')
var _emitter = null
const setBaseUrl = require('./setBaseUrl')


const curl = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
})

module.exports = {
    http: curl,
    initialize: function (config) {
        let sdk = typeof config.sdk === "undefined" ? 'js-sdk' : config.sdk
        let origin = typeof config.host === "undefined" ? 'js-sdk' : config.host;

        curl.defaults.headers.common['x-api-key'] = config.apikey;
        curl.defaults.headers.common['sdk'] = sdk;
        curl.defaults.headers.common['x-widget-host'] = origin;
        curl.defaults.baseURL = setBaseUrl(config.sandbox)
        delete curl.defaults.headers.common['Authorization'];
        _emitter = config._emitter
    },

    getSocketChannel: async function () {
        try {
            return (await curl.get(`/api/v1/utils/claimchannel`)).data
        } catch (error) {
            if (error.response.status == 401) {
                _emitter.emit('invalid_apikey', error.response.data)
                return undefined
            }
        }
    },


    request: async function (to, amount, websocket_channel, firstname, lastname, email, direct, stateData) {
        try {
            return await curl.post('/api/v1/payments/request', {
                phoneNumber: to,
                amount: amount,
                firstname: firstname || '',
                lastname: lastname || '',
                email: email || '',
                contact: websocket_channel,
                direct: direct || '',
                stateData: stateData
            })
        } catch (error) {
            return error
        }
    }
}
