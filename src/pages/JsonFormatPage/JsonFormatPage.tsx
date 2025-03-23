import React, { useState, ChangeEvent } from "react";
import JSON5 from "json5";
import { jsonrepair } from "jsonrepair";
import ReactJson from "react-json-view";
import "./JsonFormatPage.less"; // 修复样式文件路径

interface JsonData {
  [key: string]: any;
}

const JsonFormatPage = () => {
  const [input, setInput] = useState<string>(
    `{name: "Alice", age: 25, data: {score: 90, active: true}`,
  );
  const [json, setJson] = useState<JsonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const userInput = e.target.value;
    setInput(userInput);

    try {
      const parsedJson = JSON5.parse(userInput);
      setJson(parsedJson);
      setError(null);
    } catch (parseError) {
      try {
        const repairedJson = jsonrepair(userInput);
        const parsedRepairedJson = JSON5.parse(repairedJson);
        setJson(parsedRepairedJson);
        setError(null);
      } catch (repairError) {
        setJson(null);
        setError(
          "无法解析或修复 JSON: " +
            (repairError instanceof Error
              ? repairError.message
              : String(repairError)),
        );
      }
    }
  };

  return (
    <div className="container">
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
        <h3>修复和格式化后的 JSON</h3>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          json && (
            <ReactJson
              src={json}
              theme={"rjv-default"}
              // theme="monokai"
              collapsed={false}
              // className="json-view"
            />
          )
        )}
      </div>
    </div>
  );
};

export default JsonFormatPage;
