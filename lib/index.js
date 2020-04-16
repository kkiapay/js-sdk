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
    async debitRequest(phone, amount, firstname, lastname, email, direct, stateData,callback){
        channel = await f.getSocketChannel()
        config.contact = channel
        rtime.init(config)

        if (channel) {
            this._debitResponse = await f.request(phone, amount, channel, firstname, lastname, email, direct, stateData,callback)
        }
        if(!this._debitResponse){
            throw { failureCode: 'Your developer account is not active! '}
        }
        if (this._debitResponse.status !== 200) {
            throw {
              failureCode: this._debitResponse.response.data.status,
              failureMessage: this._debitResponse.response.data.reason
            };
        }

        return this._debitResponse 
    },

    async debit(phone, amount, firstname, lastname, email,timeout){
        debitResponse = await this.debitRequest.apply(this,arguments)
        if (!debitResponse) {
            throw {failureCode: 'Your developer account is not active!'}
        }
        if (debitResponse.status !== 200) {
            throw {
                failureCode: 'badRequest',
                failureMessage: debitResponse.data
            }
        }
        return await this.debitListener(timeout)
        
    },
    debitListener(timeout) {
        return new Promise((resolve, reject) => {
            if(timeout){
                setInterval(() => {
                    reject({
                        failureCode: 'Timeout',
                        failureMessage: 'time elasped'
                    });
                    rtime.disconnect()
            }, timeout);
            }
    
            rtime.socket.on('payment_back', (msg) => {
                if (msg.isPaymentSucces) {
                    resolve({
                        account: msg.account,
                        transactionId: msg.transactionId
                    })
                } else {
                    reject({
                        failureCode: msg.failureCode,
                        failureMessage: msg.failureMessage,
                        account: msg.account,
                        transactionId: msg.transactionId
                    })
                }
                rtime.disconnect()
            })
        })
    },
    /**
     * 
     * @param {string} transactionId Current transaction identifier
     */
    async debitVerify(transactionId){
       f.debitVerify(config,transactionId)
    }
}
