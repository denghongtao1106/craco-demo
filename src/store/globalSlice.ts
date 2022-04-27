import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './index';

interface GlobalState {
  menuList: any[];
  menuSelectedKeys: any[];
}

const initialState: GlobalState = {
  menuList: [],
  menuSelectedKeys: [],
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
  },
});

export const { setMenuList, setMenuSelectedKeys } = globalSlice.actions;

export const selectMenuList = (state: RootState) => state.global.menuList;
export const selectMenuSelectedKeys = (state: RootState) =>
  state.global.menuSelectedKeys;

export default globalSlice.reducer;
