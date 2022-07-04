import { ethers } from "ethers";
import { MyToken } from "../typechain";

async function delegateTokens(
  tokenContract: MyToken,
  delegateeAddress: string
) {
  console.log(`Delegating tokens to ${delegateeAddress}.`);
  const initialVotingPower = await tokenContract.getVotes(delegateeAddress);
  console.log(
    `Initial voting power: ${ethers.utils.formatEther(initialVotingPower)}`
  );

  const tx = await tokenContract.delegate(delegateeAddress);
  await tx.wait();
  console.log("Delegate transaction completed. Hash:", tx.hash);

  const updatedVotingPower = await tokenContract.getVotes(delegateeAddress);
  console.log(
    `Updated voting power: ${ethers.utils.formatEther(updatedVotingPower)}\n`
  );
}

export default delegateTokens;
