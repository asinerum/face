# FACE: Fully Autonomous Crypto Ecosystem
  
This document is stated and understood as a whitepaper
  
## the ideas
  
FACE is to bring to people a set of classic proof-of-work cryptocurrencies activated on ethereum-like blockchains that can be mined with ease.
- Mine only, no *mint*, no *burn*.
- Autonomous controls only, no *owners*, no *moderators*, no *governances*.
  
## the tokens
  
FACE`s two first so-called *mineable* erc20-standard tokens were already developed and deployed on Binance Smart Chain crypto network (BSC) with the symbol names GEMT9 and NEMT9.
- **GEMT9: ethereum mineable token with no governance V9**  
smart contract address on BSC:
0x9f57b97a6723b1620a6360af33b28d006806ec0d  
[Token Explorer](https://bscscan.com/token/0x9f57b97a6723b1620a6360af33b28d006806ec0d)  
The GEMT9 smart contract is dedicatedly built for crypto users which plan to run their own investment programs that serve crypto HYIP enthusiasts.
- **NEMT9: ethereum mineable token with no governance naked V9**  
smart contract address on BSC:
0x2e23950c00bdd2505ee64494bc554e59050c70ce  
[Token Explorer](https://bscscan.com/token/0x2e23950c00bdd2505ee64494bc554e59050c70ce)  
The NEMT9 smart contract is built for crypto ecommerce and gaming.
  
## the codes
  
The original codes of GEMT9 and NEMT9 smart contracts are fully open-source, licensed all under MIT license agreement, verified and published on *bscscan.com* blockchain explorer at the links quoted above.  
People also explore the codes at FACE project repositories:
- [GEMT9 Smart Contract](https://github.com/asinerum/face/tree/main/gemt9/contracts)
- [NEMT9 Smart Contract](https://github.com/asinerum/face/tree/main/nemt9/contracts)
  
## the minings
  
The minings of Gemt9s and Nemt9s are on the same concept, but not the same totally.  
In order to mine these resources, people do call the appropriate smart contract method named *mine* with an integer parameter *nonce* accepted as proof-of-work
  
SOLIDITY smart contract interface:
```ruby
function mine(uint256) external returns(bool);
```
  
JAVASCRIPT web3js function calling:
```ruby
CONTRACT.methods.mine(NONCE).send();
```
  
The correct value of *nonce* must be found by brute force checking, and some amount of Gemt9s (or Nemt9s) should be awarded afterwards, with increasing difficulty and decreasing capacity thru time:
- GEMT9 mining difficulty increases by 3x every 4 months.
- GEMT9 mining capacity (block-based reward) decreases by 3x every 4 months.
- NEMT9 mining difficulty increases by 2x every 6 months.
- NEMT9 mining capacity (block-based reward) decreases by 2x every 6 months.
- GEMT9 mining block-based reward starts at 60 Gemt9s, awarded once per single block.
- NEMT9 mining block-based reward starts at 60 Nemt9s, awarded once per single block.
  
Below are ready-built browser tools for mining FACE`s tokens:
- [FACE Online Miner](https://asinerum.github.io/face/mine)
- [FACE Mobile Miner](https://asinerum.github.io/face/dig)
- [FACE Token Mining Source Code](https://github.com/asinerum/face/blob/main/mine.html)
- [FACE Browser JS Library](https://github.com/asinerum/project/tree/master/scr)
  
EXAMPLES OF MINING FACE`S TOKENS
  
> Using Desktop Browser with Metamask Plugin, Step by Step
  
 1. On desktop computers, do install any modern browser that supports [Metamask Plugin](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) to enable the most widely acclaimed ethereum hot wallet, the [Metamask Wallet](https://metamask.io);
 2. On mobile devices, using [Kiwi Browser](https://kiwibrowser.com) instead of Chrome/Firefox/Edge is suggested;
 3. Launch the browser, unlock the Metamask wallet, switch to Binance Smart Chain (a.k.a BNB Chain) network;
 4. If BNB Chain has not been seen, [add it](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain);
 5. Make sure the active account has at least 0.0002 BNB to pay gas fee (at 1.00 Gwei gas price) for tokens mining;
 6. Open the [FACE Online Miner](https://asinerum.github.io/face/mine) page (will further be named *the miner*);
 7. Allow Metamask wallet to connect to the miner when prompted;
 8. Choose which token to mine, where GEMT9 and NEMT9 are available options;
 9. If the mining`s *nonce number* is known, just enter it, otherwise leave it blank;
 10. Double check all information on the miner page, then click *START* button;
 11. Be aware that the mining process might take a very long time to find the *nonce number*;
 12. Follow instructions from Metamask to complete the mining transaction after the *nonce number* is found;
 13. Wait for token balance updates;
  
> Using Mobile Browser, Step by Step
  
 1. Make sure one of the following values is known:
    - miner`s private key, or
    - miner`s KEYSTORE V3, or
    - miner`s BIP38 encrypted private key;
 2. Open the [FACE Mobile Miner](https://asinerum.github.io/face/dig) page in any modern web browser;
 3. Enter the known *keystore or private key* values, and also the decrypt password if needed, then click *UNLOCK WALLET* button;
 4. Once miner`s wallet address is displayed, choose which token to mine, where GEMT9 and NEMT9 are available options;
 5. Click *START AUTO MINE* button to begin mining process;
 6. Wait for token balance updates;
  
> Using NodeJS Command Line Interface
  
 1. [NodeJS CLI Miner V1](https://github.com/asinerum/face/tree/main/CLI/node)
 2. [NodeJS CLI Miner V2](https://github.com/asinerum/face/tree/main/CLI/node2)
  
## the early trades
  
People who dont care about token mining can buy Gemt9s and Nemt9s being sold by some early miners.  
Just enter the desired amount of tokens to buy, then click *BUY* button, and follow Metamask instructions to complete the purchasing transaction:
- [GEMT9 Trade No.66620240401](https://asinerum.github.io/face/gemt9/tools/gemtbuy#oid=66620240401)
- [GEMT9 Trade No.67820240401](https://asinerum.github.io/face/gemt9/tools/gemtbuy#oid=67820240401)
- [GEMT9 Trade No.67820240331](https://asinerum.github.io/face/gemt9/tools/gemtbuy#oid=67820240331)
- [NEMT9 Trade No.99920240401](https://asinerum.github.io/face/nemt9/tools/nemtbuy#oid=99920240401)
- [NEMT9 Trade No.77720240331](https://asinerum.github.io/face/nemt9/tools/nemtbuy#oid=77720240331)
  
## the ecosystem
  
Shown below are some of FACE featured functions.
  
> Creating an Investment Program, Step by Step  
> [Using Prebuilt Web App with Metamask Plugin](https://asinerum.github.io/face/gemt9/tools/program)
  
 1. Specify program`s ID which must be integer and unique;
 2. Specify program`s earning APR a.k.a annual percentage rate;
 3. Prepare to pay initial deposit in Gemt9s;
 4. Click *CREATE PROGRAM* button to begin creating process;
 5. Follow instructions from Metamask to complete the creating transaction;
  
> Investing to an Existing Program, Step by Step  
> [Using Prebuilt Web App with Metamask Plugin](https://asinerum.github.io/face/gemt9/tools/invest)
  
 1. Enter program`s ID;
 2. Wait for all information to be displayed accurately;
 3. Enter the ideal amount to invest to the program;
 4. Click *INVEST* button to begin investing process;
 5. Follow instructions from Metamask to complete the investing transaction;
 6. Click *REDEEM* button to stop investing and withdraw all principal and earnings;
  
> Playing lotto/gambling games to earn FACE`s tokens  
> [Using Prebuilt Web App with Metamask Plugin](https://lode-hanoi.blogspot.com/)
  
> Paying FACE`s tokens along with transaction reference and note  
> [Using Prebuilt Web App with Metamask Plugin](https://asinerum.github.io/face/gemt9/tools/pay)
  
## the early programs
  
Shown below are some of FACE early investment programs.
  
> Gemt9 standard investing  
> [Using Prebuilt Web App with Metamask Plugin](https://asinerum.github.io/face/gemt9/tools/invest#oid=5)
  
 1. Enter "5" for program`s ID;
 2. Enter an amount to invest in Gemt9;
 3. Click *INVEST* button to begin investing process;
 4. Follow instructions from Metamask to complete the investing transaction;
 5. Redeem investment at any time and earn 3.15% APR;
  
> Gemt9 HYIP investing  
> [Using Prebuilt Web App with Metamask Plugin](https://asinerum.github.io/face/gemt9/tools/invest#oid=1)
  
 1. Enter "1" for program`s ID;
 2. Enter an amount to invest in Gemt9;
 3. Click *INVEST* button to begin investing process;
 4. Follow instructions from Metamask to complete the investing transaction;
 5. Redeem investment at any time and earn 4998.45% APR;
  
(C)2021 ASINERUM PROJECT TEAM
