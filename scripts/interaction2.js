const { Web3} = require('web3')
const { abi } = require('../artifacts/contracts/MyContract.sol/MyContract.json')
const { address } = require('../address.json')
const { abi : abiSignatureDecoder } = require('../artifacts/contracts/SignatureDecoder.sol/SignatureDecoder.json')
const { address : addressSignatureDecoder } = require('../addressSignatureDecoder.json')
const { buildSignatureBytes } = require('../utils/buildSignaturesBytes.js')
require('dotenv').config()


async function main(){
   const web3 = new Web3(process.env.SEPOLIA_URL)

   const account2 = await web3.eth.accounts.wallet.add(process.env.EDGE_PRIV_KEY_2)[0]
   const account1 = await web3.eth.accounts.wallet.add(process.env.EDGE_PRIV_KEY_1)[1]

   const contract = new web3.eth.Contract(abi, address)

   // let value = await contract.methods.getStorage().call()
   // const tx = await contract.methods.setStorage(10).send({from: account2.address})
   // value = await contract.methods.getStorage().call()

   // Message Body
   const message = {
      to: "0x4560f03A937eE6Fdb80b339A76d16ea4351F97A1",
      value: 100000000000000,
      data: "0x",
      operation: 0,
      safeTxGas: 0,
      baseGas: 0,
      gasPrice: 0,
      gasToken: "0x0000000000000000000000000000000000000000",
      refundReceiver: "0x0000000000000000000000000000000000000000",
      _nonce: 38
   }

   /*
   The question here is, what nonce will be used?, that derive from the owner who proposes the transaction or 
   that of the owner who executes the transaction.
   */

   // Sign the message by the first owner
   const signature2 = await web3.eth.sign(message, account2.address)
   console.log("signature2: ", signature2);

   // Sign the message by the second owner
   const signature1 = await web3.eth.sign(message, account1.address)
   console.log("signature1: ", signature1);

   // Prepare the signatures as input for SignatureDecoder
   const signatures = await buildSignatureBytes([
      {
         signer: account2.address,
         data: signature2.signature,
         dynamic: false
      },
      {
         signer: account1.address,
         data: signature1.signature,
         dynamic: false
      }
   ])

   console.log("signatures: ", signatures);

   console.log("addressSignatureDecoder: ", addressSignatureDecoder);
   // invoke SignatureDecoder
   const contractSignatureDecoder = new web3.eth.Contract(abiSignatureDecoder, addressSignatureDecoder)
   const result = await contractSignatureDecoder.methods.signatureSplit(signature2.messageHash, signatures, 0).call()
   console.log("result: ", result);



}

main().catch(err => console.log(err))

/*
signature2:  {
  message: '{}',
  messageHash: '0xc496eb97e233a06697fa8bff2f26e72d174d1307686616c1e4e37bc6bdf0f6af',
  v: '0x1b',
  r: '0xaf5692e45b5aa2f628428107689247ea53436d165d8bfc84694a5911262126e2',
  s: '0x7a46bcc0ce10056d894e7b6414343d475e9fa3807c60386b4aedacb9b67aba4a',
  signature: '0xaf5692e45b5aa2f628428107689247ea53436d165d8bfc84694a5911262126e27a46bcc0ce10056d894e7b6414343d475e9fa3807c60386b4aedacb9b67aba4a1b'
}
signature1:  {
  message: '{}',
  messageHash: '0xc496eb97e233a06697fa8bff2f26e72d174d1307686616c1e4e37bc6bdf0f6af',
  v: '0x1c',
  r: '0xd4d49a74907c0367d914250f4c21e1bcfb548b614526bcc4ec57f168ad21b964',
  s: '0x323bc0977ad071c1aa40b23570f017f956eecc8534266d26d415caa306af345c',
  signature: '0xd4d49a74907c0367d914250f4c21e1bcfb548b614526bcc4ec57f168ad21b964323bc0977ad071c1aa40b23570f017f956eecc8534266d26d415caa306af345c1c'
}
signatures:  0xd4d49a74907c0367d914250f4c21e1bcfb548b614526bcc4ec57f168ad21b964323bc0977ad071c1aa40b23570f017f956eecc8534266d26d415caa306af345c1caf5692e45b5aa2f628428107689247ea53436d165d8bfc84694a5911262126e27a46bcc0ce10056d894e7b6414343d475e9fa3807c60386b4aedacb9b67aba4a1b
addressSignatureDecoder:  0xAf7FB2b62D84D959818d562Bc339D4c2E91DBE7A
*/