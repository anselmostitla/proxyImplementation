const hre = require('hardhat')

const fs = require('fs')
const path = require('path')

const addressPath = path.join(__dirname, "../addresses.json")
const address = require(addressPath)

async function main(){
   const [deployer] = await ethers.getSigners()

   const Implementation = await ethers.getContractFactory("Implementation")
   const implementation = await Implementation.deploy()

   address["Local"] = {"implementation": implementation.target}


   const Proxy = await ethers.getContractFactory("Proxy")
   const proxy = await Proxy.deploy(implementation.target)

   address["Local"]["Proxy"] = proxy.target

   fs.writeFileSync(addressPath, JSON.stringify(address))
}

main().catch(err => console.log(err))