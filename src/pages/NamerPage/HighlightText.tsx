import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
interface Props {
  text: string;
  textToHighlight: string;
  highlightStyle?: React.CSSProperties;
}

const HighlightText: React.FC<Props> = ({
  text,
  textToHighlight,
  highlightStyle = { fontWeight: "bold", fontSize: "1.2em", color: "#333" },
}) => {
  const highlightedText = useMemo(() => {
    if (!textToHighlight) return text;

    const regex = new RegExp(`(${textToHighlight})`, "gi");
    return text.split(regex).map((part, index) => {
      if (part.toLowerCase() === textToHighlight.toLowerCase()) {
        return (
          <span key={index} style={highlightStyle}>
            {part}
          </span>
        );
      }
      return part;
    });
  }, [text, textToHighlight, highlightStyle]);

  return <div className="Highlight">{highlightedText}</div>;
};

export default HighlightText;
