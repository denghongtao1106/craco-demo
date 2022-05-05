import React, { FC, useEffect } from "react";
import styles from "./index.module.less";
import { useIntl } from "react-intl";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setLocalLanguage } from "../../store/globalSlice";

const Platform: FC = () => {
  const { formatMessage: intl } = useIntl();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("platform");
    console.log(process.env.REACT_APP_DENG_HONG_TAO);
  }, []);
  return (
    <div className={styles.platformWrapper}>
      <span>Platform</span>
      <span>{intl({ id: "country" })}</span>
      <Button
        type="primary"
        onClick={() => dispatch(setLocalLanguage("en-US"))}
      >
        英文
      </Button>
      <Button onClick={() => dispatch(setLocalLanguage("zh-CN"))}>中文</Button>
    </div>
  );
};
export default Platform;
