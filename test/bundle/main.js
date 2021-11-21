(()=>{"use strict";var t={941:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.randomFillSync=void 0,e.randomFillSync=void 0},590:(t,e,n)=>{e.rI=e.oD=e._R=e.nX=void 0;const r=n(941);e.nX=15778368e5;const o=268435455,s="0000000000000000";class i{constructor(){this.tsLastGen=0,this.counter=0,this.tsLastSec=0,this.perSecRandom=0,this.nClockCheckMax=1e6,this.getRandomUint32="undefined"!=typeof window&&window.crypto?()=>window.crypto.getRandomValues(new Uint32Array(1))[0]:r.randomFillSync?()=>(0,r.randomFillSync)(new Uint32Array(1))[0]:(console.warn("scru128: fell back on Math.random() as no cryptographic RNG was detected"),()=>65536*Math.trunc(65536*Math.random())+Math.trunc(65536*Math.random()))}generate(){let t=Date.now();if(t>this.tsLastGen)this.tsLastGen=t,this.counter=this.getRandomUint32()>>>4;else if(++this.counter>o){console.info("scru128: counter limit reached; will wait until clock goes forward");let e=0;for(;t<=this.tsLastGen;)if(t=Date.now(),++e>this.nClockCheckMax){console.warn("scru128: reset state as clock did not go forward"),this.tsLastSec=0;break}this.tsLastGen=t,this.counter=this.getRandomUint32()>>>4}return this.tsLastGen-this.tsLastSec>1e3&&(this.tsLastSec=this.tsLastGen,this.perSecRandom=this.getRandomUint32()>>>8),a.fromFields(this.tsLastGen-e.nX,this.counter,this.perSecRandom,this.getRandomUint32())}}e._R=i;class a{constructor(t,e,n,r){if(this.timestamp=t,this.counter=e,this.perSecRandom=n,this.perGenRandom=r,!Number.isInteger(this.timestamp)||!Number.isInteger(this.counter)||!Number.isInteger(this.perSecRandom)||!Number.isInteger(this.perGenRandom)||this.timestamp<0||this.counter<0||this.perSecRandom<0||this.perGenRandom<0||this.timestamp>0xfffffffffff||this.counter>o||this.perSecRandom>16777215||this.perGenRandom>4294967295)throw new RangeError("invalid field value")}static fromFields(t,e,n,r){return new a(t,e,n,r)}static fromString(t){const e=t.match(/^([0-7][0-9A-V]{9})([0-9A-V]{8})([0-9A-V]{8})$/i);if(null===e)throw new SyntaxError("invalid string representation: "+t);const n=parseInt(e[1],32),r=parseInt(e[2],32),o=parseInt(e[3],32);return new a(Math.trunc(n/16),n%16<<24|Math.trunc(r/65536),r%65536<<8|Math.trunc(o/4294967296),o%4294967296)}toString(){const t=16*this.timestamp+(this.counter>>>24),e=65536*(16777215&this.counter)+(this.perSecRandom>>>8),n=4294967296*(255&this.perSecRandom)+this.perGenRandom;return((s+t.toString(32)).slice(-10)+(s+e.toString(32)).slice(-8)+(s+n.toString(32)).slice(-8)).toUpperCase()}static fromHex(t){const e=t.match(/^(?:0x)?0*(0|[1-9a-f][0-9a-f]*)$/i);if(null===e||e[1].length>32)throw new SyntaxError("invalid hexadecimal integer: "+t);return new a(parseInt(e[1].slice(-32,-21)||"0",16),parseInt(e[1].slice(-21,-14)||"0",16),parseInt(e[1].slice(-14,-8)||"0",16),parseInt(e[1].slice(-8)||"0",16))}toHex(){return"0x"+(s+this.timestamp.toString(16)).slice(-11)+(s+this.counter.toString(16)).slice(-7)+(s+this.perSecRandom.toString(16)).slice(-6)+(s+this.perGenRandom.toString(16)).slice(-8)}toJSON(){return this.toString()}clone(){return new a(this.timestamp,this.counter,this.perSecRandom,this.perGenRandom)}equals(t){return 0===this.compareTo(t)}compareTo(t){return Math.sign(this.timestamp-t.timestamp||this.counter-t.counter||this.perSecRandom-t.perSecRandom||this.perGenRandom-t.perGenRandom)}}e.oD=a;const c=new i;e.rI=()=>c.generate().toString()}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,n),s.exports}(()=>{var t=n(590);const e=(t,e="")=>{if(!t)throw new Error("Assertion failed"+(e?": "+e:""))};describe("Scru128Id",(function(){it("encodes and decodes prepared cases correctly",(function(){const n=[[[0,0,0,0],"00000000000000000000000000"],[[2**44-1,0,0,0],"7VVVVVVVVG0000000000000000"],[[0,2**28-1,0,0],"000000000FVVVVU00000000000"],[[0,0,2**24-1,0],"000000000000001VVVVS000000"],[[0,0,0,2**32-1],"00000000000000000003VVVVVV"],[[2**44-1,2**28-1,2**24-1,2**32-1],"7VVVVVVVVVVVVVVVVVVVVVVVVV"]],r=["timestamp","counter","perSecRandom","perGenRandom"];for(const o of n){const n=t.oD.fromFields(...o[0]),s=t.oD.fromString(o[1]);e(n.equals(s)),e(n.toHex()===s.toHex()),e(n.toString()===o[1]),e(s.toString()===o[1]);for(let t=0;t<r.length;t++)e(n[r[t]]===o[0][t]),e(s[r[t]]===o[0][t])}})),it("has symmetric converters from/to string, hex, and fields",(function(){const n=new t._R;for(let r=0;r<1e3;r++){const r=n.generate();e(t.oD.fromString(r.toString()).equals(r)),e(t.oD.fromHex(r.toHex()).equals(r)),e(t.oD.fromFields(r.timestamp,r.counter,r.perSecRandom,r.perGenRandom).equals(r))}})),it("supports comparison methods",(function(){const n=[t.oD.fromFields(0,0,0,0),t.oD.fromFields(0,0,0,1),t.oD.fromFields(0,0,1,0),t.oD.fromFields(0,1,0,0),t.oD.fromFields(1,0,0,0)],r=new t._R;for(let t=0;t<1e3;t++)n.push(r.generate());let o=n.shift();for(const t of n){e(!t.equals(o)),e(!o.equals(t)),e(t.compareTo(o)>0),e(o.compareTo(t)<0);const n=t.clone();e(t!=n),e(n!=t),e(t.equals(n)),e(n.equals(t)),e(0===t.compareTo(n)),e(0===n.compareTo(t)),o=t}}))}))})(),(()=>{var t=n(590);const e=(t,e="")=>{if(!t)throw new Error("Assertion failed"+(e?": "+e:""))};describe("scru128()",(function(){const n=[];for(let e=0;e<1e5;e++)n[e]=(0,t.rI)();it("generates 26-digit canonical string",(function(){const t=/^[0-7][0-9A-V]{25}$/;e(n.every((e=>"string"==typeof e&&t.test(e))))})),it("generates 100k identifiers without collision",(function(){e(new Set(n).size===n.length)})),it("generates sortable string representation by creation time",(function(){for(let t=1;t<n.length;t++)e(n[t-1]<n[t])})),it("encodes up-to-date timestamp",(function(){const n=Date.UTC(2020,0),r=new t._R;for(let t=0;t<1e4;t++){const t=Date.now()-n,o=r.generate().timestamp;e(Math.abs(t-o)<16)}})),it("encodes unique sortable pair of timestamp and counter",(function(){let r=t.oD.fromString(n[0]);for(let o=1;o<n.length;o++){const s=t.oD.fromString(n[o]);e(r.timestamp<s.timestamp||r.timestamp===s.timestamp&&r.counter<s.counter),r=s}})),it("generates no IDs sharing same timestamp and counter by multiple async functions",(async function(){const n=[],r=[];for(let e=0;e<4e4;e++)r.push((async()=>n.push((0,t.rI)()))());await Promise.all(r);const o=new Set(n.map((e=>{const n=t.oD.fromString(e);return`${n.timestamp}-${n.counter}`})));e(4e4===o.size)}))}))})()})();