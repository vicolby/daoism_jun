import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Timelock, MyGovernor } from "../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){

    const { deployments, getNamedAccounts} = hre;
    const { deployer } = await getNamedAccounts();

    const governor = await hre.ethers.getContract<MyGovernor>("MyGovernor", deployer);
    const timelock = await hre.ethers.getContract<Timelock>("Timelock", deployer);

    const proposer = await timelock.PROPOSER_ROLE();
    const executor = await timelock.EXECUTOR_ROLE();
    const admin = await timelock.TIMELOCK_ADMIN_ROLE();

    const propTx = await timelock.grantRole(proposer, governor.address);
    const execTx = await timelock.grantRole(executor, hre.ethers.constants.AddressZero);
    const adminTx = await timelock.revokeRole(admin, deployer);

    await propTx.wait();
    await execTx.wait();
    await adminTx.wait();
}

export default func;