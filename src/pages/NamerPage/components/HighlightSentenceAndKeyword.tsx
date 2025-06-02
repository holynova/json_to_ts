import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
interface Props {
  text: string;
  keywords: string[];
  sentenceStyle?: React.CSSProperties;
  keywordStyle?: React.CSSProperties;
}
// example
// text: 迢迢牵牛星，皎皎河汉女。纤纤擢素手，札札弄机杼。终日不成章，泣涕零如雨；河汉清且浅，相去复几许！盈盈一水间，脉脉不得语。
// keyword: 许
// result: the sentence is "河汉清且浅，相去复几许", apply the sentenceStyle to it
// and the keyword is "许", apply the keywordStyle to it

const HighlightSentenceAndKeyword: React.FC<Props> = ({
  text,
  keywords,
  sentenceStyle,
  keywordStyle,
}) => {
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);

  const highlightedContent = useMemo(() => {
    // Split the text into sentences using punctuation marks
    const sentences = text
      .split(/([。！？；])/g)
      .reduce((acc, curr, i, arr) => {
        if (i % 2 === 0) {
          acc.push(curr + (arr[i + 1] || ""));
        }
        return acc;
      }, [] as string[])
      .filter(Boolean);

    // 找到所有包含关键词的句子
    const targetSentenceIndices = sentences
      .map((sentence, index) => ({ sentence, index }))
      .filter(({ sentence }) => keywords.some((k) => sentence.includes(k)))
      .map(({ index }) => index);

    if (targetSentenceIndices.length === 0) {
      return text;
    }

    // Process each sentence to handle parentheses content
    const processSentence = (sentence: string, index: number) => {
      // 检查句子是否包含注释（包括中文括号和英文括号）
      const noteMatch = sentence.match(/[（(]([^）)]*)[）)]/);
      const note = noteMatch ? noteMatch[1] : null;
      // 删除所有括号内容（包括中文括号和英文括号）
      const sentenceWithoutNote = sentence.replace(/[（(][^）)]*[）)]/g, "");

      return (
        <span
          key={index}
          onMouseEnter={() => note && setHoveredNote(note)}
          onMouseLeave={() => setHoveredNote(null)}
          style={{ position: "relative", display: "inline-block" }}
        >
          {sentenceWithoutNote}
          {hoveredNote === note && note && (
            <span
              style={{
                position: "absolute",
                top: "-25px",
                left: "0",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "14px",
                zIndex: 1000,
                whiteSpace: "nowrap",
              }}
            >
              {note}
            </span>
          )}
        </span>
      );
    };

    // 创建一个正则表达式来匹配所有关键词
    const keywordRegex = new RegExp(
      `(${keywords
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "g",
    );

    // Reconstruct the text with all highlighted sentences
    return (
      <>
        {sentences
          .map((sentence, index) => {
            if (targetSentenceIndices.includes(index)) {
              // 使用正则表达式分割文本并高亮关键词
              const parts = sentence.split(keywordRegex);
              const highlightedSentence = parts.map((part, partIndex) => {
                if (keywords.includes(part)) {
                  return (
                    <span key={partIndex} style={keywordStyle}>
                      {part}
                    </span>
                  );
                }
                return processSentence(part, partIndex);
              });

              return (
                <span key={index} style={sentenceStyle}>
                  {highlightedSentence}
                </span>
              );
            }
            return processSentence(sentence, index);
          })
          .map((element, index) => (
            <React.Fragment key={index}>
              {element}
              {index < sentences.length - 1 && <br />}
            </React.Fragment>
          ))}
      </>
    );
  }, [text, keywords, sentenceStyle, keywordStyle, hoveredNote]);

  return (
    <div className="HighlightSentenceAndKeyword">{highlightedContent}</div>
  );
};

export default HighlightSentenceAndKeyword;
