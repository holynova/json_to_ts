import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Converter } from "../../../utils/convert";
import CodeBox from "./CodeBox";
import { Button } from "antd";
// import {} from "antd";
// import './MockDataBox.less'
// import  {log} from ''
interface Props {
  data: any;
  error?: string;
  language?: string;
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
      <div className="button-part">
        <Button type="link" onClick={refresh}>
          重新生成
        </Button>
      </div>

      <CodeBox
        data={props.error || output}
        language={props?.language}
        downloadFileName="mockData.json"
      ></CodeBox>
    </div>
  );
};

export default MockDataBox;
