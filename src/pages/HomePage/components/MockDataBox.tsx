import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Converter } from "../../../utils/convert";
import CodeBox from "./CodeBox";
// import {} from "antd";
// import './MockDataBox.less'
// import  {log} from ''
interface Props {
  data: any;
  error?: string;
}

const converter = new Converter({});
const MockDataBox: React.FC<Props> = (props: Props) => {
  // const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState(false);

  useEffect(() => {
    converter.setInput(props?.data);
    setOutput(converter.getMockData());
  }, [props.data]);

  const refresh = useCallback(() => {
    setOutput(converter.getMockData());
  }, []);

  return (
    <div className="MockDataBox">
      <h3>mock数据</h3>
      <div className="button-part">
        <div className="btn" onClick={refresh}>
          重新生成
        </div>
      </div>

      <CodeBox
        data={props.error || output}
        language="typescript"
        downloadFileName="mockData.json"
      ></CodeBox>
    </div>
  );
};

export default MockDataBox;
