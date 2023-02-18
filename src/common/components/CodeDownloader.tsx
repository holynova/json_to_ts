import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import download from "downloadjs";
// import {} from "antd";
// import './CodeDownloader.less'
// import  {log} from ''
interface Props {
  fileName: string;
  data: string;
  prefix?: string;
}

const CodeDownloader: React.FC<Props> = (props: Props) => {
  // const [loading, setLoading] = useState(false)
  const startDownload = useCallback(() => {
    let data =
      typeof props.data === "string"
        ? props?.data
        : JSON.stringify(props.data, null, 2);
    download(data, props?.fileName || `file${Date.now()}.txt`);
  }, [props]);

  return (
    <div className="CodeDownloader">
      {/* <h3>CodeDownloader</h3> */}
      <div className="btn" onClick={startDownload}>
        {`${props?.prefix || "下载"} ${props?.fileName || "文件"}`}
      </div>
    </div>
  );
};

export default CodeDownloader;
