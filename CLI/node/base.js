//
//CONFIGS
//
require("dotenv").config();
require("./consts.js");
require("./captions.js");
require("./constructors.js");
require("./contracts.js");
require("./commons.js");
require("./entries.js");
require("./forms.js");
require("./funcs.js");
//
//CLASSES
//
let Web3 = require("web3");
let axios = require("axios");
let Tx = require("ethereumjs-tx");
let web3 = new Web3();
//
//EXPORT
//
(function(){
 this.your_keystore_v3 = process.env.YOUR_KEYSTORE_V3;
 this.your_rpc_api_key = process.env.YOUR_RPC_API_KEY;
 this.rpc_server_endpoint = process.env.RPC_SERVER_ENDPOINT;
 this.byt = function(hex){return(web3.utils.hexToBytes(hex))};
 this.num = function(hex){return(web3.utils.hexToNumberString(hex))};
 this.kek = function(sender,key,nonce){return(web3.utils.keccak256(web3.eth.abi.encodeParameters(['uint256','uint256','uint256'],[num(sender),key,nonce])))};
 this.b2i = function(hex,n,i){n=big(0);hex=byt(hex);for(i=0;i<hex.length;i++){n=n.add(big(hex[i]).mul(big(16).pow(big(i*2)).add(big(1))))};return(n.toString())};
 this.Nonce = function(sender,base,key,min,max,i,m){base=num(base);key=num(key);m=big(key).mod(big(base)).toString();for(i=min;i<=max;i++){if(m==big(b2i(kek(sender,key,i))).mod(big(base)).toString()){return(i)}}return(0)};/***/
 this._Web3 = function(){return(new Web3())};
 this._Ethereum = function(provider){return(new Web3(provider))};
 this._Provider = function(rpc){return(new Web3.providers.HttpProvider(rpc))};
 this._Transaction = function(dat){return(new Tx(dat))};
 this.web3 = _Ethereum(_Provider(rpc_server_endpoint));
 this.axios = axios;
 this.Web3 = Web3;
 this.Tx = Tx;
})();