import { ethers } from "ethers";
import getSigner from "./deployment/getSigner";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { MyToken } from "../typechain";

async function mintToken(tokenAddress: string, signer: ethers.Wallet) {
  const tokenContract: MyToken = new ethers.Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  ) as MyToken;

  //mint tokens
  console.log(`Minting tokens to ${signer.address}.`);
  console.log(
    `Initial balance: ${await tokenContract.balanceOf(signer.address)}`
  );
  const amount = ethers.utils.parseEther("100");
  const tx = await tokenContract.mint(signer.address, amount);
  await tx.wait();
  console.log("Mint transaction completed. Hash:", tx.hash);
  console.log(
    `Final balance: ${await tokenContract.balanceOf(signer.address)}\n`
  );
}

export default mintToken;
