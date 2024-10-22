const { Web3 } = require('web3')
const hre = require('hardhat')

const web3 = new Web3('http://127.0.0.1:8545')

const { abi } = require('../artifacts/contracts/Proxy.sol/Proxy.json')

async function main(newValue){

   const account0 = await web3.eth.accounts.wallet.add("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")[0]
   const account1 = await web3.eth.accounts.wallet.add("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d")[1]
   const account2 = await web3.eth.accounts.wallet.add("0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a")[2]
   const account3 = await web3.eth.accounts.wallet.add("0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6")[3]
   const account4 = await web3.eth.accounts.wallet.add("0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a")[4]
   const account5 = await web3.eth.accounts.wallet.add("0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba")[5]
   const account6 = await web3.eth.accounts.wallet.add("0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e")[6]
   const account7 = await web3.eth.accounts.wallet.add("0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356")[7]
   const account8 = await web3.eth.accounts.wallet.add("0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97")[8]
   const account9 = await web3.eth.accounts.wallet.add("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")[9]

   const proxyAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
   const implementationAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // You should already know this

   const proxyContract = new web3.eth.Contract(abi, proxyAddress);

   // ABI-encoded data for the setValue function
   let methodSignature = 'setValue(uint256)';
   let data = web3.eth.abi.encodeFunctionCall({
      name: 'setValue',
      type: 'function',
      inputs: [{
         type: 'uint256',
         name: '_value'
      }]
   }, [newValue]);

      // Send the transaction to the proxy contract
      let tx = {
      from: account0.address,
      to: proxyAddress,
      data: data,
      gas: 2000000 // Adjust as necessary
   };

   let receipt = await web3.eth.sendTransaction(tx);
   console.log('Transaction successful:', receipt);

   methodSignature = 'getValue()';
   data = web3.eth.abi.encodeFunctionCall({
      name: 'getValue',
      type: 'function',
      inputs: []
   });
   tx = {
      from: account0.address,
      to: proxyAddress,
      data: data,
      gas: 2000000 // Adjust as necessary
   };
   receipt = await web3.eth.sendTransaction(tx);
   console.log('Transaction successful:', receipt);

}

main(50).catch(err => console.log(err))