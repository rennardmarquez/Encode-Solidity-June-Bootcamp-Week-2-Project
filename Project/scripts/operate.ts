import { CustomBallot, MyToken } from "../typechain";
import castVote from "./castVote";
import delegateTokens from "./delegateTokens";
import deployBallot from "./deployment/deployBallot";
import deployToken from "./deployment/deployToken";
import getSigner from "./deployment/getSigner";
import getResults from "./getResults";
import mintTokens from "./mintTokens";

const ACCOUNT_1 =
  "c1ce9cb80c98cbdcfb6f95bcb76526f672cdd13526c5a198b76117a0bdd35f66";
const ACCOUNT_2 =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
  // Signer will be the minter and contract owner
  const owner = await getSigner(ACCOUNT_1);
  const delegatee = await getSigner(ACCOUNT_2);

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
