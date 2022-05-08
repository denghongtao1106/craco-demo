import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import cx from "classnames";
import { qiankunGlobalAction } from "../../micro";
import { eventEmitter } from "../../utils/emitter";

const MicroApp = () => {
  useEffect(() => {
    // setTimeout(() => {
    //   qiankunGlobalAction.setGlobalState({ projectId: "110899" });
    // }, 1000);
    eventEmitter.on("qiankunStateChange", qiankunChange);
    return () => {
      eventEmitter.off("qiankunStateChange", qiankunChange);
    };
  }, []);

  const qiankunChange = (state: any, prev: any) => {
    console.log("我监听到了子应用");
    console.log(state);
  };

  return (
    <div className={styles.containerWrapper}>
      <div
        id="container"
        className={cx(styles.container, { [styles.myClass]: false })}
      ></div>
    </div>
  );
};
export default MicroApp;
