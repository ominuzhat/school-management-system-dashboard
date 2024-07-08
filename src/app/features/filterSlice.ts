import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterTypes =
  | {
      limit?: number;
      skip?: number;
      key?: string | undefined;
    }
  | undefined;

const initialState: FilterTypes = {
  limit: 50,
  skip: 0,
  key: undefined,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLimit: (state, { payload }: PayloadAction<number>) => {
      state.limit = payload;
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
