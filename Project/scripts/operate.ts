import delegateTokens from "./delegateTokens";
import deployBallot from "./deployment/deployBallot";
import deployToken from "./deployment/deployToken";
import getSigner from "./deployment/getSigner";
import mintTokens from "./mintTokens";

async function main() {
  const signer = await getSigner();
  const tokenContract = await deployToken(signer);
  const ballotContract = await deployBallot(tokenContract.address, signer);

  // mint tokens to signer
  await mintTokens(tokenContract.address, signer);

  // self-delegate signer's tokens and give it voting power
  await delegateTokens(tokenContract.address, signer.address, signer);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
