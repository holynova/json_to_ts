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
