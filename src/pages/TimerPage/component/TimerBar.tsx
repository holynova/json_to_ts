import React, { useState, useEffect, useRef } from "react";
import { Progress, message } from "antd";

interface TimerBarProps {
  name: string; // 定时器名称
  duration: number; // 总时长(秒)
}

const TimerBar: React.FC<TimerBarProps> = ({ name, duration }) => {
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

      // 计算下一帧执行时间，保持1秒间隔
      const nextTick = Math.max(0, 1000 - (now % 1000));
      animationRef.current = requestAnimationFrame(() =>
        setTimeout(updateTimer, nextTick),
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
    <div style={{ width: "100%", textAlign: "center" }}>
      <Progress
        type="circle"
        percent={percent}
        format={() => (
          <div>
            <div style={{ fontSize: 16, marginBottom: 8 }}>{name}</div>
            <div style={{ fontSize: 24 }}>{formatTime(remaining)}</div>
          </div>
        )}
      />
    </div>
  );
};

export default TimerBar;
