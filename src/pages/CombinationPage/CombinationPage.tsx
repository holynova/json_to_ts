import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import {
  Input,
  Table,
  Button,
  Checkbox,
  Switch,
  Spin,
  Divider,
  Space,
  Pagination,
} from "antd";
import CSS from "csstype";

import {
  CombinationCreator,
  isValidArray,
  ResultList,
} from "./CombinationCreator";
import CopyBox from "../../common/components/CopyBox";
import CodeDownloader from "../../common/components/CodeDownloader";
interface Props {}

const creator = new CombinationCreator();

const demoInput = `普通 精英
矮人 精灵 人类 龙
男 女
战士 法师 弓箭手`;
const CombinationPage: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)

  const [input, setInput] = useState(demoInput);
  const [result, setResult] = useState<ResultList>([]);
  const [count, setCount] = useState(0);
  const [removeDuplicated, setRemoveDuplicated] = useState(true);
  const [uniqueCount, setUniqueCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const tableProps = useMemo(() => {
    if (isValidArray(result)) {
      const { dataSource, columns } = creator.toAntDesignTable(result);
      return { dataSource, columns };
    }
    return { dataSource: [], columns: [] };
  }, [result]);

  useEffect(() => {
    if (input) {
      setResult(creator.go(input));
    }
  }, []);

  const onTextChange = useCallback(
    (text: string) => {
      setLoading(true);
      setInput(text);
      let res = creator.go(text, removeDuplicated);
      setResult(res);
      setCount(creator.getResultCount({ text, removeDuplicated }));
      // setUniqueCount(creator.getResultCount({ text, removeDuplicated: true }));
      setLoading(false);
    },
    [removeDuplicated],
  );

  useEffect(() => {
    onTextChange(input);
  }, [onTextChange]);

  const tablePart = (
    <Table
      size="small"
      bordered
      columns={tableProps.columns}
      dataSource={tableProps.dataSource}
      pagination={{
        size: "small",
        total: result.length,
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: 10,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
    />
  );
  return (
    <div className="CombinationPage" style={styles.wrapper}>
      <Spin spinning={loading}></Spin>
      <h3>排列组合生成器</h3>
      <p>输入因子: 每一行是一组因子, 因子之间用空格分隔</p>
      <p>
        <Space>
          去除重复
          <Switch
            checked={removeDuplicated}
            onChange={(checked) => setRemoveDuplicated(checked)}
          />
        </Space>
      </p>
      <Input.TextArea
        allowClear
        showCount
        value={input}
        onChange={(e) => onTextChange(e.target.value)}
        rows={8}
      ></Input.TextArea>

      <Divider></Divider>
      {/* <h3>结果数量(去重):{uniqueCount}</h3> */}
      <p>
        <Space>
          <span>结果数量:{count}</span>
          <CopyBox text={creator.toString(result, false)}>
            <Button type="primary" ghost>
              复制结果
            </Button>
          </CopyBox>
          <Button type="primary" ghost>
            <CodeDownloader
              data={creator.toCSV(result)}
              prefix="下载CSV文件: "
              fileName={`combination${Date.now()}.csv`}
            ></CodeDownloader>
          </Button>
        </Space>
      </p>
      {/* <div>{creator.toString(result, true)}</div> */}
      {tablePart}
    </div>
  );
};

const styles: { [key: string]: CSS.Properties } = {
  wrapper: {
    width: "62.5%",
    minWidth: "800px",
    margin: "0 auto",
  },
};

export default CombinationPage;
