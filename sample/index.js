const kkiapay = require('../index')(
    "XXXXXXXXXXXXX",{ sandbox:true }
)



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

