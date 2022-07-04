import { ethers } from "ethers";
import { MyToken } from "../typechain";

async function mintToken(tokenContract: MyToken, recipientAddress: string) {
  console.log(`Minting tokens to ${recipientAddress}.`);
  const initialBalance = await tokenContract.balanceOf(recipientAddress);
  console.log(`Initial balance: ${ethers.utils.formatEther(initialBalance)}`);

  const amount = ethers.utils.parseEther("10");
  const tx = await tokenContract.mint(recipientAddress, amount);
  await tx.wait();
  console.log("Mint transaction completed. Hash:", tx.hash);

  const updatedBalance = await tokenContract.balanceOf(recipientAddress);
  console.log(`Updated balance: ${ethers.utils.formatEther(updatedBalance)}\n`);
}

export default mintToken;
