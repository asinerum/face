# FACEs TOKEN AUTO MINING
This is the simplest way for mining most FACEs tokens including GEMT9, NEMT9, REMT9, X.

## Interface
Pure NodeJS CLI.

## Features
1. Fast creating ethereum-based wallets.
2. Simple and easy mining FACEs tokens.

## Prerequisites
1. NodeJS v12 or higher.
2. NPM v6 or higher.

## Installation
> git clone https://github.com/asinerum/face 
> 
> cd face/CLI/node 
> 
> npm install 

## Usage
### Wallet Creation
> node wallet.js --out <JSON_FILE>
1. JSON_FILE is a JSON file to put the newly created wallet in (default "wallet.json").
2. Every user is required to provide a password to encrypt the wallet.
3. The password is not recoverable.
4. Wallets can be created as many as needed.
### Wallet Checking
> node wopen.js --file <JSON_FILE>
1. JSON_FILE is the JSON file in which a user stores his encrypted wallet, as previously explained.
2. The password to decrypt the wallet is required.
3. The expected wallet address is to be shown thereafter.
### Environment Variable Settings
1. Environment variables are stored in the ".env" file, where only YOUR_KEYSTORE_V3 need to be set for actual use.
2. The YOUR_KEYSTORE_V3 value can be taken from the "wallet.json" file created before, as above mentioned.
> For whom being not familiar with NodeJS, run:
> 
> *node wks.js <WALLET_FILE> <KEYSTORE_FILE>*
> 
> then see the YOUR_KEYSTORE_V3 value being saved in KEYSTORE_FILE file (default "keystore.json").
### Run FACE Mining
> 
> node mine.js <TOKEN_SYMBOL> --gas <GAS_LIMIT> --idle <TX_INTERVAL> --loop <TX_TIMES> --pass <SKIP_TIME>
> 
For example:
> node mine.js gemt9 --gas 400000 --idle 15 --loop 2 --pass 5
>
Or shorter:
> node mine.js nemt9 --idle 60
>

1. TOKEN_SYMBOL is mandatory argument, currently must be "gemt9" or "nemt9".
2. GAS_LIMIT is transaction gas limit (default "300000", should be "400000" or a bit higher).
3. TX_INTERVAL is idle time (in minutes) between one mining transaction and the next (default "10").
4. TX_TIMES is planned number of mining transactions to be executed (default "1000").
5. SKIP_TIME (not adapted for NEMT9) is the least time (in minutes) between the latest successful mining and the current one (default "5").

(C)2021 ASINERUM PROJECT TEAM
