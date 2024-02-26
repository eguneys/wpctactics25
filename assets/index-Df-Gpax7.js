(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const w={context:void 0,registry:void 0};function G(e){w.context=e}const ht=(e,n)=>e===n,z=Symbol("solid-proxy"),mt=Symbol("solid-track"),ee={equals:ht};let Ue=Xe;const M=1,te=2,Fe={owned:null,cleanups:null,context:null,owner:null},fe={};var v=null;let de=null,gt=null,P=null,R=null,_=null,se=0;function Y(e,n){const t=P,r=v,s=e.length===0,i=n===void 0?r:n,o=s?Fe:{owned:null,cleanups:null,context:i?i.context:null,owner:i},l=s?e:()=>e(()=>O(()=>le(o)));v=o,P=null;try{return j(l,!0)}finally{P=t,v=r}}function k(e,n){n=n?Object.assign({},ee,n):ee;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},r=s=>(typeof s=="function"&&(s=s(t.value)),He(t,s));return[We.bind(t),r]}function Re(e,n,t){const r=ie(e,n,!0,M);V(r)}function I(e,n,t){const r=ie(e,n,!1,M);V(r)}function pt(e,n,t){Ue=xt;const r=ie(e,n,!1,M);(!t||!t.render)&&(r.user=!0),_?_.push(r):V(r)}function S(e,n,t){t=t?Object.assign({},ee,t):ee;const r=ie(e,n,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=t.equals||void 0,V(r),We.bind(r)}function yt(e){return e&&typeof e=="object"&&"then"in e}function wt(e,n,t){let r,s,i;arguments.length===2&&typeof n=="object"||arguments.length===1?(r=!0,s=e,i=n||{}):(r=e,s=n,i=t||{});let o=null,l=fe,a=null,u=!1,c="initialValue"in i,f=typeof r=="function"&&S(r);const d=new Set,[p,h]=(i.storage||k)(i.initialValue),[m,b]=k(void 0),[A,N]=k(void 0,{equals:!1}),[x,C]=k(c?"ready":"unresolved");if(w.context){a=`${w.context.id}${w.context.count++}`;let E;i.ssrLoadFrom==="initial"?l=i.initialValue:w.load&&(E=w.load(a))&&(l=E)}function L(E,g,y,$){return o===E&&(o=null,$!==void 0&&(c=!0),(E===l||g===l)&&i.onHydrated&&queueMicrotask(()=>i.onHydrated($,{value:g})),l=fe,W(g,y)),g}function W(E,g){j(()=>{g===void 0&&h(()=>E),C(g!==void 0?"errored":c?"ready":"unresolved"),b(g);for(const y of d.keys())y.decrement();d.clear()},!1)}function H(){const E=vt,g=p(),y=m();if(y!==void 0&&!o)throw y;return P&&!P.user&&E&&Re(()=>{A(),o&&(E.resolved||d.has(E)||(E.increment(),d.add(E)))}),g}function X(E=!0){if(E!==!1&&u)return;u=!1;const g=f?f():r;if(g==null||g===!1){L(o,O(p));return}const y=l!==fe?l:O(()=>s(g,{value:p(),refetching:E}));return yt(y)?(o=y,"value"in y?(y.status==="success"?L(o,y.value,void 0,g):L(o,void 0,void 0,g),y):(u=!0,queueMicrotask(()=>u=!1),j(()=>{C(c?"refreshing":"pending"),N()},!1),y.then($=>L(y,$,void 0,g),$=>L(y,void 0,Ge($),g)))):(L(o,y,void 0,g),y)}return Object.defineProperties(H,{state:{get:()=>x()},error:{get:()=>m()},loading:{get(){const E=x();return E==="pending"||E==="refreshing"}},latest:{get(){if(!c)return H();const E=m();if(E&&!o)throw E;return p()}}}),f?Re(()=>X(!1)):X(!1),[H,{refetch:X,mutate:h}]}function Mn(e){return j(e,!1)}function O(e){if(P===null)return e();const n=P;P=null;try{return e()}finally{P=n}}function Ke(e,n,t){const r=Array.isArray(e);let s,i=t&&t.defer;return o=>{let l;if(r){l=Array(e.length);for(let u=0;u<e.length;u++)l[u]=e[u]()}else l=e();if(i){i=!1;return}const a=O(()=>n(l,s,o));return s=l,a}}function Bn(e){pt(()=>O(e))}function xe(e){return v===null||(v.cleanups===null?v.cleanups=[e]:v.cleanups.push(e)),e}function qe(){return v}function Ve(e,n){const t=v,r=P;v=e,P=null;try{return j(n,!0)}catch(s){Ce(s)}finally{v=t,P=r}}function bt(e){const n=P,t=v;return Promise.resolve().then(()=>{P=n,v=t;let r;return j(e,!1),P=v=null,r?r.done:void 0})}function Ee(e,n){const t=Symbol("context");return{id:t,Provider:Et(t),defaultValue:e}}function Se(e){return v&&v.context&&v.context[e.id]!==void 0?v.context[e.id]:e.defaultValue}function oe(e){const n=S(e),t=S(()=>ge(n()));return t.toArray=()=>{const r=t();return Array.isArray(r)?r:r!=null?[r]:[]},t}let vt;function We(){if(this.sources&&this.state)if(this.state===M)V(this);else{const e=R;R=null,j(()=>re(this),!1),R=e}if(P){const e=this.observers?this.observers.length:0;P.sources?(P.sources.push(this),P.sourceSlots.push(e)):(P.sources=[this],P.sourceSlots=[e]),this.observers?(this.observers.push(P),this.observerSlots.push(P.sources.length-1)):(this.observers=[P],this.observerSlots=[P.sources.length-1])}return this.value}function He(e,n,t){let r=e.value;return(!e.comparator||!e.comparator(r,n))&&(e.value=n,e.observers&&e.observers.length&&j(()=>{for(let s=0;s<e.observers.length;s+=1){const i=e.observers[s],o=de&&de.running;o&&de.disposed.has(i),(o?!i.tState:!i.state)&&(i.pure?R.push(i):_.push(i),i.observers&&Je(i)),o||(i.state=M)}if(R.length>1e6)throw R=[],new Error},!1)),n}function V(e){if(!e.fn)return;le(e);const n=se;At(e,e.value,n)}function At(e,n,t){let r;const s=v,i=P;P=v=e;try{r=e.fn(n)}catch(o){return e.pure&&(e.state=M,e.owned&&e.owned.forEach(le),e.owned=null),e.updatedAt=t+1,Ce(o)}finally{P=i,v=s}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?He(e,r):e.value=r,e.updatedAt=t)}function ie(e,n,t,r=M,s){const i={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:v,context:v?v.context:null,pure:t};return v===null||v!==Fe&&(v.owned?v.owned.push(i):v.owned=[i]),i}function ne(e){if(e.state===0)return;if(e.state===te)return re(e);if(e.suspense&&O(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<se);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===M)V(e);else if(e.state===te){const r=R;R=null,j(()=>re(e,n[0]),!1),R=r}}function j(e,n){if(R)return e();let t=!1;n||(R=[]),_?t=!0:_=[],se++;try{const r=e();return Pt(t),r}catch(r){t||(_=null),R=null,Ce(r)}}function Pt(e){if(R&&(Xe(R),R=null),e)return;const n=_;_=null,n.length&&j(()=>Ue(n),!1)}function Xe(e){for(let n=0;n<e.length;n++)ne(e[n])}function xt(e){let n,t=0;for(n=0;n<e.length;n++){const r=e[n];r.user?e[t++]=r:ne(r)}if(w.context){if(w.count){w.effects||(w.effects=[]),w.effects.push(...e.slice(0,t));return}else w.effects&&(e=[...w.effects,...e],t+=w.effects.length,delete w.effects);G()}for(n=0;n<t;n++)ne(e[n])}function re(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const r=e.sources[t];if(r.sources){const s=r.state;s===M?r!==n&&(!r.updatedAt||r.updatedAt<se)&&ne(r):s===te&&re(r,n)}}}function Je(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=te,t.pure?R.push(t):_.push(t),t.observers&&Je(t))}}function le(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),r=e.sourceSlots.pop(),s=t.observers;if(s&&s.length){const i=s.pop(),o=t.observerSlots.pop();r<s.length&&(i.sourceSlots[o]=r,s[r]=i,t.observerSlots[r]=o)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)le(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0}function Ge(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ce(e,n=v){throw Ge(e)}function ge(e){if(typeof e=="function"&&!e.length)return ge(e());if(Array.isArray(e)){const n=[];for(let t=0;t<e.length;t++){const r=ge(e[t]);Array.isArray(r)?n.push.apply(n,r):n.push(r)}return n}return e}function Et(e,n){return function(r){let s;return I(()=>s=O(()=>(v.context={...v.context,[e]:r.value},oe(()=>r.children))),void 0),s}}const St=Symbol("fallback");function $e(e){for(let n=0;n<e.length;n++)e[n]()}function Ct(e,n,t={}){let r=[],s=[],i=[],o=0,l=n.length>1?[]:null;return xe(()=>$e(i)),()=>{let a=e()||[],u,c;return a[mt],O(()=>{let d=a.length,p,h,m,b,A,N,x,C,L;if(d===0)o!==0&&($e(i),i=[],r=[],s=[],o=0,l&&(l=[])),t.fallback&&(r=[St],s[0]=Y(W=>(i[0]=W,t.fallback())),o=1);else if(o===0){for(s=new Array(d),c=0;c<d;c++)r[c]=a[c],s[c]=Y(f);o=d}else{for(m=new Array(d),b=new Array(d),l&&(A=new Array(d)),N=0,x=Math.min(o,d);N<x&&r[N]===a[N];N++);for(x=o-1,C=d-1;x>=N&&C>=N&&r[x]===a[C];x--,C--)m[C]=s[x],b[C]=i[x],l&&(A[C]=l[x]);for(p=new Map,h=new Array(C+1),c=C;c>=N;c--)L=a[c],u=p.get(L),h[c]=u===void 0?-1:u,p.set(L,c);for(u=N;u<=x;u++)L=r[u],c=p.get(L),c!==void 0&&c!==-1?(m[c]=s[u],b[c]=i[u],l&&(A[c]=l[u]),c=h[c],p.set(L,c)):i[u]();for(c=N;c<d;c++)c in m?(s[c]=m[c],i[c]=b[c],l&&(l[c]=A[c],l[c](c))):s[c]=Y(f);s=s.slice(0,o=d),r=a.slice(0)}return s});function f(d){if(i[c]=d,l){const[p,h]=k(c);return l[c]=h,n(a[c],p)}return n(a[c])}}}function T(e,n){return O(()=>e(n||{}))}function Q(){return!0}const pe={get(e,n,t){return n===z?t:e.get(n)},has(e,n){return n===z?!0:e.has(n)},set:Q,deleteProperty:Q,getOwnPropertyDescriptor(e,n){return{configurable:!0,enumerable:!0,get(){return e.get(n)},set:Q,deleteProperty:Q}},ownKeys(e){return e.keys()}};function he(e){return(e=typeof e=="function"?e():e)?e:{}}function Lt(){for(let e=0,n=this.length;e<n;++e){const t=this[e]();if(t!==void 0)return t}}function ye(...e){let n=!1;for(let o=0;o<e.length;o++){const l=e[o];n=n||!!l&&z in l,e[o]=typeof l=="function"?(n=!0,S(l)):l}if(n)return new Proxy({get(o){for(let l=e.length-1;l>=0;l--){const a=he(e[l])[o];if(a!==void 0)return a}},has(o){for(let l=e.length-1;l>=0;l--)if(o in he(e[l]))return!0;return!1},keys(){const o=[];for(let l=0;l<e.length;l++)o.push(...Object.keys(he(e[l])));return[...new Set(o)]}},pe);const t={},r=Object.create(null);for(let o=e.length-1;o>=0;o--){const l=e[o];if(!l)continue;const a=Object.getOwnPropertyNames(l);for(let u=a.length-1;u>=0;u--){const c=a[u];if(c==="__proto__"||c==="constructor")continue;const f=Object.getOwnPropertyDescriptor(l,c);if(!r[c])r[c]=f.get?{enumerable:!0,configurable:!0,get:Lt.bind(t[c]=[f.get.bind(l)])}:f.value!==void 0?f:void 0;else{const d=t[c];d&&(f.get?d.push(f.get.bind(l)):f.value!==void 0&&d.push(()=>f.value))}}}const s={},i=Object.keys(r);for(let o=i.length-1;o>=0;o--){const l=i[o],a=r[l];a&&a.get?Object.defineProperty(s,l,a):s[l]=a?a.value:void 0}return s}function Ot(e,...n){if(z in e){const s=new Set(n.length>1?n.flat():n[0]),i=n.map(o=>new Proxy({get(l){return o.includes(l)?e[l]:void 0},has(l){return o.includes(l)&&l in e},keys(){return o.filter(l=>l in e)}},pe));return i.push(new Proxy({get(o){return s.has(o)?void 0:e[o]},has(o){return s.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!s.has(o))}},pe)),i}const t={},r=n.map(()=>({}));for(const s of Object.getOwnPropertyNames(e)){const i=Object.getOwnPropertyDescriptor(e,s),o=!i.get&&!i.set&&i.enumerable&&i.writable&&i.configurable;let l=!1,a=0;for(const u of n)u.includes(s)&&(l=!0,o?r[a][s]=i.value:Object.defineProperty(r[a],s,i)),++a;l||(o?t[s]=i.value:Object.defineProperty(t,s,i))}return[...r,t]}function Nt(e){let n,t;const r=s=>{const i=w.context;if(i){const[l,a]=k();w.count||(w.count=0),w.count++,(t||(t=e())).then(u=>{G(i),w.count--,a(()=>u.default),G()}),n=l}else if(!n){const[l]=wt(()=>(t||(t=e())).then(a=>a.default));n=l}let o;return S(()=>(o=n())&&O(()=>{if(!i)return o(s);const l=w.context;G(i);const a=o(s);return G(l),a}))};return r.preload=()=>t||((t=e()).then(s=>n=()=>s.default),t),r}const Ye=e=>`Stale read from <${e}>.`;function Dn(e){const n="fallback"in e&&{fallback:()=>e.fallback};return S(Ct(()=>e.each,e.children,n||void 0))}function Qe(e){const n=e.keyed,t=S(()=>e.when,void 0,{equals:(r,s)=>n?r===s:!r==!s});return S(()=>{const r=t();if(r){const s=e.children;return typeof s=="function"&&s.length>0?O(()=>s(n?r:()=>{if(!O(t))throw Ye("Show");return e.when})):s}return e.fallback},void 0,void 0)}function Un(e){let n=!1;const t=(i,o)=>(n?i[1]===o[1]:!i[1]==!o[1])&&i[2]===o[2],r=oe(()=>e.children),s=S(()=>{let i=r();Array.isArray(i)||(i=[i]);for(let o=0;o<i.length;o++){const l=i[o].when;if(l)return n=!!i[o].keyed,[o,l,i[o]]}return[-1]},void 0,{equals:t});return S(()=>{const[i,o,l]=s();if(i<0)return e.fallback;const a=l.children;return typeof a=="function"&&a.length>0?O(()=>a(n?o:()=>{if(O(s)[0]!==i)throw Ye("Match");return l.when})):a},void 0,void 0)}function Fn(e){return e}const Rt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],$t=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Rt]),Tt=new Set(["innerHTML","textContent","innerText","children"]),kt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),jt=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function _t(e,n){const t=jt[e];return typeof t=="object"?t[n]?t.$:void 0:t}const It=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Mt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Bt(e,n,t){let r=t.length,s=n.length,i=r,o=0,l=0,a=n[s-1].nextSibling,u=null;for(;o<s||l<i;){if(n[o]===t[l]){o++,l++;continue}for(;n[s-1]===t[i-1];)s--,i--;if(s===o){const c=i<r?l?t[l-1].nextSibling:t[i-l]:a;for(;l<i;)e.insertBefore(t[l++],c)}else if(i===l)for(;o<s;)(!u||!u.has(n[o]))&&n[o].remove(),o++;else if(n[o]===t[i-1]&&t[l]===n[s-1]){const c=n[--s].nextSibling;e.insertBefore(t[l++],n[o++].nextSibling),e.insertBefore(t[--i],c),n[s]=t[i]}else{if(!u){u=new Map;let f=l;for(;f<i;)u.set(t[f],f++)}const c=u.get(n[o]);if(c!=null)if(l<c&&c<i){let f=o,d=1,p;for(;++f<s&&f<i&&!((p=u.get(n[f]))==null||p!==c+d);)d++;if(d>c-l){const h=n[o];for(;l<c;)e.insertBefore(t[l++],h)}else e.replaceChild(t[l++],n[o++])}else o++;else n[o++].remove()}}}const Te="_$DX_DELEGATE";function Dt(e,n,t,r={}){let s;return Y(i=>{s=i,n===document?e():ve(n,e(),n.firstChild?null:void 0,t)},r.owner),()=>{s(),n.textContent=""}}function Ze(e,n,t){let r;const s=()=>{const o=document.createElement("template");return o.innerHTML=e,t?o.content.firstChild.firstChild:o.content.firstChild},i=n?()=>O(()=>document.importNode(r||(r=s()),!0)):()=>(r||(r=s())).cloneNode(!0);return i.cloneNode=i,i}function ze(e,n=window.document){const t=n[Te]||(n[Te]=new Set);for(let r=0,s=e.length;r<s;r++){const i=e[r];t.has(i)||(t.add(i),n.addEventListener(i,Ht))}}function we(e,n,t){w.context||(t==null?e.removeAttribute(n):e.setAttribute(n,t))}function Ut(e,n,t,r){w.context||(r==null?e.removeAttributeNS(n,t):e.setAttributeNS(n,t,r))}function et(e,n){w.context||(n==null?e.removeAttribute("class"):e.className=n)}function Ft(e,n,t,r){if(r)Array.isArray(t)?(e[`$$${n}`]=t[0],e[`$$${n}Data`]=t[1]):e[`$$${n}`]=t;else if(Array.isArray(t)){const s=t[0];e.addEventListener(n,t[0]=i=>s.call(e,t[1],i))}else e.addEventListener(n,t)}function Kt(e,n,t={}){const r=Object.keys(n||{}),s=Object.keys(t);let i,o;for(i=0,o=s.length;i<o;i++){const l=s[i];!l||l==="undefined"||n[l]||(ke(e,l,!1),delete t[l])}for(i=0,o=r.length;i<o;i++){const l=r[i],a=!!n[l];!l||l==="undefined"||t[l]===a||!a||(ke(e,l,!0),t[l]=a)}return t}function qt(e,n,t){if(!n)return t?we(e,"style"):n;const r=e.style;if(typeof n=="string")return r.cssText=n;typeof t=="string"&&(r.cssText=t=void 0),t||(t={}),n||(n={});let s,i;for(i in t)n[i]==null&&r.removeProperty(i),delete t[i];for(i in n)s=n[i],s!==t[i]&&(r.setProperty(i,s),t[i]=s);return t}function be(e,n={},t,r){const s={};return r||I(()=>s.children=q(e,n.children,s.children)),I(()=>n.ref&&n.ref(e)),I(()=>Vt(e,n,t,!0,s,!0)),s}function Kn(e,n,t){return O(()=>e(n,t))}function ve(e,n,t,r){if(t!==void 0&&!r&&(r=[]),typeof n!="function")return q(e,n,r,t);I(s=>q(e,n(),s,t),r)}function Vt(e,n,t,r,s={},i=!1){n||(n={});for(const o in s)if(!(o in n)){if(o==="children")continue;s[o]=je(e,o,null,s[o],t,i)}for(const o in n){if(o==="children"){r||q(e,n.children);continue}const l=n[o];s[o]=je(e,o,l,s[o],t,i)}}function Wt(e){return e.toLowerCase().replace(/-([a-z])/g,(n,t)=>t.toUpperCase())}function ke(e,n,t){const r=n.trim().split(/\s+/);for(let s=0,i=r.length;s<i;s++)e.classList.toggle(r[s],t)}function je(e,n,t,r,s,i){let o,l,a,u,c;if(n==="style")return qt(e,t,r);if(n==="classList")return Kt(e,t,r);if(t===r)return r;if(n==="ref")i||t(e);else if(n.slice(0,3)==="on:"){const f=n.slice(3);r&&e.removeEventListener(f,r),t&&e.addEventListener(f,t)}else if(n.slice(0,10)==="oncapture:"){const f=n.slice(10);r&&e.removeEventListener(f,r,!0),t&&e.addEventListener(f,t,!0)}else if(n.slice(0,2)==="on"){const f=n.slice(2).toLowerCase(),d=It.has(f);if(!d&&r){const p=Array.isArray(r)?r[0]:r;e.removeEventListener(f,p)}(d||t)&&(Ft(e,f,t,d),d&&ze([f]))}else if(n.slice(0,5)==="attr:")we(e,n.slice(5),t);else if((c=n.slice(0,5)==="prop:")||(a=Tt.has(n))||!s&&((u=_t(n,e.tagName))||(l=$t.has(n)))||(o=e.nodeName.includes("-"))){if(c)n=n.slice(5),l=!0;else if(w.context)return t;n==="class"||n==="className"?et(e,t):o&&!l&&!a?e[Wt(n)]=t:e[u||n]=t}else{const f=s&&n.indexOf(":")>-1&&Mt[n.split(":")[0]];f?Ut(e,f,n,t):we(e,kt[n]||n,t)}return t}function Ht(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),w.registry&&!w.done&&(w.done=_$HY.done=!0);t;){const r=t[n];if(r&&!t.disabled){const s=t[`${n}Data`];if(s!==void 0?r.call(t,s,e):r.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function q(e,n,t,r,s){if(w.context){!t&&(t=[...e.childNodes]);let l=[];for(let a=0;a<t.length;a++){const u=t[a];u.nodeType===8&&u.data.slice(0,2)==="!$"?u.remove():l.push(u)}t=l}for(;typeof t=="function";)t=t();if(n===t)return t;const i=typeof n,o=r!==void 0;if(e=o&&t[0]&&t[0].parentNode||e,i==="string"||i==="number"){if(w.context)return t;if(i==="number"&&(n=n.toString()),o){let l=t[0];l&&l.nodeType===3?l.data!==n&&(l.data=n):l=document.createTextNode(n),t=K(e,t,r,l)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||i==="boolean"){if(w.context)return t;t=K(e,t,r)}else{if(i==="function")return I(()=>{let l=n();for(;typeof l=="function";)l=l();t=q(e,l,t,r)}),()=>t;if(Array.isArray(n)){const l=[],a=t&&Array.isArray(t);if(Ae(l,n,t,s))return I(()=>t=q(e,l,t,r,!0)),()=>t;if(w.context){if(!l.length)return t;if(r===void 0)return[...e.childNodes];let u=l[0],c=[u];for(;(u=u.nextSibling)!==r;)c.push(u);return t=c}if(l.length===0){if(t=K(e,t,r),o)return t}else a?t.length===0?_e(e,l,r):Bt(e,t,l):(t&&K(e),_e(e,l));t=l}else if(n.nodeType){if(w.context&&n.parentNode)return t=o?[n]:n;if(Array.isArray(t)){if(o)return t=K(e,t,r,n);K(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function Ae(e,n,t,r){let s=!1;for(let i=0,o=n.length;i<o;i++){let l=n[i],a=t&&t[e.length],u;if(!(l==null||l===!0||l===!1))if((u=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))s=Ae(e,l,a)||s;else if(u==="function")if(r){for(;typeof l=="function";)l=l();s=Ae(e,Array.isArray(l)?l:[l],Array.isArray(a)?a:[a])||s}else e.push(l),s=!0;else{const c=String(l);a&&a.nodeType===3&&a.data===c?e.push(a):e.push(document.createTextNode(c))}}return s}function _e(e,n,t=null){for(let r=0,s=n.length;r<s;r++)e.insertBefore(n[r],t)}function K(e,n,t,r){if(t===void 0)return e.textContent="";const s=r||document.createTextNode("");if(n.length){let i=!1;for(let o=n.length-1;o>=0;o--){const l=n[o];if(s!==l){const a=l.parentNode===e;!i&&!o?a?e.replaceChild(s,l):e.insertBefore(s,t):a&&l.remove()}else i=!0}}else e.insertBefore(s,t);return[s]}const Xt=!1,Jt="modulepreload",Gt=function(e){return"/"+e},Ie={},Yt=function(n,t,r){let s=Promise.resolve();if(t&&t.length>0){const i=document.getElementsByTagName("link");s=Promise.all(t.map(o=>{if(o=Gt(o),o in Ie)return;Ie[o]=!0;const l=o.endsWith(".css"),a=l?'[rel="stylesheet"]':"";if(!!r)for(let f=i.length-1;f>=0;f--){const d=i[f];if(d.href===o&&(!l||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${a}`))return;const c=document.createElement("link");if(c.rel=l?"stylesheet":Jt,l||(c.as="script",c.crossOrigin=""),c.href=o,document.head.appendChild(c),l)return new Promise((f,d)=>{c.addEventListener("load",f),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${o}`)))})}))}return s.then(()=>n()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})},Qt=Ee(),Zt=["title","meta"],Me=[],Be=["name","http-equiv","content","charset","media"].concat(["property"]),De=(e,n)=>{const t=Object.fromEntries(Object.entries(e.props).filter(([r])=>n.includes(r)).sort());return(Object.hasOwn(t,"name")||Object.hasOwn(t,"property"))&&(t.name=t.name||t.property,delete t.property),e.tag+JSON.stringify(t)};function zt(){if(!w.context){const t=document.head.querySelectorAll("[data-sm]");Array.prototype.forEach.call(t,r=>r.parentNode.removeChild(r))}const e=new Map;function n(t){if(t.ref)return t.ref;let r=document.querySelector(`[data-sm="${t.id}"]`);return r?(r.tagName.toLowerCase()!==t.tag&&(r.parentNode&&r.parentNode.removeChild(r),r=document.createElement(t.tag)),r.removeAttribute("data-sm")):r=document.createElement(t.tag),r}return{addTag(t){if(Zt.indexOf(t.tag)!==-1){const i=t.tag==="title"?Me:Be,o=De(t,i);e.has(o)||e.set(o,[]);let l=e.get(o),a=l.length;l=[...l,t],e.set(o,l);let u=n(t);t.ref=u,be(u,t.props);let c=null;for(var r=a-1;r>=0;r--)if(l[r]!=null){c=l[r];break}return u.parentNode!=document.head&&document.head.appendChild(u),c&&c.ref&&document.head.removeChild(c.ref),a}let s=n(t);return t.ref=s,be(s,t.props),s.parentNode!=document.head&&document.head.appendChild(s),-1},removeTag(t,r){const s=t.tag==="title"?Me:Be,i=De(t,s);if(t.ref){const o=e.get(i);if(o){if(t.ref.parentNode){t.ref.parentNode.removeChild(t.ref);for(let l=r-1;l>=0;l--)o[l]!=null&&document.head.appendChild(o[l].ref)}o[r]=null,e.set(i,o)}else t.ref.parentNode&&t.ref.parentNode.removeChild(t.ref)}}}}const en=e=>{const n=zt();return T(Qt.Provider,{value:n,get children(){return e.children}})};function tt(){let e=new Set;function n(s){return e.add(s),()=>e.delete(s)}let t=!1;function r(s,i){if(t)return!(t=!1);const o={to:s,options:i,defaultPrevented:!1,preventDefault:()=>o.defaultPrevented=!0};for(const l of e)l.listener({...o,from:l.location,retry:a=>{a&&(t=!0),l.navigate(s,{...i,resolve:!1})}});return!o.defaultPrevented}return{subscribe:n,confirm:r}}let Pe;function Le(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},""),Pe=window.history.state._depth}Le();function tn(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function nn(e,n){let t=!1;return()=>{const r=Pe;Le();const s=r==null?null:Pe-r;if(t){t=!1;return}s&&n(s)?(t=!0,window.history.go(-s)):e()}}const rn=/^(?:[a-z0-9]+:)?\/\//i,sn=/^\/+|(\/)\/+$/g,nt="http://sr";function U(e,n=!1){const t=e.replace(sn,"$1");return t?n||/^[?#]/.test(t)?t:"/"+t:""}function Z(e,n,t){if(rn.test(n))return;const r=U(e),s=t&&U(t);let i="";return!s||n.startsWith("/")?i=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?i=r+s:i=s,(i||"/")+U(n,!i)}function on(e,n){if(e==null)throw new Error(n);return e}function ln(e,n){return U(e).replace(/\/*(\*.*)?$/g,"")+U(n)}function rt(e){const n={};return e.searchParams.forEach((t,r)=>{n[r]=t}),n}function cn(e,n,t){const[r,s]=e.split("/*",2),i=r.split("/").filter(Boolean),o=i.length;return l=>{const a=l.split("/").filter(Boolean),u=a.length-o;if(u<0||u>0&&s===void 0&&!n)return null;const c={path:o?"":"/",params:{}},f=d=>t===void 0?void 0:t[d];for(let d=0;d<o;d++){const p=i[d],h=a[d],m=p[0]===":",b=m?p.slice(1):p;if(m&&me(h,f(b)))c.params[b]=h;else if(m||!me(h,p))return null;c.path+=`/${h}`}if(s){const d=u?a.slice(-u).join("/"):"";if(me(d,f(s)))c.params[s]=d;else return null}return c}}function me(e,n){const t=r=>r.localeCompare(e,void 0,{sensitivity:"base"})===0;return n===void 0?!0:typeof n=="string"?t(n):typeof n=="function"?n(e):Array.isArray(n)?n.some(t):n instanceof RegExp?n.test(e):!1}function an(e){const[n,t]=e.pattern.split("/*",2),r=n.split("/").filter(Boolean);return r.reduce((s,i)=>s+(i.startsWith(":")?2:3),r.length-(t===void 0?0:1))}function st(e){const n=new Map,t=qe();return new Proxy({},{get(r,s){return n.has(s)||Ve(t,()=>n.set(s,S(()=>e()[s]))),n.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function ot(e){let n=/(\/?\:[^\/]+)\?/.exec(e);if(!n)return[e];let t=e.slice(0,n.index),r=e.slice(n.index+n[0].length);const s=[t,t+=n[1]];for(;n=/^(\/\:[^\/]+)\?/.exec(r);)s.push(t+=n[1]),r=r.slice(n[0].length);return ot(r).reduce((i,o)=>[...i,...s.map(l=>l+o)],[])}const un=100,it=Ee(),ce=Ee(),Oe=()=>on(Se(it),"Make sure your app is wrapped in a <Router />"),lt=()=>Se(ce)||Oe().base,fn=e=>{const n=lt();return S(()=>n.resolvePath(e()))},dn=e=>{const n=Oe();return S(()=>{const t=e();return t!==void 0?n.renderPath(t):t})},ct=()=>Oe().location,qn=()=>lt().params;function hn(e,n=""){const{component:t,load:r,children:s,info:i}=e,o=!s||Array.isArray(s)&&!s.length,l={key:e,component:t,load:r,info:i};return at(e.path).reduce((a,u)=>{for(const c of ot(u)){const f=ln(n,c);let d=o?f:f.split("/*",1)[0];d=d.split("/").map(p=>p.startsWith(":")||p.startsWith("*")?p:encodeURIComponent(p)).join("/"),a.push({...l,originalPath:c,pattern:d,matcher:cn(d,!o,e.matchFilters)})}return a},[])}function mn(e,n=0){return{routes:e,score:an(e[e.length-1])*1e4-n,matcher(t){const r=[];for(let s=e.length-1;s>=0;s--){const i=e[s],o=i.matcher(t);if(!o)return null;r.unshift({...o,route:i})}return r}}}function at(e){return Array.isArray(e)?e:[e]}function ut(e,n="",t=[],r=[]){const s=at(e);for(let i=0,o=s.length;i<o;i++){const l=s[i];if(l&&typeof l=="object"){l.hasOwnProperty("path")||(l.path="");const a=hn(l,n);for(const u of a){t.push(u);const c=Array.isArray(l.children)&&l.children.length===0;if(l.children&&!c)ut(l.children,u.pattern,t,r);else{const f=mn([...t],r.length);r.push(f)}t.pop()}}}return t.length?r:r.sort((i,o)=>o.score-i.score)}function ft(e,n){for(let t=0,r=e.length;t<r;t++){const s=e[t].matcher(n);if(s)return s}return[]}function gn(e,n){const t=new URL(nt),r=S(a=>{const u=e();try{return new URL(u,t)}catch{return console.error(`Invalid path ${u}`),a}},t,{equals:(a,u)=>a.href===u.href}),s=S(()=>r().pathname),i=S(()=>r().search,!0),o=S(()=>r().hash),l=()=>"";return{get pathname(){return s()},get search(){return i()},get hash(){return o()},get state(){return n()},get key(){return l()},query:st(Ke(i,()=>rt(r())))}}let D;function pn(e,n,t,r={}){const{signal:[s,i],utils:o={}}=e,l=o.parsePath||(g=>g),a=o.renderPath||(g=>g),u=o.beforeLeave||tt(),c=Z("",r.base||"");if(c===void 0)throw new Error(`${c} is not a valid base path`);c&&!s().value&&i({value:c,replace:!0,scroll:!1});const[f,d]=k(!1),p=async g=>{d(!0);try{await bt(g)}finally{d(!1)}},[h,m]=k(s().value),[b,A]=k(s().state),N=gn(h,b),x=[],C=k([]),L={pattern:c,params:{},path:()=>c,outlet:()=>null,resolvePath(g){return Z(c,g)}};return I(()=>{const{value:g,state:y}=s();O(()=>{g!==h()&&p(()=>{D="native",m(g),A(y),C[1]([])}).then(()=>{D=void 0})})}),{base:L,location:N,isRouting:f,renderPath:a,parsePath:l,navigatorFactory:H,beforeLeave:u,preloadRoute:E,singleFlight:r.singleFlight===void 0?!0:r.singleFlight,submissions:C};function W(g,y,$){O(()=>{if(typeof y=="number"){y&&(o.go?o.go(y):console.warn("Router integration does not support relative routing"));return}const{replace:ae,resolve:ue,scroll:F,state:J}={replace:!1,resolve:!0,scroll:!0,...$},B=ue?g.resolvePath(y):Z("",y);if(B===void 0)throw new Error(`Path '${y}' is not a routable path`);if(x.length>=un)throw new Error("Too many redirects");const Ne=h();if((B!==Ne||J!==b())&&!Xt){if(u.confirm(B,$)){const dt=x.push({value:Ne,replace:ae,scroll:F,state:b()});p(()=>{D="navigate",m(B),A(J),C[1]([])}).then(()=>{x.length===dt&&(D=void 0,X({value:B,state:J}))})}}})}function H(g){return g=g||Se(ce)||L,(y,$)=>W(g,y,$)}function X(g){const y=x[0];y&&((g.value!==y.value||g.state!==y.state)&&i({...g,replace:y.replace,scroll:y.scroll}),x.length=0)}function E(g,y){const $=ft(t(),g.pathname),ae=D;D="preload";for(let ue in $){const{route:F,params:J}=$[ue];F.component&&F.component.preload&&F.component.preload();const{load:B}=F;y&&B&&Ve(n(),()=>B({params:J,location:{pathname:g.pathname,search:g.search,hash:g.hash,query:rt(g),state:null,key:""},intent:"preload"}))}D=ae}}function yn(e,n,t,r,s){const{base:i,location:o}=e,{pattern:l,component:a,load:u}=r().route,c=S(()=>r().path);a&&a.preload&&a.preload();const f=u?u({params:s,location:o,intent:D||"initial"}):void 0;return{parent:n,pattern:l,path:c,params:s,outlet:()=>a?T(a,{params:s,location:o,data:f,get children(){return t()}}):t(),resolvePath(p){return Z(i.path(),p,c())}}}const wn=e=>n=>{const{base:t}=n,r=oe(()=>n.children),s=S(()=>ut(n.root?{component:n.root,load:n.rootLoad,children:r()}:r(),n.base||""));let i;const o=pn(e,()=>i,s,{base:t,singleFlight:n.singleFlight});return e.create&&e.create(o),T(it.Provider,{value:o,get children(){return[S(()=>(i=qe())&&null),T(bn,{routerState:o,get branches(){return s()}})]}})};function bn(e){const n=S(()=>ft(e.branches,e.routerState.location.pathname)),t=st(()=>{const o=n(),l={};for(let a=0;a<o.length;a++)Object.assign(l,o[a].params);return l}),r=[];let s;const i=S(Ke(n,(o,l,a)=>{let u=l&&o.length===l.length;const c=[];for(let f=0,d=o.length;f<d;f++){const p=l&&l[f],h=o[f];a&&p&&h.route.key===p.route.key?c[f]=a[f]:(u=!1,r[f]&&r[f](),Y(m=>{r[f]=m,c[f]=yn(e.routerState,c[f-1]||e.routerState.base,vn(()=>i()[f+1]),()=>n()[f],t)}))}return r.splice(o.length).forEach(f=>f()),a&&u?a:(s=c[0],c)}));return T(Qe,{get when(){return i()&&s},keyed:!0,children:o=>T(ce.Provider,{value:o,get children(){return o.outlet()}})})}const vn=e=>()=>T(Qe,{get when(){return e()},keyed:!0,children:n=>T(ce.Provider,{value:n,get children(){return n.outlet()}})}),An=e=>{const n=oe(()=>e.children);return ye(e,{get children(){return n()}})};function Pn([e,n],t,r){return[t?()=>t(e()):e,r?s=>n(r(s)):n]}function xn(e){if(e==="#")return null;try{return document.querySelector(e)}catch{return null}}function En(e){let n=!1;const t=s=>typeof s=="string"?{value:s}:s,r=Pn(k(t(e.get()),{equals:(s,i)=>s.value===i.value}),void 0,s=>(!n&&e.set(s),s));return e.init&&xe(e.init((s=e.get())=>{n=!0,r[1](t(s)),n=!1})),wn({signal:r,create:e.create,utils:e.utils})}function Sn(e,n,t){return e.addEventListener(n,t),()=>e.removeEventListener(n,t)}function Cn(e,n){const t=xn(`#${e}`);t?t.scrollIntoView():n&&window.scrollTo(0,0)}const Ln=new Map;function On(e=!0,n=!1,t="/_server"){return r=>{const s=r.base.path(),i=r.navigatorFactory(r.base);let o={};function l(h){return h.namespaceURI==="http://www.w3.org/2000/svg"}function a(h){if(h.defaultPrevented||h.button!==0||h.metaKey||h.altKey||h.ctrlKey||h.shiftKey)return;const m=h.composedPath().find(L=>L instanceof Node&&L.nodeName.toUpperCase()==="A");if(!m||n&&!m.hasAttribute("link"))return;const b=l(m),A=b?m.href.baseVal:m.href;if((b?m.target.baseVal:m.target)||!A&&!m.hasAttribute("state"))return;const x=(m.getAttribute("rel")||"").split(/\s+/);if(m.hasAttribute("download")||x&&x.includes("external"))return;const C=b?new URL(A,document.baseURI):new URL(A);if(!(C.origin!==window.location.origin||s&&C.pathname&&!C.pathname.toLowerCase().startsWith(s.toLowerCase())))return[m,C]}function u(h){const m=a(h);if(!m)return;const[b,A]=m,N=r.parsePath(A.pathname+A.search+A.hash),x=b.getAttribute("state");h.preventDefault(),i(N,{resolve:!1,replace:b.hasAttribute("replace"),scroll:!b.hasAttribute("noscroll"),state:x&&JSON.parse(x)})}function c(h){const m=a(h);if(!m)return;const[b,A]=m;o[A.pathname]||r.preloadRoute(A,b.getAttribute("preload")!=="false")}function f(h){const m=a(h);if(!m)return;const[b,A]=m;o[A.pathname]||(o[A.pathname]=setTimeout(()=>{r.preloadRoute(A,b.getAttribute("preload")!=="false"),delete o[A.pathname]},200))}function d(h){const m=a(h);if(!m)return;const[,b]=m;o[b.pathname]&&(clearTimeout(o[b.pathname]),delete o[b.pathname])}function p(h){let m=h.submitter&&h.submitter.hasAttribute("formaction")?h.submitter.getAttribute("formaction"):h.target.getAttribute("action");if(!m)return;if(!m.startsWith("https://action/")){const A=new URL(m,nt);if(m=r.parsePath(A.pathname+A.search),!m.startsWith(t))return}if(h.target.method.toUpperCase()!=="POST")throw new Error("Only POST forms are supported for Actions");const b=Ln.get(m);if(b){h.preventDefault();const A=new FormData(h.target);h.submitter&&h.submitter.name&&A.append(h.submitter.name,h.submitter.value),b.call(r,A)}}ze(["click","submit"]),document.addEventListener("click",u),e&&(document.addEventListener("mouseover",f),document.addEventListener("mouseout",d),document.addEventListener("focusin",c),document.addEventListener("touchstart",c)),document.addEventListener("submit",p),xe(()=>{document.removeEventListener("click",u),e&&(document.removeEventListener("mouseover",f),document.removeEventListener("mouseout",d),document.removeEventListener("focusin",c),document.removeEventListener("touchstart",c)),document.removeEventListener("submit",p)})}}function Nn(e){const n=()=>({value:window.location.pathname+window.location.search+window.location.hash,state:window.history.state}),t=tt();return En({get:n,set({value:r,replace:s,scroll:i,state:o}){s?window.history.replaceState(tn(o),"",r):window.history.pushState(o,"",r),Cn(window.location.hash.slice(1),i),Le()},init:r=>Sn(window,"popstate",nn(r,s=>{if(s&&s<0)return!t.confirm(s);{const i=n();return!t.confirm(i.value,{state:i.state})}})),create:On(e.preload,e.explicitLinks,e.actionBase),utils:{go:r=>window.history.go(r),beforeLeave:t}})(e)}var Rn=Ze("<a>");function $n(e){e=ye({inactiveClass:"inactive",activeClass:"active"},e);const[,n]=Ot(e,["href","state","class","activeClass","inactiveClass","end"]),t=fn(()=>e.href),r=dn(t),s=ct(),i=S(()=>{const o=t();if(o===void 0)return[!1,!1];const l=U(o.split(/[?#]/,1)[0]).toLowerCase(),a=U(s.pathname).toLowerCase();return[e.end?l===a:a.startsWith(l),l===a]});return(()=>{var o=Rn();return be(o,ye(n,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!i()[0],[e.activeClass]:i()[0],...n.classList}},link:"",get"aria-current"(){return i()[1]?"page":void 0}}),!1,!1),o})()}var Tn=Ze("<div class=root><header><div class=title-nav><h1></h1></div><nav id=topnav></nav></header><div><div class=main>");const kn=Nt(()=>Yt(()=>import("./Home-DxL75Pfz.js"),__vite__mapDeps([0,1])));function jn(){return T(en,{get children(){return T(Nn,{root:_n,get children(){return T(An,{path:"/",component:kn})}})}})}function _n(e){let n=ct(),t=S(()=>n.pathname.split("/")[1]);const r=()=>`on-${t()||"home"}`;return(()=>{var s=Tn(),i=s.firstChild,o=i.firstChild,l=o.firstChild,a=i.nextSibling,u=a.firstChild;return ve(l,T($n,{href:"/",children:"Woodpecker Chess Tactics"})),ve(u,()=>e.children),I(()=>et(a,"main-wrap "+r())),s})()}const In=document.getElementById("root");Dt(()=>T(jn,{}),In);export{Dn as F,Fn as M,Qe as S,pt as a,Kn as b,k as c,ze as d,T as e,Un as f,I as g,et as h,ve as i,Mn as j,S as k,qn as l,ye as m,wt as n,Bn as o,Ke as p,Ze as t,O as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Home-DxL75Pfz.js","assets/Home-HHy3xHKP.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
