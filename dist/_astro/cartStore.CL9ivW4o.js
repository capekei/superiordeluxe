let f=[],d=0;const a=4;let w=e=>{let i=[],t={get(){return t.lc||t.listen(()=>{})(),t.value},lc:0,listen(s){return t.lc=i.push(s),()=>{for(let l=d+a;l<f.length;)f[l]===s?f.splice(l,a):l+=a;let n=i.indexOf(s);~n&&(i.splice(n,1),--t.lc||t.off())}},notify(s,n){let l=!f.length;for(let r of i)f.push(r,t.value,s,n);if(l){for(d=0;d<f.length;d+=a)f[d](f[d+1],f[d+2],f[d+3]);f.length=0}},off(){},set(s){let n=t.value;n!==s&&(t.value=s,t.notify(n))},subscribe(s){let n=t.listen(s);return s(t.value),n},value:e};return t};const T=5,c=6,v=10;let m=(e,i,t,s)=>(e.events=e.events||{},e.events[t+v]||(e.events[t+v]=s(n=>{e.events[t].reduceRight((l,r)=>(r(l),l),{shared:{},...n})})),e.events[t]=e.events[t]||[],e.events[t].push(i),()=>{let n=e.events[t],l=n.indexOf(i);n.splice(l,1),n.length||(delete e.events[t],e.events[t+v](),delete e.events[t+v])}),O=1e3,N=(e,i)=>m(e,s=>{let n=i(s);n&&e.events[c].push(n)},T,s=>{let n=e.listen;e.listen=(...r)=>(!e.lc&&!e.active&&(e.active=!0,s()),n(...r));let l=e.off;return e.events[c]=[],e.off=()=>{l(),setTimeout(()=>{if(e.active&&!e.lc){e.active=!1;for(let r of e.events[c])r();e.events[c]=[]}},O)},()=>{e.listen=n,e.off=l}}),h=e=>e,o={},p={addEventListener(){},removeEventListener(){}};function S(){try{return typeof localStorage<"u"}catch{return!1}}S()&&(o=localStorage);let x={addEventListener(e,i,t){window.addEventListener("storage",i),window.addEventListener("pageshow",t)},removeEventListener(e,i,t){window.removeEventListener("storage",i),window.removeEventListener("pageshow",t)}};typeof window<"u"&&(p=x);function U(e,i=void 0,t={}){let s=t.encode||h,n=t.decode||h,l=w(i),r=l.set;l.set=u=>{typeof u>"u"?delete o[e]:o[e]=s(u),r(u)};function L(u){u.key===e?u.newValue===null?r(void 0):r(n(u.newValue)):o[e]||r(void 0)}function E(){l.set(o[e]?n(o[e]):i)}return N(l,()=>{if(E(),t.listen!==!1)return p.addEventListener(e,L,E),()=>{p.removeEventListener(e,L,E)}}),l}const g=U("cart",{items:[]},{encode:JSON.stringify,decode:JSON.parse});function I(e,i=1){const t=g.get();t.items.find(n=>n.product.id===e.id)?g.set({items:t.items.map(n=>n.product.id===e.id?{...n,quantity:n.quantity+i}:n)}):g.set({items:[...t.items,{product:e,quantity:i}]})}function y(){return g.get().items.reduce((i,t)=>i+t.quantity,0)}export{I as a,y as g};
