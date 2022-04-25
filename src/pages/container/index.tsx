import { Layout, Menu } from "antd";
import "./index.less";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import menuHttp from "../../api/system/menu";
import { menuData } from "./menuFakeData";
import Child from "../child";

const { Header, Content, Footer, Sider } = Layout;

export default () => {
  const [menuList, setMenuList] = useState([]);
  const formatMenuData = (menuList: any) => {
    const newMenuList = menuList.map((item: any) => ({
      icon: React.createElement(UserOutlined),
      key: item.bspCode,
      label: item.name,
      children: item?.children?.length
        ? formatMenuData(item.children)
        : undefined,
    }));
    return newMenuList;
  };
  const getMenuData = () => {
    // const list = await menuHttp.fetchMenuList();
    const formatData = formatMenuData(menuData);
    console.log(formatData);
    setMenuList(formatData);
    // return menuData
  };

  useEffect(() => {
    getMenuData();
  }, []);

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={menuList}
        />
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content>
          <div className="site-layout-background">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
