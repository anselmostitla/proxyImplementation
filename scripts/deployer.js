const hre = require('hardhat')
const fs = require('fs')
const path = require('path')

// If addresses.json exist (uncomment line below)
const addressesPath = path.join(__dirname, '../addresses.json')
const addresses = require(addressesPath)

const baseFee = require('./baseFee')

async function main(){
   const [deployer] = await ethers.getSigners()

   // Contracts to deploy
   const contracts = [
      "MyContract",
      // "SignatureDecoder"
   ]

   for(let i=0; i<contracts.length; i++){
      const Contract = await ethers.getContractFactory(contracts[i])
      // const contract = await Contract.deploy({gasPrice: await baseFee()})
      const contract = await Contract.deploy()

      await hre.run("verify:verify", {
         address: contract.target,
         constructorArguments: []
      })

      // const obj = {}
      // obj["address"] = contract.target
      // await fs.writeFileSync(`./address${contracts[i]}.json`, JSON.stringify(obj))

      
      addresses[contracts[i]] = contract.target
      fs.writeFileSync(addressesPath, JSON.stringify(addresses))
   }

}

main().catch(err=> console.log(err))

// --force flag (is to verify the smart contract again)
// npx hardhat run script/deployer --network sepolia --force flag