import $axios from "../../utils/axios";
export default {
  // 获取菜单数据
  fetchMenuList(params?: object): Promise<any> {
    return $axios.post(
      "/bsp/user/ugs/ums/v1/user/menu/findUserMenuResList",
      params
    );
  },
};
