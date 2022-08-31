import { ethers } from 'hardhat';
import { MyGovernor, Storage } from '../typechain-types';
import { mineBlocks } from './utils/utils';

async function propose(func: string, description: string){
    const governor = await ethers.getContract<MyGovernor>("MyGovernor");
    const storage  = await ethers.getContract<Storage>("Storage");

    console.log(`Proposing to call ${func}. Description: ${description}`);

    const encFuncCall = (storage.interface as any).encodeFunctionData(func);

    const proposeTx = await governor.propose([storage.address], [0], [encFuncCall], description);

    const proposalData = await proposeTx.wait();

    await mineBlocks(2);

    const proposalId = proposalData.events?.[0].args?.proposalId.toString();
}

propose("add", "Let's increase a Counter").
    then(() => process.exit(0)).
    catch((e) => {
        console.error(e);
        process.exit(1);
    });