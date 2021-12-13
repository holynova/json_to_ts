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

const sampleData = {
  "example prop": null,
  nancy_mccarty: {
    A1: {
      userID: "nancy_mccarty",
      userName: "Nancy's McCarty",
      id: "A1",
      score: "0.75",
      date_created: 151208443563,
      date_signed: 151208448055,
      date_approved: 151208471190,
      answers: [
        {
          Q1: true,
          Q2: false,
        },
        {
          Q34: "This is an answer",
          Q35: false,
        },
      ],
    },
    A2: {
      userID: "nancy_mccarty",
      userName: "Nancy McCarty",
      id: "A2",
      score: 0.9,
      date_created: 151208450090,
      date_signed: false,
      date_approved: false,
      answers: ["No", "No", "No", "Yes", "Yes"],
    },
  },
  george_richardson: {
    A2: {
      userID: "george_richardson",
      userName: "George Richardson",
      id: "A2",
      score: 0.35,
      date_created: 1512076585058,
      date_signed: false,
      date_approved: false,
      answers: ["No", "Yes", "Yes", "Yes", "Yes"],
    },
  },
  tom_hughe: {
    A4: {
      userID: "tom_hughe",
      userName: "Tom Hughe",
      id: "A4",
      score: 0.75,
      date_created: 1512076575026,
      date_signed: 1512076609894,
      date_approved: false,
      answers: ["Yes", "No", "No", "Yes", "No"],
    },
    M1: {
      userID: "tom_hughe",
      userName: "Tom Hughe",
      id: "M1",
      score: false,
      date_created: 1512076587361,
      date_signed: false,
      date_approved: false,
      answers: [false, false, false, false, false],
    },
  },
  heidy_white: {
    L2: {
      userID: "heidy_white",
      userName: "Heidy White",
      id: "L2",
      score: false,
      date_created: 15120765766312,
      date_signed: false,
      date_approved: false,
      answers: [0, 1, 2, 3, 4],
    },
  },
};
const sampleData2 = {
  myNumber: 1,
  yourName: {
    name: "str",
  },
  myData: [
    1,
    2,
    3,
    "str",
    {
      name: "12",
      age: 123,
    },
  ],
};

const HomePage: React.FC<Props> = (props) => {
  const [input, setInput] = useState<object | any[]>(sampleData2);
  const [output, setOutput] = useState("");
  const [showLineNumber, setShowLineNumber] = useState(true);

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
          text={JSON.stringify(JSON.stringify(input?.jsObject || "", null, 2))}
          onCopy={() => {
            console.log("复制成功", input);
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
        onChange={(d) => setInput(d?.jsObject || {})}
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
        onCopy={() => console.log("复制成功", output)}
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
    </div>
  );
};

export default HomePage;
