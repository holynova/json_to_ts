import React, { useState } from "react";
import { List } from "antd";
import TimerBar from "./component/TimerBar";
import { hotpotData } from "../../data/hotpot";

interface ActiveTimer {
  name: string;
  duration: number;
  id: number;
}

const TimerPage: React.FC = () => {
  const [activeTimers, setActiveTimers] = useState<ActiveTimer[]>([]);
  const [timerId, setTimerId] = useState(0);

  // 添加计时器
  const addTimer = (name: string, duration: number) => {
    setActiveTimers([...activeTimers, { name, duration, id: timerId }]);
    setTimerId(timerId + 1);
  };

  // 移除计时器
  const removeTimer = (id: number) => {
    setActiveTimers(activeTimers.filter((timer) => timer.id !== id));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 左侧食材列表 */}
      <div
        style={{
          width: "40%",
          padding: "8px",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {Object.entries(hotpotData).map(([category, items]) => (
          <div key={category}>
            <h3 style={{ margin: "8px 0" }}>{getCategoryName(category)}</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
              }}
            >
              {items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => addTimer(item.emoji + item.name, item.time)}
                  style={{
                    padding: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "none",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{item.emoji}</span>
                  <div
                    style={{
                      fontSize: "12px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: "10px", color: "#666" }}>
                    {item.time}秒
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 右侧计时器区域 */}
      <div
        style={{
          width: "60%",
          padding: "16px",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: "16px",
          overflow: "auto",
        }}
      >
        {activeTimers.map((timer) => (
          <div key={timer.id} style={{ width: "100%" }}>
            <TimerBar
              name={timer.name}
              duration={timer.duration}
              onRemove={() => removeTimer(timer.id)}
            />
            {/* <button
              onClick={() => removeTimer(timer.id)}
              style={{
                marginTop: "8px",
                padding: "4px 8px",
                background: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              移除
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

// 获取分类名称
const getCategoryName = (category: string) => {
  switch (category) {
    case "meats":
      return "肉类";
    case "seafood":
      return "海鲜";
    case "vegetables":
      return "蔬菜";
    case "others":
      return "其他";
    default:
      return category;
  }
};

export default TimerPage;
