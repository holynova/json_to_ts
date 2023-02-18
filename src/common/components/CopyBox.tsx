import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import { messsage} from "antd";
import show from "../../utils/show";
import { CopyToClipboard } from "react-copy-to-clipboard";

// const show = messsage

// import './CopyBox.less'
// import  {log} from ''
interface Props {
  text: string;
  successMessage?: string;
  children?: React.ReactNode;
}

const CopyBox: React.FC<Props> = (props: Props) => {
  return (
    <CopyToClipboard
      text={props?.text}
      onCopy={() => {
        if (props?.text) {
          show.success(props?.successMessage || "复制成功");
        }
      }}
    >
      {props.children || <span>复制</span>}
      {/* <span>复制</span> */}
    </CopyToClipboard>
  );
};

export default CopyBox;
