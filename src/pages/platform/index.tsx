import React, { FC, useEffect, useRef } from "react";
import styles from "./index.module.less";
import { useIntl } from "react-intl";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setLocalLanguage } from "../../store/globalSlice";
import http from "@/api/system/menu";
import { useHttp } from "@/hooks/commonHooks";
import MyApp from "./MyApp";
import kscreenshot from "kscreenshot";

let kscreenInstance: any = null;

const Platform: FC = () => {
  const { formatMessage: intl } = useIntl();
  const dispatch = useDispatch();
  const flag = useRef(false);

  const divRef = useRef(null);

  const { loading, successData, failData, sendRequest } = useHttp();

  console.log("渲染");

  useEffect(() => {
    console.log("platform");
    (divRef.current as any)?.sayHello();
    console.log(process.env.REACT_APP_SERVER_API);

    kscreenInstance = new kscreenshot({
      key: 65,
      endCB: (res: any) => {
        console.log(res);
      },
    });
  }, []);

  const changeTheme = () => {
    if (flag.current === false) {
      (window as any).less
        .modifyVars(
          //更换主题颜色要这么写
          {
            "@primary-color": "#e64e14",
            "@btn-primary-bg": "#5d72cc",
            "@primary-fontColor": "#e64e14",
          }
        )
        .then(() => {
          console.log("success");
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      (window as any).less
        .modifyVars(
          //更换主题颜色要这么写
          {
            "@primary-color": "blue",
            "@btn-primary-bg": "purple",
            "@primary-fontColor": "orange",
          }
        )
        .then(() => {
          console.log("success");
        })
        .catch((error: any) => {
          console.log(error);
        });
    }

    flag.current = !flag.current;
  };

  const goRequest = () => {
    sendRequest(http.fetchFakeData, { project: "124" });
    // http.fetchFakeData({ project: '124' }).then((res) => console.log(res));
  };

  const startScreen = () => {
    kscreenInstance.startScreenShot();
  };

  return (
    <div className={styles.platformWrapper}>
      <span className="primary-bg">Platform</span>
      <span>{intl({ id: "country" })}</span>
      <Button
        type="primary"
        onClick={() => dispatch(setLocalLanguage("en-US"))}
      >
        英文
      </Button>
      <Button onClick={() => dispatch(setLocalLanguage("zh-CN"))}>中文</Button>
      <MyApp ref={divRef} />
      <Button onClick={changeTheme}>改变主题</Button>
      <Button loading={loading} onClick={goRequest}>
        发起请求
      </Button>
      <Button onClick={startScreen}>开始截屏</Button>

      <span>{successData?.msg}</span>
      <div id="container" style={{ width: "100%", height: 400 }}></div>
    </div>
  );
};
export default Platform;
