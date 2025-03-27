import React, { useState, ChangeEvent } from "react";
import JSON5 from "json5";
import { jsonrepair } from "jsonrepair";
import ReactJson from "react-json-view";
import SplitPane from "react-split-pane";
import { Tabs } from "antd";
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

const JsonFormatPage = () => {
  const [input, setInput] = useState<string>(
    `{name: "Alice", age: 25, data: {score: 90, active: true}`,
  );
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
          <ReactJson
            src={json}
            displayObjectSize={false}
            displayDataTypes={false}
            theme={"rjv-default"}
            collapsed={false}
          />
        )
      )}
    </>
  );

  const renderCompressedTab = () => (
    <pre>{json ? JSON.stringify(json, null, 0) : ""}</pre>
  );

  const renderTypesTab = () => (
    <pre>{json ? jsonToTs(json).join("\n\n") : ""}</pre>
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
