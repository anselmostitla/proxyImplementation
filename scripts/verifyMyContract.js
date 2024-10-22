const hre = require('hardhat')

async function main(){

   const [deployer] = await ethers.getSigners()

   // await hre.run("verify:verify", {})
   await hre.run("verify:verify", {
      address: "0x53dadf56f4a9b93c5E168a42B350cf6c068Ad7c5",
      constructorArguments: []  // Maybe is better to comment this line or erase if not arguments are require in the constructor
   })

}

main().catch(err => console.log(err))