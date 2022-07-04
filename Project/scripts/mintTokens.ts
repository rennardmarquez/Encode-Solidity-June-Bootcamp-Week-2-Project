import { ethers } from "ethers";
import { MyToken } from "../typechain";

async function mintToken(tokenContract: MyToken, recipientAddress: string) {
  console.log(`Minting tokens to ${recipientAddress}.`);
  console.log(
    `Initial balance: ${await tokenContract.balanceOf(recipientAddress)}`
  );
  const amount = ethers.utils.parseEther("10");
  const tx = await tokenContract.mint(recipientAddress, amount);
  await tx.wait();
  console.log("Mint transaction completed. Hash:", tx.hash);
  console.log(
    `Updated balance: ${await tokenContract.balanceOf(recipientAddress)}\n`
  );
}

export default mintToken;
