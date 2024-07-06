const wFile = 'wallet.json';
const kFile = 'keystore.json';
console.log('');
console.log('Usage:');
console.log('');
console.log('node wks.js [WALLET_JSON_FILE] [OUTPUT_KEYSTORE_FILE]');
console.log('');
console.log(`The WALLET_JSON_FILE default value is "${wFile}"`);
console.log(`The OUTPUT_KEYSTORE_FILE default value is "${kFile}"`);
console.log('');
let fs = require('fs');
let file = process.argv[2];
if(!file){
  file = wFile;
  console.log(`No wallet file specified, [${wFile}] is used`);
}
let out = process.argv[3];
if(!out){
  out = kFile;
  console.log(`No output file specified, [${kFile}] is used`);
}
try{
  let data = fs.readFileSync(file);
  data = JSON.parse(data).keyStore;
  data = JSON.stringify(data);
  fs.writeFileSync(out,data);
  console.log(`The wallet keystore was saved in [${out}]`);
}catch(e){
  console.log(e.toString());
};