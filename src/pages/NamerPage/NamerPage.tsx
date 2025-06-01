import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Input } from "antd";
import { poemDict } from "./poemDict";
import HighlightText from "./HighlightText";

import "./NamerPage.less";
import HighlightSentenceAndKeyword from "./HighlightSentenceAndKeyword";
// import  {log} from ''
interface Props {}
interface Poem {
  content: string;
  title: string;
  author: string | null;
  book: string;
  dynasty: string;
}
const poemList: Poem[] = Object.values(poemDict);

const NamerPage: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
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
      // key是用空格分割的, 则需要判断诗句中是否包含所有关键词
      const keywords = key.split(/[\s,]+/).filter((k) => k.trim() !== "");
      return keywords.every((k) => poem.content.includes(k));
    });

    if (results.length > MAX_RESULTS) {
      // randomly select 100 results
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
    <div className="NamerPage">
      <h1>古诗起名</h1>
      <Input
        value={keyword}
        placeholder="请输入"
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
        {resultList.map((poem, index) => {
          return (
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
                keywords={keyword
                  .split(/[\s,]+/)
                  .filter((k) => k.trim() !== "")}
                sentenceStyle={{
                  // backgroundColor: "pink",
                  // fontSize: "1.2em",
                  // fontWeight: "bold",
                  color: "black",
                }}
                keywordStyle={{
                  // fontSize: "1.4em",
                  fontWeight: "bold",
                  // padding: "0 0.1em",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NamerPage;
