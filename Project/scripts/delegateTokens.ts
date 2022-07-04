import { MyToken } from "../typechain";

async function delegateTokens(
  tokenContract: MyToken,
  delegateeAddress: string
) {
  console.log(`Delegating tokens to ${delegateeAddress}.`);
  console.log(
    `Initial voting power: ${await tokenContract.getVotes(delegateeAddress)}`
  );
  const tx = await tokenContract.delegate(delegateeAddress);
  await tx.wait();
  console.log("Delegate transaction completed. Hash:", tx.hash);
  console.log(
    `Updated voting power: ${await tokenContract.getVotes(delegateeAddress)}\n`
  );
}

export default delegateTokens;
