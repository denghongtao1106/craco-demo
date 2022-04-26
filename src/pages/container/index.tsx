import { Layout, Menu } from "antd";
import "./index.less";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import menuHttp from "../../api/system/menu";
import Child from "../child";
import { useSelector } from "react-redux";
import { selectMenuList } from "@/store/globalSlice";

const { Header, Content, Footer, Sider } = Layout;

const Container = () => {
  const navigate = useNavigate();
  const menuList = useSelector(selectMenuList);

  const formatMenuData = (menuList: any) => {
    const newMenuList = menuList.map((item: any) => ({
      icon: React.createElement(UserOutlined),
      key: item.bspCode,
      label: item.name,
      url: item.url,
      children: item?.children?.length
        ? formatMenuData(item.children)
        : undefined,
    }));
    return newMenuList;
  };

  const formatMenuList = formatMenuData(menuList);

  const onMenuSelect: any = ({ item }: any) => {
    const { url } = item.props;
    navigate(url);
  };

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
          items={formatMenuList}
          onSelect={onMenuSelect}
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

export default Container;
