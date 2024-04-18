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
String.prototype.isKey = function(){return(hvalid(this)||hvalid(HEXINIT+this))};
String.prototype.isBip = function(){return(bipRegex.test(this))};
String.prototype.escape = function(){return(this.replace(/"/g,'\\"'))};
String.prototype.same = function(as,sens=true,trim=false,c,t){c=this;t=String(as);if(trim){c=c.trim();t=t.trim()}if(!sens){c=c.toLowerCase();t=t.toLowerCase()}return(c==t)};
String.prototype.as = function(as){return(this.same(as,false,true))};
String.prototype.nums = function(vol='x',min=0,max=99,nint=true,s,r=true){this.split(COMMA).forEach(p=>{s=p.split(vol);if(isNaD(s[0])||s[0]<min||s[0]>max||(nint&&!Number.isInteger(Number(s[0]))))return(r=0);if(s[1]&&(isNaD(s[1])||s[1]<=0))return(r=null)});return(r)};
String.prototype.lode = function(){return(this.nums()||this.nums(COLON))};
Array.prototype.shuffle = function(i,j,t){for(i=this.length-1;i>0;i--){j=Math.floor(Math.random()*(i+1));t=this[i];this[i]=this[j];this[j]=t}};
Array.prototype.label = function(index,s={data:[],labels:[]}){this.forEach((e,i)=>{s.labels.push(e.splice(index,1)[0]);s.data.push(e)});return(s)};
Array.prototype.tobin = function(index,value,bt=1.0,bf=0.0){this.forEach((e,i)=>{this[i][index]=(e[index]==value?bt:bf)})};
Array.prototype.sum = function(){return(this.reduce((a,b)=>(Number(a)+Number(b))))};
Object.prototype.getKey = function(val){return(this.getkey(val,'same'))};
Object.prototype.getkey = function(val,cmp='as',k=null){Object.keys(this).forEach(key=>{if(String(this[key])[cmp](val))return(k=key)});return(k)};
Object.prototype.wrd = function(val){return(wrd(this,val))};
(function(){
 this.big = function(val){return(new web3.utils.BN(val))};
 this.getKey = function(obj,val){return(obj.getKey(val))};
 this.getkey = function(obj,val,cmp='as',k=null){return(obj.getkey(val,cmp,k))};
 this.safeJSON = function(keys,vals,i=0,a=[]){if(keys.length!=vals.length)throw(null);for(;i<keys.length;i++)a.push(`"${keys[i]}":"${vals[i].toString().escape()}"`);return('{'+a.join(',')+'}')};
 this.Trim = function(s){return(trim(s).replace(/\s/g,''))};
 this.trim = function(s){if(s)return(s.replace(/^\s+|\s+$/g,BLANK));return(BLANK)};
 this.isNaD = function(n){return(isNaN(n)||hexRegex.test(n))};
 this.hvalid = function(h){return(hashRegex.test(h))};
 this.avalid = function(a){return(web3.utils.isAddress(a))};
 this.nvalid = function(n,b){n=s2n(n);b=s2n(b);return(n>0&&n<=b)};
 this.nsmall = function(n,b){return(nvalid(n,b))};
 this.nmidle = function(n,b){n=s2n(n);b=s2n(b);return(n>0&&n<b)};
 this.nlarge = function(n,s){n=s2n(n);s=s2n(s);return(n>s&&s>=0)};
 this.wrd = function(o,v){return(Object.keys(o).find(key=>o[key]==v))};
 this.n2s = function(n,d){if(!n)return(ZERO);if(!d)d=0;n=n.toString().split(DOT);n[0]=n[0].replace(/\B(?=(\d{3})+(?!\d))/g,COMMA);n[1]=n[1]?DOT+n[1].substr(0,d):EMPTY;return(n[0]+n[1])};
 this.s2n = function(s=0){if(!s)return(0);s=parseFloat(s.toString().replace(/[^\d\.\-]/g,EMPTY));if(isNaN(s))return(0);return(s)};
 this.w2s = function(n,dec=5,len=22){n=n2s(fromWei(n),dec);return(n.length<len?n:ASK)};
 this.s2w = function(s){return(toWei(s2n(s).toString()))};
 this.h2t = function(h){if(!h)return('');return(web3.utils.padLeft(h,64))};
 this.toHex = function(s){if(!s)return('0x0');return(web3.utils.toHex(s))};
 this.toHash = function(s){return(web3.utils.keccak256(s.toString(),{encoding:HEX}))};/***/
 this.solHash = function(...args){return(web3.utils.soliditySha3(...args))};
 this.jtoHash = function(j){return(toHash(JSON.stringify(j)))};
 this.toWei = function(n){return(web3.utils.toWei(n.toString(),ETHER))};
 this.gtoWei = function(n){return(web3.utils.toWei(n.toString(),GWEI))};
 this.fromWei = function(w){return(web3.utils.fromWei(w.toString(),ETHER))};
 this.fromGwei = function(g){return(fromWei(gtoWei(g)))};
 this.gfromWei = function(w){return(web3.utils.fromWei(w.toString(),GWEI))};
 this.fromHex = function(h){return(web3.utils.hexToNumberString(h))};
 this.fromNum = function(n){return(web3.utils.numberToHex(n))};
 this.fromWHex = function(h){return(fromWei(fromHex(h)))};
 this.s2wHex = function(s){s=toHex(s2w(s));return(!Number(s)?0:s)};/***/
 this.g2wHex = function(g){g=toHex(gtoWei(g));return(!Number(g)?0:g)};/***/
 this.n2Hex = function(n,dec=18){n=toHex(toDec(n,dec));return(!Number(n)?0:n)};/***/
 this.toDec = function(n,dec=18,a,s,u){n=n.toString();dec=parseInt(dec);if(isNaN(n)||isNaN(dec)||n<=0)return(ZERO);a=n.split(DOT);s=a[0];u=a[1];if(s||(s=ZERO),u||(u=ZERO),u.length>dec)return(ZERO);for(;u.length<dec;)u+=ZERO;return(big(s).mul(big(10).pow(big(dec))).add(big(u)).toString())};
 this.long = function(dur,tun='M'){dur*=1000;return(tun=='H'?dur*60*60:(tun=='M'?dur*60:dur))};
 this.min2ms = function(duration){return(long(duration,'M'))};/***/
 this.mindif = function(hextime,dec=1){return(n2s((nowDate()-fromHex(hextime))/60,dec)+SPACE+'mins')};
 this.toDate = function(y,m,d){return(parseInt(_Date(Date.UTC(y,m-1,d,0,0,0,0)).getTime()/1000,10))};
 this.nowDate = function(){return(parseInt(_Date(0).getTime()/1000,10))};
 this.FromDate = function(n){return(_Date(n*1000).toUTCString())};
 this.fromDate = function(n){return(_Date(n*1000).toString())};
 this.day = function(){return(_Date(0).getDay())};/*WeekDay*/
 this.date = function(){return(_Date(0).getDate())};/*MonthDate*/
 this.month = function(){return(_Date(0).getMonth()+1)};/*MM*/
 this.year = function(){return(_Date(0).getFullYear())};/*YYYY*/
 this.timezone = function(){return(parseInt(_Date(0).getTimezoneOffset()/60,10))};
 this.MarkDate=function(mark=10){return(_Date(markDate(mark)*1000).toLocaleDateString('en-GB'))};
 this.markDate=function(mark=10){return(nowDate()+(24-mark+timezone())*60*60)};
 this.dateMark=function(mark=10){return(toDate(year(),month(),date())+mark*60*60)};
 this.datePast=function(mark=10,days=1){return(toDate(year(),month(),date())+mark*60*60-days*24*60*60)};
 this.numsInRange = function(n,rl,rh,fn=null){if(fn)n=fn(n);return(n>=rl&&n<=rh)};
 this.positiveStr = function(n){return(s2n(n)>0)};
 this.positiveNum = function(n){return(Number(n)&&n>0)};
 this.positiveInt = function(n){return(Number.isInteger(Number(n))&&n>0)};
 this.twoHexEqual = function(h1,h2){return(fromHex(h1)===fromHex(h2))};
 this.hexCut = function(str){return(hexUtf(strCut(str,'7b226f626a22','7d7d')))};
 this.hexUtf = function(str){return(decodeURIComponent(str.replace(/[0-9a-f]{2}/g,'%$&')))};
 this.hexObj = function(str){str=hexCut(str);try{str=JSON.parse(str);}catch(e){str={obj:{raw:str}};};return(str)};
 this.strCut = function(str,sb,se){if(!sb)sb='{';if(!se)se='}';str=str.substring(str.indexOf(sb));return(str.substr(0,str.lastIndexOf(se)+se.length))};
 this.hiRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
 this.loRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
 this.bipRegex = new RegExp('^([A-Za-z0-9]{58})$');
 this.hexRegex = new RegExp('^0x([A-Fa-f0-9])+$');
 this.hashRegex = new RegExp('^0x([A-Fa-f0-9]{64})$');
})();