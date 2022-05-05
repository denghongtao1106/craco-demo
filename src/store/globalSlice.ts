import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './index';

interface GlobalState {
  menuList: any[];//菜单列表
  menuSelectedKeys: any[];//当前选中菜单
  menuTabList: any[];//页签列表
  localLanguage:'en-US'|'zh-CN'//多语言设置
}

const initialState: GlobalState = {
  menuList: [],
  menuSelectedKeys: [],
  menuTabList: [],
  localLanguage:'zh-CN'
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMenuList: (state, action: PayloadAction<any>) => {
      state.menuList = action.payload;
    },
    setMenuSelectedKeys: (state, action: PayloadAction<any>) => {
      state.menuSelectedKeys = action.payload;
    },
    setMenuTabList: (state, action: PayloadAction<any>) => {
      state.menuTabList = action.payload;
    },
    setLocalLanguage: (state, action: PayloadAction<any>) => {
      state.localLanguage = action.payload;
    },
  },
});

export const { setMenuList, setMenuSelectedKeys, setMenuTabList ,setLocalLanguage} =
  globalSlice.actions;

export const selectMenuList = (state: RootState) => state.global.menuList;
export const selectMenuSelectedKeys = (state: RootState) =>
  state.global.menuSelectedKeys;
export const selectMenuTabList = (state: RootState) => state.global.menuTabList;
export const selectLocalLanguage = (state: RootState) => state.global.localLanguage;

export default globalSlice.reducer;
