const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const NftFactory = await hre.ethers.getContractFactory("NftToken");
  const NftContract = await NftFactory.deploy();
  await NftContract.deployed();

  console.log("Nft address: ", NftContract.address);
};

const runMain = async () => {
try {
  await main();
  process.exit(0);
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
};

runMain();