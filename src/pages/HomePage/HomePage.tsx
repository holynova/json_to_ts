import React, { useState, useEffect } from "react";
//  import {} from 'antd'
import "./HomePage.scss";
// import  {log} from ''

import CSS from "csstype";
import convert from "json-to-ts";
import { CopyToClipboard } from "react-copy-to-clipboard";
import JSONInput from "react-json-editor-ajrm";

//@ts-ignore
import locale from "react-json-editor-ajrm/locale/zh-cn";

const convertJsonToTypeScript = convert;
const styles: { [key: string]: CSS.Properties } = {
  all: {
    background: "#000",
  },
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    // justifyContent: "space-between",
  },
};
interface Props {}

import "react-toastify/dist/ReactToastify.css";
import { sampleData } from "./sampleData";
import MockDataBox from "./components/MockDataBox";
import show from "../../utils/show";
import CodeBox from "./components/CodeBox";
import CopyBox from "../../common/components/CopyBox";
import CodeDownloader from "../../common/components/CodeDownloader";
import { mainCode, utilCode } from "./template";

interface InputData {
  plainText?: string;
  markupText?: string;
  json?: string;
  jsObject: object | any[];
  lines?: number;
  error?: boolean | object;
}

const blank: InputData = {
  plainText: "",
  markupText: "",
  json: "",
  jsObject: {},
  lines: 0,
  error: false,
};

function addExportPrefix(str: string) {
  if (typeof str === "string") {
    return str.replaceAll(/interface/g, "export interface");
  }
  return "";
}

const HomePage: React.FC<Props> = (props: Props) => {
  const [inputData, setInputData] = useState<InputData>(blank);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [input, setInput] = useState<object | any[]>(sampleData2);
  const [outputStr, setOutputStr] = useState("");
  const [showLineNumber, setShowLineNumber] = useState(true);
  const [initialInput, setInitialInput] = useState<object | any[]>(sampleData);

  useEffect(() => {
    if (inputData.error) {
      setOutputStr("输入有错误, 请修改");
      return;
    }
    if (inputData?.jsObject) {
      console.time("convert");
      let res = convertJsonToTypeScript(inputData?.jsObject).join("\n\n");
      setOutputStr(res);
      console.timeEnd("convert");
    }
  }, [inputData]);

  const inputPart = (
    <div className="input">
      <h3>输入</h3>
      <div className="button-part">
        <div
          className="btn"
          onClick={() => {
            setInputData(blank);
            setInitialInput({});
            // setInput({});
          }}
        >
          清空
        </div>

        <CopyBox
          text={JSON.stringify(
            JSON.stringify(inputData?.jsObject || "", null, 2),
          )}
        >
          <div className="btn">复制JSON</div>
        </CopyBox>
      </div>

      <JSONInput
        //@ts-ignore
        error={inputData?.error}
        style={{
          labelColumn: {
            display: showLineNumber ? "auto" : "none",
            fontSize: "14px",
          },
          contentBox: {
            fontSize: "14px",
          },
        }}
        // placeholder={inputData?.jsObject || {}} // data to display
        placeholder={initialInput}
        onChange={(d: InputData) => {
          if (d.error) {
            setError("输入有错,请修改");
          } else {
            setError("");
            setInputData(d);
          }
        }}
        theme="dark"
        locale={locale}
        colors={{
          string: "#DAA520", // overrides theme colors with whatever color value you want
        }}
        width="100%"
        height="600px"
      />
    </div>
  );

  const outputPart = (
    <div className="output">
      <h3>TypeScript</h3>
      <CodeBox
        data={addExportPrefix(outputStr)}
        language="typescript"
        downloadFileName="index.d.ts"
      ></CodeBox>
    </div>
  );

  const mockDataPart = (
    <MockDataBox error={error} data={inputData?.jsObject}></MockDataBox>
  );

  const downloadPart = (
    <div>
      <h3>下载生成器代码</h3>
      <CodeDownloader data={mainCode} fileName="main.ts"></CodeDownloader>
      <CodeDownloader data={utilCode} fileName="convert.ts"></CodeDownloader>
    </div>
  );

  return (
    <div className="HomePage" style={styles.all}>
      <div className="title">JS 转 TS</div>
      <div className="wrapper" style={styles.wrapper}>
        {inputPart}
        {outputPart}
      </div>
      <div className="wrapper" style={styles.wrapper}>
        {mockDataPart}
        {downloadPart}
      </div>
    </div>
  );
};

export default HomePage;
