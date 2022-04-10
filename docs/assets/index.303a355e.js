var _=Object.defineProperty;var D=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var h=(e,t,a)=>t in e?_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,m=(e,t)=>{for(var a in t||(t={}))j.call(t,a)&&h(e,a,t[a]);if(D)for(var a of D(t))T.call(t,a)&&h(e,a,t[a]);return e};var g=(e,t,a)=>(h(e,typeof t!="symbol"?t+"":t,a),a);import{M as A,t as k,j as r,l as I,_ as u,d as B,a as l,S as L,b as P,J as W,c as H,e as J,T as R,R as Y,f as z}from"./vendor.46f96c2e.js";const K=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}};K();const Q={"example prop":null,nancy_mccarty:{A1:{userID:"nancy_mccarty",userName:"Nancy's McCarty",id:"A1",score:"0.75",date_created:151208443563,date_signed:151208448055,date_approved:151208471190,answers:[{Q1:!0,Q2:!1},{Q34:"This is an answer",Q35:!1}]},A2:{userID:"nancy_mccarty",userName:"Nancy McCarty",id:"A2",score:.9,date_created:151208450090,date_signed:!1,date_approved:!1,answers:["No","No","No","Yes","Yes"]}},george_richardson:{A2:{userID:"george_richardson",userName:"George Richardson",id:"A2",score:.35,date_created:1512076585058,date_signed:!1,date_approved:!1,answers:["No","Yes","Yes","Yes","Yes"]}},tom_hughe:{A4:{userID:"tom_hughe",userName:"Tom Hughe",id:"A4",score:.75,date_created:1512076575026,date_signed:1512076609894,date_approved:!1,answers:["Yes","No","No","Yes","No"]},M1:{userID:"tom_hughe",userName:"Tom Hughe",id:"M1",score:!1,date_created:1512076587361,date_signed:!1,date_approved:!1,answers:[!1,!1,!1,!1,!1]}},heidy_white:{L2:{userID:"heidy_white",userName:"Heidy White",id:"L2",score:!1,date_created:15120765766312,date_signed:!1,date_approved:!1,answers:[0,1,2,3,4]}}},c=A.Random,$={int(e=0,t=100){return e+Math.floor(Math.random()*(t-e))}};function C(e){return Object.prototype.toString.call(e)}function d(e,t){return C(e)===C(t)}function q(e,t){return typeof e!="string"?!1:e.toLowerCase().endsWith(t.toLowerCase())}class G{constructor(t){g(this,"input");g(this,"sematicDict");g(this,"config");this.input=t,this.sematicDict=this.makeSematicDict(),this.config={strMin:1,strMax:10,strPrefix:!1,strSuffix:!0,numberMin:1,numberMax:9999,arrayMin:1,arrayMax:10,arrayOnlyFirst:!0,useSematic:!0}}setConfig(t){return this.config=m(m({},this.config),t),this.config}setInput(t){this.input=t}makeSematicDict(){let t={};["date","time","datetime","image","img","dataImage","color","hex","rgb","rgba","hsl","paragraph","sentence","word","title","first","last","name","url","protocol","domain","email","ip","region","province","city","county","zip","order","guid","uuid","id","inc"].map(n=>{let i=c[n].bind(c);t[n]=i});let o={id:c.guid.bind(c),name:c.cname.bind(c),title:c.ctitle.bind(c)};return t=m(m({},t),o),t}getSematicData(t){const a=this.sematicDict;let o=Object.keys(a);for(let n=0;n<o.length;n++){let i=o[n];if(q(t,i)){let s=a[i.toLowerCase()];return typeof s=="function"?[!0,s.apply(c)]:[!0,"sematic error:"+t]}}return[!1,null]}getMockData(){const t=a=>{const o=this.config;if(d(a,{a:1})){let n={};return Object.keys(a).forEach(i=>{if(o.useSematic){let[s,y]=this.getSematicData(i);s?n[i]=y:n[i]=t(a[i])}else n[i]=t(a[i])}),n}if(d(a,[1,2,3])){if(a.length===0)return[];if(o.arrayOnlyFirst){let n=$.int(o.arrayMin,o.arrayMax),i=a[0];return new Array(n).fill(0).map(s=>t(i))}return a.map(t)}if(d(a,new Date))return c.datetime();if(d(a,123))return c.integer(o.numberMin,o.numberMax);if(d(a,"string")){let n=c.cword(o.arrayMin,o.arrayMax);return(o.strPrefix?a:"")+n+(o.strSuffix?a:"")}return d(a,!0)?c.boolean():a};return t(this.input)}getMockRules(){}getMockFactoryFunction(){}getTypescriptInterface(){}}const M=console.log.bind(console),U={success:e=>{k.success(e),M("[success] "+e)},error:e=>{k.error(e),M("[error] "+e)},info:e=>{k(e)}},N=e=>r("span",{className:"CopyBox",children:r(I,{text:e==null?void 0:e.text,onCopy:()=>{U.success((e==null?void 0:e.successMessage)||"\u590D\u5236\u6210\u529F")},children:(e==null?void 0:e.children)||"\u590D\u5236"})}),b=e=>{const t=u.exports.useCallback(()=>{let a=typeof e.data=="string"?e==null?void 0:e.data:JSON.stringify(e.data,null,2);B(a,(e==null?void 0:e.fileName)||`file${Date.now()}.txt`)},[e]);return r("div",{className:"CodeDownloader",children:r("div",{className:"btn",onClick:t,children:`\u4E0B\u8F7D${(e==null?void 0:e.fileName)||"\u6587\u4EF6"}`})})},v=e=>{const t=typeof(e==null?void 0:e.data)=="string"?e==null?void 0:e.data:JSON.stringify(e==null?void 0:e.data,null,2);return l("div",{className:"CodeBox",children:[l("div",{className:"button-part",children:[r(N,{text:t,children:r("div",{className:"btn",children:"\u590D\u5236"})}),r(b,{data:t,fileName:(e==null?void 0:e.downloadFileName)||"download.txt"})]}),r("div",{className:"code-wrapper",children:(e==null?void 0:e.language)?r(L,{language:e==null?void 0:e.language,style:P,showLineNumbers:!!(e==null?void 0:e.showLineNumber),customStyle:{fontSize:"14px",margin:"0",minHeight:"600px",width:"100%",minWidth:"400px"},children:t}):r("pre",{children:t})})]})},x=new G({}),V=e=>{const[t,a]=u.exports.useState(!1);u.exports.useEffect(()=>{x.setInput(e==null?void 0:e.data),a(x.getMockData())},[e.data]);const o=u.exports.useCallback(()=>{a(x.getMockData())},[]);return l("div",{className:"MockDataBox",children:[r("h3",{children:"mock\u6570\u636E"}),r("div",{className:"button-part",children:r("div",{className:"btn",onClick:o,children:"\u91CD\u65B0\u751F\u6210"})}),r(v,{data:e.error||t,language:"typescript",downloadFileName:"mockData.json"})]})},X=`
// TODO: npm install mockjs -S
import Mock from "mockjs";
// import { random } from "./rand";
const mock = Mock.Random;

const random = {
  int(min = 0, max = 100) {
    return min + Math.floor(Math.random() * (max - min));
  },
};

function getType(val: any) {
  return Object.prototype.toString.call(val);
}

function isSameType(val: any, sample: any) {
  return getType(val) === getType(sample);
}

function isEndWith(inputStr: string, endWithStr: string) {
  if (typeof inputStr !== "string") {
    return false;
  }
  // TODO \u5982\u679C\u662F\u9A7C\u5CF0, \u90A3\u5C31\u5148\u5207\u7247, \u62FF\u5230\u6700\u540E\u4E00\u4E2A\u518D\u5904\u7406
  return inputStr.toLowerCase().endsWith(endWithStr.toLowerCase());
}

interface ConfigModel {
  strMin: number;
  strMax: number;
  strPrefix: boolean;
  strSuffix: boolean;
  numberMin: number;
  numberMax: number;
  arrayMin: number;
  arrayMax: number;
  arrayOnlyFirst: boolean;
  useSematic: boolean;
}

export class Converter {
  input: object;
  sematicDict: { [key: string]: Function };
  config: ConfigModel;

  constructor(input: object) {
    this.input = input;
    this.sematicDict = this.makeSematicDict();
    this.config = {
      strMin: 1,
      strMax: 10,
      strPrefix: false,
      strSuffix: true,

      numberMin: 1,
      numberMax: 9999,

      arrayMin: 1,
      arrayMax: 10,
      arrayOnlyFirst: true,

      useSematic: true,
    };
  }

  setConfig(newConfig: ConfigModel) {
    this.config = { ...this.config, ...newConfig };
    return this.config;
  }

  setInput(input: object) {
    this.input = input;
  }

  makeSematicDict() {
    let funcDict: { [key: string]: Function } = {};

    const allowedKeys = [
      "date",
      "time",
      "datetime",
      "image",
      "img",
      "dataImage",
      "color",
      "hex",
      "rgb",
      "rgba",
      "hsl",
      "paragraph",
      "sentence",
      "word",
      "title",
      "first",
      "last",
      "name",
      "url",
      "protocol",
      "domain",
      "email",
      "ip",
      "region",
      "province",
      "city",
      "county",
      "zip",
      "order",
      "guid",
      "uuid",
      "id",
      "inc",
    ];

    allowedKeys.map((key) => {
      let func = mock[key].bind(mock);
      funcDict[key] = func;
    });

    let userDict = {
      id: mock.guid.bind(mock),
      name: mock.cname.bind(mock),
      title: mock.ctitle.bind(mock),
    };

    funcDict = { ...funcDict, ...userDict };
    return funcDict;
  }

  /**
   * \u83B7\u53D6\u8BED\u4E49\u5316\u6570\u636E
   *
   * @param {string} key
   * @return {*}  {[foundSematic: boolean, mockData: any]}
   * @memberof Converter
   */
  getSematicData(key: string): [foundSematic: boolean, mockData: any] {
    // \u547D\u4E2D\u7B2C\u4E00\u4E2A\u89C4\u5219\u5C31\u7ED3\u675F
    const funcDict = this.sematicDict;
    let endWithStrList = Object.keys(funcDict);
    for (let i = 0; i < endWithStrList.length; i++) {
      // TODO \u589E\u52A0startWith,\u6BD4\u5982isSame,hasFlag
      let endStr = endWithStrList[i];
      if (isEndWith(key, endStr)) {
        let func = funcDict[endStr.toLowerCase()];
        if (typeof func === "function") {
          return [true, func.apply(mock)];
        }
        return [true, "sematic error:" + key];
      }
    }
    // \u5168\u90E8\u89C4\u5219\u90FD\u6CA1\u6709\u547D\u4E2D
    return [false, null];
  }

  getMockData() {
    const loop = (data: any): any => {
      const mockConfig = this.config;
      // object
      if (isSameType(data, { a: 1 })) {
        let res: { [key: string]: any } = {};
        Object.keys(data).forEach((key) => {
          if (mockConfig.useSematic) {
            let [foundSematic, sematicMockData] = this.getSematicData(key);
            if (foundSematic) {
              res[key] = sematicMockData;
            } else {
              res[key] = loop(data[key]);
            }
          } else {
            res[key] = loop(data[key]);
          }
        });
        return res;
      }

      // array
      if (isSameType(data, [1, 2, 3])) {
        if (data.length === 0) {
          return [];
        }

        if (mockConfig.arrayOnlyFirst) {
          let max = random.int(mockConfig.arrayMin, mockConfig.arrayMax);
          let first = data[0];
          return new Array(max).fill(0).map((x) => loop(first));
        }

        return data.map(loop);
      }

      // date
      if (isSameType(data, new Date())) {
        return mock.datetime();
      }

      // number
      if (isSameType(data, 123)) {
        return mock.integer(mockConfig.numberMin, mockConfig.numberMax);
      }

      // string
      if (isSameType(data, "string")) {
        let mockStr = mock.cword(mockConfig.arrayMin, mockConfig.arrayMax);
        return (
          (mockConfig.strPrefix ? data : "") +
          mockStr +
          (mockConfig.strSuffix ? data : "")
        );
      }

      // boolean
      if (isSameType(data, true)) {
        return mock.boolean();
      }

      // undefined
      // null
      // \u4EE5\u53CA\u5176\u4ED6\u7C7B\u578B
      return data;
    };

    return loop(this.input);
  }

  /**
   *
   * \u751F\u6210mockjs\u9884\u53D1\u7684mock\u89C4\u5219
   * @memberof Converter
   */
  getMockRules() {}

  getMockFactoryFunction() {}

  getTypescriptInterface() {}
}

`,Z=`
import { Converter } from "./convert";

const sampleData = {
  a: 1,
  b: "foo",
  c: true,
  d: null,
  e: 1,
  arr: [1, 2, "foo"],
  obj: {
    aa: 1,
    bb: "foo",
    arrInObj: ["foo", 1, 2],
  },
  sematic: {
    userId: 123,
    name: 1,
    city: 2,
    myeMail: 3,
    myDate: 4,
    myIP: 5,
  },
};

let converter = new Converter(sampleData);
let mockData = converter.getMockData();
console.log(mockData);

`,ee=J,S={all:{background:"#000"},wrapper:{minHeight:"100vh",display:"flex"}},w={plainText:"",markupText:"",json:"",jsObject:{},lines:0,error:!1};function te(e){return typeof e=="string"?e.replaceAll(/interface/g,"export interface"):""}const ae=e=>{const[t,a]=u.exports.useState(w),[o,n]=u.exports.useState("");u.exports.useState(!1);const[i,s]=u.exports.useState(""),[y,re]=u.exports.useState(!0),[E,F]=u.exports.useState(Q);u.exports.useEffect(()=>{if(t.error){s("\u8F93\u5165\u6709\u9519\u8BEF, \u8BF7\u4FEE\u6539");return}if(t==null?void 0:t.jsObject){console.time("convert");let f=ee(t==null?void 0:t.jsObject).join(`

`);s(f),console.timeEnd("convert")}},[t]);const p=l("div",{className:"input",children:[r("h3",{children:"\u8F93\u5165"}),l("div",{className:"button-part",children:[r("div",{className:"btn",onClick:()=>{a(w),F({})},children:"\u6E05\u7A7A"}),r(N,{text:JSON.stringify(JSON.stringify((t==null?void 0:t.jsObject)||"",null,2)),children:r("div",{className:"btn",children:"\u590D\u5236JSON"})})]}),r(W,{error:t==null?void 0:t.error,style:{labelColumn:{display:y?"auto":"none",fontSize:"14px"},contentBox:{fontSize:"14px"}},placeholder:E,onChange:f=>{f.error?n("\u8F93\u5165\u6709\u9519,\u8BF7\u4FEE\u6539"):(n(""),a(f))},theme:"dark",locale:H,colors:{string:"#DAA520"},width:"100%",height:"600px"})]}),O=l("div",{className:"output",children:[r("h3",{children:"TypeScript"}),r(v,{data:te(i),language:"typescript",downloadFileName:"index.d.ts"})]});return l("div",{className:"HomePage",style:S.all,children:[r("div",{className:"title",children:"JS \u8F6C TS"}),l("div",{className:"wrapper",style:S.wrapper,children:[p,O]}),l("div",{className:"wrapper",style:S.wrapper,children:[r(V,{error:o,data:t==null?void 0:t.jsObject}),l("div",{children:[r("h3",{children:"\u4E0B\u8F7D\u751F\u6210\u5668\u4EE3\u7801"}),r(b,{data:Z,fileName:"main.ts"}),r(b,{data:X,fileName:"convert.ts"})]})]})]})},ne=e=>l("div",{className:"App",children:[r(R,{}),r(ae,{})]});Y.render(r(z.StrictMode,{children:r(ne,{})}),document.getElementById("root"));
