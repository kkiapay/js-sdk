require ("babel-polyfill");
const { request,getSocketChannel } = require('../lib/functions');
const kkiapay = require('../index')



const changeStatus = require('./mock/http')


describe("verify channel",()=>{

    kkiapay("xxxxxxx");
    
    test('checks if the function returns a string', async () => {
        changeStatus(true)
        const data = await getSocketChannel();
        expect(typeof data).toEqual('string');
    });

    test('checks if the function returns an error', async () => {
        changeStatus(false)
        const data = await getSocketChannel();
        expect(data).toEqual(undefined);
    });

    test('return  Unauthorized', async () => {
        changeStatus(false)
        const data = await request("22967298275","1","rr22","john","doe");
        expect(data.response.status).toEqual(401)
    });

})







