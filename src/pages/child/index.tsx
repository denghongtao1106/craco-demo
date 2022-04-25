import React, { FC, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Child: FC = () => {
    const params = useParams();
  return (
    <div>
      <span>Child</span>
      <h1>{params.id}</h1>
    </div>
  );
};
export default Child;
