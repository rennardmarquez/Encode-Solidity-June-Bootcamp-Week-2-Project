import { ethers } from "ethers";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { MyToken } from "../typechain";

async function delegateTokens(
  tokenAddress: string,
  delegateeAddress: string,
  signer: ethers.Wallet
) {
  const tokenContract: MyToken = new ethers.Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  ) as MyToken;

  //delegate tokens
  console.log(`Delegating tokens to ${delegateeAddress}.`);
  console.log(
    `Initial voting power: ${await tokenContract.getVotes(delegateeAddress)}`
  );
  const tx = await tokenContract.delegate(delegateeAddress);
  await tx.wait();
  console.log("Delegate transaction completed. Hash:", tx.hash);
  console.log(
    `Final voting power: ${await tokenContract.getVotes(delegateeAddress)}\n`
  );
}

export default delegateTokens;
