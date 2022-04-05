import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
//  import {} from 'antd'
import "./HomePage.scss";
// import  {log} from ''

import CSS from "csstype";

import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { a11yDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import convert from "json-to-ts";

import { CopyToClipboard } from "react-copy-to-clipboard";
import JSONInput from "react-json-editor-ajrm";

//@ts-ignore
import locale from "react-json-editor-ajrm/locale/zh-cn";

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

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sampleData2, sampleData3 } from "./utils";
import MockDataBox from "./components/MockDataBox";

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

function genInitInput(sample: object) {
  let clone = { ...blank };
  clone.jsObject = sample;
  return clone;
}

const HomePage: React.FC<Props> = (props) => {
  const [inputData, setInputData] = useState<InputData>(blank);
  // const [input, setInput] = useState<object | any[]>(sampleData2);
  const [output, setOutput] = useState("");
  const [showLineNumber, setShowLineNumber] = useState(true);
  const [initialInput, setInitialInput] = useState<object | any[]>(sampleData3);
  useEffect(() => {
    if (inputData.error) {
      setOutput("输入有错误, 请修改");
      return;
    }
    if (inputData?.jsObject) {
      console.time("convert");
      let res = convert(inputData?.jsObject).join("\n\n");
      setOutput(res);
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
        <CopyToClipboard
          text={JSON.stringify(
            JSON.stringify(inputData?.jsObject || "", null, 2),
          )}
          onCopy={() => {
            toast.success("复制JSON 成功");
            console.log("复制JSON成功", inputData?.jsObject);
          }}
        >
          <div className="btn">复制JSON</div>
        </CopyToClipboard>
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
          setInputData(d);
          console.log("onChange", d);
          // setInput(d?.jsObject || {});
        }}
        theme="dark"
        locale={locale}
        colors={{
          string: "#DAA520", // overrides theme colors with whatever color value you want
        }}
        height="80vh"
      />
    </div>
  );

  const outputPart = (
    <div className="output">
      <h3>输出</h3>
      <div className="button-part">
        <CopyToClipboard
          text={output}
          onCopy={() => {
            toast.success("复制TS 成功");
            console.log("复制TS 成功", output);
          }}
        >
          <div className="btn">复制TS</div>
        </CopyToClipboard>
      </div>

      <SyntaxHighlighter
        language="typescript"
        style={theme}
        showLineNumbers={showLineNumber}
        customStyle={{
          fontSize: "14px",
          margin: "0",
          minHeight: "78vh",
          width: "100%",
          minWidth: "400px",
        }}
      >
        {output}
      </SyntaxHighlighter>
    </div>
  );

  const mockDataPart = 1;
  const mockFactoryPart = 2;
  const mockConfigPart = 3;

  return (
    <div className="HomePage" style={styles.all}>
      <div className="title">JS 转 TS</div>
      <div className="wrapper" style={styles.wrapper}>
        {inputPart}
        {outputPart}
      </div>
      <div className="wrapper" style={styles.wrapper}>
        <MockDataBox data={inputData?.jsObject}></MockDataBox>
        <div>foo</div>
      </div>

      <ToastContainer
        autoClose={2000}
        transition={Slide}
        position={toast.POSITION.TOP_CENTER}
      ></ToastContainer>
    </div>
  );
};

export default HomePage;
