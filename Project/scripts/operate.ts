import { CustomBallot, MyToken } from "../typechain";
import castVote from "./castVote";
import delegateTokens from "./delegateTokens";
import deployBallot from "./deployment/deployBallot";
import deployToken from "./deployment/deployToken";
import getSigner from "./deployment/getSigner";
import getResults from "./getResults";
import mintTokens from "./mintTokens";

const ACCOUNT1 = process.env.ACCOUNT1;
const ACCOUNT2 = process.env.ACCOUNT2;

async function main() {
  if (!ACCOUNT1 || !ACCOUNT2) {
    console.log("Please set ACCOUNT1 and ACCOUNT2 in .env");
    return;
  }

  // Signer will be the minter and contract owner
  const owner = await getSigner(ACCOUNT1);
  const delegatee = await getSigner(ACCOUNT2);

  const tokenContract = (await deployToken(owner)) as MyToken;

  // mint tokens to owner
  await mintTokens(tokenContract, owner.address);

  // delegate owner's tokens and give it voting power
  await delegateTokens(tokenContract, delegatee.address);

  // deploy the ballot contract
  const ballotContract = (await deployBallot(
    tokenContract.address,
    owner
  )) as CustomBallot;

  // make delagatee cast a vote
  await castVote(ballotContract.address, delegatee);

  // get results
  await getResults(ballotContract);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
