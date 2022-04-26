import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./index";

interface GlobalState {
  menuList: any[];
}

const initialState: GlobalState = {
  menuList: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMenuList: (state, action: PayloadAction<any>) => {
      state.menuList = action.payload;
    },
  },
});

export const { setMenuList } = globalSlice.actions;

export const selectMenuList = (state: RootState) => state.global.menuList;

export default globalSlice.reducer;
