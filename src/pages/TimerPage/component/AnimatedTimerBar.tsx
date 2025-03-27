import React, { useState, useEffect, useRef } from "react";
import { message, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./AnimatedTimerBar.css"; // 引入样式文件

// 创建音频对象 - 使用绝对路径访问音频文件
const timerSound = new Audio("/timer_sound.mp3");
timerSound.volume = 0.3; // 设置音量

// 预加载音频
try {
  timerSound.load();
} catch (e: unknown) {
  if (e instanceof Error) {
    console.warn("音频预加载失败:", e.message);
  }
}

interface AnimatedTimerBarProps {
  name: string; // 定时器名称
  duration: number; // 总时长(秒)
  onRemove?: () => void; // 移除回调函数
  onComplete?: () => void; // 完成回调函数
  height?: number; // 进度条高度(px)
  color?: string; // 进度条颜色
  soundEnabled?: boolean; // 是否启用声音
}

const AnimatedTimerBar: React.FC<AnimatedTimerBarProps> = ({
  name,
  duration,
  onRemove,
  onComplete,
  height = 48,
  color,
  soundEnabled = true,
}) => {
  const [remaining, setRemaining] = useState(duration);
  const [progress, setProgress] = useState(100);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const totalDuration = duration * 1000; // 转换为毫秒

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newRemaining = Math.max(0, duration - elapsed / 1000);
      const newProgress = (newRemaining / duration) * 100;

      setRemaining(newRemaining);
      setProgress(newProgress);

      if (elapsed < totalDuration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        message.success(`${name} 定时完成!`);
        if (soundEnabled) {
          timerSound.play().catch((e) => console.error("播放声音失败:", e));
        }
        if (onComplete) {
          onComplete();
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [duration, name]);

  // 格式化时间为分:秒
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div className="timer-container" ref={containerRef}>
      {/* 进度条背景 */}
      <div
        className="progress-background"
        style={{
          height: `${height || 12}px`,
          top: `${18 - ((height || 12) - 12) / 2}px`,
        }}
      >
        {/* 进度条前景 - 使用transform实现平滑动画 */}
        <div
          className="progress-foreground"
          style={{
            transform: `scaleX(${progress / 100})`,
            transformOrigin: "left center",
            backgroundColor: color || "#69b1ff",
          }}
        />
      </div>

      {/* 名称和时间显示 */}
      <div className="timer-info">
        {name} {formatTime(remaining)}
      </div>

      {/* 移除按钮 */}
      <Button
        type="text"
        icon={<CloseOutlined />}
        size="small"
        className="remove-button"
        onClick={onRemove}
      />
    </div>
  );
};

export default AnimatedTimerBar;
