import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterTypes =
  | ({
      page_size?: number;
      skip?: number;
      key?: string | undefined;
    } & Record<string, any>)
  | undefined;

const initialState: FilterTypes = {
  page_size: 50,
  skip: 0,
  key: undefined,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLimit: (state, { payload }: PayloadAction<number>) => {
      state.page_size = payload;
    },

    setSkip: (state, { payload }: PayloadAction<number>) => {
      state.skip = payload;
    },

    setKey: (state, { payload }: PayloadAction<string | undefined>) => {
      state.key = payload;
    },
  },
});

export const { setLimit, setSkip, setKey } = filterSlice.actions;

export default filterSlice.reducer;
