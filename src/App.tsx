import React from "react";
import logo from "./logo.svg";
import styles from "./app.module.less";
import { Button } from "antd";

function App() {
  return (
    <div className={styles.App}>
      <Button type="primary">按钮</Button>
    </div>
  );
}

export default App;
