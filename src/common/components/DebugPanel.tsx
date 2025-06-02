import { PropsWithChildren } from "react";

export const DebugPanel = ({ children }: PropsWithChildren<any>) => {
  return (
    <pre
      style={{
        fontSize: 10,
        maxHeight: 200,
        overflow: "auto",
        backgroundColor: "#ffe",
      }}
    >
      {typeof children === "string"
        ? children
        : JSON.stringify(children, null, 2)}
    </pre>
  );
};
