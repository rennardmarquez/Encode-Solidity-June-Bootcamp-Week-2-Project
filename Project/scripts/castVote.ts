import { Signer, Contract, ethers } from "ethers";
import { CustomBallot } from "../typechain";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";

async function castVote(ballotContractAddress: string, signer: Signer) {
  const ballotContract: CustomBallot = new Contract(
    ballotContractAddress,
    ballotJson.abi,
    signer
  ) as CustomBallot;

  console.log("Casting vote to proposal with index 1");
  const voteTx = await ballotContract.vote(1, ethers.utils.parseEther("1"));
  await voteTx.wait();
  console.log("Vote transaction completed. Hash:", voteTx.hash);

  const votingPowerAfter = await ballotContract.votingPower();
  console.log(
    `Updated voting power: ${ethers.utils.formatEther(votingPowerAfter)}\n`
  );
}

export default castVote;
