import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
interface Props {
  text: string;
  keyword: string;
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
  keyword,
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

    // Find the sentence containing the keyword
    const targetSentenceIndex = sentences.findIndex((sentence) =>
      sentence.includes(keyword),
    );

    if (targetSentenceIndex === -1) {
      return text;
    }

    const targetSentence = sentences[targetSentenceIndex];

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

    // Highlight the keyword within the target sentence
    const highlightedSentence = targetSentence
      .split(keyword)
      .map((part, index) => (
        <React.Fragment key={index}>
          {processSentence(part, index)}
          {index < targetSentence.split(keyword).length - 1 && (
            <span style={keywordStyle}>{keyword}</span>
          )}
        </React.Fragment>
      ));

    // Reconstruct the text with the highlighted sentence
    return (
      <>
        {sentences
          .map((sentence, index) => {
            if (index === targetSentenceIndex) {
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
  }, [text, keyword, sentenceStyle, keywordStyle, hoveredNote]);

  return (
    <div className="HighlightSentenceAndKeyword">{highlightedContent}</div>
  );
};

export default HighlightSentenceAndKeyword;
