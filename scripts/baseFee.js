const fs = require('fs')
require('dotenv').config()

const { Web3 } = require('web3')
const web3 = new Web3(process.env.SEPOLIA_URL)

async function getBaseFee(){
   const latestBlock = await web3.eth.getBlock('latest')
   const baseFeePerGas = await latestBlock.baseFeePerGas
   
   // return web3.utils.fromWei(baseFeePerGas, "ether")
   return baseFeePerGas
}

// getBaseFee().catch(err => console.log(err))

module.exports = getBaseFee

