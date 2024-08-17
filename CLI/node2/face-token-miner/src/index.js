//captions

const hi_alert_data = 'WRONG INPUT DATA';
const hi_msg_comeon = 'Really want to continue [y/n]';
const hi_msg_dsaved = 'Your data was saved to file';
const hi_msg_idling = 'Idling to start..';
const hi_msg_newpwd = 'New password to encrypt your private key';
const hi_msg_nocoin = 'No target token specified';
const hi_msg_nomine = 'Latest mining was not located';
const hi_msg_oldpwd = 'Password to decrypt your private key';
const hi_msg_repeat = 'Repeat once more';
const hi_msg_trying = 'Trying to find nonce..';
const hi_msg_txmake = 'Making transaction request..';
const hi_prompt_chk = 'PASSWORD MUST CONTAIN AT LEAST 6 LOWERCASE/UPPERCASE/NUMERIC CHARACTERS';
const hi_prompt_err = 'SOMETHING WENT WRONG PLEASE CHECK YOUR BALANCE';
const hi_prompt_fee = 'GAS COST ESTIMATION';
const hi_prompt_rct = 'TRANSACTION HAS BEEN MADE BUT GETS NO RECEIPT';

const alert_bad_amount = 'INVALID AMOUNT';//V2
const alert_bad_itemno = 'INVALID ITEM NUMBER';//V2
const alert_bad_ppcoin = 'INVALID PRICE';//V2
const alert_bad_volume = 'INVALID VOLUME';//V2
const alert_bad_wprice = 'UNACCEPTABLE PRICE';//V2

//commons

String.prototype.buffer = function(frm='hex'){return(Buffer.from(this.toString(),frm))};
String.prototype.encB64 = function(){return(this.buffer(null).toString('base64'))};
String.prototype.decB64 = function(){return(this.buffer('base64').toString())};
String.prototype.encHex = function(h,i,s){s='';for(i=0;i<this.length;i++){h=this.charCodeAt(i).toString(16);s+=('000'+h).slice(-4)}return(s)};
String.prototype.decHex = function(h,i,s){s='';h=this.match(/.{1,4}/g)||[];for(i=0;i<h.length;i++){s+=String.fromCharCode(parseInt(h[i],16))}return(s)};

const cliArgument = function(arg,def,i,v){i=process.argv.indexOf(arg);if(i>-1){v=process.argv[i+1]};return(v||def)};//[--arg]
const cliFlagArgv = function(arg){return(process.argv.indexOf(arg)>-1?true:false)};//[-arg]

//constructors

const _Array = function(size){return(new Array(size))};
const _Set = function(val){return(new Set(val))};
const _DATE = function(val){return(new Date(val))};//V2
const _Date = function(val){if(val)return(new Date(val));return(new Date())};
const _Time = function(){return(new Date().getTime())};
const _Error = function(err){throw(new Error(err))};
const _Regex = function(pat){return(new RegExp(pat))};
const _Uint8 = function(val){return(new Uint8Array(val))};
const _Instance = function(arg,obj){return(arg instanceof obj)};
const _Promise = function(res,rej){return(new Promise(res,rej))};
const _Encoder = function(code='utf-8'){return(new TextEncoder(code))};
const _Decoder = function(code='utf-8'){return(new TextDecoder(code))};
const _Exit = function(msg,code){console.log(YELLOW,msg,WHITE);process.exit(code)};/***V2*/
const _Buffer = function(val,code='hex',...args){if('number'==typeof(val)){if('string'==typeof(code))_Error('BadEncoding');return(Buffer.allocUnsafe(val))}return(Buffer.from(val,code,...args))};/***/

//consts

const SYMBOL = 'XUT';
const DECIMALS = 18;
const BASEGAS = 21000;
const ETHER = 'ether';
const GWEI = 'gwei';
const HEX = 'hex';
const HEXINIT = '0x';
const MESSAGE = 'message';
const RECEIPT = 'receipt';
const SIGNATURE = 'signature';
const MAINNET = 'mainnet';
const BINANCE = 'binance';
const CLASSIC = 'classic';
const LOCALHOST = 'localhost';
const AND = '&';
const ASK = '?';
const BACK = '\\';
const COLON = ':';
const COMMA = ',';
const DOT = '.';
const EQUAL = '=';
const HASH = '#';
const HYPHEN = '-';
const SEMI = ';';
const SLASH = '/';
const STAR = '*';
const BLANK = '';
const EMPTY = '';
const NBSP = '&nbsp;';
const NEWLINE = '\n';
const RETURN = '\r';
const SPACE = '\u0020';
const TAB = '\t';
const OxOO = '0x00';
const REFEXC = 'EXC';
const REFREG = 'REG';
const ZERO = '0';
const ANNSEC = 31536000;
const PPT = '1000000000000000000';
const ZEROADDR = '0x0000000000000000000000000000000000000000';
const FAILADDR = '0x0000000000000000000000000000000000000001';
const CANCELED = 'CANCELED';
const CHECKED = 'CHECKED';
const DONE = 'DONE';
const END = 'END';/***/
const ERROR = 'ERROR';
const FAILED = 'FAILED';
const FOUND = 'FOUND';
const IGNORE = 'IGNORE';/***/
const INVALID = 'INVALID';
const OK = 'OK';
const UNCHECKED = 'UNCHECKED';
const UNKNOWN = 'UNKNOWN';
const ALERTS = {en:{CANCELED,CHECKED,DONE,ERROR,FAILED,FOUND,INVALID,OK,UNCHECKED,UNKNOWN}};

const YELLOW = '\x1b[33m';//V2
const GREEN = '\x1b[32m';//V2
const WHITE = '\x1b[0m';//V2

//contracts

