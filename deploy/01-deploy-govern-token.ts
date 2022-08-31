import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Token__factory } from "../typechain-types"
import { Address } from "hardhat-deploy/dist/types";


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
  const { deployments, getNamedAccounts} = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  
  const governToken = await deploy("Token", {
    from: deployer,
    log: true
  });

  await delegate(hre, governToken.address, deployer);
}

const delegate = async (
  hre: HardhatRuntimeEnvironment, 
  governTokenAddr: string,
  delegatedAccount: string) => {
    const governToken = Token__factory.connect(
      governTokenAddr,
      hre.ethers.provider.getSigner(0)
    )
    const tx = await governToken.delegate(delegatedAccount);
    await tx.wait();
}

export default func;

