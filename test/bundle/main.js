(()=>{"use strict";var t={850:(t,e,r)=>{r.d(e,{Er:()=>m,_R:()=>c,oD:()=>a,rI:()=>h});const n=0xffffffffffff,o=16777215,s=16777215,i=[127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,0,1,2,3,4,5,6,7,8,9,127,127,127,127,127,127,127,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,127,127,127,127,127,127,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,127,127,127,127,127];class a{constructor(t){if(this.bytes=t,16!==t.length)throw new TypeError("invalid length of byte array: "+t.length)}static fromFields(t,e,r,i){if(!Number.isInteger(t)||!Number.isInteger(e)||!Number.isInteger(r)||!Number.isInteger(i)||t<0||e<0||r<0||i<0||t>n||e>o||r>s||i>4294967295)throw new RangeError("invalid field value");const c=new Uint8Array(16);return c[0]=t/1099511627776,c[1]=t/4294967296,c[2]=t>>>24,c[3]=t>>>16,c[4]=t>>>8,c[5]=t,c[6]=e>>>16,c[7]=e>>>8,c[8]=e,c[9]=r>>>16,c[10]=r>>>8,c[11]=r,c[12]=i>>>24,c[13]=i>>>16,c[14]=i>>>8,c[15]=i,new a(c)}get timestamp(){return this.subUint(0,6)}get counterHi(){return this.subUint(6,9)}get counterLo(){return this.subUint(9,12)}get entropy(){return this.subUint(12,16)}static fromString(t){var e;if(25!==t.length)throw new SyntaxError("invalid length: "+t.length);const r=new Uint8Array(25);for(let n=0;n<25;n++)if(r[n]=null!==(e=i[t.charCodeAt(n)])&&void 0!==e?e:127,127===r[n])throw new SyntaxError("invalid digit: "+t.charAt(n));const n=new Uint8Array(16);let o=99;for(let t=-7;t<25;t+=8){let e=0;for(let n=t<0?0:t;n<t+8;n++)e=36*e+r[n];let s=n.length-1;for(;e>0||s>o;s--){if(s<0)throw new SyntaxError("out of 128-bit value range");e+=2821109907456*n[s];const t=Math.trunc(e/256);n[s]=255&e,e=t}o=s}return new a(n)}toString(){const t=new Uint8Array(25);let e=99;for(let r=-4;r<16;r+=5){let n=this.subUint(r<0?0:r,r+5),o=t.length-1;for(;n>0||o>e;o--){n+=1099511627776*t[o];const e=Math.trunc(n/36);t[o]=n-36*e,n=e}e=o}let r="";for(let e of t)r+="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(e);return r}static fromArrayBuffer(t){if(16!==t.byteLength)throw new TypeError("invalid length of byte array: "+t.byteLength);return new a(new Uint8Array(t.slice(0)))}toArrayBuffer(){return this.bytes.buffer.slice(0)}static fromHex(t){const e=t.match(/^(?:0x)?0*(0|[1-9a-f][0-9a-f]*)$/i);if(null===e||e[1].length>32)throw new SyntaxError("invalid hexadecimal integer");const r=32-e[1].length,n=new Uint8Array(16);for(let t=0;t<16;t++){const o=2*t-r;n[t]=(o<0?0:i[e[1].charCodeAt(o)]<<4)|(o+1<0?0:i[e[1].charCodeAt(o+1)])}return new a(n)}toHex(){const t="0123456789abcdef";let e="0x";for(let r of this.bytes)e+=t.charAt(r>>>4),e+=t.charAt(15&r);return e}toJSON(){return this.toString()}clone(){return new a(this.bytes.slice(0))}equals(t){return 0===this.compareTo(t)}compareTo(t){for(let e=0;e<16;e++){const r=this.bytes[e]-t.bytes[e];if(0!==r)return Math.sign(r)}return 0}subUint(t,e){let r=0;for(;t<e;)r=256*r+this.bytes[t++];return r}}class c{constructor(t){this.timestamp=0,this.counterHi=0,this.counterLo=0,this.tsCounterHi=0,this.lastStatus="NOT_EXECUTED",this.rng=t||new l}generate(){return this.generateCore(Date.now())}generateCore(t){if(!Number.isInteger(t)||t<0||t>n)throw new RangeError("`timestamp` must be a 48-bit unsigned integer");return this.lastStatus="NEW_TIMESTAMP",t>this.timestamp?(this.timestamp=t,this.counterLo=this.rng.nextUint32()&s):t+1e4>this.timestamp?(this.counterLo++,this.lastStatus="COUNTER_LO_INC",this.counterLo>s&&(this.counterLo=0,this.counterHi++,this.lastStatus="COUNTER_HI_INC",this.counterHi>o&&(this.counterHi=0,this.timestamp++,this.counterLo=this.rng.nextUint32()&s,this.lastStatus="TIMESTAMP_INC"))):(this.tsCounterHi=0,this.timestamp=t,this.counterLo=this.rng.nextUint32()&s,this.lastStatus="CLOCK_ROLLBACK"),this.timestamp-this.tsCounterHi>=1e3&&(this.tsCounterHi=this.timestamp,this.counterHi=this.rng.nextUint32()&o),a.fromFields(this.timestamp,this.counterHi,this.counterLo,this.rng.nextUint32())}getLastStatus(){return this.lastStatus}}let u,f=t=>{if("undefined"!=typeof SCRU128_DENY_WEAK_RNG&&SCRU128_DENY_WEAK_RNG)throw new Error("no cryptographically strong RNG available");for(let e=0;e<t.length;e++)t[e]=65536*Math.trunc(65536*Math.random())+Math.trunc(65536*Math.random());return t};"undefined"!=typeof crypto&&crypto.getRandomValues&&(f=t=>crypto.getRandomValues(t));class l{constructor(){this.buffer=new Uint32Array(8),this.cursor=1/0}nextUint32(){return this.cursor>=this.buffer.length&&(f(this.buffer),this.cursor=0),this.buffer[this.cursor++]}}const h=()=>(u||(u=new c)).generate(),m=()=>h().toString()}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var s=e[n]={exports:{}};return t[n](s,s.exports,r),s.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=r(850);const e=(t,e="")=>{if(!t)throw new Error("Assertion failed"+(e?": "+e:""))};globalThis.SCRU128_DENY_WEAK_RNG=!0,describe("Scru128Generator",(function(){it("generates increasing IDs even with decreasing or constant timestamp",(function(){const r=1250999896491,n=new t._R;e("NOT_EXECUTED"===n.getLastStatus());let o=n.generateCore(r);e("NEW_TIMESTAMP"===n.getLastStatus()),e(o.timestamp===r);for(let t=0;t<1e5;t++){const s=n.generateCore(r-Math.min(9998,t));e("COUNTER_LO_INC"===n.getLastStatus()||"COUNTER_HI_INC"===n.getLastStatus()||"TIMESTAMP_INC"===n.getLastStatus()),e(o.compareTo(s)<0),o=s}e(o.timestamp>=r)})),it("breaks increasing order of IDs if timestamp moves backward a lot",(function(){const r=1250999896491,n=new t._R;e("NOT_EXECUTED"===n.getLastStatus());const o=n.generateCore(r);e("NEW_TIMESTAMP"===n.getLastStatus()),e(o.timestamp===r);const s=n.generateCore(r-1e4);e("CLOCK_ROLLBACK"===n.getLastStatus()),e(o.compareTo(s)>0),e(s.timestamp==r-1e4)}))}))})(),(()=>{var t=r(850);const e=(t,e="")=>{if(!t)throw new Error("Assertion failed"+(e?": "+e:""))};globalThis.SCRU128_DENY_WEAK_RNG=!0,describe("Scru128Id",(function(){const r=2**48-1,n=2**24-1,o=2**32-1;it("encodes and decodes prepared cases correctly",(function(){const s=[[[0,0,0,0],"0000000000000000000000000"],[[r,0,0,0],"F5LXX1ZZ5K6TP71GEEH2DB7K0"],[[r,0,0,0],"f5lxx1zz5k6tp71geeh2db7k0"],[[0,n,0,0],"0000000005GV2R2KJWR7N8XS0"],[[0,n,0,0],"0000000005gv2r2kjwr7n8xs0"],[[0,0,n,0],"00000000000000JPIA7QL4HS0"],[[0,0,n,0],"00000000000000jpia7ql4hs0"],[[0,0,0,o],"0000000000000000001Z141Z3"],[[0,0,0,o],"0000000000000000001z141z3"],[[r,n,n,o],"F5LXX1ZZ5PNORYNQGLHZMSP33"],[[r,n,n,o],"f5lxx1zz5pnorynqglhzmsp33"]],i=["timestamp","counterHi","counterLo","entropy"];for(const r of s){const n=t.oD.fromFields(...r[0]),o=t.oD.fromString(r[1]);e(n.equals(o)),e(n.toString()===r[1].toUpperCase()),e(o.toString()===r[1].toUpperCase());for(let t=0;t<i.length;t++)e(n[i[t]]===r[0][t]),e(o[i[t]]===r[0][t])}})),it("throws error if an invalid string representation is supplied",(function(){const r=[""," 036Z8PUQ4TSXSIGK6O19Y164Q","036Z8PUQ54QNY1VQ3HCBRKWEB "," 036Z8PUQ54QNY1VQ3HELIVWAX ","+036Z8PUQ54QNY1VQ3HFCV3SS0","-036Z8PUQ54QNY1VQ3HHY8U1CH","+36Z8PUQ54QNY1VQ3HJQ48D9P","-36Z8PUQ5A7J0TI08OZ6ZDRDY","036Z8PUQ5A7J0T_08P2CDZ28V","036Z8PU-5A7J0TI08P3OL8OOL","036Z8PUQ5A7J0TI08P4J 6CYA","F5LXX1ZZ5PNORYNQGLHZMSP34","ZZZZZZZZZZZZZZZZZZZZZZZZZ"];for(const n of r){let r=null;try{t.oD.fromString(n)}catch(t){r=t}e(null!==r)}})),it("has symmetric converters from/to various values",(function(){const s=[t.oD.fromFields(0,0,0,0),t.oD.fromFields(r,0,0,0),t.oD.fromFields(0,n,0,0),t.oD.fromFields(0,0,n,0),t.oD.fromFields(0,0,0,o),t.oD.fromFields(r,n,n,o)],i=new t._R;for(let t=0;t<1e3;t++)s.push(i.generate());for(const r of s){e(t.oD.fromString(r.toString()).equals(r)),e(t.oD.fromHex(r.toHex()).equals(r)),e(t.oD.fromFields(r.timestamp,r.counterHi,r.counterLo,r.entropy).equals(r));const n=r.toArrayBuffer(),o=t.oD.fromArrayBuffer(n);e(o.equals(r)),e(n!=r.bytes.buffer),e(n!=o.bytes.buffer)}})),it("supports comparison methods",(function(){const r=[t.oD.fromFields(0,0,0,0),t.oD.fromFields(0,0,0,1),t.oD.fromFields(0,0,0,o),t.oD.fromFields(0,0,1,0),t.oD.fromFields(0,0,n,0),t.oD.fromFields(0,1,0,0),t.oD.fromFields(0,n,0,0),t.oD.fromFields(1,0,0,0),t.oD.fromFields(2,0,0,0)],s=new t._R;for(let t=0;t<1e3;t++)r.push(s.generate());let i=r.shift();for(const t of r){e(!t.equals(i)),e(!i.equals(t)),e(t.compareTo(i)>0),e(i.compareTo(t)<0);const r=t.clone();e(t!=r),e(r!=t),e(t.equals(r)),e(r.equals(t)),e(0===t.compareTo(r)),e(0===r.compareTo(t)),e(t.bytes.buffer!=r.bytes.buffer),e(r.bytes.buffer!=t.bytes.buffer),i=t}})),it("serializes an object using the canonical string representation",(function(){const r=new t._R;for(let t=0;t<1e3;t++){const t=r.generate();e(JSON.stringify(t)===`"${t}"`)}}))}))})(),(()=>{var t=r(850);const e=(t,e="")=>{if(!t)throw new Error("Assertion failed"+(e?": "+e:""))};globalThis.SCRU128_DENY_WEAK_RNG=!0,describe("scru128()",(function(){it("returns a Scru128Id object",(function(){const r=(0,t.rI)();e(r instanceof t.oD)}))})),describe("scru128String()",(function(){const r=[];for(let e=0;e<1e5;e++)r[e]=(0,t.Er)();it("generates 25-digit canonical string",(function(){const t=/^[0-9A-Z]{25}$/;e(r.every((e=>"string"==typeof e&&t.test(e))))})),it("generates 100k identifiers without collision",(function(){e(new Set(r).size===r.length)})),it("generates sortable string representation by creation time",(function(){for(let t=1;t<r.length;t++)e(r[t-1]<r[t])})),it("encodes up-to-date timestamp",(function(){const r=new t._R;for(let t=0;t<1e4;t++){const t=Date.now(),n=r.generate().timestamp;e(Math.abs(t-n)<16)}})),it("encodes unique sortable tuple of timestamp and counters",(function(){let n=t.oD.fromString(r[0]);for(let o=1;o<r.length;o++){const s=t.oD.fromString(r[o]);e(n.timestamp<s.timestamp||n.timestamp===s.timestamp&&n.counterHi<s.counterHi||n.timestamp===s.timestamp&&n.counterHi===s.counterHi&&n.counterLo<s.counterLo),n=s}})),it("generates no IDs sharing same timestamp and counters by multiple async functions",(async function(){const r=[],n=[];for(let e=0;e<4e4;e++)n.push((async()=>r.push((0,t.rI)()))());await Promise.all(n);const o=new Set(r.map((t=>`${t.timestamp}-${t.counterHi}-${t.counterLo}`)));e(4e4===o.size)}))}))})()})();