const GEMT={
mainnet:{ncid:1,addr:'0x4f8e54e2e840561e5aa8a296ad5f7b0ae18e6eff',hash:'0xadf8c72399b53b3486b665798b6599109a7c6ed33593d65c0354504d0bac92c8',rpcs:'https://mainnet.rpc.fiews.io/v1/free',bcls:'private',scan:'https://etherscan.io/token/'},//V1
binance:{ncid:56,addr:'0x9F57B97a6723b1620A6360af33B28d006806EC0d',hash:'0xd0a965e306a7798eff5bd964f66c4816324ad64bdb93507dd30c6e28b3d64d1e',rpcs:'https://bsc-dataseed.binance.org/',bcls:'private',scan:'https://www.bscscan.com/token/'},//V9
classic:{ncid:61,addr:'0xc9dDF5d5adBA8711F106953B97987B02F8EAe5e4',hash:'0xad8c60417f5266e28906fdc6a5b2dc050abfe75a999623153589fbd2a0d721a4',rpcs:'https://www.ethercluster.com/etc/',bcls:'private',scan:'https://etcblockexplorer.com/token/'}};
const NEMT={
mainnet:{ncid:1,addr:'0x208871E7f29C0C0e131Dc275f1FCfc9e73C2b06e',hash:'0xe7a06b31a4ea68e0611fc28bd6a176d1179b15a4ac4a056430ff2c89bd80700b',rpcs:'https://mainnet.rpc.fiews.io/v1/free',bcls:'private',scan:'https://etherscan.io/token/'},//V1
binance:{ncid:56,addr:'0x2e23950C00bDd2505EE64494bc554e59050C70Ce',hash:'0xee62eecd9e06f15a8ec2e71672f55cdcd4bbdaafdb5746d1b477137566096cee',rpcs:'https://bsc-dataseed.binance.org/',bcls:'private',scan:'https://www.bscscan.com/token/'},//V9
classic:{ncid:61,addr:'0x050010e67858E4B71f6D79359ad950e614863e0d',hash:'0xe63a60272577195cf05bbef7a30b736597e4255ff34288d55aa80d58f8fee610',rpcs:'https://www.ethercluster.com/etc/',bcls:'private',scan:'https://etcblockexplorer.com/token/'}};
const ABIGEMT=[
{"constant":true,"inputs":[],"name":"basicRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"name":"refnosOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"blockReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ref","type":"bytes32"},{"name":"to","type":"address"},{"name":"value","type":"uint256"},{"name":"note","type":"string"}],"name":"pay","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"invests","outputs":[{"name":"amount","type":"uint256"},{"name":"start","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"stampRewards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"randomKey","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"}],"name":"withdraw","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"petri","type":"uint256"},{"name":"value","type":"uint256"}],"name":"program","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"value","type":"uint256"}],"name":"acquire","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"cancel","type":"bool"}],"name":"release","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastProof","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"}],"name":"unpost","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardStamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"timerewStep","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"STAGE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"half","type":"bool"}],"name":"close","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"programs","outputs":[{"name":"eth","type":"bool"},{"name":"maker","type":"address"},{"name":"value","type":"uint256"},{"name":"petri","type":"uint256"},{"name":"open","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MX","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"author","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"deposits","outputs":[{"name":"eth","type":"bool"},{"name":"maker","type":"address"},{"name":"taker","type":"address"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"markets","outputs":[{"name":"buytoken","type":"bool"},{"name":"maker","type":"address"},{"name":"value","type":"uint256"},{"name":"ppe","type":"uint256"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"START","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"deposit","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"blockPayouts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"value","type":"uint256"}],"name":"invest","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"value","type":"uint256"},{"name":"ppe","type":"uint256"},{"name":"time","type":"uint256"}],"name":"post","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"ua","type":"address"},{"name":"key","type":"string"},{"name":"form","type":"string"},{"name":"skip","type":"uint256"}],"name":"refnos","outputs":[{"name":"size","type":"uint256"},{"name":"nos","type":"uint256[25]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"refno","type":"uint256"},{"indexed":true,"name":"ETH","type":"bool"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Bank","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ref","type":"bytes32"},{"indexed":true,"name":"ETH","type":"bool"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Pay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"refno","type":"uint256"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"petri","type":"uint256"},{"indexed":true,"name":"open","type":"uint256"}],"name":"Plan","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"refno","type":"uint256"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Put","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"fromAddress","type":"address"},{"indexed":true,"name":"toAddress","type":"address"},{"indexed":false,"name":"txPenny","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"ownerAddress","type":"address"},{"indexed":true,"name":"spenderAddress","type":"address"},{"indexed":false,"name":"txPenny","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"refno","type":"uint256"},{"indexed":true,"name":"buy","type":"bool"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"ppe","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"Sale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"refno","type":"uint256"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Get","type":"event"},{"constant":true,"inputs":[{"name":"nonce","type":"uint256"},{"name":"key","type":"uint256"},{"name":"uai","type":"uint256"}],"name":"keygen","outputs":[{"name":"num","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"nonce","type":"uint256"}],"name":"mine","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const ABINEMT=[
{"constant":true,"inputs":[],"name":"basicRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"name":"refnosOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"result","type":"uint256"}],"name":"ungame","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"games","outputs":[{"name":"eth","type":"bool"},{"name":"close","type":"uint256"},{"name":"maker","type":"address"},{"name":"value","type":"uint256"},{"name":"result","type":"uint256"},{"name":"name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"saves","outputs":[{"name":"eth","type":"bool"},{"name":"open","type":"uint256"},{"name":"maker","type":"address"},{"name":"taker","type":"address"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"randomKey","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"bid","type":"bool"},{"name":"open","type":"uint256"},{"name":"close","type":"uint256"},{"name":"stock","type":"uint256"},{"name":"price","type":"uint256"},{"name":"value","type":"uint256"},{"name":"name","type":"string"},{"name":"note","type":"string"}],"name":"offer","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"}],"name":"unoffer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"value","type":"uint256"}],"name":"acquire","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"pcts","type":"uint256[3]"}],"name":"regame","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"value","type":"uint256"}],"name":"bid","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"}],"name":"unpost","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"close","type":"uint256"},{"name":"value","type":"uint256"},{"name":"pcts","type":"uint256[3]"},{"name":"name","type":"string"},{"name":"note","type":"string"}],"name":"game","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"restock","type":"uint256"}],"name":"reoffer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"refno","type":"uint256"}],"name":"GAME","outputs":[{"name":"pcts","type":"uint256[3]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"offers","outputs":[{"name":"eth","type":"bool"},{"name":"bid","type":"bool"},{"name":"open","type":"uint256"},{"name":"close","type":"uint256"},{"name":"stock","type":"uint256"},{"name":"maker","type":"address"},{"name":"taker","type":"address"},{"name":"price","type":"uint256"},{"name":"value","type":"uint256"},{"name":"name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"author","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"re","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"bet","type":"uint256"},{"name":"value","type":"uint256"}],"name":"play","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"value","type":"uint256"},{"name":"note","type":"string"}],"name":"order","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"markets","outputs":[{"name":"buytoken","type":"bool"},{"name":"maker","type":"address"},{"name":"value","type":"uint256"},{"name":"ppe","type":"uint256"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"open","type":"uint256"},{"name":"taker","type":"address"},{"name":"value","type":"uint256"},{"name":"note","type":"string"}],"name":"save","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"value","type":"uint256"}],"name":"unsave","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"refno","type":"uint256"},{"name":"value","type":"uint256"},{"name":"ppe","type":"uint256"},{"name":"time","type":"uint256"}],"name":"post","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"ua","type":"address"},{"name":"key","type":"string"},{"name":"form","type":"string"},{"name":"skip","type":"uint256"}],"name":"refnos","outputs":[{"name":"size","type":"uint256"},{"name":"nos","type":"uint256[25]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"refno","type":"uint256"},{"indexed":false,"name":"ETH","type":"bool"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"close","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":false,"name":"name","type":"string"}],"name":"Sell","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"refno","type":"uint256"},{"indexed":false,"name":"ETH","type":"bool"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"close","type":"uint256"},{"indexed":false,"name":"name","type":"string"}],"name":"Game","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"refno","type":"uint256"},{"indexed":false,"name":"ETH","type":"bool"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"taker","type":"address"}],"name":"Save","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"refno","type":"uint256"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"refno","type":"uint256"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Bid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"refno","type":"uint256"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Win","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"refno","type":"uint256"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"bet","type":"uint256"}],"name":"Bet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":false,"name":"ETH","type":"bool"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Re","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"fromAddress","type":"address"},{"indexed":true,"name":"toAddress","type":"address"},{"indexed":false,"name":"txPenny","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"ownerAddress","type":"address"},{"indexed":true,"name":"spenderAddress","type":"address"},{"indexed":false,"name":"txPenny","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"refno","type":"uint256"},{"indexed":true,"name":"buy","type":"bool"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"ppe","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"Sale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"refno","type":"uint256"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Get","type":"event"},{"constant":true,"inputs":[{"name":"nonce","type":"uint256"},{"name":"key","type":"uint256"},{"name":"uai","type":"uint256"}],"name":"keygen","outputs":[{"name":"num","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"nonce","type":"uint256"}],"name":"mine","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

const abis = {GEMT9:ABIGEMT,NEMT9:ABINEMT};
const contracts = {GEMT9:GEMT,NEMT9:NEMT};

const ABIERC20=[
{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},];

//entries

let sender = '';
let senderId = '';
let senderPte = '';
let senderAcc = null;//V2
let txreceipt = '';
let sendingEth = '';
let sendingAbi = '';
let sendingFunc = '';
let xutengFemt = null;
let mineInterval = null;
let network = BINANCE;
let networkChainId = 56;
let COIN = 'BNB';
let TOKEN = 'GEMT9';
let SCABI = abis[TOKEN];
let CONTRACT = contracts[TOKEN];
let contractAddress = CONTRACT[network].addr;
let tokenDecimals = DECIMALS;//V2
let maxgas = 300000;
let txgwei = 1;
let estgas = 0;
let gasfee = 0;

//forms

