import React, { FC, useEffect } from "react";
import styles from "./index.module.less";
import { useIntl } from "react-intl";
import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import { setLocalLanguage } from "../../store/globalSlice";

const Platform: FC = () => {
  const { formatMessage: intl } = useIntl();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("platform");
    console.log(process.env.REACT_APP_DENG_HONG_TAO);
  }, []);

  const toggleTheme = () => {
    (window as any).less
      .modifyVars({
        "@primary-color": "#aaa",
        "@menu-dark-item-active-bg": "#aaa",
        "@link-color": "#aaa",
        "@text-color": "#aaa",
        "@btn-primary-bg": "#aaa",
      })
      .then(() => {
        message.success("主题切换成功");
      })
      .catch((error: any) => {
        message.error(`主题切换失败`);
        console.log(error);
      });
  };

  return (
    <div className={styles.platformWrapper}>
      <span className={styles.platformTitle}>Platform</span>
      <span>{intl({ id: "country" })}</span>
      <Button
        type="primary"
        onClick={() => dispatch(setLocalLanguage("en-US"))}
      >
        英文
      </Button>
      <Button onClick={() => dispatch(setLocalLanguage("zh-CN"))}>中文</Button>
      <Button onClick={toggleTheme}>切换主题</Button>
    </div>
  );
};
export default Platform;
