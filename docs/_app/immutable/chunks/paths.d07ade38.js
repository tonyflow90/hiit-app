import{v as b,s as q,a3 as v,F as k,a4 as x}from"./scheduler.340a51ff.js";const c=[];function z(s,o){return{subscribe:A(s,o).subscribe}}function A(s,o=b){let r;const n=new Set;function a(t){if(q(s,t)&&(s=t,r)){const i=!c.length;for(const e of n)e[1](),c.push(e,s);if(i){for(let e=0;e<c.length;e+=2)c[e][0](c[e+1]);c.length=0}}}function l(t){a(t(s))}function f(t,i=b){const e=[t,i];return n.add(e),n.size===1&&(r=o(a,l)||b),t(s),()=>{n.delete(e),n.size===0&&r&&(r(),r=null)}}return{set:a,update:l,subscribe:f}}function E(s,o,r){const n=!Array.isArray(s),a=n?[s]:s;if(!a.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const l=o.length<2;return z(r,(f,t)=>{let i=!1;const e=[];let d=0,p=b;const g=()=>{if(d)return;p();const u=o(n?e[0]:e,f,t);l?f(u):p=x(u)?u:b},w=a.map((u,_)=>v(u,m=>{e[_]=m,d&=~(1<<_),i&&g()},()=>{d|=1<<_}));return i=!0,g(),function(){k(w),p(),i=!1}})}function F(s){return{subscribe:s.subscribe.bind(s)}}var y;const T=((y=globalThis.__sveltekit_191y6ie)==null?void 0:y.base)??"";var h;const S=((h=globalThis.__sveltekit_191y6ie)==null?void 0:h.assets)??T;export{S as a,T as b,F as c,E as d,z as r,A as w};
