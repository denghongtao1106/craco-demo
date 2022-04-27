import { Layout, Menu, Tabs } from "antd";
import "./index.less";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import menuHttp from "../../api/system/menu";
import Child from "../child";
import { useSelector } from "react-redux";
import {
  selectMenuList,
  selectMenuSelectedKeys,
  setMenuSelectedKeys,
} from "@/store/globalSlice";
import { findTreeNodeInTree, getNodePath } from "@/utils/common";
import { useDispatch } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

const Container = () => {
  const navigate = useNavigate();
  const menuList = useSelector(selectMenuList);
  const menuSelectedKeys = useSelector(selectMenuSelectedKeys);
  const dispatch = useDispatch();
  const [openKeys, setOpenKeys] = useState([]);

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
    locateMenu(url);
  };

  const locateMenu = (url: string) => {
    const { key } = findTreeNodeInTree(formatMenuList, url, "url");
    if (key) {
      dispatch(setMenuSelectedKeys([key]));
    }
  };

  useEffect(() => {
    if (!menuList.length || !menuSelectedKeys.length) return;
    const parentNodes = getNodePath(menuList, menuSelectedKeys[0]) || [];
    parentNodes.pop();
    const result = parentNodes.map((item: any) => item.bspCode);
    setOpenKeys(result);
  }, [menuList, menuSelectedKeys]);

  const onOpenChange = (subNodes: any) => {
    setOpenKeys(subNodes);
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
          // defaultOpenKeys={['BIMDC_XIANGM_XMXQ']}
          selectedKeys={menuSelectedKeys}
          openKeys={openKeys}
          items={formatMenuList}
          onSelect={onMenuSelect}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        {/* <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 220 }}>
          {[...Array.from({ length: 30 }, (v, i) => i)].map((i) => (
            <Tabs.TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
              Content of tab {i}
            </Tabs.TabPane>
          ))}
        </Tabs> */}
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
