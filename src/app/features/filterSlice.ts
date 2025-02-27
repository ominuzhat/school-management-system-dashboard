// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// type FilterStateType = {
//   limit: number;
//   skip: number;
//   key?: string;
//   [key: string]: number | string | boolean | undefined;
// };

// const initialState: FilterStateType = {
//   limit: 5, // Renamed from `page_size`
//   skip: 1, // Renamed from `currentPage`
//   key: undefined,
// };

// const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     addFilter: (
//       state,
//       action: PayloadAction<{ name: "LIMIT" | "SKIP" | "KEY"; value: number | string | undefined }>
//     ) => {
//       switch (action.payload.name) {
//         case "LIMIT":
//           state.limit = action.payload.value as number;
//           break;
//         case "SKIP":
//           state.skip = action.payload.value as number;
//           break;
//         case "KEY":
//           state.key = action.payload.value as string;
//           break;
//       }
//     },

//     resetFilter: (state) => {
//       state.limit = 50;
//       state.skip = 0;
//       state.key = undefined;
//     },
//   },
// });

// export const FilterState = (state: RootState) => state.filter;
// export const { addFilter, resetFilter } = filterSlice.actions;
// export default filterSlice.reducer;

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
