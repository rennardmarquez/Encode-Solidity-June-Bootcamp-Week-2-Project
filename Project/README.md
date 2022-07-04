# Encode Solidity June Bootcamp Week 2 Project

This project has the scripts for the following functionalities:

1. Deploying Token and Ballot contract
2. Minting tokens
3. Delegating tokens
4. Casting Votes
5. Querying results

You can read and run `./scripts/operate.ts` to see a sample on how these functions were used.

# How to run the scripts

1. Run the following command:

```
yarn ts-node --files scripts/operate.ts Ham Burger Pizza Donut
```

2. Done! Feel free to edit the proposals or change `operate.ts` based to the process you want.

# Report

**1. Getting Signers**

We use the function `scripts/deployments/getSigner()` to get two accounts.

Output:

```
// Account 1. This will be the Minter and Ballot contract owner
Using address 0x99402C4AA06595eE768CadC7D863Af71CAB87396
Wallet balance 9.795094932542279faf
// Account 2. This will be the delegatee that will vote
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 0.22729218672544768
```

**2. Deploying token contract**

Output:

```
Deploying Token contract
Awaiting confirmations
Completed
Token contract deployed at 0xD719192e3079C50F9EA21B42f184F757BC328FCA
```

**3. Minting tokens**

Minter will mint 10 tokens to itself.

Output:

```
Minting tokens to 0x99402C4AA06595eE768CadC7D863Af71CAB87396.
Initial balance: 0.0
Mint transaction completed. Hash: 0x5e0b9fc16a14ae587bf88d3e825b6ec87643b60176cc2675556d35d44b58de53
Updated balance: 10.0
```

**4. Delegating tokens to Account 2**

Minter with 10 tokens will delegate them to address `0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377`.

Output:

```
Delegating tokens to 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377.
Initial voting power: 0.0
Delegate transaction completed. Hash: 0xb2eeb8826c2d4b4d2e016c4cfa0542d6b4244cf8ae9f993a5b2b96fefca77146
Updated voting power: 10.0
```

**5. Deploying Ballot contract**

Output:

```
Deploying Ballot contract
Proposals:
Proposal N. 1: Ham
Proposal N. 2: Burger
Proposal N. 3: Pizza
Proposal N. 4: Donut
Awaiting confirmations
Completed
Ballot Contract deployed at 0xE54830c18D0dD80B48792E2DA471CA1207851955
```

**6. Delegatee Casting vote**

The delegatee will have a voting power of 10 based on **Step #3**. Delegatee will now use these tokens to vote and use 1 voting power to proposal with index 1. This will update its voting power to 9.

Output:

```
Casting vote to Proposal with index 1
Vote transaction completed. Hash: 0x30a22c003872934e2857679c6721d5c6e32556fa1f01814851a3739a819d3921
Updated voting power: 9.0
```

**7. Get winner name**

Based on our proposal inputs, `[Ham, Burger, Pizza, Donut]`, Burger has index 1 and will therefore be the current winner.

Output:

```
Winning Name: Burger
```
