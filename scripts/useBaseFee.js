const baseFee = require('./baseFee')

async function main(){
   console.log("baseFee: ", await baseFee());
}

main().catch(err => console.log(err))