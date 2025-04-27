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
  const highlightedContent = useMemo(() => {
    // Split the text into sentences using punctuation marks
    const sentences = text.split(/(?<!\w)([。！？；])/g).filter(Boolean);

    // Find the sentence containing the keyword
    const targetSentenceIndex = sentences.findIndex((sentence) =>
      sentence.includes(keyword),
    );

    if (targetSentenceIndex === -1) {
      return text; // Return the original text if the keyword is not found
    }

    const targetSentence = sentences[targetSentenceIndex];

    // Highlight the keyword within the target sentence
    const highlightedSentence = targetSentence
      .split(keyword)
      .map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < targetSentence.split(keyword).length - 1 && (
            <span style={keywordStyle}>{keyword}</span>
          )}
        </React.Fragment>
      ));

    // Reconstruct the text with the highlighted sentence
    return (
      <>
        {sentences.map((sentence, index) => {
          if (index === targetSentenceIndex) {
            return (
              <span key={index} style={sentenceStyle}>
                {highlightedSentence}
              </span>
            );
          }
          return <span key={index}>{sentence}</span>;
        })}
      </>
    );
  }, [text, keyword, sentenceStyle, keywordStyle]);

  return (
    <div className="HighlightSentenceAndKeyword">{highlightedContent}</div>
  );
};

export default HighlightSentenceAndKeyword;
