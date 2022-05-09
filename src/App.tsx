import React, { FC, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@/pages/container";
import Login from "./pages/login";
import MicroApp from "./pages/microApp";

import http from "@/api/system/menu";
import { useDispatch } from "react-redux";
import {
  setMenuList,
  selectMenuList,
  setMenuSelectedKeys,
  selectMenuTabList,
  setMenuTabList,
} from "@/store/globalSlice";
import { useSelector } from "react-redux";
import NotFound from "./pages/notFound";
import { useRouteChange } from "./hooks/commonHooks";
import { findTreeNodeInTree } from "./utils/common";
import zhCN from "@/locales/zh-CN";
import enUS from "@/locales/en-US";
import { IntlProvider } from "react-intl";
import { selectLocalLanguage } from "./store/globalSlice";

const App: FC = () => {
  const dispath = useDispatch();
  const menuList = useSelector(selectMenuList);
  const menuTabList = useSelector(selectMenuTabList);
  const localLanguage = useSelector(selectLocalLanguage);

  useEffect(() => {
    //异步请求拿到菜单数据
    getMenuData();
  }, []);

  //监听路由变化
  useRouteChange((path: string) => {
    if (path === "/" || !menuList.length) return;
    const selectItem = findTreeNodeInTree(menuList, path, "url");
    console.log("999");

    console.log(selectItem);

    const hasMenuChildren =
      selectItem.children &&
      selectItem.children.some((subItem: any) => Boolean(subItem.enable));
    if (selectItem.bspCode && !hasMenuChildren) {
      dispath(setMenuSelectedKeys([selectItem.bspCode]));
      updateTabList(selectItem);
    }
  });

  const updateTabList = (item: any) => {
    if (!menuTabList) return;
    const targetIndex = menuTabList.findIndex(
      (i: any) => i.bspCode === item.bspCode
    );
    if (targetIndex > -1) {
      //已经存在，则选中该tab
    } else {
      //不存在，则推进
      const newTabList = menuTabList.concat(item);
      dispath(setMenuTabList(newTabList));
    }
  };

  const getMenuData = async () => {
    const menuData = await http.fetchMenuList();
    dispath(setMenuList(menuData));
  };

  const getRoutes = (menus: any, routesArr: any) => {
    menus.forEach((item: any) => {
      const hasChildren = item?.children?.length;
      const hasMenuChildren =
        hasChildren &&
        item.children.some((subItem: any) => Boolean(subItem.enable));
      // const Component = hasChildren
      //   ? null
      //   : require(`@/pages${item.url}`).default;
      const routeItem = hasMenuChildren ? (
        <Route
          key={item.bspCode}
          path={item.url}
          element={<Navigate to={item.children[0].url} />}
        />
      ) : (
        <Route key={item.bspCode} path={item.url} element={<Container />} />
      );
      routesArr.push(routeItem);
      if (hasChildren) {
        return getRoutes(item.children, routesArr);
      }
    });
    return routesArr;
  };

  const getAllRoutes = (menus: any) => {
    if (!menus.length) return <Route path="/" />;
    const firstRoute = menus[0];
    const routes = getRoutes(menus, []);
    return (
      <>
        <Route path="/" element={<Navigate to={firstRoute.url} />} />
        {routes}
      </>
    );
  };

  const localType = localLanguage === "zh-CN" ? zhCN : enUS;
  console.log("---------");

  console.log(localLanguage);

  return (
    <IntlProvider locale={localType.locale} messages={localType.message}>
      <Routes>
        {/* <Route element={<Container />} children={getAllRoutes(menuList)} /> */}
        {getAllRoutes(menuList)}
        <Route path="login" element={<Login />} />
        <Route path="/start/*" element={<MicroApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </IntlProvider>
  );
};

export default App;
