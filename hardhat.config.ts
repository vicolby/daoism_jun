import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat'
import {HardhatUserConfig} from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000
      }
    }
  },
  namedAccounts: {
    deployer: 0,
  }
};

export default config;
