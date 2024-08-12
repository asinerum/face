# FACEs TOKEN MINER
> v2.0.1
>
## Features
>
1. Fast creating BTC/ETH/SOL/TON paper wallets.
2. Simple and easy mining mineable FACEs tokens.
3. Easy sending BNB/SOL/TON/BTC and their tokens.
>
## Installation
>
> npm i face-token-miner
>
## Usage
>
#### On BNB Smart Chain Network
>
> This is also suitable for ETH and ETC networks,
> But some professional coding tips are required.
>
**Load .ENV settings and library:**
```ts
// Refer to <./examples/.env>
require("dotenv").config();
const miner = require("face-token-miner");
```
>
**Create a paper wallet:**
```ts
// Randomly create a wallet and save it to a <.json> file
miner.account.newAccSave("your_encryption_password", false, "your_wallet_storage_file.json");
// Create new wallet only, with encrypted keystore version 3
var new_wallet_data;
await miner.account.newAccount("your_encryption_password", function(data){new_wallet_data=data.ACCOUNT});
console.log("Wallet Address:\n", new_wallet_data.address);
console.log("Wallet Private Key:\n", new_wallet_data.privateKey);
console.log("Wallet Keystore V3:\n", new_wallet_data.keyStore);
```
>
**Choose one of the three ways to use a paper wallet:**
```ts
// Retrieve wallet from <.json> storage file
miner.account.openWallet("your_encryption_password", "your_wallet_storage_file.json");
// Retrieve wallet from <.env> settings
miner.account.yourWallet("your_encryption_password");
// Import wallet from a known private key
var hex64_private_key = "206fdf741af97638f655eb3f1e05addc976cc86103f6b108604de21c7038da65";
miner.account.import(hex64_private_key, true);
```
>
**Work with native coins and ERC20 tokens:**
```ts
// Start ERC20 token connection
var network_gas_limit = 200000;
var erc20_token_address = "0x55d398326f99059ff775485246999027b3197955";
await miner.token.nonStdConnect(network_gas_limit, erc20_token_address);
// Test ERC20 functions
await miner.token.call("name");
await miner.token.call("totalSupply");
// Test RPC functions with current opened wallet
var recipient_address = "0x94eB08be475F9E8b1458C5FEA1EE786c3b4799d9";
miner.data.ethers(); //BNB, balance of the opened wallet
miner.data.tokens(); //USDT, balance of the opened wallet
miner.user.ethers(recipient_address); //BNB, balance of certain wallet
miner.user.tokens(recipient_address); //USDT, balance of certain wallet
// Send native coins
var native_coin_sending_amount = 1.5; //BNB
await miner.user.transferEther(native_coin_sending_amount, recipient_address);
// Send ERC20 tokens
var erc20_token_sending_amount = 200; //USDT
await miner.user.transferToken(recipient_address, erc20_token_sending_amount);
```
>
**Mine FACEs tokens:**
```ts
// Run automatic token miner
// Refer to <./examples/mine.js>
var mineable_token_symbol = "GEMT9";
var pause_after_one_mining = 30; //minutes
var total_mining_attempts = 500; //times
var skip_time_from_last_mining = 10; //minutes
miner.token.faceConnect(network_gas_limit, mineable_token_symbol);
miner.token.faceAutoMine(pause_after_one_mining, total_mining_attempts, skip_time_from_last_mining);
```
>
#### On Solana Network
>
**Load .ENV settings and library:**
```ts
// Refer to <./examples/.env>
require("dotenv").config();
const {solana} = require("face-token-miner");
```
>
**Create a paper wallet:**
```ts
// Randomly create a wallet and save it to a <.json> file
solana.account.newAccSave("your_encryption_password", false, "your_sol_wallet_storage_file.json");
// Create new wallet only, with encrypted keystore version 3
var new_wallet_data;
await solana.account.newAccount("your_encryption_password", function(data){new_wallet_data=data.ACCOUNT});
console.log("Wallet Address:\n", new_wallet_data.address);
console.log("Wallet Private Key:\n", new_wallet_data.privateKey);
console.log("Wallet Keystore V3:\n", new_wallet_data.keyStore);
```
>
**Choose the way to use a paper wallet:**
```ts
// Retrieve wallet from <.json> storage file
solana.account.openWallet("your_encryption_password", "your_sol_wallet_storage_file.json");
// Retrieve wallet from <.env> settings
solana.account.yourWallet("your_encryption_password");
// Import wallet from a known private key
var hex128_private_key = "15b2eddd57069bfb1072593f6e83a42c47e987a53f7c191d66a3c5e96b94575a0aaba9e7d687ed1c00564382e17628ec74c8e5816305c0481b4b9f821c7bfcf7";
solana.account.import(hex128_private_key, true);
```
>
**Work with SOL coins and SPL tokens:**
```ts
// Test RPC functions
var recipient_address = "Eh5cwMd5iQP5tVtxLa88R7hr2tbj1kKSQeWMmpKvJJJ1";
var spl_token_address = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
solana.data.sols(); //SOL
solana.user.sols(recipient_address); //SOL
await solana.token.balance(spl_token_address); //USDC
await solana.token.balance(spl_token_address, recipient_address); //USDC
// Send SOL native coins
var native_coin_sending_amount = 1.5; //SOL
await solana.user.transferSol(native_coin_sending_amount, recipient_address);
// Send SPL tokens
var spl_token_sending_amount = 224.5; //USDC
await solana.user.transferToken(spl_token_address, recipient_address, spl_token_sending_amount);
```
>
#### On TON Network
>
**Load .ENV settings and library:**
```ts
// Refer to <./examples/.env>
require("dotenv").config();
const {toncoin} = require("face-token-miner");
```
>
**Create a paper wallet:**
```ts
// Randomly create a wallet and save it to a <.json> file
toncoin.account.newAccSave("your_encryption_password", false, "your_ton_wallet_storage_file.json");
// Create new wallet only, with encrypted keystore version 3
var new_wallet_data;
await toncoin.account.newAccount("your_encryption_password", function(data){new_wallet_data=data.ACCOUNT});
console.log("Wallet Address:\n", new_wallet_data.address);
console.log("Wallet Private Key:\n", new_wallet_data.privateKey);
console.log("Wallet Keystore V3:\n", new_wallet_data.keyStore);
```
>
**Choose the way to use a paper wallet:**
```ts
// Retrieve wallet from <.json> storage file
toncoin.account.openWallet("your_encryption_password", "your_ton_wallet_storage_file.json");
// Retrieve wallet from <.env> settings
toncoin.account.yourWallet("your_encryption_password");
// Import wallet from a known private key
var hex128_private_key = "15b2eddd57069bfb1072593f6e83a42c47e987a53f7c191d66a3c5e96b94575a0aaba9e7d687ed1c00564382e17628ec74c8e5816305c0481b4b9f821c7bfcf7";
toncoin.account.import(hex128_private_key, true);
```
>
**Work with TON coins and Jetton tokens:**
```ts
// Test RPC functions
// Note: any TON address must be activated before use
var recipient_address = "EQBeUCmO1DDFwKbI09vniuAUmYJfHLsK7cZXeUFa5kWctz14";
var jetton_token_address = "EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT";
toncoin.data.tons(); //TON
toncoin.user.tons(recipient_address); //TON
await toncoin.token.balance(jetton_token_address); //NOT
await toncoin.token.balance(jetton_token_address, recipient_address); //NOT
// Send TON native coins
var toncoin_tx_memo = "Test";
var native_coin_sending_amount = 20.75; //TON
await toncoin.user.transferTon(native_coin_sending_amount, recipient_address, toncoin_tx_memo);
// Send Jetton tokens
var jetton_token_tx_fee_deposit = 0.05; //TON_attach_amount
var jetton_token_tx_message_fee = 0.01; //TON_forward_amount
var jetton_token_tx_memo = "Gift";
var jetton_token_sending_amount = 2000; //NOT
await toncoin.user.transferToken(jetton_token_address, recipient_address, jetton_token_sending_amount, jetton_token_tx_fee_deposit, jetton_token_tx_message_fee, jetton_token_tx_memo);
```
>
#### On BTC/BCH/LTC Networks
>
**Load .ENV settings and library:**
```ts
// Refer to <./examples/.env>
require("dotenv").config();
const {bitcoin} = require("face-token-miner");
// Assign cryptocurrency in use
// Now BTC, BCH, LTC only are accepted
console.log(bitcoin.network.getSymb()); //BNB at default
bitcoin.network.setSymb("BTC"); //BCH, LTC also accepted
```
>
**Create a paper wallet:**
```ts
// Randomly create a wallet and save it to a <.json> file
bitcoin.account.newAccSave("your_encryption_password", false, "your_btc_wallet_storage_file.json");
// Create new wallet only, with encrypted keystore version 3
var new_wallet_data;
await bitcoin.account.newAccount("your_encryption_password", function(data){new_wallet_data=data.ACCOUNT});
console.log("Wallet Address:\n", new_wallet_data.address);
console.log("Wallet Private Key:\n", new_wallet_data.privateKey);
console.log("Wallet Keystore V3:\n", new_wallet_data.keyStore);
```
>
**Choose the way to use a paper wallet:**
```ts
// Retrieve wallet from <.json> storage file
await bitcoin.account.openWallet("your_encryption_password", "your_btc_wallet_storage_file.json");
// Retrieve wallet from <.env> settings
await bitcoin.account.yourWallet("your_encryption_password");
// Import wallet from a known private key
var hex64_private_key = "206fdf741af97638f655eb3f1e05addc976cc86103f6b108604de21c7038da65";
await bitcoin.account.import(hex64_private_key, true);
```
>
**Work with BTC-like coins:**
```ts
// Test RPC functions
var recipient_address = "1CXsNnd148Dv7Nj9p4oTBYkVJ8NDvghac5";
bitcoin.data.bits(); //BTC, balance of the opened wallet
bitcoin.user.bits(recipient_address); //BTC, balance of certain wallet
// Send BTC-like coins
var native_coin_sending_amount = 10; //BTC
await bitcoin.user.transfer(native_coin_sending_amount, recipient_address);
```
>
#### More Examples and Explanations
>
https://github.com/asinerum/face/tree/main/CLI/node2
>
(C)2021 ASINERUM PROJECT TEAM
