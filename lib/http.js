const axios = require('axios');
const opts = require('./opts')

const http = axios.create({
    baseURL: opts.url,
    headers: {
        'Content-Type': 'application/json'
    }
})

module.exports = http