import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
// import {} from "antd";
import "./CodeBox.scss";
import { a11yDark as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

// import  {log} from ''
interface Props {
  data: any;
  language?: string;
  showLineNumber?: boolean;
}

const CodeBox: React.FC<Props> = (props: Props) => {
  // const [loading, setLoading] = useState(false)
  const output = JSON.stringify(props?.data, null, 2);

  return (
    <div className="CodeBox">
      {/* <h3>CodeBox</h3> */}
      {props?.language ? (
        <SyntaxHighlighter
          language={props?.language}
          style={theme}
          showLineNumbers={!!props?.showLineNumber}
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
      ) : (
        <pre>{output}</pre>
      )}
    </div>
  );
};

export default CodeBox;
