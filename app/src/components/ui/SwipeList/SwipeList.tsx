import React from "react";
import "./SwipeList.css";

interface SwipeListProps {}

const SwipeList: React.FC<SwipeListProps> = ({ children }) => {
  return <div className="SwipeList">{children}</div>;
};

export default SwipeList;
