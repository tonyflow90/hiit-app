import{v as b,s as q,a3 as v,F as j,a4 as k}from"./scheduler.340a51ff.js";const c=[];function x(s,o){return{subscribe:z(s,o).subscribe}}function z(s,o=b){let r;const n=new Set;function a(t){if(q(s,t)&&(s=t,r)){const i=!c.length;for(const e of n)e[1](),c.push(e,s);if(i){for(let e=0;e<c.length;e+=2)c[e][0](c[e+1]);c.length=0}}}function l(t){a(t(s))}function f(t,i=b){const e=[t,i];return n.add(e),n.size===1&&(r=o(a,l)||b),t(s),()=>{n.delete(e),n.size===0&&r&&(r(),r=null)}}return{set:a,update:l,subscribe:f}}function B(s,o,r){const n=!Array.isArray(s),a=n?[s]:s;if(!a.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const l=o.length<2;return x(r,(f,t)=>{let i=!1;const e=[];let d=0,p=b;const g=()=>{if(d)return;p();const u=o(n?e[0]:e,f,t);l?f(u):p=k(u)?u:b},w=a.map((u,_)=>v(u,m=>{e[_]=m,d&=~(1<<_),i&&g()},()=>{d|=1<<_}));return i=!0,g(),function(){j(w),p(),i=!1}})}function E(s){return{subscribe:s.subscribe.bind(s)}}var h;const A=((h=globalThis.__sveltekit_196bojg)==null?void 0:h.base)??"";var y;const F=((y=globalThis.__sveltekit_196bojg)==null?void 0:y.assets)??A;export{F as a,A as b,E as c,B as d,x as r,z as w};