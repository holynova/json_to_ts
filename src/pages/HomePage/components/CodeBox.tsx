import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
// import {} from "antd";
import "./CodeBox.scss";
import { a11yDark as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

import CopyBox from "../../../common/components/CopyBox";
import CodeDownloader from "../../../common/components/CodeDownloader";

// import  {log} from ''
interface Props {
  data: any;
  language?: string;
  showLineNumber?: boolean;
  downloadFileName?: string;
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
        <CopyBox text={output}>
          <div className="btn">复制</div>
        </CopyBox>
        <CodeDownloader
          data={output}
          fileName={props?.downloadFileName || "download.txt"}
        ></CodeDownloader>
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
