export const utilCode: string = `
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
  // TODO 如果是驼峰, 那就先切片, 拿到最后一个再处理
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
   * 获取语义化数据
   *
   * @param {string} key
   * @return {*}  {[foundSematic: boolean, mockData: any]}
   * @memberof Converter
   */
  getSematicData(key: string): [foundSematic: boolean, mockData: any] {
    // 命中第一个规则就结束
    const funcDict = this.sematicDict;
    let endWithStrList = Object.keys(funcDict);
    for (let i = 0; i < endWithStrList.length; i++) {
      // TODO 增加startWith,比如isSame,hasFlag
      let endStr = endWithStrList[i];
      if (isEndWith(key, endStr)) {
        let func = funcDict[endStr.toLowerCase()];
        if (typeof func === "function") {
          return [true, func.apply(mock)];
        }
        return [true, "sematic error:" + key];
      }
    }
    // 全部规则都没有命中
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
      // 以及其他类型
      return data;
    };

    return loop(this.input);
  }

  /**
   *
   * 生成mockjs预发的mock规则
   * @memberof Converter
   */
  getMockRules() {}

  getMockFactoryFunction() {}

  getTypescriptInterface() {}
}

`;

export const mainCode: string = `
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

`;
