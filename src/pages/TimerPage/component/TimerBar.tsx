import React, { useState, useEffect, useRef } from "react";
import { Progress, message, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface TimerBarProps {
  name: string; // 定时器名称
  duration: number; // 总时长(秒)
  onRemove?: () => void; // 移除回调函数
}

const TimerBar: React.FC<TimerBarProps> = ({ name, duration, onRemove }) => {
  const [remaining, setRemaining] = useState(duration);
  const [percent, setPercent] = useState(100);
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    let expectedTime = startTimeRef.current + duration * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      const newRemaining = Math.max(0, duration - elapsed);

      setRemaining(newRemaining);
      setPercent(Math.round((newRemaining / duration) * 100));

      if (newRemaining <= 0) {
        message.success(`${name} 定时完成!`);
        return;
      }

      // 提高刷新频率到250ms(1秒4次)
      animationRef.current = requestAnimationFrame(() =>
        setTimeout(updateTimer, 250),
      );
    };

    updateTimer();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [duration, name]);

  // 格式化时间为分:秒
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "0 16px",
        position: "relative",
        height: 48, // 固定高度以容纳重叠元素
      }}
    >
      {/* 进度条作为底层 */}
      <Progress
        type="line"
        percent={percent}
        strokeColor="#69b1ff"
        strokeWidth={48}
        showInfo={false}
        style={{
          position: "absolute",
          top: 0,
          left: 16,
          right: 16,
          margin: 0,
        }}
      />

      {/* 名称和时间作为上层 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: 16 }}>
          {name} {formatTime(remaining)}
        </div>
      </div>

      {/* 移除按钮 */}
      <Button
        type="text"
        icon={<CloseOutlined />}
        size="small"
        style={{
          position: "absolute",
          right: 16,
          top: 12,
          zIndex: 2,
          fontSize: 12,
        }}
        onClick={onRemove}
      />
    </div>
  );
};

export default TimerBar;
