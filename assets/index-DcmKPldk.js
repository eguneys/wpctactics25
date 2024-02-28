(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();const w={context:void 0,registry:void 0};function G(e){w.context=e}const yt=(e,t)=>e===t,ee=Symbol("solid-proxy"),wt=Symbol("solid-track"),te={equals:yt};let qe=Ge;const D=1,ne=2,Ke={owned:null,cleanups:null,context:null,owner:null},de={};var v=null;let he=null,bt=null,P=null,R=null,j=null,oe=0;function Y(e,t){const n=P,r=v,s=e.length===0,l=t===void 0?r:t,o=s?Ke:{owned:null,cleanups:null,context:l?l.context:null,owner:l},i=s?e:()=>e(()=>O(()=>ce(o)));v=o,P=null;try{return _(i,!0)}finally{P=n,v=r}}function k(e,t){t=t?Object.assign({},te,t):te;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),Je(n,s));return[Xe.bind(n),r]}function Re(e,t,n){const r=le(e,t,!0,D);V(r)}function I(e,t,n){const r=le(e,t,!1,D);V(r)}function vt(e,t,n){qe=Lt;const r=le(e,t,!1,D);(!n||!n.render)&&(r.user=!0),j?j.push(r):V(r)}function S(e,t,n){n=n?Object.assign({},te,n):te;const r=le(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,V(r),Xe.bind(r)}function At(e){return e&&typeof e=="object"&&"then"in e}function Pt(e,t,n){let r,s,l;arguments.length===2&&typeof t=="object"||arguments.length===1?(r=!0,s=e,l=t||{}):(r=e,s=t,l=n||{});let o=null,i=de,a=null,u=!1,c="initialValue"in l,f=typeof r=="function"&&S(r);const d=new Set,[p,h]=(l.storage||k)(l.initialValue),[m,b]=k(void 0),[A,N]=k(void 0,{equals:!1}),[x,C]=k(c?"ready":"unresolved");if(w.context){a=`${w.context.id}${w.context.count++}`;let E;l.ssrLoadFrom==="initial"?i=l.initialValue:w.load&&(E=w.load(a))&&(i=E)}function L(E,g,y,T){return o===E&&(o=null,T!==void 0&&(c=!0),(E===i||g===i)&&l.onHydrated&&queueMicrotask(()=>l.onHydrated(T,{value:g})),i=de,W(g,y)),g}function W(E,g){_(()=>{g===void 0&&h(()=>E),C(g!==void 0?"errored":c?"ready":"unresolved"),b(g);for(const y of d.keys())y.decrement();d.clear()},!1)}function H(){const E=Et,g=p(),y=m();if(y!==void 0&&!o)throw y;return P&&!P.user&&E&&Re(()=>{A(),o&&(E.resolved||d.has(E)||(E.increment(),d.add(E)))}),g}function X(E=!0){if(E!==!1&&u)return;u=!1;const g=f?f():r;if(g==null||g===!1){L(o,O(p));return}const y=i!==de?i:O(()=>s(g,{value:p(),refetching:E}));return At(y)?(o=y,"value"in y?(y.status==="success"?L(o,y.value,void 0,g):L(o,void 0,void 0,g),y):(u=!0,queueMicrotask(()=>u=!1),_(()=>{C(c?"refreshing":"pending"),N()},!1),y.then(T=>L(y,T,void 0,g),T=>L(y,void 0,Qe(T),g)))):(L(o,y,void 0,g),y)}return Object.defineProperties(H,{state:{get:()=>x()},error:{get:()=>m()},loading:{get(){const E=x();return E==="pending"||E==="refreshing"}},latest:{get(){if(!c)return H();const E=m();if(E&&!o)throw E;return p()}}}),f?Re(()=>X(!1)):X(!1),[H,{refetch:X,mutate:h}]}function Bn(e){return _(e,!1)}function O(e){if(P===null)return e();const t=P;P=null;try{return e()}finally{P=t}}function Ve(e,t,n){const r=Array.isArray(e);let s,l=n&&n.defer;return o=>{let i;if(r){i=Array(e.length);for(let u=0;u<e.length;u++)i[u]=e[u]()}else i=e();if(l){l=!1;return}const a=O(()=>t(i,s,o));return s=i,a}}function Un(e){vt(()=>O(e))}function xe(e){return v===null||(v.cleanups===null?v.cleanups=[e]:v.cleanups.push(e)),e}function We(){return v}function He(e,t){const n=v,r=P;v=e,P=null;try{return _(t,!0)}catch(s){Ce(s)}finally{v=n,P=r}}function xt(e){const t=P,n=v;return Promise.resolve().then(()=>{P=t,v=n;let r;return _(e,!1),P=v=null,r?r.done:void 0})}function Ee(e,t){const n=Symbol("context");return{id:n,Provider:Ot(n),defaultValue:e}}function Se(e){return v&&v.context&&v.context[e.id]!==void 0?v.context[e.id]:e.defaultValue}function ie(e){const t=S(e),n=S(()=>pe(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let Et;function Xe(){if(this.sources&&this.state)if(this.state===D)V(this);else{const e=R;R=null,_(()=>se(this),!1),R=e}if(P){const e=this.observers?this.observers.length:0;P.sources?(P.sources.push(this),P.sourceSlots.push(e)):(P.sources=[this],P.sourceSlots=[e]),this.observers?(this.observers.push(P),this.observerSlots.push(P.sources.length-1)):(this.observers=[P],this.observerSlots=[P.sources.length-1])}return this.value}function Je(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&_(()=>{for(let s=0;s<e.observers.length;s+=1){const l=e.observers[s],o=he&&he.running;o&&he.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?R.push(l):j.push(l),l.observers&&Ye(l)),o||(l.state=D)}if(R.length>1e6)throw R=[],new Error},!1)),t}function V(e){if(!e.fn)return;ce(e);const t=oe;St(e,e.value,t)}function St(e,t,n){let r;const s=v,l=P;P=v=e;try{r=e.fn(t)}catch(o){return e.pure&&(e.state=D,e.owned&&e.owned.forEach(ce),e.owned=null),e.updatedAt=n+1,Ce(o)}finally{P=l,v=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Je(e,r):e.value=r,e.updatedAt=n)}function le(e,t,n,r=D,s){const l={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:v,context:v?v.context:null,pure:n};return v===null||v!==Ke&&(v.owned?v.owned.push(l):v.owned=[l]),l}function re(e){if(e.state===0)return;if(e.state===ne)return se(e);if(e.suspense&&O(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<oe);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===D)V(e);else if(e.state===ne){const r=R;R=null,_(()=>se(e,t[0]),!1),R=r}}function _(e,t){if(R)return e();let n=!1;t||(R=[]),j?n=!0:j=[],oe++;try{const r=e();return Ct(n),r}catch(r){n||(j=null),R=null,Ce(r)}}function Ct(e){if(R&&(Ge(R),R=null),e)return;const t=j;j=null,t.length&&_(()=>qe(t),!1)}function Ge(e){for(let t=0;t<e.length;t++)re(e[t])}function Lt(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:re(r)}if(w.context){if(w.count){w.effects||(w.effects=[]),w.effects.push(...e.slice(0,n));return}else w.effects&&(e=[...w.effects,...e],n+=w.effects.length,delete w.effects);G()}for(t=0;t<n;t++)re(e[t])}function se(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const s=r.state;s===D?r!==t&&(!r.updatedAt||r.updatedAt<oe)&&re(r):s===ne&&se(r,t)}}}function Ye(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=ne,n.pure?R.push(n):j.push(n),n.observers&&Ye(n))}}function ce(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const l=s.pop(),o=n.observerSlots.pop();r<s.length&&(l.sourceSlots[o]=r,s[r]=l,n.observerSlots[r]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)ce(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Qe(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ce(e,t=v){throw Qe(e)}function pe(e){if(typeof e=="function"&&!e.length)return pe(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=pe(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function Ot(e,t){return function(r){let s;return I(()=>s=O(()=>(v.context={...v.context,[e]:r.value},ie(()=>r.children))),void 0),s}}const Nt=Symbol("fallback");function $e(e){for(let t=0;t<e.length;t++)e[t]()}function Rt(e,t,n={}){let r=[],s=[],l=[],o=0,i=t.length>1?[]:null;return xe(()=>$e(l)),()=>{let a=e()||[],u,c;return a[wt],O(()=>{let d=a.length,p,h,m,b,A,N,x,C,L;if(d===0)o!==0&&($e(l),l=[],r=[],s=[],o=0,i&&(i=[])),n.fallback&&(r=[Nt],s[0]=Y(W=>(l[0]=W,n.fallback())),o=1);else if(o===0){for(s=new Array(d),c=0;c<d;c++)r[c]=a[c],s[c]=Y(f);o=d}else{for(m=new Array(d),b=new Array(d),i&&(A=new Array(d)),N=0,x=Math.min(o,d);N<x&&r[N]===a[N];N++);for(x=o-1,C=d-1;x>=N&&C>=N&&r[x]===a[C];x--,C--)m[C]=s[x],b[C]=l[x],i&&(A[C]=i[x]);for(p=new Map,h=new Array(C+1),c=C;c>=N;c--)L=a[c],u=p.get(L),h[c]=u===void 0?-1:u,p.set(L,c);for(u=N;u<=x;u++)L=r[u],c=p.get(L),c!==void 0&&c!==-1?(m[c]=s[u],b[c]=l[u],i&&(A[c]=i[u]),c=h[c],p.set(L,c)):l[u]();for(c=N;c<d;c++)c in m?(s[c]=m[c],l[c]=b[c],i&&(i[c]=A[c],i[c](c))):s[c]=Y(f);s=s.slice(0,o=d),r=a.slice(0)}return s});function f(d){if(l[c]=d,i){const[p,h]=k(c);return i[c]=h,t(a[c],p)}return t(a[c])}}}function $(e,t){return O(()=>e(t||{}))}function Q(){return!0}const ye={get(e,t,n){return t===ee?n:e.get(t)},has(e,t){return t===ee?!0:e.has(t)},set:Q,deleteProperty:Q,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Q,deleteProperty:Q}},ownKeys(e){return e.keys()}};function me(e){return(e=typeof e=="function"?e():e)?e:{}}function $t(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function we(...e){let t=!1;for(let o=0;o<e.length;o++){const i=e[o];t=t||!!i&&ee in i,e[o]=typeof i=="function"?(t=!0,S(i)):i}if(t)return new Proxy({get(o){for(let i=e.length-1;i>=0;i--){const a=me(e[i])[o];if(a!==void 0)return a}},has(o){for(let i=e.length-1;i>=0;i--)if(o in me(e[i]))return!0;return!1},keys(){const o=[];for(let i=0;i<e.length;i++)o.push(...Object.keys(me(e[i])));return[...new Set(o)]}},ye);const n={},r=Object.create(null);for(let o=e.length-1;o>=0;o--){const i=e[o];if(!i)continue;const a=Object.getOwnPropertyNames(i);for(let u=a.length-1;u>=0;u--){const c=a[u];if(c==="__proto__"||c==="constructor")continue;const f=Object.getOwnPropertyDescriptor(i,c);if(!r[c])r[c]=f.get?{enumerable:!0,configurable:!0,get:$t.bind(n[c]=[f.get.bind(i)])}:f.value!==void 0?f:void 0;else{const d=n[c];d&&(f.get?d.push(f.get.bind(i)):f.value!==void 0&&d.push(()=>f.value))}}}const s={},l=Object.keys(r);for(let o=l.length-1;o>=0;o--){const i=l[o],a=r[i];a&&a.get?Object.defineProperty(s,i,a):s[i]=a?a.value:void 0}return s}function Tt(e,...t){if(ee in e){const s=new Set(t.length>1?t.flat():t[0]),l=t.map(o=>new Proxy({get(i){return o.includes(i)?e[i]:void 0},has(i){return o.includes(i)&&i in e},keys(){return o.filter(i=>i in e)}},ye));return l.push(new Proxy({get(o){return s.has(o)?void 0:e[o]},has(o){return s.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!s.has(o))}},ye)),l}const n={},r=t.map(()=>({}));for(const s of Object.getOwnPropertyNames(e)){const l=Object.getOwnPropertyDescriptor(e,s),o=!l.get&&!l.set&&l.enumerable&&l.writable&&l.configurable;let i=!1,a=0;for(const u of t)u.includes(s)&&(i=!0,o?r[a][s]=l.value:Object.defineProperty(r[a],s,l)),++a;i||(o?n[s]=l.value:Object.defineProperty(n,s,l))}return[...r,n]}function Ze(e){let t,n;const r=s=>{const l=w.context;if(l){const[i,a]=k();w.count||(w.count=0),w.count++,(n||(n=e())).then(u=>{G(l),w.count--,a(()=>u.default),G()}),t=i}else if(!t){const[i]=Pt(()=>(n||(n=e())).then(a=>a.default));t=i}let o;return S(()=>(o=t())&&O(()=>{if(!l)return o(s);const i=w.context;G(l);const a=o(s);return G(i),a}))};return r.preload=()=>n||((n=e()).then(s=>t=()=>s.default),n),r}const ze=e=>`Stale read from <${e}>.`;function Fn(e){const t="fallback"in e&&{fallback:()=>e.fallback};return S(Rt(()=>e.each,e.children,t||void 0))}function et(e){const t=e.keyed,n=S(()=>e.when,void 0,{equals:(r,s)=>t?r===s:!r==!s});return S(()=>{const r=n();if(r){const s=e.children;return typeof s=="function"&&s.length>0?O(()=>s(t?r:()=>{if(!O(n))throw ze("Show");return e.when})):s}return e.fallback},void 0,void 0)}function qn(e){let t=!1;const n=(l,o)=>(t?l[1]===o[1]:!l[1]==!o[1])&&l[2]===o[2],r=ie(()=>e.children),s=S(()=>{let l=r();Array.isArray(l)||(l=[l]);for(let o=0;o<l.length;o++){const i=l[o].when;if(i)return t=!!l[o].keyed,[o,i,l[o]]}return[-1]},void 0,{equals:n});return S(()=>{const[l,o,i]=s();if(l<0)return e.fallback;const a=i.children;return typeof a=="function"&&a.length>0?O(()=>a(t?o:()=>{if(O(s)[0]!==l)throw ze("Match");return i.when})):a},void 0,void 0)}function Kn(e){return e}const kt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],_t=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...kt]),jt=new Set(["innerHTML","textContent","innerText","children"]),It=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Dt=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Mt(e,t){const n=Dt[e];return typeof n=="object"?n[t]?n.$:void 0:n}const Bt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Ut={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Ft(e,t,n){let r=n.length,s=t.length,l=r,o=0,i=0,a=t[s-1].nextSibling,u=null;for(;o<s||i<l;){if(t[o]===n[i]){o++,i++;continue}for(;t[s-1]===n[l-1];)s--,l--;if(s===o){const c=l<r?i?n[i-1].nextSibling:n[l-i]:a;for(;i<l;)e.insertBefore(n[i++],c)}else if(l===i)for(;o<s;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[i]===t[s-1]){const c=t[--s].nextSibling;e.insertBefore(n[i++],t[o++].nextSibling),e.insertBefore(n[--l],c),t[s]=n[l]}else{if(!u){u=new Map;let f=i;for(;f<l;)u.set(n[f],f++)}const c=u.get(t[o]);if(c!=null)if(i<c&&c<l){let f=o,d=1,p;for(;++f<s&&f<l&&!((p=u.get(t[f]))==null||p!==c+d);)d++;if(d>c-i){const h=t[o];for(;i<c;)e.insertBefore(n[i++],h)}else e.replaceChild(n[i++],t[o++])}else o++;else t[o++].remove()}}}const Te="_$DX_DELEGATE";function qt(e,t,n,r={}){let s;return Y(l=>{s=l,t===document?e():Z(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{s(),t.textContent=""}}function tt(e,t,n){let r;const s=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},l=t?()=>O(()=>document.importNode(r||(r=s()),!0)):()=>(r||(r=s())).cloneNode(!0);return l.cloneNode=l,l}function nt(e,t=window.document){const n=t[Te]||(t[Te]=new Set);for(let r=0,s=e.length;r<s;r++){const l=e[r];n.has(l)||(n.add(l),t.addEventListener(l,Gt))}}function be(e,t,n){w.context||(n==null?e.removeAttribute(t):e.setAttribute(t,n))}function Kt(e,t,n,r){w.context||(r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r))}function rt(e,t){w.context||(t==null?e.removeAttribute("class"):e.className=t)}function Vt(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=l=>s.call(e,n[1],l))}else e.addEventListener(t,n)}function Wt(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let l,o;for(l=0,o=s.length;l<o;l++){const i=s[l];!i||i==="undefined"||t[i]||(ke(e,i,!1),delete n[i])}for(l=0,o=r.length;l<o;l++){const i=r[l],a=!!t[i];!i||i==="undefined"||n[i]===a||!a||(ke(e,i,!0),n[i]=a)}return n}function Ht(e,t,n){if(!t)return n?be(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let s,l;for(l in n)t[l]==null&&r.removeProperty(l),delete n[l];for(l in t)s=t[l],s!==n[l]&&(r.setProperty(l,s),n[l]=s);return n}function ve(e,t={},n,r){const s={};return r||I(()=>s.children=K(e,t.children,s.children)),I(()=>t.ref&&t.ref(e)),I(()=>Xt(e,t,n,!0,s,!0)),s}function Vn(e,t,n){return O(()=>e(t,n))}function Z(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return K(e,t,r,n);I(s=>K(e,t(),s,n),r)}function Xt(e,t,n,r,s={},l=!1){t||(t={});for(const o in s)if(!(o in t)){if(o==="children")continue;s[o]=_e(e,o,null,s[o],n,l)}for(const o in t){if(o==="children"){r||K(e,t.children);continue}const i=t[o];s[o]=_e(e,o,i,s[o],n,l)}}function Jt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function ke(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,l=r.length;s<l;s++)e.classList.toggle(r[s],n)}function _e(e,t,n,r,s,l){let o,i,a,u,c;if(t==="style")return Ht(e,n,r);if(t==="classList")return Wt(e,n,r);if(n===r)return r;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const f=t.slice(3);r&&e.removeEventListener(f,r),n&&e.addEventListener(f,n)}else if(t.slice(0,10)==="oncapture:"){const f=t.slice(10);r&&e.removeEventListener(f,r,!0),n&&e.addEventListener(f,n,!0)}else if(t.slice(0,2)==="on"){const f=t.slice(2).toLowerCase(),d=Bt.has(f);if(!d&&r){const p=Array.isArray(r)?r[0]:r;e.removeEventListener(f,p)}(d||n)&&(Vt(e,f,n,d),d&&nt([f]))}else if(t.slice(0,5)==="attr:")be(e,t.slice(5),n);else if((c=t.slice(0,5)==="prop:")||(a=jt.has(t))||!s&&((u=Mt(t,e.tagName))||(i=_t.has(t)))||(o=e.nodeName.includes("-"))){if(c)t=t.slice(5),i=!0;else if(w.context)return n;t==="class"||t==="className"?rt(e,n):o&&!i&&!a?e[Jt(t)]=n:e[u||t]=n}else{const f=s&&t.indexOf(":")>-1&&Ut[t.split(":")[0]];f?Kt(e,f,t,n):be(e,It[t]||t,n)}return n}function Gt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),w.registry&&!w.done&&(w.done=_$HY.done=!0);n;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function K(e,t,n,r,s){if(w.context){!n&&(n=[...e.childNodes]);let i=[];for(let a=0;a<n.length;a++){const u=n[a];u.nodeType===8&&u.data.slice(0,2)==="!$"?u.remove():i.push(u)}n=i}for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=r!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(w.context)return n;if(l==="number"&&(t=t.toString()),o){let i=n[0];i&&i.nodeType===3?i.data!==t&&(i.data=t):i=document.createTextNode(t),n=q(e,n,r,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(w.context)return n;n=q(e,n,r)}else{if(l==="function")return I(()=>{let i=t();for(;typeof i=="function";)i=i();n=K(e,i,n,r)}),()=>n;if(Array.isArray(t)){const i=[],a=n&&Array.isArray(n);if(Ae(i,t,n,s))return I(()=>n=K(e,i,n,r,!0)),()=>n;if(w.context){if(!i.length)return n;if(r===void 0)return[...e.childNodes];let u=i[0],c=[u];for(;(u=u.nextSibling)!==r;)c.push(u);return n=c}if(i.length===0){if(n=q(e,n,r),o)return n}else a?n.length===0?je(e,i,r):Ft(e,n,i):(n&&q(e),je(e,i));n=i}else if(t.nodeType){if(w.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=q(e,n,r,t);q(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Ae(e,t,n,r){let s=!1;for(let l=0,o=t.length;l<o;l++){let i=t[l],a=n&&n[e.length],u;if(!(i==null||i===!0||i===!1))if((u=typeof i)=="object"&&i.nodeType)e.push(i);else if(Array.isArray(i))s=Ae(e,i,a)||s;else if(u==="function")if(r){for(;typeof i=="function";)i=i();s=Ae(e,Array.isArray(i)?i:[i],Array.isArray(a)?a:[a])||s}else e.push(i),s=!0;else{const c=String(i);a&&a.nodeType===3&&a.data===c?e.push(a):e.push(document.createTextNode(c))}}return s}function je(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function q(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const i=t[o];if(s!==i){const a=i.parentNode===e;!l&&!o?a?e.replaceChild(s,i):e.insertBefore(s,n):a&&i.remove()}else l=!0}}else e.insertBefore(s,n);return[s]}const Yt=!1,Qt="modulepreload",Zt=function(e,t){return new URL(e,t).href},Ie={},st=function(t,n,r){let s=Promise.resolve();if(n&&n.length>0){const l=document.getElementsByTagName("link");s=Promise.all(n.map(o=>{if(o=Zt(o,r),o in Ie)return;Ie[o]=!0;const i=o.endsWith(".css"),a=i?'[rel="stylesheet"]':"";if(!!r)for(let f=l.length-1;f>=0;f--){const d=l[f];if(d.href===o&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${a}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":Qt,i||(c.as="script",c.crossOrigin=""),c.href=o,document.head.appendChild(c),i)return new Promise((f,d)=>{c.addEventListener("load",f),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${o}`)))})}))}return s.then(()=>t()).catch(l=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l})},zt=Ee(),en=["title","meta"],De=[],Me=["name","http-equiv","content","charset","media"].concat(["property"]),Be=(e,t)=>{const n=Object.fromEntries(Object.entries(e.props).filter(([r])=>t.includes(r)).sort());return(Object.hasOwn(n,"name")||Object.hasOwn(n,"property"))&&(n.name=n.name||n.property,delete n.property),e.tag+JSON.stringify(n)};function tn(){if(!w.context){const n=document.head.querySelectorAll("[data-sm]");Array.prototype.forEach.call(n,r=>r.parentNode.removeChild(r))}const e=new Map;function t(n){if(n.ref)return n.ref;let r=document.querySelector(`[data-sm="${n.id}"]`);return r?(r.tagName.toLowerCase()!==n.tag&&(r.parentNode&&r.parentNode.removeChild(r),r=document.createElement(n.tag)),r.removeAttribute("data-sm")):r=document.createElement(n.tag),r}return{addTag(n){if(en.indexOf(n.tag)!==-1){const l=n.tag==="title"?De:Me,o=Be(n,l);e.has(o)||e.set(o,[]);let i=e.get(o),a=i.length;i=[...i,n],e.set(o,i);let u=t(n);n.ref=u,ve(u,n.props);let c=null;for(var r=a-1;r>=0;r--)if(i[r]!=null){c=i[r];break}return u.parentNode!=document.head&&document.head.appendChild(u),c&&c.ref&&document.head.removeChild(c.ref),a}let s=t(n);return n.ref=s,ve(s,n.props),s.parentNode!=document.head&&document.head.appendChild(s),-1},removeTag(n,r){const s=n.tag==="title"?De:Me,l=Be(n,s);if(n.ref){const o=e.get(l);if(o){if(n.ref.parentNode){n.ref.parentNode.removeChild(n.ref);for(let i=r-1;i>=0;i--)o[i]!=null&&document.head.appendChild(o[i].ref)}o[r]=null,e.set(l,o)}else n.ref.parentNode&&n.ref.parentNode.removeChild(n.ref)}}}}const nn=e=>{const t=tn();return $(zt.Provider,{value:t,get children(){return e.children}})};function ot(){let e=new Set;function t(s){return e.add(s),()=>e.delete(s)}let n=!1;function r(s,l){if(n)return!(n=!1);const o={to:s,options:l,defaultPrevented:!1,preventDefault:()=>o.defaultPrevented=!0};for(const i of e)i.listener({...o,from:i.location,retry:a=>{a&&(n=!0),i.navigate(s,{...l,resolve:!1})}});return!o.defaultPrevented}return{subscribe:t,confirm:r}}let Pe;function Le(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},""),Pe=window.history.state._depth}Le();function rn(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function sn(e,t){let n=!1;return()=>{const r=Pe;Le();const s=r==null?null:Pe-r;if(n){n=!1;return}s&&t(s)?(n=!0,window.history.go(-s)):e()}}const on=/^(?:[a-z0-9]+:)?\/\//i,ln=/^\/+|(\/)\/+$/g,it="http://sr";function U(e,t=!1){const n=e.replace(ln,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function z(e,t,n){if(on.test(t))return;const r=U(e),s=n&&U(n);let l="";return!s||t.startsWith("/")?l=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?l=r+s:l=s,(l||"/")+U(t,!l)}function cn(e,t){if(e==null)throw new Error(t);return e}function an(e,t){return U(e).replace(/\/*(\*.*)?$/g,"")+U(t)}function lt(e){const t={};return e.searchParams.forEach((n,r)=>{t[r]=n}),t}function un(e,t,n){const[r,s]=e.split("/*",2),l=r.split("/").filter(Boolean),o=l.length;return i=>{const a=i.split("/").filter(Boolean),u=a.length-o;if(u<0||u>0&&s===void 0&&!t)return null;const c={path:o?"":"/",params:{}},f=d=>n===void 0?void 0:n[d];for(let d=0;d<o;d++){const p=l[d],h=a[d],m=p[0]===":",b=m?p.slice(1):p;if(m&&ge(h,f(b)))c.params[b]=h;else if(m||!ge(h,p))return null;c.path+=`/${h}`}if(s){const d=u?a.slice(-u).join("/"):"";if(ge(d,f(s)))c.params[s]=d;else return null}return c}}function ge(e,t){const n=r=>r.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function fn(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((s,l)=>s+(l.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function ct(e){const t=new Map,n=We();return new Proxy({},{get(r,s){return t.has(s)||He(n,()=>t.set(s,S(()=>e()[s]))),t.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function at(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const s=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)s.push(n+=t[1]),r=r.slice(t[0].length);return at(r).reduce((l,o)=>[...l,...s.map(i=>i+o)],[])}const dn=100,ut=Ee(),ae=Ee(),Oe=()=>cn(Se(ut),"Make sure your app is wrapped in a <Router />"),ft=()=>Se(ae)||Oe().base,hn=e=>{const t=ft();return S(()=>t.resolvePath(e()))},mn=e=>{const t=Oe();return S(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},dt=()=>Oe().location,Wn=()=>ft().params;function gn(e,t=""){const{component:n,load:r,children:s,info:l}=e,o=!s||Array.isArray(s)&&!s.length,i={key:e,component:n,load:r,info:l};return ht(e.path).reduce((a,u)=>{for(const c of at(u)){const f=an(t,c);let d=o?f:f.split("/*",1)[0];d=d.split("/").map(p=>p.startsWith(":")||p.startsWith("*")?p:encodeURIComponent(p)).join("/"),a.push({...i,originalPath:c,pattern:d,matcher:un(d,!o,e.matchFilters)})}return a},[])}function pn(e,t=0){return{routes:e,score:fn(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let s=e.length-1;s>=0;s--){const l=e[s],o=l.matcher(n);if(!o)return null;r.unshift({...o,route:l})}return r}}}function ht(e){return Array.isArray(e)?e:[e]}function mt(e,t="",n=[],r=[]){const s=ht(e);for(let l=0,o=s.length;l<o;l++){const i=s[l];if(i&&typeof i=="object"){i.hasOwnProperty("path")||(i.path="");const a=gn(i,t);for(const u of a){n.push(u);const c=Array.isArray(i.children)&&i.children.length===0;if(i.children&&!c)mt(i.children,u.pattern,n,r);else{const f=pn([...n],r.length);r.push(f)}n.pop()}}}return n.length?r:r.sort((l,o)=>o.score-l.score)}function gt(e,t){for(let n=0,r=e.length;n<r;n++){const s=e[n].matcher(t);if(s)return s}return[]}function yn(e,t){const n=new URL(it),r=S(a=>{const u=e();try{return new URL(u,n)}catch{return console.error(`Invalid path ${u}`),a}},n,{equals:(a,u)=>a.href===u.href}),s=S(()=>r().pathname),l=S(()=>r().search,!0),o=S(()=>r().hash),i=()=>"";return{get pathname(){return s()},get search(){return l()},get hash(){return o()},get state(){return t()},get key(){return i()},query:ct(Ve(l,()=>lt(r())))}}let B;function wn(e,t,n,r={}){const{signal:[s,l],utils:o={}}=e,i=o.parsePath||(g=>g),a=o.renderPath||(g=>g),u=o.beforeLeave||ot(),c=z("",r.base||"");if(c===void 0)throw new Error(`${c} is not a valid base path`);c&&!s().value&&l({value:c,replace:!0,scroll:!1});const[f,d]=k(!1),p=async g=>{d(!0);try{await xt(g)}finally{d(!1)}},[h,m]=k(s().value),[b,A]=k(s().state),N=yn(h,b),x=[],C=k([]),L={pattern:c,params:{},path:()=>c,outlet:()=>null,resolvePath(g){return z(c,g)}};return I(()=>{const{value:g,state:y}=s();O(()=>{g!==h()&&p(()=>{B="native",m(g),A(y),C[1]([])}).then(()=>{B=void 0})})}),{base:L,location:N,isRouting:f,renderPath:a,parsePath:i,navigatorFactory:H,beforeLeave:u,preloadRoute:E,singleFlight:r.singleFlight===void 0?!0:r.singleFlight,submissions:C};function W(g,y,T){O(()=>{if(typeof y=="number"){y&&(o.go?o.go(y):console.warn("Router integration does not support relative routing"));return}const{replace:ue,resolve:fe,scroll:F,state:J}={replace:!1,resolve:!0,scroll:!0,...T},M=fe?g.resolvePath(y):z("",y);if(M===void 0)throw new Error(`Path '${y}' is not a routable path`);if(x.length>=dn)throw new Error("Too many redirects");const Ne=h();if((M!==Ne||J!==b())&&!Yt){if(u.confirm(M,T)){const pt=x.push({value:Ne,replace:ue,scroll:F,state:b()});p(()=>{B="navigate",m(M),A(J),C[1]([])}).then(()=>{x.length===pt&&(B=void 0,X({value:M,state:J}))})}}})}function H(g){return g=g||Se(ae)||L,(y,T)=>W(g,y,T)}function X(g){const y=x[0];y&&((g.value!==y.value||g.state!==y.state)&&l({...g,replace:y.replace,scroll:y.scroll}),x.length=0)}function E(g,y){const T=gt(n(),g.pathname),ue=B;B="preload";for(let fe in T){const{route:F,params:J}=T[fe];F.component&&F.component.preload&&F.component.preload();const{load:M}=F;y&&M&&He(t(),()=>M({params:J,location:{pathname:g.pathname,search:g.search,hash:g.hash,query:lt(g),state:null,key:""},intent:"preload"}))}B=ue}}function bn(e,t,n,r,s){const{base:l,location:o}=e,{pattern:i,component:a,load:u}=r().route,c=S(()=>r().path);a&&a.preload&&a.preload();const f=u?u({params:s,location:o,intent:B||"initial"}):void 0;return{parent:t,pattern:i,path:c,params:s,outlet:()=>a?$(a,{params:s,location:o,data:f,get children(){return n()}}):n(),resolvePath(p){return z(l.path(),p,c())}}}const vn=e=>t=>{const{base:n}=t,r=ie(()=>t.children),s=S(()=>mt(t.root?{component:t.root,load:t.rootLoad,children:r()}:r(),t.base||""));let l;const o=wn(e,()=>l,s,{base:n,singleFlight:t.singleFlight});return e.create&&e.create(o),$(ut.Provider,{value:o,get children(){return[S(()=>(l=We())&&null),$(An,{routerState:o,get branches(){return s()}})]}})};function An(e){const t=S(()=>gt(e.branches,e.routerState.location.pathname)),n=ct(()=>{const o=t(),i={};for(let a=0;a<o.length;a++)Object.assign(i,o[a].params);return i}),r=[];let s;const l=S(Ve(t,(o,i,a)=>{let u=i&&o.length===i.length;const c=[];for(let f=0,d=o.length;f<d;f++){const p=i&&i[f],h=o[f];a&&p&&h.route.key===p.route.key?c[f]=a[f]:(u=!1,r[f]&&r[f](),Y(m=>{r[f]=m,c[f]=bn(e.routerState,c[f-1]||e.routerState.base,Pn(()=>l()[f+1]),()=>t()[f],n)}))}return r.splice(o.length).forEach(f=>f()),a&&u?a:(s=c[0],c)}));return $(et,{get when(){return l()&&s},keyed:!0,children:o=>$(ae.Provider,{value:o,get children(){return o.outlet()}})})}const Pn=e=>()=>$(et,{get when(){return e()},keyed:!0,children:t=>$(ae.Provider,{value:t,get children(){return t.outlet()}})}),Ue=e=>{const t=ie(()=>e.children);return we(e,{get children(){return t()}})};function xn([e,t],n,r){return[n?()=>n(e()):e,r?s=>t(r(s)):t]}function En(e){if(e==="#")return null;try{return document.querySelector(e)}catch{return null}}function Sn(e){let t=!1;const n=s=>typeof s=="string"?{value:s}:s,r=xn(k(n(e.get()),{equals:(s,l)=>s.value===l.value}),void 0,s=>(!t&&e.set(s),s));return e.init&&xe(e.init((s=e.get())=>{t=!0,r[1](n(s)),t=!1})),vn({signal:r,create:e.create,utils:e.utils})}function Cn(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Ln(e,t){const n=En(`#${e}`);n?n.scrollIntoView():t&&window.scrollTo(0,0)}const On=new Map;function Nn(e=!0,t=!1,n="/_server"){return r=>{const s=r.base.path(),l=r.navigatorFactory(r.base);let o={};function i(h){return h.namespaceURI==="http://www.w3.org/2000/svg"}function a(h){if(h.defaultPrevented||h.button!==0||h.metaKey||h.altKey||h.ctrlKey||h.shiftKey)return;const m=h.composedPath().find(L=>L instanceof Node&&L.nodeName.toUpperCase()==="A");if(!m||t&&!m.hasAttribute("link"))return;const b=i(m),A=b?m.href.baseVal:m.href;if((b?m.target.baseVal:m.target)||!A&&!m.hasAttribute("state"))return;const x=(m.getAttribute("rel")||"").split(/\s+/);if(m.hasAttribute("download")||x&&x.includes("external"))return;const C=b?new URL(A,document.baseURI):new URL(A);if(!(C.origin!==window.location.origin||s&&C.pathname&&!C.pathname.toLowerCase().startsWith(s.toLowerCase())))return[m,C]}function u(h){const m=a(h);if(!m)return;const[b,A]=m,N=r.parsePath(A.pathname+A.search+A.hash),x=b.getAttribute("state");h.preventDefault(),l(N,{resolve:!1,replace:b.hasAttribute("replace"),scroll:!b.hasAttribute("noscroll"),state:x&&JSON.parse(x)})}function c(h){const m=a(h);if(!m)return;const[b,A]=m;o[A.pathname]||r.preloadRoute(A,b.getAttribute("preload")!=="false")}function f(h){const m=a(h);if(!m)return;const[b,A]=m;o[A.pathname]||(o[A.pathname]=setTimeout(()=>{r.preloadRoute(A,b.getAttribute("preload")!=="false"),delete o[A.pathname]},200))}function d(h){const m=a(h);if(!m)return;const[,b]=m;o[b.pathname]&&(clearTimeout(o[b.pathname]),delete o[b.pathname])}function p(h){let m=h.submitter&&h.submitter.hasAttribute("formaction")?h.submitter.getAttribute("formaction"):h.target.getAttribute("action");if(!m)return;if(!m.startsWith("https://action/")){const A=new URL(m,it);if(m=r.parsePath(A.pathname+A.search),!m.startsWith(n))return}if(h.target.method.toUpperCase()!=="POST")throw new Error("Only POST forms are supported for Actions");const b=On.get(m);if(b){h.preventDefault();const A=new FormData(h.target);h.submitter&&h.submitter.name&&A.append(h.submitter.name,h.submitter.value),b.call(r,A)}}nt(["click","submit"]),document.addEventListener("click",u),e&&(document.addEventListener("mouseover",f),document.addEventListener("mouseout",d),document.addEventListener("focusin",c),document.addEventListener("touchstart",c)),document.addEventListener("submit",p),xe(()=>{document.removeEventListener("click",u),e&&(document.removeEventListener("mouseover",f),document.removeEventListener("mouseout",d),document.removeEventListener("focusin",c),document.removeEventListener("touchstart",c)),document.removeEventListener("submit",p)})}}function Rn(e){const t=e.replace(/^.*?#/,"");if(!t.startsWith("/")){const[,n="/"]=window.location.hash.split("#",2);return`${n}#${t}`}return t}function $n(e){const t=()=>window.location.hash.slice(1),n=ot();return Sn({get:t,set({value:r,replace:s,scroll:l,state:o}){s?window.history.replaceState(rn(o),"","#"+r):window.location.hash=r;const i=r.indexOf("#"),a=i>=0?r.slice(i+1):"";Ln(a,l),Le()},init:r=>Cn(window,"hashchange",sn(r,s=>!n.confirm(s&&s<0?s:t()))),create:Nn(e.preload,e.explicitLinks,e.actionBase),utils:{go:r=>window.history.go(r),renderPath:r=>`#${r}`,parsePath:Rn,beforeLeave:n}})(e)}var Tn=tt("<a>");function Fe(e){e=we({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=Tt(e,["href","state","class","activeClass","inactiveClass","end"]),n=hn(()=>e.href),r=mn(n),s=dt(),l=S(()=>{const o=n();if(o===void 0)return[!1,!1];const i=U(o.split(/[?#]/,1)[0]).toLowerCase(),a=U(s.pathname).toLowerCase();return[e.end?i===a:a.startsWith(i),i===a]});return(()=>{var o=Tn();return ve(o,we(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!l()[0],[e.activeClass]:l()[0],...t.classList}},link:"",get"aria-current"(){return l()[1]?"page":void 0}}),!1,!1),o})()}var kn=tt("<div class=root><header><div class=title-nav><h1></h1></div><nav id=topnav></nav></header><div><div class=main>");const _n=Ze(()=>st(()=>import("./Home-CXn76O0R.js"),__vite__mapDeps([0,1]),import.meta.url)),jn=Ze(()=>st(()=>import("./Dashboard-NPJclGq1.js"),__vite__mapDeps([2,3]),import.meta.url));function In(){return $(nn,{get children(){return $($n,{root:Dn,get children(){return[$(Ue,{path:"/",component:_n}),$(Ue,{path:"/dashboard",component:jn})]}})}})}function Dn(e){let t=dt(),n=S(()=>t.pathname.split("/")[1]);const r=()=>`on-${n()||"home"}`;return(()=>{var s=kn(),l=s.firstChild,o=l.firstChild,i=o.firstChild,a=o.nextSibling,u=l.nextSibling,c=u.firstChild;return Z(i,$(Fe,{href:"/",children:"Woodpecker Chess Tactics"})),Z(a,$(Fe,{href:"/dashboard",children:"Dashboard"})),Z(c,()=>e.children),I(()=>rt(u,"main-wrap "+r())),s})()}const Mn=document.getElementById("root");qt(()=>$(In,{}),Mn);export{Fn as F,Kn as M,et as S,vt as a,Vn as b,k as c,nt as d,$ as e,qn as f,I as g,rt as h,Z as i,Bn as j,S as k,Wn as l,we as m,Pt as n,Un as o,Ve as p,xe as q,tt as t,O as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./Home-CXn76O0R.js","./Home-BGkNSy6O.css","./Dashboard-NPJclGq1.js","./Dashboard-Dsmx2BiQ.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
