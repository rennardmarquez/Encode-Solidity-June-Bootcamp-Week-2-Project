import { ethers } from "ethers";
import { CustomBallot } from "../typechain";

async function getResults(ballotContract: CustomBallot) {
  const winnerName = await ballotContract.winnerName();
  console.log("Winning Name:", ethers.utils.parseBytes32String(winnerName));
}

export default getResults;
