import{c as t}from"./p-7cd9c724.js";const n={days:[],months:[]};const{state:c,onChange:s}=t(n);const e={};let{state:o}=t(e);function a(t){o=Object.assign(Object.assign({},o),t)}function r(){return o}function f(t,n){const c=i(t);const s=i(n);Object.keys(o).forEach((t=>{const n=parseInt(t);if(c<=n&&n<=s){delete o[t]}}))}function i(t){const n=new Date(t);n.setHours(0,0,0,0);return n.getTime()}export{a,c,r as g,f as r};
//# sourceMappingURL=p-2d241403.js.map