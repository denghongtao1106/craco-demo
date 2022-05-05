import { Breadcrumb, Layout, Menu, Tabs } from "antd";
import "./index.less";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, Outlet, useNavigate, Link } from "react-router-dom";
import menuHttp from "../../api/system/menu";
import Child from "../child";
import { useSelector } from "react-redux";
import {
  selectMenuList,
  selectMenuSelectedKeys,
  selectMenuTabList,
  setMenuList,
  setMenuSelectedKeys,
  setMenuTabList,
} from "@/store/globalSlice";
import { findTreeNodeInTree, getNodePath } from "@/utils/common";
import { useDispatch } from "react-redux";
import _ from "lodash";

const { Header, Content, Footer, Sider } = Layout;

const Container = () => {
  const navigate = useNavigate();
  const menuList = useSelector(selectMenuList);
  const menuTabList = useSelector(selectMenuTabList);
  const menuSelectedKeys = useSelector(selectMenuSelectedKeys);
  const dispatch = useDispatch();
  const [openKeys, setOpenKeys] = useState([]);

  const breadList = useRef([]);

  const formatMenuData = (menuList: any) => {
    const newMenuList = menuList.map((item: any) => ({
      icon: React.createElement(UserOutlined),
      key: item.bspCode,
      label: item.name,
      url: item.url,
      children:
        item?.children?.length &&
        item.children.some((subItem: any) => Boolean(subItem.enable))
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
    const selectItem = findTreeNodeInTree(formatMenuList, url, "url");
    // updateTabList(selectItem);
    if (selectItem.key) {
      dispatch(setMenuSelectedKeys([selectItem.key]));
    }
  };

  const updateTabList = (item: any) => {
    const targetIndex = menuTabList.findIndex((i: any) => i.key === item.key);
    if (targetIndex > -1) {
      //已经存在，则选中该tab
    } else {
      //不存在，则推进
      const newTabList = menuTabList.concat(item);
      dispatch(setMenuList(newTabList));
    }
  };

  useEffect(() => {
    if (!menuList.length || !menuSelectedKeys.length) return;
    const parentNodes = getNodePath(menuList, menuSelectedKeys[0]) || [];
    breadList.current = _.cloneDeep(parentNodes);
    parentNodes.pop();
    const result = parentNodes.map((item: any) => item.bspCode);
    setOpenKeys(result);
  }, [menuList, menuSelectedKeys]);

  const onOpenChange = (subNodes: any) => {
    setOpenKeys(subNodes);
  };

  const getBreadcrumb = () => {
    const breadDataList = breadList.current;
    return (
      <Breadcrumb>
        {breadDataList.map((item: any) => {
          return (
            <Breadcrumb.Item key={item.bspCode}>
              <Link to={item.url}>{item.name}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };

  const generateComponent = (url: string) => {
    let Component = null;
    try {
      Component = require(`@/pages${url}`).default;
    } catch (error) {
      console.error("请添加对应路由的组件");
    }

    const content = Boolean(Component) ? <Component /> : null;
    return content;
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
        <div className="content-wrapper">
          <Tabs
            type={
              menuTabList && menuTabList.length > 1 ? "editable-card" : "card"
            }
            size="small"
            hideAdd
            tabPosition="top"
            style={{ height: "100%" }}
            activeKey={menuSelectedKeys[0]}
            onChange={(key) => {
              const selectItem = findTreeNodeInTree(menuList, key, "bspCode");
              navigate(selectItem.url);
            }}
            onEdit={(key, action) => {
              if (action === "remove") {
                const copyTabList = _.cloneDeep(menuTabList);
                const index = copyTabList.findIndex(
                  (item: any) => item.bspCode === key
                );
                copyTabList.splice(index, 1);
                dispatch(setMenuTabList(copyTabList));
                navigate(copyTabList[copyTabList.length - 1]?.url);
              }
            }}
          >
            {menuTabList?.map((tabItem: any) => (
              <Tabs.TabPane tab={tabItem.name} key={tabItem.bspCode}>
                {generateComponent(tabItem.url)}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
        {/* {getBreadcrumb()} */}

        {/* <Content>
          <div className="site-layout-background">
            <Outlet />
          </div>
        </Content> */}
      </Layout>
    </Layout>
  );
};

export default Container;
