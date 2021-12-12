(()=>{"use strict";var t={941:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.randomFillSync=void 0,e.randomFillSync=void 0},590:(t,e,n)=>{e.Er=e.rI=e._R=e.oD=e.nX=void 0;const r=n(941);e.nX=15778368e5;const o=268435455,s=16777215,i="0123456789ABCDEFGHIJKLMNOPQRSTUV";class a{constructor(t,e,n,r){if(this.timestamp=t,this.counter=e,this.perSecRandom=n,this.perGenRandom=r,!Number.isInteger(this.timestamp)||!Number.isInteger(this.counter)||!Number.isInteger(this.perSecRandom)||!Number.isInteger(this.perGenRandom)||this.timestamp<0||this.counter<0||this.perSecRandom<0||this.perGenRandom<0||this.timestamp>0xfffffffffff||this.counter>o||this.perSecRandom>s||this.perGenRandom>4294967295)throw new RangeError("invalid field value")}static fromFields(t,e,n,r){return new a(t,e,n,r)}static fromString(t){const e=t.match(/^([0-7][0-9A-V]{9})([0-9A-V]{8})([0-9A-V]{8})$/i);if(null===e)throw new SyntaxError("invalid string representation: "+t);const n=parseInt(e[1],32),r=parseInt(e[2],32),o=parseInt(e[3],32);return new a(Math.trunc(n/16),n%16<<24|Math.trunc(r/65536),r%65536<<8|Math.trunc(o/4294967296),o%4294967296)}toString(){const t=Math.trunc(this.timestamp/68719476736),e=[this.timestamp/64&1073741823,this.timestamp%64<<24|this.counter>>>4,(15&this.counter)<<26|this.perSecRandom<<2|this.perGenRandom>>>30,1073741823&this.perGenRandom];let n="";for(let t=0;t<4;t++){let r=e[3-t];for(let t=0;t<6;t++)n=i.charAt(31&r)+n,r>>>=5}return i.charAt(t>>>5)+i.charAt(31&t)+n}static fromArrayBuffer(t){if(16!==t.byteLength)throw new RangeError("not a 128-bit byte array");const e=new DataView(t);return new a(4096*e.getUint32(0)+(e.getUint16(4)>>>4),e.getUint32(5)&o,e.getUint32(8)&s,e.getUint32(12))}toArrayBuffer(){const t=new DataView(new ArrayBuffer(16));return t.setUint32(12,this.perGenRandom),t.setUint32(8,this.perSecRandom),t.setUint32(5,this.counter),t.setUint16(4,this.timestamp%4096<<4|this.counter>>>24),t.setUint32(0,this.timestamp/4096),t.buffer}static fromHex(t){const e=t.match(/^(?:0x)?0*(0|[1-9a-f][0-9a-f]*)$/i);if(null===e||e[1].length>32)throw new SyntaxError("invalid hexadecimal integer: "+t);return new a(parseInt(e[1].slice(-32,-21)||"0",16),parseInt(e[1].slice(-21,-14)||"0",16),parseInt(e[1].slice(-14,-8)||"0",16),parseInt(e[1].slice(-8)||"0",16))}toHex(){return"0x"+("000000000000"+this.timestamp.toString(16)).slice(-11)+("000000000000"+this.counter.toString(16)).slice(-7)+("000000000000"+this.perSecRandom.toString(16)).slice(-6)+("000000000000"+this.perGenRandom.toString(16)).slice(-8)}toJSON(){return this.toString()}clone(){return new a(this.timestamp,this.counter,this.perSecRandom,this.perGenRandom)}equals(t){return 0===this.compareTo(t)}compareTo(t){return Math.sign(this.timestamp-t.timestamp||this.counter-t.counter||this.perSecRandom-t.perSecRandom||this.perGenRandom-t.perGenRandom)}}let c;e.oD=a;class m{constructor(){this.tsLastGen=0,this.counter=0,this.tsLastSec=0,this.perSecRandom=0,this.nClockCheckMax=1e6,this.getRandomUint32="undefined"!=typeof window&&window.crypto?()=>window.crypto.getRandomValues(new Uint32Array(1))[0]:r.randomFillSync?()=>(0,r.randomFillSync)(new Uint32Array(1))[0]:()=>65536*Math.trunc(65536*Math.random())+Math.trunc(65536*Math.random())}generate(){let t=Date.now();if(t>this.tsLastGen)this.tsLastGen=t,this.counter=this.getRandomUint32()>>>4;else if(++this.counter>o){let e=0;for(;t<=this.tsLastGen;)if(t=Date.now(),++e>this.nClockCheckMax){this.tsLastSec=0;break}this.tsLastGen=t,this.counter=this.getRandomUint32()>>>4}return this.tsLastGen-this.tsLastSec>1e3&&(this.tsLastSec=this.tsLastGen,this.perSecRandom=this.getRandomUint32()>>>8),a.fromFields(this.tsLastGen-e.nX,this.counter,this.perSecRandom,this.getRandomUint32())}}e._R=m,e.rI=()=>(c||(c=new m)).generate(),e.Er=()=>(0,e.rI)().toString()}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,n),s.exports}(()=>{var t=n(590);const e=(t,e="")=>{if(!t)throw new Error("Assertion failed"+(e?": "+e:""))};describe("Scru128Id",(function(){const n=2**44-1,r=2**28-1,o=2**24-1,s=2**32-1;it("encodes and decodes prepared cases correctly",(function(){const i=[[[0,0,0,0],"00000000000000000000000000"],[[n,0,0,0],"7VVVVVVVVG0000000000000000"],[[n,0,0,0],"7vvvvvvvvg0000000000000000"],[[0,r,0,0],"000000000FVVVVU00000000000"],[[0,r,0,0],"000000000fvvvvu00000000000"],[[0,0,o,0],"000000000000001VVVVS000000"],[[0,0,o,0],"000000000000001vvvvs000000"],[[0,0,0,s],"00000000000000000003VVVVVV"],[[0,0,0,s],"00000000000000000003vvvvvv"],[[n,r,o,s],"7VVVVVVVVVVVVVVVVVVVVVVVVV"],[[n,r,o,s],"7vvvvvvvvvvvvvvvvvvvvvvvvv"]],a=["timestamp","counter","perSecRandom","perGenRandom"];for(const n of i){const r=t.oD.fromFields(...n[0]),o=t.oD.fromString(n[1]);e(r.equals(o)),e(r.toString()===n[1].toUpperCase()),e(o.toString()===n[1].toUpperCase());for(let t=0;t<a.length;t++)e(r[a[t]]===n[0][t]),e(o[a[t]]===n[0][t])}})),it("throws error if an invalid string representation is supplied",(function(){const n=[""," 00SCT4FL89GQPRHN44C4LFM0OV","00SCT4FL89GQPRJN44C7SQO381 "," 00SCT4FL89GQPRLN44C4BGCIIO ","+00SCT4FL89GQPRNN44C4F3QD24","-00SCT4FL89GQPRPN44C7H4E5RC","+0SCT4FL89GQPRRN44C55Q7RVC","-0SCT4FL89GQPRTN44C6PN0A2R","00SCT4FL89WQPRVN44C41RGVMM","00SCT4FL89GQPS1N4_C54QDC5O","00SCT4-L89GQPS3N44C602O0K8","00SCT4FL89GQPS N44C7VHS5QJ","80000000000000000000000000","VVVVVVVVVVVVVVVVVVVVVVVVVV"];for(const r of n){let n=null;try{t.oD.fromString(r)}catch(t){n=t}e(null!==n)}})),it("has symmetric converters from/to various values",(function(){const i=[t.oD.fromFields(0,0,0,0),t.oD.fromFields(n,0,0,0),t.oD.fromFields(0,r,0,0),t.oD.fromFields(0,0,o,0),t.oD.fromFields(0,0,0,s),t.oD.fromFields(n,r,o,s)],a=new t._R;for(let t=0;t<1e3;t++)i.push(a.generate());for(const n of i)e(t.oD.fromString(n.toString()).equals(n)),e(t.oD.fromArrayBuffer(n.toArrayBuffer()).equals(n)),e(t.oD.fromHex(n.toHex()).equals(n)),e(t.oD.fromFields(n.timestamp,n.counter,n.perSecRandom,n.perGenRandom).equals(n))})),it("supports comparison methods",(function(){const n=[t.oD.fromFields(0,0,0,0),t.oD.fromFields(0,0,0,1),t.oD.fromFields(0,0,0,s),t.oD.fromFields(0,0,1,0),t.oD.fromFields(0,0,o,0),t.oD.fromFields(0,1,0,0),t.oD.fromFields(0,r,0,0),t.oD.fromFields(1,0,0,0),t.oD.fromFields(2,0,0,0)],i=new t._R;for(let t=0;t<1e3;t++)n.push(i.generate());let a=n.shift();for(const t of n){e(!t.equals(a)),e(!a.equals(t)),e(t.compareTo(a)>0),e(a.compareTo(t)<0);const n=t.clone();e(t!=n),e(n!=t),e(t.equals(n)),e(n.equals(t)),e(0===t.compareTo(n)),e(0===n.compareTo(t)),a=t}})),it("serializes an object using the canonical string representation",(function(){const n=new t._R;for(let t=0;t<1e3;t++){const t=n.generate();e(JSON.stringify(t)===`"${t}"`)}}))}))})(),(()=>{var t=n(590);const e=(t,e="")=>{if(!t)throw new Error("Assertion failed"+(e?": "+e:""))};describe("scru128()",(function(){it("returns a Scru128Id object",(function(){const n=(0,t.rI)();e(n instanceof t.oD)}))})),describe("scru128String()",(function(){const n=[];for(let e=0;e<1e5;e++)n[e]=(0,t.Er)();it("generates 26-digit canonical string",(function(){const t=/^[0-7][0-9A-V]{25}$/;e(n.every((e=>"string"==typeof e&&t.test(e))))})),it("generates 100k identifiers without collision",(function(){e(new Set(n).size===n.length)})),it("generates sortable string representation by creation time",(function(){for(let t=1;t<n.length;t++)e(n[t-1]<n[t])})),it("encodes up-to-date timestamp",(function(){const n=Date.UTC(2020,0),r=new t._R;for(let t=0;t<1e4;t++){const t=Date.now()-n,o=r.generate().timestamp;e(Math.abs(t-o)<16)}})),it("encodes unique sortable pair of timestamp and counter",(function(){let r=t.oD.fromString(n[0]);for(let o=1;o<n.length;o++){const s=t.oD.fromString(n[o]);e(r.timestamp<s.timestamp||r.timestamp===s.timestamp&&r.counter<s.counter),r=s}})),it("generates no IDs sharing same timestamp and counter by multiple async functions",(async function(){const n=[],r=[];for(let e=0;e<4e4;e++)r.push((async()=>n.push((0,t.rI)()))());await Promise.all(r);const o=new Set(n.map((t=>`${t.timestamp}-${t.counter}`)));e(4e4===o.size)}))}))})()})();