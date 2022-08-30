import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const { deployments, getNamedAccounts} = hre;
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const goverToken = await get("GovernToken");
    const timelock = await get("Timelock");

    await deploy("CustomGovernor", {
        from: deployer,
        log: true,
        args: [
            goverToken.address,
            timelock.address
        ]
    }); 
}

export default func;