String.prototype.t2e = function(tpe){return(s2n(this)/s2n(tpe))};/*tpe=pcv=pcp*/
String.prototype.e2t = function(tpe){return(s2n(tpe)*s2n(this))};/*tpe=pcv=pcp*/
String.prototype.p2w = function(ppe){return(String(10**18).mul(this.toString()).div(String(ppe)))};
String.prototype.w2p = function(ppe){return(String(ppe).mul(this.toString()).div(String(10**18)))};
String.prototype.add = function(bnum){return(big(this.toString()).add(big(bnum)).toString())};
String.prototype.div = function(bnum){return(big(this.toString()).div(big(bnum)).toString())};
String.prototype.mod = function(bnum){return(big(this.toString()).mod(big(bnum)).toString())};
String.prototype.mul = function(bnum){return(big(this.toString()).mul(big(bnum)).toString())};
String.prototype.pow = function(bnum){return(big(this.toString()).pow(big(bnum)).toString())};
String.prototype.sus = function(bnum){return(big(this.toString()).sub(big(bnum)).toString())};
String.prototype.eq = function(bnum){return(big(this.toString()).eq(big(bnum)))};
String.prototype.ge = function(bnum){return(big(this.toString()).gte(big(bnum)))};
String.prototype.gt = function(bnum){return(big(this.toString()).gt(big(bnum)))};
String.prototype.le = function(bnum){return(big(this.toString()).lte(big(bnum)))};
String.prototype.lt = function(bnum){return(big(this.toString()).lt(big(bnum)))};
String.prototype.EQ = function(num){return(s2n(this)===s2n(num))};
String.prototype.GE = function(num){return(s2n(this)>=s2n(num))};
String.prototype.GT = function(num){return(s2n(this)>s2n(num))};
String.prototype.LE = function(num){return(s2n(this)<=s2n(num))};
String.prototype.LT = function(num){return(s2n(this)<s2n(num))};
String.prototype.is3ks = function(){try{return(avalid(JSON.parse(this).address))}catch(e){return(false)}};
String.prototype.isKey = function(){return(hvalid(this)||hvalid(this.add0x()))};/***/
String.prototype.isBip = function(){return(bipRegex.test(this))};
String.prototype.isNum = function(){return(/^\d+$/.test(this))};//V2
String.prototype.escape = function(){return(this.replace(/"/g,'\\"'))};
String.prototype.same = function(as,sens=true,trim=false,c,t){c=this;t=String(as);if(trim){c=c.trim();t=t.trim()}if(!sens){c=c.toLowerCase();t=t.toLowerCase()}return(c==t)};
String.prototype.as = function(as){return(this.same(as,false,true))};
String.prototype.nums = function(vol='x',min=0,max=99,nint=true,s,r=true){this.split(COMMA).forEach(p=>{s=p.split(vol);if(isNaD(s[0])||s[0]<min||s[0]>max||(nint&&!Number.isInteger(Number(s[0]))))return(r=0);if(s[1]&&(isNaD(s[1])||s[1]<=0))return(r=null)});return(r)};
String.prototype.lode = function(){return(this.nums()||this.nums(COLON))};

String.prototype.clear = function(){return(this.toLowerCase().replace(/[^a-z\,]/g,''))};//V2
String.prototype.array = function(){return(this.clear().split(','))};//V2
String.prototype.del0x = function(){return(this.trim().replace(/^0x/,''))};//V2
String.prototype.add0x = function(){return('0x'+this.del0x())};//V2

String.prototype.fix = function(dec){return(fix(this,dec))};//V2
Number.prototype.fix = String.prototype.fix;//V2

const big = function(val){return(new web3.utils.BN(val))};
const swep = function(s){return(trim(s).replace(/\s/g,''))};/***Trim()*/
const trim = function(s){if(s)return(s.replace(/^\s+|\s+$/g,BLANK));return(BLANK)};
const isNaD = function(n){return(isNaN(n)||hexRegex.test(n))};
const hvalid = function(h){return(hashRegex.test(h))};
const avalid = function(a){return(web3.utils.isAddress(a))};
const nvalid = function(n,b){n=s2n(n);b=s2n(b);return(n>0&&n<=b)};
const nsmall = function(n,b){return(nvalid(n,b))};
const nmidle = function(n,b){n=s2n(n);b=s2n(b);return(n>0&&n<b)};
const nlarge = function(n,s){n=s2n(n);s=s2n(s);return(n>s&&s>=0)};
const fix = function(n,dec=DECIMALS){return(parseFloat(n).toFixed(dec))};//V2
const n2s = function(n,d){if(!n)return(ZERO);if(!d)d=0;n=n.toString().split(DOT);n[0]=n[0].replace(/\B(?=(\d{3})+(?!\d))/g,COMMA);n[1]=n[1]?DOT+n[1].substr(0,d):EMPTY;return(n[0]+n[1])};
const s2n = function(s=0){if(!s)return(0);s=parseFloat(s.toString().replace(/[^\d\.\-]/g,EMPTY));if(isNaN(s))return(0);return(s)};
const w2s = function(n,dec=5,len=22){n=n2s(fromWei(n),dec);return(n.length<len?n:ASK)};
const s2w = function(s){return(toWei(s2n(s).toString()))};
const h2t = function(h){if(!h)return('');return(web3.utils.padLeft(h,64))};
const toHex = function(s){if(!s)return('0x0');return(web3.utils.toHex(s))};
const toHash = function(s){return(web3.utils.keccak256(s.toString(),{encoding:HEX}))};/***/
const solHash = function(...args){return(web3.utils.soliditySha3(...args))};
const jtoHash = function(j){return(toHash(JSON.stringify(j)))};
const toWei = function(n){return(web3.utils.toWei(n.toString(),ETHER))};
const gtoWei = function(n){return(web3.utils.toWei(n.toString(),GWEI))};
const fromWei = function(w){return(web3.utils.fromWei(w.toString(),ETHER))};
const fromGwei = function(g){return(fromWei(gtoWei(g)))};
const gfromWei = function(w){return(web3.utils.fromWei(w.toString(),GWEI))};
const fromHex = function(h){return(web3.utils.hexToNumberString(h))};
const fromNum = function(n){return(web3.utils.numberToHex(n))};
const fromWHex = function(h){return(fromWei(fromHex(h)))};
const s2wHex = function(s){s=toHex(s2w(s));return(!Number(s)?0:s)};/***/
const g2wHex = function(g){g=toHex(gtoWei(g));return(!Number(g)?0:g)};/***/
const n2Hex = function(n,dec=18){n=toHex(toDec(n,dec));return(!Number(n)?0:n)};/***/
const toDec = function(n,dec=18,a,s,u){n=n.toString();dec=parseInt(dec);if(isNaN(n)||isNaN(dec)||n<=0)return(ZERO);a=n.split(DOT);s=a[0];u=a[1];if(s||(s=ZERO),u||(u=ZERO),u.length>dec)return(ZERO);for(;u.length<dec;)u+=ZERO;return(big(s).mul(big(10).pow(big(dec))).add(big(u)).toString())};
const long = function(dur,tun='M'){dur*=1000;return(tun=='H'?dur*60*60:(tun=='M'?dur*60:dur))};
const min2ms = function(duration){return(long(duration,'M'))};/***/
const mindif = function(hextime,dec=1){return(n2s((nowDate()-fromHex(hextime))/60,dec)+SPACE+'mins')};
const stamp = function(s){s=_Date(s);if(isNaN(s))return(0);return(parseInt(s/1000,10))};//V2
const toDate = function(y,m,d){return(parseInt(_Date(Date.UTC(y,m-1,d,0,0,0,0)).getTime()/1000,10))};
const nowDate = function(){return(parseInt(_Date(0).getTime()/1000,10))};
const utcsDate = function(n){return(_DATE(n*1000).toUTCString())};/***FromDate()*V2*/
const fromDate = function(n){return(_DATE(n*1000).toString())};/***V2*/
const day = function(){return(_Date(0).getDay())};/*WeekDay*/
const date = function(){return(_Date(0).getDate())};/*MonthDate*/
const month = function(){return(_Date(0).getMonth()+1)};/*MM*/
const year = function(){return(_Date(0).getFullYear())};/*YYYY*/
const timezone = function(){return(parseInt(_Date(0).getTimezoneOffset()/60,10))};
const markdate = function(mark=10){return(_Date(markDate(mark)*1000).toLocaleDateString('en-GB'))};/***MarkDate()*/
const markDate = function(mark=10){return(nowDate()+(24-mark+timezone())*60*60)};
const dateMark = function(mark=10){return(toDate(year(),month(),date())+mark*60*60)};
const datePast = function(mark=10,days=1){return(toDate(year(),month(),date())+mark*60*60-days*24*60*60)};
const numsInRange = function(n,rl,rh,fn=null){if(fn)n=fn(n);return(n>=rl&&n<=rh)};
const positiveStr = function(n){return(s2n(n)>0)};
const positiveNum = function(n){return(Number(n)&&n>0)};
const positiveInt = function(n){return(Number.isInteger(Number(n))&&n>0)};
const twoHexEqual = function(h1,h2){return(fromHex(h1)===fromHex(h2))};
const hexCut = function(str){return(hexUtf(strCut(str,'7b226f626a22','7d7d')))};
const hexUtf = function(str){return(decodeURIComponent(str.replace(/[0-9a-f]{2}/g,'%$&')))};
const hexObj = function(str){str=hexCut(str);try{str=JSON.parse(str);}catch(e){str={obj:{raw:str}};};return(str)};
const strCut = function(str,sb,se){if(!sb)sb='{';if(!se)se='}';str=str.substring(str.indexOf(sb));return(str.substr(0,str.lastIndexOf(se)+se.length))};
const hiRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
const loRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
const bipRegex = new RegExp('^([A-Za-z0-9]{58})$');
const hexRegex = new RegExp('^0x([A-Fa-f0-9])+$');
const hashRegex = new RegExp('^0x([A-Fa-f0-9]{64})$');
const tonRegex = new RegExp('^(0|-1):([A-Fa-f0-9]{64})$');//V2
const btcRegex = new RegExp(/^(bc1|[13]|X|D|L)[a-km-zA-HJ-NP-Z1-9]{25,34}$/);//V201
const bchRegex = new RegExp(/^([13][a-km-zA-HJ-NP-Z1-9]{25,34})|^((bitcoincash:)?(q|p)[a-z0-9]{41})|^((BITCOINCASH:)?(Q|P)[A-Z0-9]{41})$/);//V201

const tokenFactor = function(){return(10**(18-tokenDecimals))};//V2
const wt2s = function(n,dec=6){return(n2s(fromWei(n)*tokenFactor(),dec))};//V2
const s2wt = function(s){return(s2w(s).div(tokenFactor()))};//V2

const bigInt = function(s){try{return(BigInt(s))}catch(e){return(0n)}};//V2
const s2nano = function(n){try{return(ton.toNano(n))}catch(e){return(0n)}};//V2
const nano2s = function(nano){try{return(n2s(ton.fromNano(nano),9))}catch(e){return('0')}};//V2
const s2pen = function(tokens,decimals){return(String(Math.floor(tokens*Math.pow(10,decimals))))};//V2
const pen2s = function(pennies,decimals){return(n2s(pennies/Math.pow(10,decimals),decimals))};//V2
const sat2s = function(w){return(pen2s(w,8))};//V201
const s2sat = function(s){return(s2pen(s,8))};//V201

const randStr = function(length,chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',chlen=chars.length,c=0,r=''){while(c<length){r+=chars.charAt(Math.floor(Math.random()*chlen));c++}return(r)};//V2
const randBytes = function(length){return(hex2bytes(Buffer.from(randStr(length)).toString('hex')))};//V2
const hex2bytes = function(hex){return(Uint8Array.from(hex.match(/.{1,2}/g).map((byte)=>parseInt(byte,16))))};//V2
const bytes2hex = function(bytes){return(bytes.reduce((str,byte)=>str+byte.toString(16).padStart(2,'0'),''))};//V2
const readIntFromBitString = function(bs,cursor,bits,n=BigInt(0),i){for(i=0;i<bits;i++){n*=BigInt(2);n+=BigInt(bs.get(cursor+i))}return(n)};//V2

//base

let Web3 = require("web3");
let axios = require("axios");
let Tx = require("ethereumjs-tx");

let ton = require("ton");//V2
let tonweb;//V2
let tonapi;//V2
let tonCrypto = require("ton-crypto");//V2
let tonAccess = require("@orbs-network/ton-access");//V2

let solanaSPL = require("@solana/spl-token");//V2
let solanaWeb3 = require("@solana/web3.js");//V2
let {Metaplex} = require("@metaplex-foundation/js");//V2
let SolPublKey = solanaWeb3.PublicKey;//V2
let SolAccount = solanaWeb3.Account;//V2
let SolConnect = solanaWeb3.Connection;//V2
let SolTx = solanaWeb3.Transaction;//V2

let crypto;//V201
let cryptoClient;//V201

const byt = function(hex){return(web3.utils.hexToBytes(hex))};
const num = function(hex){return(web3.utils.hexToNumberString(hex))};
const kek = function(sender,key,nonce){return(web3.utils.keccak256(web3.eth.abi.encodeParameters(['uint256','uint256','uint256'],[num(sender),key,nonce])))};
const b2i = function(hex,n,i){n=big(0);hex=byt(hex);for(i=0;i<hex.length;i++){n=n.add(big(hex[i]).mul(big(16).pow(big(i*2)).add(big(1))))};return(n.toString())};
const Nonce = function(sender,base,key,min,max,i,m){base=num(base);key=num(key);m=big(key).mod(big(base)).toString();for(i=min;i<=max;i++){if(m==big(b2i(kek(sender,key,i))).mod(big(base)).toString()){return(i)}}return(0)};/***/
const _Web3 = function(){return(new Web3())};
const _Ethereum = function(provider){return(new Web3(provider))};
const _Provider = function(rpc){return(new Web3.providers.HttpProvider(rpc))};
const _Contract = function(abi,addr){return(new web3.eth.Contract(abi,addr))};//V2
const _Transaction = function(dat){return(new Tx(dat))};

const _TonClient = function(rpc,api){return(new ton.TonClient({endpoint:rpc,apiKey:api}))};//V2
const _TonWebClient = function(rpc,api){return(new tonweb(new tonweb.HttpProvider(rpc||ton_rpc_server_endpoint,{apiKey:api||your_ton_rpc_api_key})))};//V2
const _TonApiClient = function(rpc,api){return(new tonapi.Api(new tonapi.HttpClient({baseUrl:rpc||tonapi_rpc_server_endpoint,baseApiParams:{headers:{Authorization:api||your_tonapi_rpc_api_key,'Content-type':'application/json'}}})))};//V2
const _Tonweb = function(rpc,api){return(new Tonweb(rpc,api))};//V2
const _Tonapi = function(rpc,api){return(new Tonapi(rpc,api))};//V2
const _TonAddress = function(addr){return(new tonweb.utils.Address(addr))};//V2

const _SolAccount = function(keyBuffer){return(new SolAccount(keyBuffer))};//V2
const _SolPublKey = function(addr){return(new SolPublKey(addr))};//V2
const _SolClient = function(rpc){return(new SolConnect(rpc))};//V2
const _SolTx = function(){return(new SolTx())};//V2

const _Crypto = function(asset=COIN,key=senderPte){return(new Crypto(asset,key))};//V201
const _CryptoAccount = function(key=senderPte){return(new crypto(key))};//V201

let your_keystore_v3 = process.env.YOUR_KEYSTORE_V3;
let your_rpc_api_key = process.env.YOUR_RPC_API_KEY;
let rpc_server_endpoint = process.env.RPC_SERVER_ENDPOINT||'https://bsc-dataseed.binance.org';//V2#

const _web3 = function(rpc){return(_Ethereum(_Provider(rpc||rpc_server_endpoint)))};//V2
let web3 = _web3();//V2#

let your_ton_keystore_v3 = process.env.YOUR_TON_KEYSTORE_V3;//V2
let your_ton_rpc_api_key = process.env.YOUR_TON_RPC_API_KEY;//V2
let ton_rpc_server_endpoint = process.env.TON_RPC_SERVER_ENDPOINT||'https://toncenter.com/api/v2/jsonRPC';//V2
let ton_wallet_version = process.env.TON_WALLET_VERSION||'WalletContractV4';//V2
let jetton_wallet_version = process.env.JETTON_WALLET_VERSION||'v4R2';//V2
let your_tonapi_rpc_api_key = process.env.YOUR_TONAPI_RPC_API_KEY||'';//V2
let tonapi_rpc_server_endpoint = process.env.TONAPI_RPC_SERVER_ENDPOINT||'https://tonapi.io';//V2

const _ton = function(rpc,api){return(_TonClient(rpc||ton_rpc_server_endpoint,api||your_ton_rpc_api_key))};//V2
let tonClient = _ton();//V2

let your_sol_keystore_v3 = process.env.YOUR_SOL_KEYSTORE_V3;//V2
let sol_rpc_server_endpoint = process.env.SOL_RPC_SERVER_ENDPOINT||solanaWeb3.clusterApiUrl('mainnet-beta');//V2

const _sol = function(rpc){return(_SolClient(rpc||sol_rpc_server_endpoint))};//V2
let solClient = _sol();//V2

let your_btc_keystore_v3 = process.env.YOUR_BTC_KEYSTORE_V3;//V201

network = process.env.network||network;//V2
networkChainId = process.env.networkChainId||networkChainId;//V2
COIN = process.env.COIN||COIN;//V2

//funcs

const log = function(e){console.log(e.toString())};//V201
const del0x = function(obj){obj.privateKey=obj.privateKey.del0x()};//V201
const gsave = function(save,addr,key,acc=null){if(save){sender=addr;senderPte=key;if(acc)senderAcc=acc}};//V201
const oclean = function(obj,props){props.forEach(prop=>delete(obj[prop]))};//V201
const cleanks = function(ks){oclean(ks,['privateKey','secretKey'])};//V201
const cleankey = function(key){oclean(key,['accounts','password'])};//V201
const acc2arr = function(acc){return([acc.address,acc.privateKey])};//V201
const arr2acc = function(arr){return({address:arr[0],privateKey:arr[1]})};//V201
const writevar = function(json,out){try{require('fs').writeFileSync(out,JSON.stringify(json));return(DONE)}catch(e){return(log(e))}};//V201
const setInput = function(obj){return(JSON.stringify({obj:obj}))};
const getInput = function(tx,cbf=console.log){if(!hvalid(tx))return(cbf(ERROR,null));web3.eth.getTransaction(tx,function(err,result){if(err||!result||!result.input)return(cbf(err,null));cbf(null,hexObj(result.input).obj)})};
const errCode = function(e){if(e!=null){e=e.toString();if(e.indexOf(']')>0)return(hi_alert_data);if(e.indexOf(OxOO)>0)return(hi_prompt_err);if(e.indexOf(RECEIPT)>0)return(hi_prompt_rct);e=(e.substring(e.lastIndexOf(HASH)));if(e){return(e);}else{return(0);}}return(null)};
const axiosCallback = function(url,cbf=console.log,failcode=null){axios.get(url).then(r=>cbf(r.data)).catch(e=>cbf({status:failcode,message:e.toString(),result:null}))};/***/
const getJSON = function(url,cbf=console.log){axiosCallback(url,cbf)};
const rndKey = function(){return(web3.eth.accounts.create(web3.utils.randomHex(32)).privateKey)};//V2
const newKey = function(){return(_Promise(function(res){res(rndKey())}))};//V2*promise
const ethWallet = function(key=senderPte,save=true,walletfunc,addrprop='address',w){try{w=walletfunc(key);gsave(save,w[addrprop].toString(),key,w);return(w)}catch(e){return(log(e))}};//V201#
const keyEncrypt = function(key,pw){try{return(web3.eth.accounts.encrypt(key,pw))}catch(e){return(log(e))}};/***V2#*/
const keyDecrypt = function(keystore,pw,t){try{t=web3.eth.accounts.decrypt(keystore,pw);cleankey(t);return(t)}catch(e){return(log(e))}};//V201#
const yourWallet = function(pw,use=true,keystore=your_keystore_v3,defunc=keyDecrypt,usefunc=arouseKey,t){t=defunc(keystore,pw);if(t&&t.address&&t.privateKey){if(use){usefunc(t.privateKey)}return({address:t.address,privateKey:t.privateKey})}};/***V2#*/
const newAccSave = function(pw,use=false,out='wallet.json',cbf=console.log,alert=console.log,newaccfunc=newAccount,importkeyfunc=arouseKey){accSave(pw,use,out,cbf,alert,newaccfunc,ethKeyImport,alert,importkeyfunc)};//V201#
const newAccount = function(pw,cbf=console.log,alert=console.log,newkeyfunc=newKey,keytoaddrfunc=key2wallet,keyencfunc=keyEncrypt){newkeyfunc().then(key=>{cbf({ACCOUNT:{address:keytoaddrfunc(key),privateKey:key,keyStore:keyencfunc(key,pw)}})}).catch(e=>{alert(e.toString());cbf(null)})};//V201#
const saveKeyHex = function(key,pw,out='wallet.json',encfunc=keyEncrypt){return(saveKSFile(encfunc(key,pw),out))};//V201#
const saveKSFile = function(keystore,out){return(saveWallet({address:keystore.address,keyStore:keystore},out))};//V201
const saveWallet = function(account,out='wallet.json',alert=console.log){if(!account.address||!account.keyStore)return(alert(hi_alert_data));cleanks(account);return(writevar(account,out))};//V201#
const openWallet = function(pw,file='wallet.json',alert=console.log,open=yourWallet){try{return(open(pw,true,JSON.parse(require('fs').readFileSync(file)).keyStore))}catch(e){return(alert(e.toString()))}};/***V2#*/
const editWallet = function(pw,file,npw,out,ofunc=openWallet,enfunc=keyEncrypt,t){t=ofunc(pw,file);if(!t)return;t.keyStore=enfunc(t.privateKey,npw);if(saveWallet(t,out)){return(DONE)}else{return(log(ERROR))}};//V201#
const key2wallet = function(key){return(keyAccount(key).address)};
const keyAccount = function(key){return(web3.eth.accounts.privateKeyToAccount(key.add0x()))};/***/
const arouseKey = function(key,save=true,keytoaddrfunc=key2wallet,s){try{key=key.del0x();s=keytoaddrfunc(key);gsave(save,s,key);return([s,key])}catch(e){return(log(e))}};//V201#
const faceNonce = function(pops=10,pf='basicRate',kf='randomKey',cbf=console.log,b,k,i){ercFuncCall(pf).then(r=>{b=r;return(ercFuncCall(kf))}).then(r=>{k=r;i=Nonce(sender,num(b),num(k),1,b*pops);if(i!=0){cbf(null,i)}else{cbf(UNCHECKED,null)}})};/***nonce()***/
const femtNonce = function(pops=10,cbf=console.log){faceNonce(pops,'basicRate','randomKey',cbf)};/***/
const femtStart = function(token=TOKEN){return(startXutengFemt(maxgas,token))};//V2
const startXutengFemt = function(gas=maxgas,token=TOKEN,t){t=contracts[token];if(!t)return(null);return(startSimpleContract(gas,token,t[network].addr,abis[token]))};/***V2#*/
const startNonStdContract = function(gas=maxgas,addr,abi=ABIERC20){xutengFemt=startSimpleContract(gas,UNKNOWN,addr,abi);return(defFuncCall('decimals').then(r=>{tokenDecimals=r;return(defFuncCall('symbol'))}).then(r=>{TOKEN=r;return({TOKEN,tokenDecimals})}))};/*promise*V2*/
const startSimpleContract = function(gas=maxgas,token,addr,abi=ABIERC20){TOKEN=token;SCABI=abi;CONTRACT=contractChainInfo(addr);maxgas=gas;contractAddress=addr;xutengFemt=_Contract(SCABI,contractAddress);return(xutengFemt)};/***V2*/
const contractChainInfo = function(addr){return({[network]:{ncid:networkChainId,addr:addr}})};//V2
const ercFunc = function(funcName,sc=xutengFemt,...args){return(sc.methods[funcName](...args))};
const ercFabi = function(funcName,sc=xutengFemt,...args){return(sc.methods[funcName](...args).encodeABI())};
const ercFgas = function(funcName,sc=xutengFemt,...args){return(sc.methods[funcName](...args).estimateGas())};/*promise*/
const ercFuncCall = function(funcName,sc=xutengFemt,...args){return(ercFunc(funcName,sc,...args).call());};/*promise*/
const defFuncCall = function(funcName,...args){return(ercFuncCall(funcName,xutengFemt,...args))};/*promise*V2*/
const rawtx = function(abi,nonce,eth=0,to=null,d){d={data:abi,nonce:String(nonce).add0x(),value:s2wHex(eth),gasPrice:g2wHex(txgwei),gasLimit:toHex(maxgas),from:sender,chainId:CONTRACT[network].ncid};if(to)d.to=to;d=_Transaction(d);d.sign(_Buffer(senderPte));return(d.serialize().toString(HEX).add0x())};/***/
const txraw = function(abi,nonce,eth,to,d,p,t,r){d={nonce:String(nonce).add0x(),value:s2wHex(eth),gasPrice:g2wHex(txgwei),gasLimit:toHex(maxgas),from:sender,to:(to?to:contractAddress),chainId:CONTRACT[network].ncid};if(abi!=OxOO)d.data=abi;p=_Buffer(senderPte,HEX);t=_Transaction(d);t.sign(p);r=t.serialize().toString(HEX).add0x();return(r)};/***/
const txGas = function(){return(sendingFunc.estimateGas({from:sender,value:s2wHex(sendingEth)}))};/*promise*/
const txRaw = function(nonce){return(txraw(sendingAbi,nonce,sendingEth,0))};
const txERaw = function(nonce,to){return(txraw(OxOO,nonce,sendingEth,to))};//V2
const txCount = function(ua=sender){return(web3.eth.getTransactionCount(ua))};/*promise*/
const txSSend = function(tx){return(web3.eth.sendSignedTransaction(tx))};/*promise*/
const txESend = function(eth,to){sendingEth=eth;return(txCount().then(nonce=>{nonce=nonce.toString(16);return(txSSend(txERaw(nonce,to)))}))};/***promise***V2*/
const txSend = function(wrn=console.warn){return(txGas().then(gas=>{estgas=gas;gasfee=fromGwei(estgas*txgwei);wrn('GAS',estgas,'FEE',gasfee);return(txCount())}).then(nonce=>{nonce=nonce.toString(16);return(txSSend(txRaw(nonce)))}))};/***promise***V2*/
const ercRaws = function(sc=xutengFemt,method,args=[],eth=0){sendingFunc=sc.methods[method].apply(this,args);sendingAbi=sendingFunc.encodeABI();sendingEth=eth?eth:0;return(txSend());};/***promise***/
const ercFuncRaws = function(funcName,sc=xutengFemt,eth=0,options=null,...args){return(ercRaws(sc,funcName,args,eth))};/*promise[options:pseudo]*/
const defFuncRaws = function(funcName,eth=0,...args){return(ercFuncRaws(funcName,xutengFemt,eth,null,...args))};/*promise*V2*/
const faceSendRaw = defFuncRaws;/*promise*V2*/
const nsBlock = function(){return(web3.eth.getBlockNumber())};/*promise*/
const txGet = function(txh){return(web3.eth.getTransaction(txh))};/*promise*/
const toto = function(to,tokens){return(ercRaws(xutengFemt,'transfer',[to,s2wt(tokens)],0))};/***promise***V2*/
const rset = function(func,data,cbf,...args){cbf(`[${func}]`,...args,NEWLINE+NEWLINE,data)};
const coin = function(addr){return(web3.eth.getBalance(addr))};/***//*promise*/
const ethers = function(addr=sender,cbf=console.log){web3.eth.getBalance(addr).then(r=>rset('coinBalance',w2s(r),cbf,addr))};
const tokens = function(addr=sender,cbf=console.log,fn='balanceOf'){ercFuncCall(fn,xutengFemt,addr).then(r=>rset(fn,wt2s(r),cbf,addr))};/***V2*/
const ethersOf = function(addr=sender,cbf=console.log){web3.eth.getBalance(addr).then(r=>cbf(w2s(r)))};/***V2*Ethers()*/
const tokensOf = function(addr=sender,cbf=console.log,fn='balanceOf'){ercFuncCall(fn,xutengFemt,addr).then(r=>cbf(wt2s(r)))};/***V2*Tokens()*/
const verify = function(addr=sender,cbf=console.log){ercFuncCall('name',xutengFemt).then(r=>{cbf('[TOKEN]',r);return(ercFuncCall('totalSupply',xutengFemt))}).then(r=>{cbf('[SUPPLY]',wt2s(r));return(ercFuncCall('balanceOf',xutengFemt,addr))}).then(r=>{cbf('[USER]',addr);cbf('[BALANCE]',wt2s(r))})};/***V2*/
const dig = function(cbf=console.log,pops=20,delay=1500){console.log(hi_msg_trying);femtNonce(pops,function(err,data){if(err||data<=0)return(cbf(err,null));console.log('Nonce:',data);console.log(hi_msg_txmake,NEWLINE);setTimeout(function(){faceSendRaw('mine',0,data).then(r=>cbf(null,DONE)).catch(err=>cbf(err.toString(),null))},delay)})};/***V2#*/
const sap = function(pops=20){dig(function(err,data){if(err)return(console.log(err,NEWLINE));console.log(data,NEWLINE)},pops)};/***/
const tsap = function(dur=10,tun='M'){console.log(hi_msg_idling);setTimeout(sap,long(dur,tun))};
const isap = function(dur=10,tun='M'){console.log(hi_msg_idling);mineInterval=setInterval(sap,long(dur,tun))};/***/
const wsap = function(dur=10,loads=1000,mig=3,cb=console.log){console.log(hi_msg_idling);mineInterval=setInterval(function(){if(loads<1){clearInterval(mineInterval);return(cb(END))};cb(`${HASH}${loads}`);getLastMined(function(e,r){loads--;if(e){if(e==UNCHECKED){cb(hi_msg_nomine)}else{return(cb(e.toString()))}};if(s2n(mindif(r))<mig){return(cb(IGNORE))};sap()})},long(dur))};/***/
const Func = function(func,sc=xutengFemt){return(sc.methods[func])};/***/
const getLastMined = function(cbf=console.log,LP='lastProof',RS='rewardStamp'){if(Func(LP))ercFuncCall(LP).then(r=>{return(cbf(null,r))}).catch(e=>{return(cbf(e.toString(),null))});else{if(Func(RS))ercFuncCall(RS).then(r=>{return(cbf(null,r))}).catch(e=>{return(cbf(e.toString(),null))});else{return(cbf(UNCHECKED,null))}}};/***/
const faceAutoMine = function(pause=10,times=1000,lengthen=3){wsap(pause,times,lengthen,function(msg){console.log(msg)})};/***/
const faceIdleMine = function(pause=10){tsap(pause,'M')};/***/
const faceMuteMine = function(pause=10){isap(pause,'M')};/***/
const faceTokenSell = function(refno,tokens,price,cbf=console.log,timestamp=0,weitok,weippe){weitok=s2wt(tokens);weippe=s2w(price);if(weippe.le(0))return(cbf(alert_bad_ppcoin));defFuncCall('markets',refno).then(r=>{if(r.maker!=ZEROADDR)_Error(alert_bad_itemno);return(defFuncCall('balanceOf',sender))}).then(r=>{if(r.toString().lt(weitok))_Error(alert_bad_volume);return(defFuncCall('totalSupply'))}).then(r=>{if(r.toString().le(weippe))_Error(alert_bad_wprice);defFuncRaws('post',0,refno,weitok,weippe,timestamp)}).then(cbf).catch(e=>cbf(e.toString()))};//V2
const faceEtherSell = function(refno,ethers,price,cbf=console.log,timestamp=0,weieth,weippe){weieth=s2w(ethers);;weippe=s2w(price);if(weippe.le(0))return(cbf(alert_bad_ppcoin));defFuncCall('markets',refno).then(r=>{if(r.maker!=ZEROADDR)_Error(alert_bad_itemno);;;;;;;;;;;;;;;;;;;;return(coin(sender))}).then(r=>{if(r.toString().lt(weieth))_Error(alert_bad_amount);return(defFuncCall('totalSupply'))}).then(r=>{if(r.toString().le(weippe))_Error(alert_bad_wprice);defFuncRaws('post',ethers,refno,0,weippe,timestamp)}).then(cbf).catch(e=>cbf(e.toString()))};//V2

const tonRefresh = function(cbf=console.log){tonAccess.getHttpEndpoint().then(r=>{ton_rpc_server_endpoint=r;your_ton_rpc_api_key='';cbf(r)})};//V2
const tonSeedsToKey = function(seeds){if(typeof(seeds)==='string')seeds=seeds.clear().array();return(tonNewKey(seeds))};/***promise***V2*/
const tonNewSeeds = function(){return(tonCrypto.mnemonicNew())};/***promise***V2*/
const tonNewPair = function(seeds){if(seeds)return(tonCrypto.mnemonicToPrivateKey(seeds));return(tonNewSeeds().then(r=>{return(tonCrypto.mnemonicToPrivateKey(r))}))};/***promise***V2*/
const tonNewKey = function(seeds){return(tonNewPair(seeds).then(r=>{return(r.secretKey.toString('hex'))}))};/***promise***V2*/
const tonKeyToPair = function(key=senderPte){if(typeof(key)==='string')key=_Buffer(key);return(tonCrypto.keyPairFromSecretKey(key))};//V2
const tonKeyToWallet = function(key=senderPte,workchain=0,w){w=ton[ton_wallet_version].create({workchain,publicKey:tonKeyToPair(key).publicKey});return(tonClient.open(w))};//V2
const tonKey2Wallet = function(key){return(tonKeyToWallet(key).address.toString())};//V2
const tonKeyEncrypt = function(key,pw,t){t=keyEncrypt(key,pw);if(!t)return;t.address=tonKey2Wallet(key);return(t)};//V2
const tonKeyDecrypt = function(keystore,pw,t){t=keyDecrypt(keystore,pw);if(!t)return;del0x(t);t.address=tonKey2Wallet(t.privateKey);return(t)};//V201#
const tonArouseKey = function(key,save=true,w=arouseKey(key,save,tonKey2Wallet)){if(save)tonWallet();return(w)};//V201#
const yourTonWallet = function(pw,use=true,keystore=your_ton_keystore_v3){return(yourWallet(pw,use,keystore,tonKeyDecrypt,tonArouseKey))};//V2
const tonNewAccSave = function(pw,use=false,out='tonwallet.json',cbf=console.log,alert=console.log,k){return(newAccSave(pw,use,out,cbf,alert,tonNewAccount,tonArouseKey))};//V2
const tonNewAccount = function(pw,cbf=console.log,alert=console.log){newAccount(pw,cbf,alert,tonNewKey,tonKey2Wallet,tonKeyEncrypt)};//V2
const tonSaveKeyHex = function(key,pw,out='tonwallet.json'){return(saveKeyHex(key,pw,out,tonKeyEncrypt))};//V2
const tonOpenWallet = function(pw,file='tonwallet.json',alert=console.log){return(openWallet(pw,file,alert,yourTonWallet))};//V2#
const tonEditWallet = function(pw,file,npw,out){return(editWallet(pw,file,npw,out,tonOpenWallet,tonKeyEncrypt))};//V2
const tonWallet = function(key=senderPte,save=true){return(ethWallet(key,save,tonKeyToWallet,'address'))};//V2
const tonTxSend = function(coins,to,data,wallet=senderAcc){return(tonTxRaw(wallet,coins,to,data).then(tx=>{return(tonSend(tx,wallet))}))};//V2*promise*
const tonTxRaw = function(wallet,coins,to,data,key=senderPte){return(wallet.getSeqno().then(seqno=>{return(wallet.createTransfer({seqno,secretKey:_Buffer(key),messages:[ton.internal({value:String(coins),to:to,body:data})]}))}))};//V2*promise*
const tonCoin = function(wallet=senderAcc){return(wallet.getBalance())};//V2*promise*
const tonSend = function(tx,wallet=senderAcc){return(wallet.send(tx))};//V2*promise*
const toncoin = function(addr){return(tonClient.getBalance(addr))};//V2*promise*
const tons = function(cbf=console.log){tonCoin().then(r=>cbf(nano2s(r)))};//V2
const tonsOf = function(addr=sender,cbf=console.log){toncoin(addr).then(r=>cbf(nano2s(r)))};//V2
const tonavalid = function(addr,tw=_Tonweb()){try{return(tonRegex.test(tw.a2h(addr)))}catch(e){return(false)}};//V2
const tonwebLoad = function(lib='tonweb'){tonweb=require(lib)};//V2
const tonapiLoad = function(lib='./tonapi'){tonapi=require(lib)};//V2
const Tonweb = function(rpc,api){if(!tonweb)tonwebLoad();this.Tonweb=tonweb;this.tonweb=_TonWebClient(rpc,api);
 this.parseCell=function(addr,c){c=this.cell();if(addr)c.bits.writeAddress(this.address(addr));return(c)};
 this.parseAddress=function(cell,n=readIntFromBitString(cell.bits,3,8),hashPart=readIntFromBitString(cell.bits,3+8,256),s){if(n>BigInt(127)){n=n-BigInt(256)};if(n.toString(10)+':'+hashPart.toString(16)==='0:0')return(null);s=n.toString(10)+':'+hashPart.toString(16).padStart(64,'0');return(this.address(s))};
 this.toJettonWallet=async(owner_addr,minter_addr,cell=this.parseCell())=>{cell.bits.writeAddress(this.address(owner_addr));return(this.wallet(this.parseAddress(await(this.tonweb.provider.call2(minter_addr.toString(),'get_wallet_address',[['tvm.Slice',(0,this.tonweb.utils.bytesToBase64)(await(cell.toBoc(false)))]])))))};//promise
 this.toJettonWallet2=async(owner_addr,minter_addr)=>{return(this.wallet(await(this.minter(minter_addr).getJettonWalletAddress(this.address(owner_addr)))))};//promise
 this.getJettonSupply=async(minter_addr,fmt=nano2s/*String*/)=>{return(fmt((await(this.minter(minter_addr).getJettonData())).totalSupply))};//promise
 this.getJettonDataSet=async(owner_addr,minter_addr,full=true,w,r)=>{w=await(this.toJettonWallet2(owner_addr,minter_addr));r=await(w.getData());if(full)return({wallet:w,data:r});return({wallet:{address:w.address.toString()},data:{balance:r.balance.toString(),owner:r.ownerAddress.toString(),minter:r.jettonMinterAddress.toString()}})};//promise
 this.getJettonAllAddr=async(owner_addr,minter_addr,func='a2b',d)=>{d=await(this.getJettonDataSet(owner_addr,minter_addr,false));return({owner_aka_user:this[func](d.data.owner),minter_aka_token:this[func](d.data.minter),jetton_aka_account:this[func](d.wallet.address)})};//promise
 this.getJettonAddress=async(owner_addr,minter_addr,func='a2b',d)=>{d=await(this.getJettonDataSet(owner_addr,minter_addr,false));if(d.data.minter!==(this.address(minter_addr).toString(false)))return(null);return(this[func](d.wallet.address))};//promise
 this.getJettonBalance=async(owner_addr,minter_addr,fmt=nano2s/*String*/)=>{return(fmt((await(this.getJettonDataSet(owner_addr,minter_addr,false))).data.balance))};//promise
 this.minter=function(minter_addr){return(new this.Tonweb.token.jetton.JettonMinter(this.tonweb.provider,{address:minter_addr}))};
 this.wallet=function(addr){return(new this.Tonweb.token.jetton.JettonWallet(this.tonweb.provider,{address:addr}))};
 this.address=function(addr){return(new this.Tonweb.utils.Address(addr))};
 this.cell=function(){return(new this.Tonweb.boc.Cell())};
 this.a2h=function(addr){return(this.address(addr).toString(0,0,1,0))};
 this.a2b=function(addr){return(this.address(addr).toString(1,1,1,0))};
 this.a2n=function(addr){return(this.address(addr).toString(1,1,0,0))};
};//V2*class
const Tonapi = function(rpc,api){if(!tonapi)tonapiLoad();this.Tonapi=tonapi;this.tonapi=_TonApiClient(rpc,api);
 this.getAddrEvents=async(addr,limit=20)=>{return(await(this.tonapi.accounts.getAccountEvents(addr,{limit})))};//promise
 this.getJettonInfo=async(addr)=>{return(await(this.tonapi.jettons.getJettonInfo(addr)))};//promise
};//V2*class
const tonEvents = function(addr,limit=20,ta=_Tonapi()){return(ta.getAddrEvents(addr,limit))};//V2*promise
const jettonMemo = function(tag){return(_Uint8([..._Uint8(4),..._Encoder().encode(tag)]))};//V201
const jettonWallet = function(owner_addr,minter_addr,tw=_Tonweb()){return(tw.toJettonWallet2(owner_addr,minter_addr))};//V2*promise
const jettonAddress = function(addr,tw=_Tonweb()){return(tw.address(addr))};//V2
const jettonMetadata = function(minter_addr,ta=_Tonapi()){return(ta.getJettonInfo(minter_addr))};//V2*promise
const jettonMetaData = function(minter_addr){return(jettonMetadata(minter_addr).then(data=>{TOKEN=data.metadata.symbol;tokenDecimals=data.metadata.decimals;return(data)}))};//V2*promise
const jettonWCWallet = function(key=senderPte,version=jetton_wallet_version,tw,WC,w){tw=_TonWebClient();WC=tw.wallet.all[version];w=tonWallet(key,key===senderPte);return(new WC(tw.provider,{publicKey:w.publicKey}))};//V2
const jettonDecimals = function(tokenaddr){return(jettonMetaData(tokenaddr).then(r=>{return(r.metadata.decimals)}))};//V2*promise
const jettonBalanceOf = function(tokenaddr,useraddr=sender,show='ui',tw=_Tonweb()){return(jettonMetaData(tokenaddr).then(r=>{return(tw.getJettonBalance(useraddr,tokenaddr,String))}).then(r=>{if(show!=='ui')return(r);return(pen2s(r,tokenDecimals))}))};//V2*promise
const jettonTxSend = async(tokenaddr,to,tokens,coins=0.03,fwdcoins=0,tag='',tx=null)=>{tx=await(jettonTxRaw(tokenaddr,to,tokens,coins,fwdcoins,tag));return(await(tx.send()))};//V2*promise
const jettonTxBody = async(owner_addr,minter_addr,to,tokens,fwdcoins=0,tag='',md=null,ta=null)=>{md=await(jettonMetaData(minter_addr));ta=await(jettonWallet(owner_addr,minter_addr));return(await(ta.createTransferBody({jettonAmount:s2pen(String(tokens),tokenDecimals),toAddress:_TonAddress(to),forwardAmount:s2nano(String(fwdcoins)),forwardPayload:jettonMemo(tag),responseAddress:_TonAddress(owner_addr)})))};//V201*promise
const jettonTxRaw = async(tokenaddr,to,tokens,coins=0.03,fwdcoins=0,tag='',key=senderPte,mode=3,user,tw,uw,kp,sn)=>{user=tonKey2Wallet(key);tw=await(jettonWallet(user,tokenaddr));uw=await(jettonWCWallet(key));if((await(uw.getAddress())).toString(1,1,1)!==user)return(null);sn=await(uw.methods.seqno().call());kp=tonKeyToPair(key);return(await(uw.methods.transfer({secretKey:kp.secretKey,toAddress:tw.address,amount:s2nano(String(coins)),seqno:sn,payload:await(jettonTxBody(user,tokenaddr,to,tokens,fwdcoins,tag)),sendMode:mode})))};//V2*promise

const solNewKey = function(){return(_Promise(function(res){res(solNewPair().secretKey.toString('hex'))}))};//V2*promise
const solNewPair = function(key,func=_SolAccount){if(!key)return(func());if(typeof(key)==='string')key=_Buffer(key);return(func(key))};//V2
const solAccount = function(key,p){p=solNewPair(key);return({address:p.publicKey.toString(),privateKey:p.secretKey.toString('hex')})};//V2
const solKeyToWallet = function(key=senderPte){return(solNewPair(key))};//V2
const solKey2Wallet = function(key){return(solAccount(key).address)};//V2
const solKeyEncrypt = function(key,pw,t){t=keyEncrypt(key,pw);if(!t)return;t.address=solKey2Wallet(key);return(t)};//V2
const solKeyDecrypt = function(keystore,pw,t){t=keyDecrypt(keystore,pw);if(!t)return;del0x(t);t.address=solKey2Wallet(t.privateKey);return(t)};//V201#
const solArouseKey = function(key,save=true,w=arouseKey(key,save,solKey2Wallet)){if(save)solWallet();return(w)};//V201#
const yourSolWallet = function(pw,use=true,keystore=your_sol_keystore_v3){return(yourWallet(pw,use,keystore,solKeyDecrypt,solArouseKey))};//V2
const solNewAccSave = function(pw,use=false,out='solwallet.json',cbf=console.log,alert=console.log,k){return(newAccSave(pw,use,out,cbf,alert,solNewAccount,solArouseKey))};//V2
const solNewAccount = function(pw,cbf=console.log,alert=console.log){newAccount(pw,cbf,alert,solNewKey,solKey2Wallet,solKeyEncrypt)};//V2
const solSaveKeyHex = function(key,pw,out='solwallet.json'){return(saveKeyHex(key,pw,out,solKeyEncrypt))};//V2
const solOpenWallet = function(pw,file='solwallet.json',alert=console.log){return(openWallet(pw,file,alert,yourSolWallet))};//V2
const solEditWallet = function(pw,file,npw,out){return(editWallet(pw,file,npw,out,solOpenWallet,solKeyEncrypt))};//V2
const solWallet = function(key=senderPte,save=true){return(ethWallet(key,save,solKeyToWallet,'publicKey'))};//V2
const solTxSend = function(coins,to){return(solanaWeb3.sendAndConfirmTransaction(solClient,solTxRaw(coins,to),[solNewPair(senderPte)]))};//V2*promise*
const solTxRaw = function(coins,to,from=sender){return(_SolTx().add(solanaWeb3.SystemProgram.transfer({fromPubkey:_SolPublKey(from),toPubkey:_SolPublKey(to),lamports:s2nano(coins)})))};//V2
const solcoin = function(addr){return(solClient.getBalance(_SolPublKey(addr)))};//V2*promise*
const sols = function(cbf=console.log){solcoin(sender).then(r=>cbf(nano2s(r)))};//V2
const solsOf = function(addr=sender,cbf=console.log){solcoin(addr).then(r=>cbf(nano2s(r)))};//V2
const solavalid = function(addr){try{return(SolPublKey.isOnCurve(_SolPublKey(addr)))}catch(e){return(false)}};//V2
const solLastBlockHash = function(client=solClient){return(client.getLatestBlockhash('confirmed'))};//V2*promise
const solTokenMetadata = function(tokenaddr,client=solClient,x,m,a){x=Metaplex.make(client);m=_SolPublKey(tokenaddr);a=x.nfts().pdas().metadata({mint:m});return(client.getAccountInfo(a).then(r=>{if(r)return(x.nfts().findByMint({mintAddress:m}));return(null)}))};//V2*promise
const solTokenMetaData = function(tokenaddr,client=solClient){return(solTokenMetadata(tokenaddr,client).then(r=>{if(r)return({name:r.name,symbol:r.symbol,decimals:r.mint.decimals,supply:num(r.mint.supply.basisPoints),account:r.metadataAddress.toString()});return(r)}))};//V2*promise
const solTokenDecimals = function(tokenaddr,client=solClient){return(client.getParsedAccountInfo(_SolPublKey(tokenaddr)).then(info=>{tokenDecimals=(info.value?.data).parsed.info.decimals;return(tokenDecimals)}))};//V2*promise
const solTokenBalanceOf = function(tokenaddr,useraddr=sender,show='uiAmount'){return(solTokenAssociatedAccount(tokenaddr,useraddr).then(r=>{return(solTokenInformation(r.address.toString()))}).then(r=>{return(r.value?r.value[show]:0)}))};//V2*promise
const solTokenInformation = function(account_address,client=solClient){return(client.getTokenAccountBalance(_SolPublKey(account_address)).then(r=>{return(r)}))};//V2*promise
const solTokenAssociatedAccount = function(tokenaddr,destaddr,wallet=senderAcc,client=solClient){return(solanaSPL.getOrCreateAssociatedTokenAccount(client,wallet,_SolPublKey(tokenaddr),solavalid(destaddr)?_SolPublKey(destaddr):wallet.publicKey))};//V2*promise
const solTokenSendingTxUnsigned = function(from_token_account,to_token_account,tokens,decimals=tokenDecimals,wallet=senderAcc,tx=_SolTx()){tx.add(solanaSPL.createTransferInstruction(from_token_account.address,to_token_account.address,wallet.publicKey,s2pen(tokens,decimals)));return(tx)};//V2

const soltoto = function(tokenaddr,to,tokens,wallet=senderAcc,client=solClient,md=null,fa=null,ta=null,lb=null,tx=null){return(solTokenMetaData(tokenaddr,client)
.then(r=>{md=r;tokenDecimals=md.decimals;console.log('Token:',md.symbol,'Decimals:',md.decimals);return(solTokenAssociatedAccount(tokenaddr,null,wallet,client))})
.then(r=>{fa=r;console.log('Source Account:',r.address.toString());return(solTokenAssociatedAccount(tokenaddr,to,wallet,client))})
.then(r=>{ta=r;console.log('Target Account:',r.address.toString());tx=solTokenSendingTxUnsigned(fa,ta,tokens,md.decimals,wallet);return(solLastBlockHash(client))})
.then(r=>{lb=r.blockhash;console.log('LastBlockHash:',lb);tx.recentBlockhash=lb;return(solanaWeb3.sendAndConfirmTransaction(client,tx,[wallet]))}))};//V2*promise

const cryptoLoad = function(lib='send-crypto'){crypto=require(lib)};//V201
const Crypto = function(asset=COIN,key=senderPte){try{if(!crypto)cryptoLoad();
 this.Crypto = crypto;
 this.asset = asset.toUpperCase();
 this.account = _CryptoAccount(key);cryptoClient=this.account;
 this.address = function(options){return(this.account.address(this.asset,options))};//promise
 this.balance = function(options){return(this.account.balanceOf(this.asset,options))};//promise
 this.getCoin = function(options){return(this.account.balanceOfInSats(this.asset,options))};//promise
 this.setCoin = function(pennies,to,options){return(this.account.sendSats(to,pennies,this.asset,options))};//promise
 this.send = function(coins,to,options){return(this.account.send(to,coins,this.asset,options))};//promise
}catch(e){log(e)}};//V201*class
const bitPair = async(pair,asset=COIN)=>{if(!pair)return;del0x(pair);pair.address=await(bitAddr(pair.privateKey,asset))};//V201*promise
const bitAddr = async(key,asset=COIN,cw=null)=>{try{cw=_Crypto(asset,key);return(await(cw.address()))}catch(e){return(log(e))}};//V201*promise
const bitKeyEncrypt = async(key,pw,asset=COIN,t)=>{t=keyEncrypt(key,pw);if(!t)return;t.address=await(bitAddr(key,asset));return(t)};//V201*promise
const bitKeyDecrypt = async(keystore,pw,asset=COIN,t)=>{t=keyDecrypt(keystore,pw);if(!t)return;del0x(t);t.address=await(bitAddr(t.privateKey,asset));return(t)};//V201*promise
const yourBitWallet = async(pw,use=true,keystore=your_btc_keystore_v3,asset=COIN,t)=>{t=await(bitKeyDecrypt(keystore,pw,asset));if(!t)return;if(use){await(bitArouseKey(t.privateKey,1,asset))}return({address:t.address,privateKey:t.privateKey})};//V201*promise
const bitNewAccSave = function(pw,use=false,out='bitwallet.json',cbf=console.log,alert=console.log,asset=COIN){accSave(pw,use,out,cbf,alert,bitNewAccount,bitKeyImport,asset,asset)};//V201
const bitNewAccount = function(pw,cbf=console.log,asset=COIN){newAccount(pw,function(t){if(!t)return(cbf(null));del0x(t.ACCOUNT);(async()=>{try{t.ACCOUNT.address=await(bitAddr(t.ACCOUNT.privateKey,asset));cbf(t)}catch(e){log(e);cbf(null)}})()})};//V201
const bitSaveKeyHex = async(key,pw,out='bitwallet.json',asset=COIN)=>{return(saveKSFile(await(bitKeyEncrypt(key,pw,asset)),out))};//V201*promise
const bitOpenWallet = async(pw,file='bitwallet.json',asset=COIN,k=openWallet(pw,file)?.privateKey)=>{try{if(k)return(arr2acc(await(bitArouseKey(k,1,asset))))}catch(e){return(log(e))}};//V201*promise
const bitEditWallet = async(pw,file,npw,out,asset=COIN,t)=>{t=await(bitOpenWallet(pw,file,asset));if(!t)return;t.keyStore=await(bitKeyEncrypt(t.privateKey,npw,asset));if(saveWallet(t,out)){return(DONE)}else{return(log(ERROR))}};//V201*promise
const bitArouseKey = async(key,save=true,asset=COIN,s)=>{try{key=key.del0x();s=await(bitAddr(key,asset));gsave(save,s,key,_Crypto(asset,key));if(save)COIN=asset;return([s,key])}catch(e){return(log(e))}};//V201*promise
const bitWallet = async(key=senderPte,save=true,asset=COIN)=>{return(bitArouseKey(key,save,asset))};//V201*promise
const bitavalid = function(addr){return(btcRegex.test(addr)||bchRegex.test(addr))};//V201
const bitSend = function(coins,to,key=senderPte,asset=COIN,cw=_Crypto(asset,key)){return(cw.send(coins,to))};//V201*promise
const bitcoin = function(addr,key=senderPte,asset=COIN,cw=_Crypto(asset,key)){return(cw.getCoin({address:addr}))};//V201*promise
const bitsOf = function(addr=sender,cbf=console.log){bitcoin(addr).then(r=>cbf(sat2s(r)))};//V201
const bits = function(cbf=console.log){bitcoin(sender).then(r=>cbf(sat2s(r)))};//V201

const accSave = function(pw,use=false,out='wallet.json',cbf=console.log,alert=console.log,nafunc,kifunc,auxvar,fvar,key=null){nafunc(pw,function(acc){if(!acc)return(cbf(null));key=acc.ACCOUNT.privateKey;if(saveWallet(acc.ACCOUNT,out,alert)){cbf(acc);if(use){keyImport(kifunc,fvar,key,alert)}else{alert(IGNORE)}}else{cbf(null)}},auxvar)};//V201
const keyImport = function(func,asset/*[newaccfunc][COIN]*/,key,alert){if(typeof(asset)==='function'){func(asset,key,alert)}else{func(key,1,asset,alert)}};//V201
const bitKeyImport = function(key,use,asset,alert){(async()=>{if(await(bitArouseKey(key,use,asset))){alert(DONE)}else{alert(ERROR)}})()};//V201
const ethKeyImport = function(importkeyfunc,key,alert){if(importkeyfunc(key)){alert(DONE)}else{alert(ERROR)}};//V201

//exports

(function(root){
  root.die = function(e){_Exit(e.toString())};//V2
  root.app = {
    cliArgument: cliArgument,
    cliFlagArgv: cliFlagArgv,
  };
  root.msg = {
    hi_msg_comeon: hi_msg_comeon,
    hi_msg_dsaved: hi_msg_dsaved,
    hi_msg_newpwd: hi_msg_newpwd,
    hi_msg_oldpwd: hi_msg_oldpwd,
    hi_msg_repeat: hi_msg_repeat,
    hi_prompt_chk: hi_prompt_chk,
  };
  root.ui = {
    COIN: COIN,
    DONE: DONE,
    FAILED: FAILED,
    NEWLINE: NEWLINE,
    SPACE: SPACE,
    hiRegex: hiRegex,
    loRegex: loRegex,
    nillWallet: ZEROADDR,//V2
    burnWallet: FAILADDR,//V2
    YELLOW: YELLOW,//V2
    GREEN: GREEN,//V2
    WHITE: WHITE,//V2
  };
  root.util = {
    n2s: n2s,
    s2n: s2n,
    w2s: w2s,
    s2w: s2w,
    byt: byt,
    num: num,
    now: nowDate,//V2
    w2n: fromWei,//V2
    s2wt: s2wt,//V2
    wt2s: wt2s,//V2
    s2pen: s2pen,//V2
    pen2s: pen2s,//V2
    time: stamp,//V2
    date: utcsDate,//V2
    isAddress: avalid,//V2
    isHash: hvalid,//V2
    client: function(){return(web3)},//V2
    getTokenDecimals: function(){return(tokenDecimals)},//V2
    setTokenDecimals: function(dec){tokenDecimals=dec},//V2
  };
  root.exit = {
    out: function(msg){_Exit(msg)},//V2
    nocoin: function(){_Exit(hi_msg_nocoin)},
    nodata: function(){_Exit(hi_alert_data)},//V2
    cancel: function(){_Exit(CANCELED)},
  };
  root.asset = {
    abis: abis,
    contracts: contracts,
    contract: function(){return(xutengFemt)},
    set: function(symbol,abi,contract){abis[symbol]=abi;contracts[symbol]=contract},//V2
    get: function(symbol){return([abis[symbol],contracts[symbol]])},//V2
  };
  root.chain = {
    maxgas: maxgas,
    txgwei: txgwei,
    estgas: estgas,
    gasfee: gasfee,
  };
  root.network = {//V2
    maxgas: function(){return(maxgas)},
    txgwei: function(){return(txgwei)},
    estgas: function(){return(estgas)},
    gasfee: function(){return(gasfee)},
    setGas: function(gas){maxgas=gas},//
    setGwei: function(gwei){txgwei=gwei},//
    getSymb: function(){return(COIN)},//V201#
    setSymb: function(symb){COIN=symb},//V201#
    getChain: function(){return({network,networkChainId,rpc_server_endpoint})},//
    setChain: function(name,id,endpoint){network=name,networkChainId=id,rpc_server_endpoint=endpoint},//
    reset: function(rpc){web3=_web3(rpc)},//
  };
  root.account = {
    keyEncrypt: keyEncrypt,//V2
    keyDecrypt: keyDecrypt,//V2
    yourWallet: yourWallet,
    newAccSave: newAccSave,
    newAccount: newAccount,
    saveKeyHex: saveKeyHex,
    saveWallet: saveWallet,
    openWallet: openWallet,
    editWallet: editWallet,//V2
    arouseKey: arouseKey,
    import: arouseKey,
  };
  root.data = {
    getInput: getInput,
    verify: verify,
    ethers: ethers,//V201
    tokens: tokens,//V201
    tx2: rawtx,//V201#
    tx: txraw,//V2
  };
  root.user = {
    account: function(){return(senderAcc)},
    address: function(){return(sender)},
    getCoin: coin,//promise
    ethers: ethersOf,
    tokens: tokensOf,
    transferEther: txESend,//V2*promise
    transferToken: toto,//V2*promise
  };
  root.token = {
    simpleConnect: startSimpleContract,//V2
    nonStdConnect: startNonStdContract,//V2
    faceConnect: startXutengFemt,
    faceNonce: faceNonce,
    femtNonce: femtNonce,
    getLastMined: getLastMined,
    faceAutoMine: faceAutoMine,
    faceIdleMine: faceIdleMine,
    faceMuteMine: faceMuteMine,
    faceAsk: faceTokenSell,//V2
    faceBid: faceEtherSell,//V2
    toAsk: faceTokenSell,//V2
    toBid: faceEtherSell,//V2
    start: femtStart,//V2
    call: defFuncCall,//V2*promise
    send: defFuncRaws,//V2*promise
    auto: wsap,//V2
    dig: dig,//V2
  };
  root.toncoin = {//V2
    util: {
      w2s: nano2s,
      s2w: s2nano,
      isAddress: tonavalid,
      address2: jettonAddress,//require:none
      address: _TonAddress,//require:tonweb
      TonWeb: Tonweb,//class
      TonApi: Tonapi,//class
      tonweb: _Tonweb,//new_class#V201
      tonapi: _Tonapi,//new_class#V201
      client: function(){return(tonClient)},
    },
    network: {
      refresh: tonRefresh,
      getChain: function(){return(ton_rpc_server_endpoint)},
      setChain: function(endpoint){ton_rpc_server_endpoint=endpoint},
      getVersion: function(){return(ton_wallet_version)},
      setVersion: function(version){ton_wallet_version=version},
      reset: function(rpc){tonClient=_ton(rpc)},
    },
    account: {
      key2pair: tonKeyToPair,
      newSeeds: tonNewSeeds,//promise
      seeds2Key: tonSeedsToKey,//promise
      keyEncrypt: tonKeyEncrypt,
      keyDecrypt: tonKeyDecrypt,
      yourWallet: yourTonWallet,
      newAccSave: tonNewAccSave,//CBF
      newAccount: tonNewAccount,//CBF
      saveKeyHex: tonSaveKeyHex,
      openWallet: tonOpenWallet,
      editWallet: tonEditWallet,
      arouseKey: tonArouseKey,
      import: tonArouseKey,
      wallet: tonWallet,
      jetton: jettonWCWallet,
    },
    data: {
      tx: tonTxRaw,//promise
      tons: tons,
      events: tonEvents,//promise
    },
    user: {
      getCoin: toncoin,//promise
      tons: tonsOf,
      transferTon: tonTxSend,//promise
      transferToken: jettonTxSend,//promise
    },
    token: {
      data: jettonMetaData,//promise
      balance: jettonBalanceOf,//promise
      decimals: jettonDecimals,//promise
      account: jettonWallet,//promise
      tb: jettonTxBody,//promise
      tx: jettonTxRaw,//promise
    },
  };
  root.solana = {//V2
    util: {
      w2s: nano2s,
      s2w: s2nano,
      isAddress: solavalid,
      client: function(){return(solClient)},
    },
    network: {
      getChain: function(){return(sol_rpc_server_endpoint)},
      setChain: function(endpoint){sol_rpc_server_endpoint=endpoint},
      reset: function(rpc){solClient=_sol(rpc)},
    },
    account: {
      pair: solNewPair,//[buff]
      newKey: solNewKey,//promise
      newPair: solAccount,//[str]
      keyEncrypt: solKeyEncrypt,
      keyDecrypt: solKeyDecrypt,
      yourWallet: yourSolWallet,
      newAccSave: solNewAccSave,//CBF
      newAccount: solNewAccount,//CBF
      saveKeyHex: solSaveKeyHex,
      openWallet: solOpenWallet,
      editWallet: solEditWallet,
      arouseKey: solArouseKey,
      import: solArouseKey,
      wallet: solWallet,
    },
    data: {
      tx: solTxRaw,
      sols: sols,
      lbHash: solLastBlockHash,//promise
    },
    user: {
      getCoin: solcoin,//promise
      sols: solsOf,
      transferSol: solTxSend,//promise
      transferToken: soltoto,//promise
    },
    token: {
      data: solTokenMetaData,//promise
      info: solTokenInformation,//promise
      balance: solTokenBalanceOf,//promise
      decimals: solTokenDecimals,//promise
      metadata: solTokenMetadata,//promise
      account: solTokenAssociatedAccount,//promise
      tx: solTokenSendingTxUnsigned,
    },
  };
  root.bitcoin = {//V201
    util: {
      w2s: sat2s,
      s2w: s2sat,
      isAddress: bitavalid,
      Crypto: Crypto,//class
      crypto: _Crypto,//new_class
      client: function(){return(crypto)},
      account: function(){return(cryptoClient)},
    },
    network: {
      getSymb: root.network.getSymb,
      setSymb: root.network.setSymb,
    },
    account: {
      keyEncrypt: bitKeyEncrypt,//promise
      keyDecrypt: bitKeyDecrypt,//promise
      yourWallet: yourBitWallet,//promise
      newAccSave: bitNewAccSave,//CBF
      newAccount: bitNewAccount,//CBF
      saveKeyHex: bitSaveKeyHex,//promise
      openWallet: bitOpenWallet,//promise
      editWallet: bitEditWallet,//promise
      arouseKey: bitArouseKey,//promise
      import: bitArouseKey,//promise
      wallet: bitWallet,//promise
    },
    data: {
      bits: bits,
    },
    user: {
      getCoin: bitcoin,//promise
      bits: bitsOf,
      transfer: bitSend,//promise
    },
  };
  require("./project").wallet();
}(this));
