const miner = require("face-token-miner");
const wFile = 'wallet.json';
const kFile = 'keystore.json';
let file = miner.app.cliArgument('--file',wFile);
let out = miner.app.cliArgument('--out',kFile);
console.log('');
console.log('Usage:');
console.log('');
console.log('node wks.js --file [WALLET_JSON_FILE] --out [OUTPUT_KEYSTORE_FILE]');
console.log('');
console.log(`The WALLET_JSON_FILE default value is "${wFile}"`);
console.log(`The OUTPUT_KEYSTORE_FILE default value is "${kFile}"`);
console.log('');
let fs = require('fs');
try{
  let data = fs.readFileSync(file);
  data = JSON.parse(data).keyStore;
  data = JSON.stringify(data);
  fs.writeFileSync(out,data);
  console.log(`The wallet keystore was saved in [${out}]`);
}catch(e){miner.die(e)}