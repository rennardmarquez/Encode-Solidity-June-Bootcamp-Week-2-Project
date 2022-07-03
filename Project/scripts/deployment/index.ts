import deployBallot from "./deployBallot";
import deployToken from "./deployToken";
import getSigner from "./getSigner";

async function main() {
  const { signer } = await getSigner();
  const { tokenContract } = await deployToken(signer);
  const { ballotContract } = await deployBallot(tokenContract.address, signer);

  console.log(`Token Contract deployed at ${tokenContract.address}`);
  console.log(`Ballot Contract deployed at ${ballotContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});