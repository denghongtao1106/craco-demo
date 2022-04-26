import React, { FC, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@/pages/container";
import Login from "./pages/login";
import Child from "./pages/child";

import http from "@/api/system/menu";
import { useDispatch } from "react-redux";
import { setMenuList, selectMenuList } from "@/store/globalSlice";
import { useSelector } from "react-redux";
import NotFound from "./pages/notFound";

const App: FC = () => {
  const dispath = useDispatch();
  const menuList = useSelector(selectMenuList);
  useEffect(() => {
    //异步请求拿到菜单数据
    console.log("============");
    getMenuData();
  }, []);

  const getMenuData = async () => {
    const menuData = await http.fetchMenuList();

    console.log(menuData);
    dispath(setMenuList(menuData));
  };

  const getRoutes = (menus: any, routesArr: any) => {
    menus.forEach((item: any) => {
      const hasChildren = item?.children?.length;
      const Component = hasChildren
        ? null
        : require(`./pages${item.url}`).default;
      const routeItem = hasChildren ? (
        <Route
          key={item.bspCode}
          path={item.url}
          element={<Navigate to={item.children[0].url} />}
        />
      ) : (
        <Route key={item.bspCode} path={item.url} element={<Component />} />
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
    console.log(routes);
    return (
      <>
        <Route path="/" element={<Navigate to={firstRoute.url} />} />
        {routes}
      </>
    );
  };

  return (
    <Routes>
      <Route element={<Container />} children={getAllRoutes(menuList)} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
