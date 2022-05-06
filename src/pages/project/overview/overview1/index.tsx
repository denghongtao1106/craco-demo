import React, { FC, useEffect } from "react";
import "./index.less";

const Overview: FC = () => {
  useEffect(() => {
    console.log("Overview1");
  }, []);
  return (
    <div>
      <span className="box">Overview1</span>
    </div>
  );
};
export default Overview;
