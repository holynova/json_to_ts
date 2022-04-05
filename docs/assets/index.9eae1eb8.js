var A=Object.defineProperty;var v=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var g=(t,e,a)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,y=(t,e)=>{for(var a in e||(e={}))F.call(e,a)&&g(t,a,e[a]);if(v)for(var a of v(e))T.call(e,a)&&g(t,a,e[a]);return t};var p=(t,e,a)=>(g(t,typeof e!="symbol"?e+"":e,a),a);import{M as E,t as N,j as u,a as i,l as S,S as L,b as B,_ as l,J as H,d as J,c as P,T as Y,R,e as W}from"./vendor.1b05ff39.js";const $=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}};$();const z={"example prop":null,nancy_mccarty:{A1:{userID:"nancy_mccarty",userName:"Nancy's McCarty",id:"A1",score:"0.75",date_created:151208443563,date_signed:151208448055,date_approved:151208471190,answers:[{Q1:!0,Q2:!1},{Q34:"This is an answer",Q35:!1}]},A2:{userID:"nancy_mccarty",userName:"Nancy McCarty",id:"A2",score:.9,date_created:151208450090,date_signed:!1,date_approved:!1,answers:["No","No","No","Yes","Yes"]}},george_richardson:{A2:{userID:"george_richardson",userName:"George Richardson",id:"A2",score:.35,date_created:1512076585058,date_signed:!1,date_approved:!1,answers:["No","Yes","Yes","Yes","Yes"]}},tom_hughe:{A4:{userID:"tom_hughe",userName:"Tom Hughe",id:"A4",score:.75,date_created:1512076575026,date_signed:1512076609894,date_approved:!1,answers:["Yes","No","No","Yes","No"]},M1:{userID:"tom_hughe",userName:"Tom Hughe",id:"M1",score:!1,date_created:1512076587361,date_signed:!1,date_approved:!1,answers:[!1,!1,!1,!1,!1]}},heidy_white:{L2:{userID:"heidy_white",userName:"Heidy White",id:"L2",score:!1,date_created:15120765766312,date_signed:!1,date_approved:!1,answers:[0,1,2,3,4]}}},Q={int(t=0,e=100){return t+Math.floor(Math.random()*(e-t))}},c=E.Random;function _(t){return Object.prototype.toString.call(t)}function d(t,e){return _(t)===_(e)}function K(t,e){return typeof t!="string"?!1:t.toLowerCase().endsWith(e.toLowerCase())}const f={strMin:1,strMax:10,strPrefix:!1,strSuffix:!0,numberMin:1,numberMax:9999,arrayMin:1,arrayMax:10,arrayOnlyFirst:!0,useSematic:!0};class q{constructor(e){p(this,"input");p(this,"sematicDict");this.input=e,this.sematicDict=this.makeSematicDict()}setInput(e){this.input=e}makeSematicDict(){let e={id:c.guid.bind(c),name:c.cname.bind(c),title:c.ctitle.bind(c)};const a=["date","time","datetime","image","img","dataImage","color","hex","rgb","rgba","hsl","paragraph","sentence","word","title","first","last","name","url","protocol","domain","email","ip","region","province","city","county","zip","order","guid","uuid","id","inc"];let n={};return a.map(r=>{let s=c[r].bind(c);n[r]=s}),n=y(y({},n),e),n}getSematicData(e){const a=this.sematicDict;let n=Object.keys(a);for(let r=0;r<n.length;r++){let s=n[r];if(K(e,s)){let o=a[s.toLowerCase()];return typeof o=="function"?[!0,o.apply(c)]:[!0,"sematic error:"+e]}}return[!1,null]}getMockData(){let e=this;function a(n){if(d(n,{a:1})){let r={};return Object.keys(n).forEach(s=>{{let[o,h]=e.getSematicData(s);o?r[s]=h:r[s]=a(n[s])}}),r}if(d(n,[1,2,3])){if(n.length===0)return[];{let r=Q.int(f.arrayMin,f.arrayMax),s=n[0];return new Array(r).fill(0).map(o=>a(s))}}return d(n,new Date)?c.datetime():d(n,123)?c.integer(f.numberMin,f.numberMax):d(n,"string")?`${c.cword(f.arrayMin,f.arrayMax)}${n}`:d(n,!0)?c.boolean():n}return a(this.input)}getMockConfig(){}getMockFactoryFunction(){}getTypescriptInterface(){}}const w=console.log.bind(console),M={success:t=>{N.success(t),w("[success] "+t)},error:t=>{N.error(t),w("[error] "+t)},info:t=>{N(t)}},D=t=>{const e=typeof(t==null?void 0:t.data)=="string"?t==null?void 0:t.data:JSON.stringify(t==null?void 0:t.data,null,2);return u("div",{className:"CodeBox",children:[i("div",{className:"button-part",children:i(S,{text:e,onCopy:()=>{M.success("\u590D\u5236\u6210\u529F")},children:i("div",{className:"btn",children:"\u590D\u5236"})})}),i("div",{className:"code-wrapper",children:(t==null?void 0:t.language)?i(L,{language:t==null?void 0:t.language,style:B,showLineNumbers:!!(t==null?void 0:t.showLineNumber),customStyle:{fontSize:"14px",margin:"0",minHeight:"600px",width:"100%",minWidth:"400px"},children:e}):i("pre",{children:e})})]})},b=new q({}),G=t=>{const[e,a]=l.exports.useState(!1);l.exports.useEffect(()=>{b.setInput(t==null?void 0:t.data),a(b.getMockData())},[t.data]);const n=l.exports.useCallback(()=>{a(b.getMockData())},[]);return u("div",{className:"MockDataBox",children:[i("h3",{children:"mock\u6570\u636E"}),i("div",{className:"button-part",children:i("div",{className:"btn",onClick:n,children:"\u91CD\u65B0\u751F\u6210"})}),i(D,{data:t.error||e,language:"typescript"})]})},U=P,x={all:{background:"#000"},wrapper:{minHeight:"100vh",display:"flex"}},C={plainText:"",markupText:"",json:"",jsObject:{},lines:0,error:!1},V=t=>{const[e,a]=l.exports.useState(C),[n,r]=l.exports.useState("");l.exports.useState(!1);const[s,o]=l.exports.useState(""),[h,Z]=l.exports.useState(!0),[O,k]=l.exports.useState(z);l.exports.useEffect(()=>{if(e.error){o("\u8F93\u5165\u6709\u9519\u8BEF, \u8BF7\u4FEE\u6539");return}if(e==null?void 0:e.jsObject){console.time("convert");let m=U(e==null?void 0:e.jsObject).join(`

`);o(m),console.timeEnd("convert")}},[e]);const j=u("div",{className:"input",children:[i("h3",{children:"\u8F93\u5165"}),u("div",{className:"button-part",children:[i("div",{className:"btn",onClick:()=>{a(C),k({})},children:"\u6E05\u7A7A"}),i(S.CopyToClipboard,{text:JSON.stringify(JSON.stringify((e==null?void 0:e.jsObject)||"",null,2)),onCopy:()=>{M.success("\u590D\u5236JSON \u6210\u529F")},children:i("div",{className:"btn",children:"\u590D\u5236JSON"})})]}),i(H,{error:e==null?void 0:e.error,style:{labelColumn:{display:h?"auto":"none",fontSize:"14px"},contentBox:{fontSize:"14px"}},placeholder:O,onChange:m=>{m.error?r("\u8F93\u5165\u6709\u9519,\u8BF7\u4FEE\u6539"):(r(""),a(m))},theme:"dark",locale:J,colors:{string:"#DAA520"},height:"600px"})]}),I=u("div",{className:"output",children:[i("h3",{children:"TypeScript"}),i(D,{data:s,language:"typescript"})]});return u("div",{className:"HomePage",style:x.all,children:[i("div",{className:"title",children:"JS \u8F6C TS"}),u("div",{className:"wrapper",style:x.wrapper,children:[j,I]}),u("div",{className:"wrapper",style:x.wrapper,children:[i(G,{error:n,data:e==null?void 0:e.jsObject}),i("div",{children:"to be ..."})]})]})},X=t=>u("div",{className:"App",children:[i(Y,{}),i(V,{})]});R.render(i(W.StrictMode,{children:i(X,{})}),document.getElementById("root"));
