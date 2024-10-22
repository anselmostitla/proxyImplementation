require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [
        process.env.EDGE_PRIV_KEY_1,
        process.env.EDGE_PRIV_KEY_2
      ]
    },
    mumbai: {
      url: process.env.POLYGON_MUMBAI_URL,
      accounts: [
        process.env.EDGE_PRIV_KEY_1,
        process.env.EDGE_PRIV_KEY_2
      ]
    }
  },

  etherscan: {
    apiKey: {
      sepolia: process.env.SEPOLIASCAN_API_KEY
    }
  }
};
