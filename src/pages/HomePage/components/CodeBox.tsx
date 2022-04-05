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

import CopyToClipboard from "react-copy-to-clipboard";
import show from "../../../utils/show";

// import  {log} from ''
interface Props {
  data: any;
  language?: string;
  showLineNumber?: boolean;
}

const CodeBox: React.FC<Props> = (props: Props) => {
  // const [loading, setLoading] = useState(false)
  const output =
    typeof props?.data === "string"
      ? props?.data
      : JSON.stringify(props?.data, null, 2);

  return (
    <div className="CodeBox">
      <div className="button-part">
        <CopyToClipboard
          text={output}
          onCopy={() => {
            show.success("复制成功");
          }}
        >
          <div className="btn">复制</div>
        </CopyToClipboard>
      </div>
      <div className="code-wrapper">
        {props?.language ? (
          <SyntaxHighlighter
            language={props?.language}
            style={theme}
            showLineNumbers={!!props?.showLineNumber}
            customStyle={{
              fontSize: "14px",
              margin: "0",
              minHeight: "600px",
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
    </div>
  );
};

export default CodeBox;
