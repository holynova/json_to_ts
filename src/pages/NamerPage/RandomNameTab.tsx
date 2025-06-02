import React, { useState, useCallback, useEffect } from "react";
import { Button, Input } from "antd";
import {
  LikeOutlined,
  SmileOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { poemDict } from "./poemDict";
import HighlightSentenceAndKeyword from "./HighlightSentenceAndKeyword";
import "./NamerPage.less";

interface Poem {
  content: string;
  title: string;
  author: string | null;
  book: string;
  dynasty: string;
}

interface GeneratedName {
  name: string;
  source: string;
  poem: Poem;
  selectedChars: string[];
}

const poemList: Poem[] = Object.values(poemDict);

// 标点符号正则表达式
const punctuationRegex = /[，。！？、；：""''（）【】《》〈〉「」『』〔〕…—]/g;

const RandomNameTab: React.FC = () => {
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [surname, setSurname] = useState("苏");
  const [clickedButtons, setClickedButtons] = useState<{
    [key: string]: string;
  }>({});

  const generateRandomName = useCallback(() => {
    const names: GeneratedName[] = [];

    for (let i = 0; i < 5; i++) {
      // 随机选择一首诗
      const randomPoemIndex = Math.floor(Math.random() * poemList.length);
      const poem = poemList[randomPoemIndex];

      // 将诗句按句号分割
      const sentences = poem.content
        .split(/[。！？]/)
        .filter((s) => s.trim().length > 0);

      // 随机选择一句
      const randomSentenceIndex = Math.floor(Math.random() * sentences.length);
      const sentence = sentences[randomSentenceIndex];

      // 过滤掉标点符号，只保留汉字
      const chars = sentence
        .replace(punctuationRegex, "")
        .split("")
        .filter((char) => char.trim().length > 0);

      if (chars.length >= 2) {
        // 随机选择两个不同的位置
        const indices = new Set<number>();
        while (indices.size < 2) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          indices.add(randomIndex);
        }

        // 将选中的字按在原句中的顺序排列
        const selectedChars = Array.from(indices)
          .sort((a, b) => a - b)
          .map((index) => chars[index]);

        const name = surname + selectedChars.join("");

        names.push({
          name,
          source: sentence,
          poem,
          selectedChars,
        });
      }
    }

    setGeneratedNames(names);
  }, [surname]);

  // 组件加载时自动生成一次
  useEffect(() => {
    generateRandomName();
  }, []);

  const handleFeedback = (
    name: GeneratedName,
    type: "like" | "happy" | "dislike",
  ) => {
    const storageKey = `nameFeedback_${type}`;
    const existingData = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const feedbackData = {
      name: name.name,
      source: name.source,
      poem: {
        title: name.poem.title,
        dynasty: name.poem.dynasty,
        author: name.poem.author,
      },
      count: 1,
    };

    const existingIndex = existingData.findIndex(
      (item: any) => item.name === name.name,
    );
    if (existingIndex >= 0) {
      existingData[existingIndex].count += 1;
    } else {
      existingData.push(feedbackData);
    }

    localStorage.setItem(storageKey, JSON.stringify(existingData));
    window.dispatchEvent(new Event("storage"));

    // 添加动画效果
    const buttonKey = `${name.name}_${type}`;
    setClickedButtons((prev) => ({ ...prev, [buttonKey]: type }));

    // 500ms 后移除动画类
    setTimeout(() => {
      setClickedButtons((prev) => {
        const newState = { ...prev };
        delete newState[buttonKey];
        return newState;
      });
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      generateRandomName();
    }
  };

  return (
    <div className="random-name-tab">
      <div className="input-group">
        <Input
          value={surname}
          placeholder="请输入姓氏（按回车生成）"
          onChange={(e) => setSurname(e.target.value)}
          onKeyPress={handleKeyPress}
          size="large"
        />
      </div>

      <div className="generated-names">
        {generatedNames.map((item, index) => (
          <div key={index} className="name-item">
            <div className="name">{item.name}</div>
            <div className="source">
              <div className="full-poem">
                <HighlightSentenceAndKeyword
                  text={item.poem.content}
                  keywords={item.selectedChars}
                  sentenceStyle={{
                    color: "black",
                  }}
                  keywordStyle={{
                    fontWeight: "bold",
                  }}
                />
              </div>
              <div className="poem-info">
                {item.poem.title} · {item.poem.dynasty} · {item.poem.author}
              </div>
              <div className="feedback-buttons">
                <Button
                  type="text"
                  icon={<LikeOutlined />}
                  onClick={() => handleFeedback(item, "like")}
                  className={
                    clickedButtons[`${item.name}_like`] ? "like-clicked" : ""
                  }
                />
                <Button
                  type="text"
                  icon={<SmileOutlined />}
                  onClick={() => handleFeedback(item, "happy")}
                  className={
                    clickedButtons[`${item.name}_happy`] ? "happy-clicked" : ""
                  }
                />
                <Button
                  type="text"
                  icon={<DislikeOutlined />}
                  onClick={() => handleFeedback(item, "dislike")}
                  className={
                    clickedButtons[`${item.name}_dislike`]
                      ? "dislike-clicked"
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomNameTab;
