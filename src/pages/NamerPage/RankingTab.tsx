import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import {
  LikeOutlined,
  SmileOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import "./NamerPage.less";

interface FeedbackData {
  name: string;
  source: string;
  poem: {
    title: string;
    dynasty: string;
    author: string | null;
  };
  count: number;
}

const RankingTab: React.FC = () => {
  const [rankings, setRankings] = useState<{
    like: FeedbackData[];
    happy: FeedbackData[];
    dislike: FeedbackData[];
  }>({
    like: [],
    happy: [],
    dislike: [],
  });

  useEffect(() => {
    const loadRankings = () => {
      const likeData = JSON.parse(
        localStorage.getItem("nameFeedback_like") || "[]",
      );
      const happyData = JSON.parse(
        localStorage.getItem("nameFeedback_happy") || "[]",
      );
      const dislikeData = JSON.parse(
        localStorage.getItem("nameFeedback_dislike") || "[]",
      );

      setRankings({
        like: likeData,
        happy: happyData,
        dislike: dislikeData,
      });
    };

    loadRankings();
    window.addEventListener("storage", loadRankings);
    return () => window.removeEventListener("storage", loadRankings);
  }, []);

  const renderRankingList = (data: FeedbackData[]) => (
    <div className="ranking-list">
      {data.map((item, index) => (
        <div key={index} className="ranking-item">
          <div className="rank">{index + 1}</div>
          <div className="name">{item.name}</div>
          <div className="source">
            <div className="poem-info">
              {item.poem.title} · {item.poem.dynasty} · {item.poem.author}
            </div>
            <div className="source-sentence">出处：{item.source}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="ranking-tab">
      <Tabs
        items={[
          {
            key: "like",
            label: (
              <span>
                <LikeOutlined /> 点赞榜
              </span>
            ),
            children: renderRankingList(rankings.like),
          },
          {
            key: "happy",
            label: (
              <span>
                <SmileOutlined /> 欢乐榜
              </span>
            ),
            children: renderRankingList(rankings.happy),
          },
          {
            key: "dislike",
            label: (
              <span>
                <DislikeOutlined /> 厌恶榜
              </span>
            ),
            children: renderRankingList(rankings.dislike),
          },
        ]}
      />
    </div>
  );
};

export default RankingTab;
