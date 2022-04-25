import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "./pages/container";
import Login from "./pages/login";
import Child from "./pages/child";

const App: FC = () => {
  return (
    <Routes>
      <Route key="main" element={<Container />}>
        <Route index element={<Child />}></Route>
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
