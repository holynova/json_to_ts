import React from "react";
import { Tabs } from "antd";
import SearchTab from "./SearchTab";
import RandomNameTab from "./RandomNameTab";
import RankingTab from "./RankingTab";
import "./NamerPage.less";

const NamerPage: React.FC = () => {
  return (
    <div className="NamerPage">
      <h1>古诗起名</h1>
      <Tabs
        defaultActiveKey="random"
        items={[
          {
            key: "random",
            label: "起名",
            children: <RandomNameTab />,
          },
          {
            key: "ranking",
            label: "排行榜",
            children: <RankingTab />,
          },
          {
            key: "search",
            label: "关键字搜索",
            children: <SearchTab />,
          },
        ]}
      />
    </div>
  );
};

export default NamerPage;
