import React, { useState, useCallback, useEffect } from "react";
import { Input } from "antd";
import { poemDict } from "../data/poemDict";
import HighlightSentenceAndKeyword from "./HighlightSentenceAndKeyword";
import "../NamerPage.less";

interface Poem {
  content: string;
  title: string;
  author: string | null;
  book: string;
  dynasty: string;
}

const poemList: Poem[] = Object.values(poemDict);

const SearchTab: React.FC = () => {
  const [keyword, setKeyword] = useState("春 风");
  const [resultList, setResultList] = useState<Poem[]>([]);

  useEffect(() => {
    search(keyword);
  }, []);

  const search = useCallback((key: string) => {
    if (key.trim() === "") {
      setResultList([]);
      return;
    }
    const MAX_RESULTS = 100;
    const results = poemList.filter((poem) => {
      const keywords = key.split(/[\s,]+/).filter((k) => k.trim() !== "");
      return keywords.every((k) => poem.content.includes(k));
    });

    if (results.length > MAX_RESULTS) {
      const randomIndices = new Set<number>();
      while (randomIndices.size < MAX_RESULTS) {
        const randomIndex = Math.floor(Math.random() * results.length);
        randomIndices.add(randomIndex);
      }
      const selectedIndices = Array.from(randomIndices);
      setResultList(selectedIndices.map((index) => results[index]));
    } else {
      setResultList(results);
    }
  }, []);

  return (
    <div className="search-tab">
      <Input
        value={keyword}
        placeholder="请输入关键词"
        onChange={(e) => {
          const newValue = e.target.value;
          setKeyword(newValue);
          if (newValue.trim() !== "") {
            search(newValue);
          } else {
            setResultList([]);
          }
        }}
        onPressEnter={() => search(keyword)}
        autoFocus={true}
      />
      <div className="result">
        {resultList.map((poem, index) => (
          <div key={index} className="poem">
            <div className="poem-title">
              <div>
                <span>{poem.title}</span>
              </div>
              <span>{poem.dynasty}</span>
              <span>{poem.author}</span>
              <span>{poem.book}</span>
            </div>
            <HighlightSentenceAndKeyword
              text={poem.content}
              keywords={keyword.split(/[\s,]+/).filter((k) => k.trim() !== "")}
              sentenceStyle={{
                color: "black",
              }}
              keywordStyle={{
                fontWeight: "bold",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTab;
