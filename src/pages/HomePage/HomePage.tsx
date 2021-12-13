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
import { sampleData2 } from "./utils";

const HomePage: React.FC<Props> = (props) => {
  const [input, setInput] = useState<object | any[]>(sampleData2);
  const [output, setOutput] = useState("");
  const [showLineNumber, setShowLineNumber] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput("error");
      return;
    }
    console.time("convert");
    let res = convert(input).join("\n\n");
    // .map((x) => JSON.stringify(x, null, 2))
    setOutput(res);
    console.timeEnd("convert");
  }, [input]);

  const inputPart = (
    <div className="input">
      <h3>输入</h3>
      <div className="button-part">
        <div
          className="btn"
          onClick={() => {
            setInput({});
          }}
        >
          清空
        </div>
        <CopyToClipboard
          text={JSON.stringify(JSON.stringify(input || "", null, 2))}
          onCopy={() => {
            toast.success("复制JSON 成功");
            console.log("复制JSON成功", input);
          }}
        >
          <div className="btn">复制JSON</div>
        </CopyToClipboard>
      </div>

      <JSONInput
        style={{
          labelColumn: {
            display: showLineNumber ? "auto" : "none",
            fontSize: "14px",
          },
          contentBox: {
            fontSize: "14px",
          },
        }}
        placeholder={input || {}} // data to display
        onChange={(d: any) => {
          console.log("onChange", d);
          setInput(d?.jsObject || {});
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
      <CopyToClipboard
        text={output}
        onCopy={() => {
          toast.success("复制TS 成功");
          console.log("复制TS 成功", output);
        }}
      >
        <div className="btn">复制TS</div>
      </CopyToClipboard>

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

  return (
    <div className="HomePage" style={styles.all}>
      <div className="title">JS 转 TS</div>
      <div className="wrapper" style={styles.wrapper}>
        {inputPart}
        {outputPart}
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
