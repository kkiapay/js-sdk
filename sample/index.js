const kkiapay = require('../index')({
    apikey: process.env.API_KEY
})

kkiapay.debit("22967434270", 100)
    .then((res) => {
        console.log('----res-----', res)
    })
    .catch((err) => {
        console.error('-----err----', err)
    })
