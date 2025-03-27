import React, { useState } from "react";
import { List, Button, Space, Modal, message } from "antd";
import TimerBar from "./component/TimerBar";
import { hotpotData } from "../../data/hotpot";
import AnimatedTimerBar from "./component/AnimatedTimerBar";

interface ActiveTimer {
  name: string;
  duration: number;
  id: number;
  startTime: number; // 记录定时器开始时间
}

const TimerPage: React.FC = () => {
  const [activeTimers, setActiveTimers] = useState<ActiveTimer[]>([]);
  const [timerId, setTimerId] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true); // 提示音开关状态
  const [sortAscending, setSortAscending] = useState(true); // 排序方向状态

  // 添加计时器
  const addTimer = (name: string, duration: number) => {
    setActiveTimers([
      ...activeTimers,
      {
        name,
        duration,
        id: timerId,
        startTime: Date.now(),
      },
    ]);
    setTimerId(timerId + 1);
  };

  // 移除计时器
  const removeTimer = (id: number) => {
    setActiveTimers(activeTimers.filter((timer) => timer.id !== id));
  };

  // 清除所有定时器
  const clearAllTimers = () => {
    Modal.confirm({
      title: "确认清除所有定时器?",
      content: "这将删除所有正在运行的定时器",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        setActiveTimers([]);
        message.success("已清除所有定时器");
      },
    });
  };

  // 清除已完成定时器
  const clearCompletedTimers = () => {
    // 过滤掉remaining <= 0的定时器
    setActiveTimers(
      activeTimers.filter((timer) => {
        const remaining =
          timer.duration - (Date.now() - timer.startTime) / 1000;
        return remaining > 0;
      }),
    );
    message.success("已清除已完成定时器");
  };

  // 按菜名排序（可切换正序/倒序）
  const sortByName = () => {
    const newSortAscending = !sortAscending;
    setSortAscending(newSortAscending);
    setActiveTimers(
      [...activeTimers].sort((a, b) =>
        newSortAscending
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      ),
    );
    message.success(`已按菜名${newSortAscending ? "正序" : "倒序"}排序`);
  };

  // 切换提示音
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    message.success(`提示音已${soundEnabled ? "禁用" : "启用"}`);
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      {/* 顶部操作栏 */}
      <div
        style={{
          padding: "8px 16px",
          background: "#f0f0f0",
          borderBottom: "1px solid #d9d9d9",
        }}
      >
        <Space>
          <Button danger onClick={clearAllTimers}>
            全部清除
          </Button>
          <Button onClick={clearCompletedTimers}>清除已完成</Button>
          <Button onClick={sortByName}>
            按菜名{sortAscending ? "正序" : "倒序"}排序
          </Button>
          <Button onClick={toggleSound}>
            {soundEnabled ? "禁用提示音" : "启用提示音"}
          </Button>
        </Space>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
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
              <AnimatedTimerBar
                name={timer.name}
                duration={timer.duration}
                onRemove={() => removeTimer(timer.id)}
                soundEnabled={soundEnabled}
              />
            </div>
          ))}
        </div>
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
