import React, { useState, ChangeEvent, useMemo } from "react";
import JSON5 from "json5";
import { jsonrepair } from "jsonrepair";
import ReactJson from "react-json-view";
import SplitPane from "react-split-pane";
import { Tabs } from "antd";
import CopyBox from "../../common/components/CopyBox";
import jsonToTs from "json-to-ts";
import "./JsonFormatPage.less"; // 修复样式文件路径

interface JsonData {
  [key: string]: any;
}
type FormatState =
  | "initial"
  | "correct"
  | "errorButCorrected"
  | "errorAndNotCorrected";

const { TabPane } = Tabs;
const mock1 = `{"name": "Alice", "age": 25, "data": {"score": 90, "active": true}}`;
const mock2 = `{"yesterday":{"date":"21日星期三","sunrise":"06:19","high":"高温 11.0℃","low":"低温 1.0℃","sunset":"18:26","aqi":85,"fx":"南风","fl":"<3级","type":"多云","notice":"阴晴之间，谨防紫外线侵扰"},"forecast":[{"date":"22日星期四","sunrise":"06:17","high":"高温 17.0℃","low":"低温 1.0℃","sunset":"18:27","aqi":98,"fx":"西南风","fl":"<3级","type":"晴","notice":"愿你拥有比阳光明媚的心情"},{"date":"23日星期五","sunrise":"06:16","high":"高温 18.0℃","low":"低温 5.0℃","sunset":"18:28","aqi":null}]}`;
const JsonFormatPage = () => {
  const [input, setInput] = useState<string>(mock2);
  const [json, setJson] = useState<JsonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<FormatState>("initial");
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const userInput = e.target.value;
    setInput(userInput);

    try {
      const parsedJson = JSON5.parse(userInput);
      setJson(parsedJson);
      setError(null);
      setState("correct");
    } catch (parseError) {
      try {
        const repairedJson = jsonrepair(userInput);
        const parsedRepairedJson = JSON5.parse(repairedJson);
        setJson(parsedRepairedJson);
        setError(null);

        setState("errorButCorrected");
      } catch (repairError) {
        setJson(null);
        setState("errorAndNotCorrected");
        setError(
          "无法解析或修复 JSON: " +
            (repairError instanceof Error
              ? repairError.message
              : String(repairError)),
        );
      }
    }
  };

  const jsonString = useMemo(
    () => (json ? JSON.stringify(json, null, 2) : ""),
    [json],
  );
  const compressedJson = useMemo(
    () => (json ? JSON.stringify(json, null, 0) : ""),
    [json],
  );
  const typeDefinitions = useMemo(
    () => (json ? jsonToTs(json).join("\n\n") : ""),
    [json],
  );

  const renderJsonTab = () => (
    <>
      <div className={`state-indicator ${state}`}>
        <span className="status-light"></span>
        <span className="status-text">
          {state === "correct" && "原JSON 格式正确"}
          {state === "errorButCorrected" && "原JSON 格式错误，已修复"}
          {state === "errorAndNotCorrected" && "原JSON 格式错误，无法修复"}
        </span>
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        json && (
          <>
            <CopyBox text={jsonString} />
            <ReactJson
              style={{ padding: "10px", backgroundColor: "white" }}
              src={json}
              displayObjectSize={false}
              displayDataTypes={false}
              theme={"rjv-default"}
              collapsed={false}
            />
          </>
        )
      )}
    </>
  );

  const renderCompressedTab = () => (
    <>
      <CopyBox text={compressedJson} />
      <pre>{compressedJson}</pre>
    </>
  );

  const renderTypesTab = () => (
    <>
      <CopyBox text={typeDefinitions} />
      <pre>{typeDefinitions}</pre>
    </>
  );

  return (
    <SplitPane split="vertical" defaultSize="50%">
      <div className="input-section">
        <h3>输入 JSON 字符串</h3>
        <textarea
          value={input}
          onChange={handleInputChange}
          className="input-textarea"
          placeholder="在此输入 JSON 字符串..."
        />
      </div>
      <div className="output-section">
        <Tabs defaultActiveKey="1">
          <TabPane tab="格式化JSON" key="1">
            {renderJsonTab()}
          </TabPane>
          <TabPane tab="压缩JSON" key="2">
            {renderCompressedTab()}
          </TabPane>
          <TabPane tab="TS类型" key="3">
            {renderTypesTab()}
          </TabPane>
        </Tabs>
      </div>
    </SplitPane>
  );
};

export default JsonFormatPage;
