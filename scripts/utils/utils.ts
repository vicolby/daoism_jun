import { network } from 'hardhat';

export async function mineBlocks(count: number){
    for(let i = 0; i < count; i++){
        network.provider.request({
            method: "evm_mine"
        })
    }
}