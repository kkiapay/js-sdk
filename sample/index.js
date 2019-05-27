const kkiapay = require('../index')(
    "7b1133f07cc411e99c4c5372e18c065c",{ Test:true }
)


22997000000

kkiapay.debitRequest("22997000000",1,"JOHN","DOE")
.then((response)=>{
  
        console.log(response.status)
        kkiapay.debitListener(90000)
        .then((data) => {
            console.log(data,"------")
        })
        .catch((error) => {
            console.error(error,"ERror")
        })


}).catch((err)=>{
    console.log("invalid api key",err)
})

