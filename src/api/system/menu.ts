import $axios from '../../utils/axios';
import { menuData } from './menuFakeData';

export default {
  // 获取菜单数据
  fetchMenuList(params?: object): Promise<any> {
    // return $axios.post(
    //   "/bsp/user/ugs/ums/v1/user/menu/findUserMenuResList",
    //   params
    // );
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(menuData);
      }, 500);
    });
  },
  fetchFakeData(params?: object): Promise<any> {
    return $axios.post(
      "/bsp/user/ugs/ums/v1/user/menu/findUserMenuResList",
      params
    );
  },
};
