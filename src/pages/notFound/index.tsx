import React, { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

const NotFound: FC = () => {
  return <Navigate to="/" />;
};
export default NotFound;
