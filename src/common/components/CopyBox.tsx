import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import {} from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import show from "../../utils/show";
// import './CopyBox.less'
// import  {log} from ''
interface Props {
  text: string;
  successMessage?: string;
  children?: React.ReactNode;
}

const CopyBox: React.FC<Props> = (props: Props) => {
  // const [loading, setLoading] = useState(false)
  return (
    <span className="CopyBox">
      <CopyToClipboard
        text={props?.text}
        onCopy={() => {
          show.success(props?.successMessage || "复制成功");
        }}
      >
        {/* <div className="btn">{props?.children || "复制"}</div> */}
        {props?.children || "复制"}
      </CopyToClipboard>
    </span>
  );
};

export default CopyBox;
