const f = require('./functions.js')
const EventEmitter = require('events');
const rtime = require('./realtime/index')
var config = {}

/**
 * @param {String} apikey  - [ kkiapay Developer api key, get your key at https://app.kkiapay.me/developers/]
 * @param {Object} options
 */
module.exports = function (apikey, options = {}) {
    options._emitter = new EventEmitter()
    options.apikey = apikey
    f.initialize(options)
    config = options
    return features
}

const features = {
    /**
     * @param {String} phone - Valid MTN mobile money phone number
     * @param {String} amount - Amount to debit from user account
     * @param {String} [firstname] - Client first name
     * @param {String} [lastname] - Client last name
     * @param {String} [email] - Client email address
     */
    debit: async (phone, amount, firstname, lastname, email) => {
        channel = await f.getSocketChannel()
        let debitResponse = null
        config.contact = channel
        rtime.init(config)

        if (channel) {
            debitResponse = await f.request(phone, amount, channel, firstname, lastname, email)
            // console.log("----->data", debitResponse)
        }
        return new Promise((resolve, reject) => {
            if (!debitResponse) reject({
                failureCode: 'Your developer account is not active!'
            })
            if (debitResponse.status !== 200) {
                reject({
                    failureCode: 'badRequest',
                    failureMessage: debitResponse.data
                })
            }

            rtime.socket.on('payment_back', (msg) => {
                if (msg.isPaymentSucces) resolve({
                    account: msg.account,
                    transactionId: msg.transactionId
                })
                else {
                    reject({
                        failureCode: msg.failureCode,
                        failureMessage: msg.failureMessage,
                        account: msg.account,
                        transactionId: msg.transactionId
                    })
                }
            })
        })
    }
}