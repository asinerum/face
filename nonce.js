importScripts('./_web3js.js');
let web3 = new Web3();
////////////////////////////////////////////////////////////
const big=function(val){return(new web3.utils.BN(val))};
String.prototype.t2e=function(tpe){return(s2n(this)/s2n(tpe))};/*tpe=pcv=pcp*/
String.prototype.e2t=function(tpe){return(s2n(tpe)*s2n(this))};/*tpe=pcv=pcp*/
String.prototype.p2w=function(ppe){return(String(10**18).mul(this.toString()).div(String(ppe)))};
String.prototype.w2p=function(ppe){return(String(ppe).mul(this.toString()).div(String(10**18)))};
String.prototype.add=function(bnum){return(big(this.toString()).add(big(bnum)).toString())};
String.prototype.div=function(bnum){return(big(this.toString()).div(big(bnum)).toString())};
String.prototype.mod=function(bnum){return(big(this.toString()).mod(big(bnum)).toString())};
String.prototype.mul=function(bnum){return(big(this.toString()).mul(big(bnum)).toString())};
String.prototype.pow=function(bnum){return(big(this.toString()).pow(big(bnum)).toString())};
String.prototype.sus=function(bnum){return(big(this.toString()).sub(big(bnum)).toString())};
String.prototype.eq=function(bnum){return(big(this.toString()).eq(big(bnum)))};
String.prototype.ge=function(bnum){return(big(this.toString()).gte(big(bnum)))};
String.prototype.gt=function(bnum){return(big(this.toString()).gt(big(bnum)))};
String.prototype.le=function(bnum){return(big(this.toString()).lte(big(bnum)))};
String.prototype.lt=function(bnum){return(big(this.toString()).lt(big(bnum)))};
////////////////////////////////////////////////////////////
const byt=function(hex){return(web3.utils.hexToBytes(hex))};
const num=function(hex){return(web3.utils.hexToNumberString(hex))};
const kek=function(sender,key,nonce){return(web3.utils.keccak256(web3.eth.abi.encodeParameters(['uint256','uint256','uint256'],[num(sender),key,nonce])))};
const b2i=function(hex,n,i){n=big(0);hex=byt(hex);for(i=0;i<hex.length;i++){n=n.add(big(hex[i]).mul(big(16).pow(big(i*2)).add(big(1))))};return(n.toString())};
const Nonce=function(sender,base,key,min,max,i,m){m=big(key).mod(big(base)).toString();for(i=min;i<=max;i++){if(m==big(b2i(kek(sender,key,i))).mod(big(base)).toString()){break}}return(i)};
////////////////////////////////////////////////////////////
self.addEventListener('message',
function(e){
 var msg;
 try{
  msg = JSON.parse(e.data);
  msg = Nonce(msg.sender,msg.base,msg.key,msg.min,msg.max);
 }catch(err){
  msg = null;
 }
 self.postmsg(JSON.stringify({result:msg}));
 self.close();
},false);
